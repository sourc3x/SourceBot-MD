/**
 * SourceBot - WhatsApp Bot
 * Vinculación: QR / Pairing Code
 * Autor: Source Dev
 */

require('./settings');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const chalk = require('chalk');
const readline = require('readline');
const P = require('pino');
const { handleMessages } = require('./main');

async function startBot(mode = "qr") {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: mode === "qr",
    auth: state,
    browser: ['SourceBot', 'Chrome', '1.5.0']
  });

  conn.ev.on('creds.update', saveCreds);
  conn.ev.on('messages.upsert', async (m) => handleMessages(conn, m));

  conn.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
      console.log(reason === DisconnectReason.badSession
        ? chalk.red('❌ Sesión dañada. Borra /session y vuelve a vincular.')
        : chalk.yellow('Reconectando...'));
      startBot(mode);
    } else if (connection === 'open') {
      console.log(chalk.green(`✅ ${global.botName} conectado correctamente.`));
    }
  });

  if (mode === "code" && !conn.authState.creds.registered) {
    const code = await conn.requestPairingCode(global.ownerNumber);
    console.log(chalk.green(`🔗 Código de vinculación: ${code}`));
    console.log(chalk.cyan('\n📱 WhatsApp → Dispositivos vinculados → Vincular nuevo → Con código\n'));
  }

  return conn;
}

function askMode() {
  console.clear();
  console.log(chalk.cyan.bold(`
==============================
🤖 ${global.botName} - by ${global.ownerName}
==============================
`));
  console.log(chalk.yellow(`Selecciona el método de vinculación:
  [1] Escanear código QR
  [2] Código de emparejamiento
`));

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question(chalk.green('👉 Escribe 1 o 2: '), (opt) => {
    opt === '1' ? startBot("qr") : opt === '2' ? startBot("code") : console.log('❌ Opción no válida.');
    rl.close();
  });
}

askMode();

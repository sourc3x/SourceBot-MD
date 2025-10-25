const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

exports.handleMessages = async (conn, m) => {
  try {
    const msg = m.messages[0];
    if (!msg.message) return;
    const from = msg.key.remoteJid;
    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const prefix = global.prefix;
    if (!body.startsWith(prefix)) return;

    const args = body.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const cmdPath = path.join(__dirname, 'commands', `${command}.js`);

    if (fs.existsSync(cmdPath)) {
      const cmd = require(cmdPath);
      await cmd.execute(conn, msg, args);
    } else {
      await conn.sendMessage(from, { text: `❌ Comando no reconocido: *${command}*` });
    }
  } catch (err) {
    console.log(chalk.red('Error:'), err);
  }
};

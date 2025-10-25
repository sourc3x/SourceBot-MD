module.exports = {
  name: 'ping',
  async execute(conn, msg) {
    await conn.sendMessage(msg.key.remoteJid, { text: '🏓 Pong! El bot está en línea ✅' });
  }
};

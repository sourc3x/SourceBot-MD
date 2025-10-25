const fs = require('fs');
module.exports = {
  name: 'info',
  async execute(conn, msg) {
    const from = msg.key.remoteJid;
    const logo = fs.readFileSync(global.logoPath);
    await conn.sendMessage(from, {
      image: logo,
      caption: `🤖 *${global.botName}*
👤 Autor: ${global.ownerName}
🌐 GitHub: github.com/SourceDev
📞 Contacto: ${global.ownerNumber}`
    });
  }
};

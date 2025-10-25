const gtts = require('node-gtts')('es');
const fs = require('fs');

module.exports = {
  name: 'tts',
  async execute(conn, msg, args) {
    const text = args.join(' ');
    if (!text) return conn.sendMessage(msg.key.remoteJid, { text: '💬 Escribe un texto para convertir en audio.' });
    const path = './tts.mp3';
    await new Promise(res => gtts.save(path, text, res));
    const audio = fs.readFileSync(path);
    await conn.sendMessage(msg.key.remoteJid, { audio, mimetype: 'audio/mpeg', ptt: true });
    fs.unlinkSync(path);
  }
};

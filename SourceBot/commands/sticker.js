const { writeExifImg } = require('../lib/exif');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');

module.exports = {
  name: 'sticker',
  async execute(conn, msg) {
    const from = msg.key.remoteJid;
    const quoted = msg.message.imageMessage || msg.message.videoMessage;
    if (!quoted) return conn.sendMessage(from, { text: '📷 Envía una imagen o video con !sticker' });

    const type = msg.message.imageMessage ? 'image' : 'video';
    const stream = await downloadContentFromMessage(quoted, type);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

    const sticker = await writeExifImg(buffer, { packname: "SourceBot", author: "Source Dev" });
    await conn.sendMessage(from, { sticker });
  }
};

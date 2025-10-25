module.exports = {
  name: 'kick',
  async execute(conn, msg) {
    const from = msg.key.remoteJid;
    const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned) return conn.sendMessage(from, { text: '❗ Menciona al usuario que deseas expulsar.' });
    await conn.groupParticipantsUpdate(from, mentioned, 'remove');
    await conn.sendMessage(from, { text: '👢 Usuario expulsado correctamente.' });
  }
};

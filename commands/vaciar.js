module.exports = {
  name: 'vaciar',
  async execute(conn, msg) {
    const from = msg.key.remoteJid;
    const metadata = await conn.groupMetadata(from);
    const admins = metadata.participants.filter(p => p.admin).map(p => p.id);
    const toKick = metadata.participants.filter(p => !admins.includes(p.id)).map(p => p.id);

    if (toKick.length === 0) return conn.sendMessage(from, { text: '✅ No hay usuarios para expulsar.' });
    await conn.groupParticipantsUpdate(from, toKick, 'remove');
    await conn.sendMessage(from, { text: '🧹 Grupo vaciado (solo quedan admins).' });
  }
};

module.exports = {
  name: 'tagall',
  async execute(conn, msg) {
    const from = msg.key.remoteJid;
    const metadata = await conn.groupMetadata(from);
    const participants = metadata.participants.map(p => p.id);
    const mentions = participants.map(u => '@' + u.split('@')[0]).join(' ');
    await conn.sendMessage(from, { text: `📣 *Mencionando a todos:*\n\n${mentions}`, mentions: participants });
  }
};

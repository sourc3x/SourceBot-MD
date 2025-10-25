module.exports = {
  name: 'mute',
  async execute(conn, msg) {
    const from = msg.key.remoteJid;
    await conn.groupSettingUpdate(from, 'announcement');
    await conn.sendMessage(from, { text: '🔇 Grupo silenciado (solo admins).' });
  }
};

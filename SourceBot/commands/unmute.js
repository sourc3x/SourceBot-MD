module.exports = {
  name: 'unmute',
  async execute(conn, msg) {
    const from = msg.key.remoteJid;
    await conn.groupSettingUpdate(from, 'not_announcement');
    await conn.sendMessage(from, { text: '🔊 Grupo reactivado, todos pueden hablar.' });
  }
};

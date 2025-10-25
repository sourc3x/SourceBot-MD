module.exports = {
  name: 'help',
  description: 'Muestra la lista de comandos disponibles',
  async execute(conn, msg) {
    const from = msg.key.remoteJid;
    const helpText = `
🤖 *${global.botName} - Menú de comandos*

🧩 Utilidad
!ping - Verifica si el bot está activo
!info - Información del bot
!tts <texto> - Convierte texto a audio
!sticker (imagen/video) - Convierte en sticker

👥 Moderación
!tagall - Menciona a todos los miembros
!kick @usuario - Expulsa del grupo
!mute - Silencia el grupo (solo admins)
!unmute - Quita silencio del grupo
!vaciar - Expulsa a todos los no-admins

Prefijo actual: ${global.prefix}
`;
    await conn.sendMessage(from, { text: helpText });
  }
};

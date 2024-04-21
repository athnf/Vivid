const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Mengeluarkan anggota dari server secara permanen.',
    category: 'moderator',
    execute(message, args) {
        // Memeriksa apakah pengguna memiliki izin ADMINISTRATOR
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('Maaf, kamu tidak memiliki izin untuk menggunakan perintah ini.');
        }

        // Mengambil anggota yang disebutkan
        const member = message.mentions.members.first();
        
        // Memeriksa apakah ada anggota yang disebutkan
        if (!member) {
            return message.reply('Tolong sebutkan anggota yang ingin kamu keluarkan.');
        }
        
        // Memeriksa apakah pengguna dapat mengeluarkan anggota tersebut
        if (!member.bannable) {
            return message.reply('Aku tidak dapat mengeluarkan anggota ini.');
        }

        // Mengeluarkan anggota
        member.ban({ reason: 'Alasan opsional di sini.' })
            .then(() => {
                // Membuat embed untuk pesan ban
                const banEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Anggota Dikeluarkan')
                    .setDescription(`${member.user.tag} telah dikeluarkan dari server.`)
                    .addField('Moderator', message.author.tag)
                    .addField('Alasan', 'Alasan opsional di sini.')
                    .setTimestamp();
                
                // Mengirim embed ke channel
                message.channel.send(banEmbed);
            })
            .catch(error => {
                console.error(error);
                message.reply('Terjadi kesalahan saat mencoba untuk mengeluarkan anggota tersebut.');
            });
    },
};

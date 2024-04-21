const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Mengeluarkan anggota dari server.',
    category: 'moderator',
    execute(message, args) {
        // Memeriksa apakah pengguna memiliki peran admin
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('Maaf, kamu tidak memiliki izin untuk menggunakan perintah ini.');
        }

        // Memeriksa apakah perintah dipanggil di dalam server
        if (!message.guild) {
            return message.reply('Perintah ini hanya bisa digunakan di dalam server.');
        }

        // Memeriksa apakah ada anggota yang disebutkan
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Tolong sebutkan anggota yang ingin kamu keluarkan.');
        }

        // Memeriksa apakah pengguna dapat mengeluarkan anggota tersebut
        if (!member.kickable) {
            return message.reply('Aku tidak dapat mengeluarkan anggota ini.');
        }

        // Mengeluarkan anggota
        member.kick()
            .then(() => {
                const kickEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${member.user.tag} telah berhasil dikeluarkan dari server oleh ${message.author.tag}.`);

                message.channel.send(kickEmbed);
            })
            .catch(error => {
                console.error(error);
                message.reply('Terjadi kesalahan saat mencoba untuk mengeluarkan anggota tersebut.');
            });
    },
};

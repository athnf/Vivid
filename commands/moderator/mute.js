const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Mematikan kemampuan anggota untuk mengirim pesan di saluran teks.',
    category: 'moderator',
    execute(message, args) {
        // Memeriksa apakah pengguna memiliki izin ADMINISTRATOR
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('Maaf, kamu tidak memiliki izin untuk menggunakan perintah ini.');
        }

        // Mendapatkan role mute berdasarkan ID
        const muteRole = message.guild.roles.cache.get('1217366377564999710');

        // Memeriksa apakah role mute ditemukan
        if (!muteRole) {
            return message.reply('Role mute tidak ditemukan.');
        }

        // Mengambil anggota yang disebutkan
        const member = message.mentions.members.first();
        
        // Memeriksa apakah ada anggota yang disebutkan
        if (!member) {
            return message.reply('Tolong sebutkan anggota yang ingin kamu mute.');
        }

        // Memeriksa apakah anggota sudah memiliki role mute
        if (member.roles.cache.has(muteRole.id)) {
            return message.reply('Anggota tersebut sudah dalam keadaan mute.');
        }

        // Mem-mute anggota dengan memberikan role mute
        member.roles.add(muteRole)
            .then(() => {
                // Membuat embed untuk pesan mute
                const muteEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Anggota Dibisukan')
                    .setDescription(`${member.user.tag} telah dibisukan di server.`)
                    .addField('Moderator', message.author.tag)
                    .setTimestamp();
                
                // Mengirim embed ke channel
                message.channel.send(muteEmbed);
            })
            .catch(error => {
                console.error(error);
                message.reply('Terjadi kesalahan saat mencoba untuk mem-mute anggota tersebut.');
            });
    },
};

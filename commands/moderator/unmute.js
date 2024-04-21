const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unmute',
    description: 'Mengaktifkan kembali kemampuan anggota untuk mengirim pesan di saluran teks.',
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
            return message.reply('Tolong sebutkan anggota yang ingin kamu unmute.');
        }

        // Memeriksa apakah anggota tidak memiliki role mute
        if (!member.roles.cache.has(muteRole.id)) {
            return message.reply('Anggota tersebut tidak dalam keadaan mute.');
        }

        // Un-mute anggota dengan menghapus role mute
        member.roles.remove(muteRole)
            .then(() => {
                // Membuat embed untuk pesan unmute
                const unmuteEmbed = new MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle('Anggota Dibuka Bisu')
                    .setDescription(`${member.user.tag} telah dibuka bisunya di server.`)
                    .addField('Moderator', message.author.tag)
                    .setTimestamp();
                
                // Mengirim embed ke channel
                message.channel.send(unmuteEmbed);
            })
            .catch(error => {
                console.error(error);
                message.reply('Terjadi kesalahan saat mencoba untuk meng-unmute anggota tersebut.');
            });
    },
};

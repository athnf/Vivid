const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Mengizinkan kembali anggota yang telah dikeluarkan dari server.',
    category: 'moderator',
    execute(message, args) {
        // Memeriksa apakah pengguna memiliki izin ADMINISTRATOR
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('Maaf, kamu tidak memiliki izin untuk menggunakan perintah ini.');
        }

        // Menyaring argumen untuk mendapatkan ID pengguna yang ingin di-unban
        const userID = args[0];
        
        // Memeriksa apakah ID pengguna yang diberikan valid
        if (!userID || isNaN(userID)) {
            return message.reply('Tolong berikan ID pengguna yang ingin di-unban.');
        }

        // Meng-unban pengguna
        message.guild.fetchBans()
            .then(bans => {
                // Memeriksa apakah pengguna ada dalam daftar bans
                const bannedUser = bans.find(ban => ban.user.id === userID);

                if (!bannedUser) {
                    return message.reply('Pengguna dengan ID tersebut tidak ditemukan dalam daftar bans server.');
                }

                // Meng-unban pengguna
                message.guild.members.unban(userID)
                    .then(unbannedUser => {
                        // Membuat embed untuk pesan unban
                        const unbanEmbed = new MessageEmbed()
                            .setColor('#00ff00')
                            .setTitle('Anggota Diizinkan Kembali')
                            .setDescription(`${unbannedUser.tag} telah diizinkan kembali ke server.`)
                            .addField('Moderator', message.author.tag)
                            .setTimestamp();
                        
                        // Mengirim embed ke channel
                        message.channel.send(unbanEmbed);
                    })
                    .catch(error => {
                        console.error(error);
                        message.reply('Terjadi kesalahan saat mencoba untuk mengizinkan kembali pengguna tersebut.');
                    });
            })
            .catch(error => {
                console.error(error);
                message.reply('Terjadi kesalahan saat mencoba untuk mengambil daftar bans server.');
            });
    },
};

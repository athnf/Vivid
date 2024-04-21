const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'report',
    description: 'Melaporkan pengguna atau masalah.',
    category: 'moderator',
    execute(message, args) {
        // Cek apakah pengguna memberikan argumen
        if (!args.length) {
            return message.reply('Silakan berikan laporan atau masalah yang ingin dilaporkan.');
        }

        // Mengambil pesan report dari pengguna
        const reportContent = args.join(' ');

        // Mengirimkan laporan ke log channel admin
        const adminLogChannel = message.client.channels.cache.get('1217371982333476864'); // ID log channel admin
        if (!adminLogChannel) return message.reply('Log channel admin tidak ditemukan.');

        const reportEmbed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Laporan Pengguna')
            .setDescription(`Laporan dari: ${message.author}`)
            .addField('Isi Laporan', reportContent)
            .setTimestamp();

        adminLogChannel.send(reportEmbed)
            .then(() => {
                // Menghapus pesan report pengguna
                message.delete()
                    .catch(error => console.error(`Gagal menghapus pesan: ${error}`));
            })
            .catch(error => {
                console.error(`Gagal mengirim laporan ke log channel admin: ${error}`);
                message.reply('Gagal melaporkan pengguna. Silakan coba lagi.');
            });

        // Memberi tahu pengguna bahwa laporan telah berhasil dikirimkan ke admin
        const successEmbed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Laporan Terkirim!')
            .setDescription('Laporan Anda telah berhasil dikirimkan kepada admin.')
            .setTimestamp();

        message.author.send(successEmbed)
            .catch(error => console.error(`Gagal mengirim pesan ke DM pengguna: ${error}`));
    },
};

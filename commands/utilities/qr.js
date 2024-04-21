const Discord = require('discord.js');
const qr = require('qr-image');

module.exports = {
    name: 'qr',
    description: 'Menghasilkan QR code dari link yang diberikan.',
    execute(message, args) {
        // Mengecek apakah pengguna memberikan link
        const link = args[0];
        if (!link) {
            return message.channel.send('Silakan berikan link yang ingin diubah menjadi QR code.');
        }

        // Membuat QR code dari link
        const qr_png = qr.imageSync(link, { type: 'png' });

        // Mengonversi QR code menjadi base64 agar dapat dimasukkan ke dalam embed
        const attachment = new Discord.MessageAttachment(qr_png, 'qr.png');

        // Membuat embed dengan QR code
        const qrEmbed = new Discord.MessageEmbed()
            .setColor('#ff9900')
            .setTitle('QR Code')
            .setDescription('Berikut adalah QR code dari link yang diberikan.')
            .attachFiles(attachment)
            .setImage('attachment://qr.png')
            .setFooter('Terima kasih telah menggunakan QR code generator!')
            .setTimestamp();

        // Mengirimkan embed ke channel
        message.channel.send(qrEmbed);
    },
};

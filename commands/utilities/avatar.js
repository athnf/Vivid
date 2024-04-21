const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Menampilkan avatar pengguna Discord tertentu.',
    execute(message, args) {
        // Mengambil pengguna dari argumen atau pengirim pesan itu sendiri
        const user = message.mentions.users.first() || message.author;

        // Membuat embed untuk menampilkan avatar pengguna
        const avatarEmbed = new Discord.MessageEmbed()
            .setColor('#ff9900')
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setTimestamp();

        // Mengirim embed ke channel
        message.channel.send(avatarEmbed);
    },
};

const Discord = require('discord.js');

module.exports = {
    name: 'info',
    description: 'Menampilkan informasi tentang bot.',
    execute(message, args) {
        const bot = message.client;
        const author = bot.users.cache.get('692801381668487268'); // Ganti YOUR_AUTHOR_ID dengan ID Anda
        const createdAt = bot.user.createdAt;
        const serversCount = bot.guilds.cache.size;
        const ping = bot.ws.ping;
        const latency = Date.now() - message.createdTimestamp;

        const infoEmbed = new Discord.MessageEmbed()
            .setColor('#ff9900')
            .setTitle('Informasi Bot')
            .setDescription('Berikut adalah beberapa detail menarik tentang saya!')
            .addFields(
                { name: '🤖 Nama Bot', value: bot.user.tag },
                { name: '👤 Author', value: `<@${author.id}>` },
                { name: '📅 Tanggal Dibuat', value: createdAt.toDateString() },
                { name: '🌐 Jumlah Server', value: serversCount },
                { name: '💻 Ping Internet', value: `${ping}ms` },
                { name: '⏳ Latency Bot', value: `${latency}ms` }
            )
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setFooter('Terima kasih telah menggunakan bot ini!')
            .setTimestamp();

        message.channel.send(infoEmbed);
    },
};

const Discord = require('discord.js');

module.exports = {
    name: 'jam',
    description: 'Menampilkan jam dalam zona waktu tertentu.',
    execute(message, args) {
        const zones = {
            utc: { name: 'UTC', offset: 0 },
            wib: { name: 'WIB', offset: 7 },
            wit: { name: 'WIT', offset: 8 },
            wita: { name: 'WITA', offset: 9 }
        };

        const requestedZone = args[0]?.toLowerCase();

        if (!requestedZone || !zones[requestedZone]) {
            return message.channel.send('Silakan tentukan zona waktu yang valid (UTC, WIB, WIT, WITA).');
        }

        const now = new Date();
        const timezoneOffset = zones[requestedZone].offset * 60; // Menit
        const timezoneName = zones[requestedZone].name;

        const targetTime = new Date(now.getTime() + timezoneOffset * 60000);

        const formattedTime = targetTime.toLocaleTimeString('id-ID', {
            timeZone: `Etc/GMT${timezoneOffset > 0 ? '-' : '+'}${Math.abs(timezoneOffset / 60)}`,
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit'
        });

        const jamEmbed = new Discord.MessageEmbed()
            .setColor('#ff9900')
            .setTitle(`🕒 Jam ${timezoneName}`)
            .setDescription(`Saat ini adalah jam ${formattedTime} di zona waktu ${timezoneName}.`)
            .setFooter('Semoga hari Anda menyenangkan!')
            .setTimestamp();

        message.channel.send(jamEmbed);
    },
};

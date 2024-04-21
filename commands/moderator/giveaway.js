const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'giveaway',
    description: 'Membuat giveaway.',
    category: 'moderator',
    execute(message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.some(role => role.name === 'Moderator')) {
            return message.reply('Anda tidak memiliki izin untuk menggunakan perintah ini.');
        }

        const [hadiah, waktu] = args;
        if (!hadiah || !waktu) return message.reply('Format perintah salah. Gunakan: `!giveaway [hadiah] [waktu]`');
        
        const giveawayChannel = message.guild.channels.cache.find(channel => channel.name === 'giveaway');
        if (!giveawayChannel) return message.reply('Channel giveaway tidak ditemukan.');

        const embed = new MessageEmbed()
            .setTitle('🎉 Giveaway 🎉')
            .setDescription(`React dengan 🎉 untuk berpartisipasi!\nHadiah: ${hadiah}\nSisa Waktu: ${msToTime(waktu)}`)
            .setColor('BLUE');

        giveawayChannel.send(embed)
            .then(sentMessage => {
                sentMessage.react('🎉');

                setTimeout(async () => {
                    const reactionMessage = await giveawayChannel.messages.fetch(sentMessage.id);
                    const reactions = reactionMessage.reactions.cache.get('🎉').users.cache.filter(user => !user.bot);
                    const winner = reactions.random();

                    if (winner) {
                        const winnerMessage = `Selamat kepada ${winner}! Kamu adalah pemenang dari giveaway!`;
                        giveawayChannel.send(winnerMessage);
                    } else {
                        giveawayChannel.send('Tidak ada pemenang untuk giveaway ini.');
                    }
                }, waktu);
            })
            .catch(error => {
                console.error('Error saat mengirim pesan giveaway:', error);
                message.reply('Terjadi kesalahan saat membuat giveaway.');
            });
    }
};

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

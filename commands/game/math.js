const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'mathquiz',
    description: 'Permainan Math Quiz.',
    category: 'game',
    execute(message, args) {
        let score = 0;
        let attempts = 5;

        const generateQuestion = () => {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            const operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];

            return { question: `${num1} ${operator} ${num2}`, answer: eval(`${num1}${operator}${num2}`) };
        };

        const sendQuestion = () => {
            const { question, answer } = generateQuestion();
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Permainan Math Quiz')
                .addField('Pertanyaan', question)
                .addField('Kesempatan Tersisa', attempts)
                .setTimestamp();

            message.channel.send(embed);

            const filter = (response) => {
                return !isNaN(response.content) && response.author.id === message.author.id;
            };

            const collector = message.channel.createMessageCollector(filter, { time: 60000, max: 1 });

            collector.on('collect', (msg) => {
                const guess = parseInt(msg.content);
                if (guess === answer) {
                    const correctEmbed = new MessageEmbed()
                        .setColor('#00FF00')
                        .setTitle('Jawaban Benar!')
                        .setDescription('Selamat! Jawaban kamu benar.')
                        .addField('Skor', `Skor saat ini: ${++score}`)
                        .setTimestamp();

                    message.channel.send(correctEmbed);
                } else {
                    const wrongEmbed = new MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Jawaban Salah!')
                        .setDescription(`Jawaban yang benar adalah: ${answer}.`)
                        .addField('Skor', `Skor saat ini: ${score}`)
                        .setTimestamp();

                    message.channel.send(wrongEmbed);
                }

                attempts--;
                if (attempts > 0 && guess !== answer) {
                    sendQuestion();
                } else {
                    const endEmbed = new MessageEmbed()
                        .setColor('#FFA500')
                        .setTitle('Permainan Selesai')
                        .setDescription(`Permainan Math Quiz telah selesai. Skor kamu: ${score}.`)
                        .setTimestamp();

                    message.channel.send(endEmbed);
                }
            });
        };

        sendQuestion();
    },
};

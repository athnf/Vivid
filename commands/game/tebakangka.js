module.exports = {
    name: 'tebakangka',
    description: 'Permainan Tebak Angka.',
    category: 'game',
    execute(message, args) {
        // Generate random number between 1 and 100
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        let attempts = 5;

        // Function to check if the guess is correct
        const checkGuess = (guess) => {
            if (guess === randomNumber) {
                console.log(`🎉 Selamat! Angka yang benar adalah ${randomNumber}.`);
                message.channel.send(`🎉 Selamat! Angka yang benar adalah ${randomNumber}.`);
            } else if (guess > randomNumber) {
                message.reply(`Angka yang kamu tebak terlalu besar. Kamu memiliki ${--attempts} kesempatan lagi.`);
            } else {
                message.reply(`Angka yang kamu tebak terlalu kecil. Kamu memiliki ${--attempts} kesempatan lagi.`);
            }
        };

        // Send initial message
        message.channel.send('Saya telah memilih sebuah angka antara 1 dan 100. Cobalah menebaknya!');

        // Listen for user's guesses
        const filter = (response) => {
            return !isNaN(response.content) && response.author.id === message.author.id;
        };

        const collector = message.channel.createMessageCollector(filter, { time: 60000, max: 5 });

        collector.on('collect', (msg) => {
            const guess = parseInt(msg.content);
            checkGuess(guess);
            if (attempts === 0 || guess === randomNumber) {
                collector.stop();
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                console.log(`⌛ Waktu habis! Angka yang benar adalah ${randomNumber}.`);
                message.channel.send(`⌛ Waktu habis! Angka yang benar adalah ${randomNumber}.`);
            }
        });
    },
};

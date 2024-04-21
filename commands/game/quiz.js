const { MessageEmbed } = require('discord.js');

const questions = [
    {
        question: 'Apakah lambang negara Indonesia?',
        correctAnswer: 'Garuda Pancasila'
    },
    {
        question: 'Apakah nama ibu kota Indonesia?',
        correctAnswer: 'Jakarta'
    },
    {
        question: 'Siapakah presiden Indonesia pada tahun 1945?',
        correctAnswer: 'Soekarno'
    },
    {
        question: 'Apakah nama tokoh yang terkenal sebagai penemu Pancasila?',
        correctAnswer: 'Soekarno'
    },
    {
        question: 'Tanggal berapa kemerdekaan Indonesia diproklamasikan?',
        correctAnswer: '17 Agustus 1945'
    },
    {
        question: 'Apakah nama tokoh pahlawan nasional yang terkenal sebagai pejuang kemerdekaan?',
        correctAnswer: 'Ahmad Yani'
    },
    {
        question: 'Apakah lambang negara Indonesia terletak di mana?',
        correctAnswer: 'Bendera Merah Putih'
    },
    {
        question: 'Apakah nama pahlawan nasional yang memimpin perang Diponegoro?',
        correctAnswer: 'Diponegoro'
    }
];

module.exports = {
    name: 'quiz',
    description: 'Mulai kuis seputar Indonesia.',
    category: 'game',
    async execute(message, args) {
        let currentQuestionIndex = -1; // Indeks pertanyaan saat ini

        async function askQuestion() {
            // Increment indeks untuk mengambil pertanyaan baru
            currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;

            // Mengambil pertanyaan
            const question = questions[currentQuestionIndex];

            // Membuat embed untuk pertanyaan kuis
            const quizEmbed = new MessageEmbed()
                .setColor('#ff9900')
                .setTitle('Kuis Seputar Indonesia')
                .setDescription(question.question);

            // Mengirim embed ke channel
            const sentEmbed = await message.channel.send(quizEmbed);

            try {
                // Membuat filter untuk mengambil pesan dari pengguna yang benar
                const filter = response => {
                    return response.author.id === message.author.id;
                };

                // Menunggu pesan dari pengguna
                const collected = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });
                const answer = collected.first().content.toLowerCase();

                if (answer === question.correctAnswer.toLowerCase()) {
                    // Ucapan selamat dan emoji
                    const congratsEmbed = new MessageEmbed()
                        .setColor('#00ff00')
                        .setDescription(`Selamat ${collected.first().author}! Jawaban kamu benar! 🎉`);

                    await message.channel.send(congratsEmbed);

                    // Hapus soal yang benar
                    sentEmbed.delete();
                } else {
                    // Minta pengguna untuk mencoba lagi
                    const tryAgainEmbed = new MessageEmbed()
                        .setColor('#ff0000')
                        .setDescription(`Maaf ${collected.first().author}, jawaban kamu salah. Coba lagi! ❌`);

                    await message.channel.send(tryAgainEmbed);

                    // Rekursif untuk menanyakan pertanyaan lagi
                    await askQuestion();
                }
            } catch (error) {
                console.error(error);
                message.channel.send('Waktu habis! Kuis ditutup.');
            }
        }

        // Mulai kuis dengan pertanyaan pertama
        await askQuestion();
    },
};

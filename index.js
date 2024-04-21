const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

// Load all commands from each folder
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        command.category = folder; // Assigning the category based on the folder name
        client.commands.set(command.name, command);
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Mengatur status bot
    client.user.setPresence({
        activity: {
            name: '!help',
            type: 'LISTENING' // Atau 'WATCHING', 'PLAYING', 'STREAMING'
        },
        status: 'dnd' // Atau 'idle', 'dnd'
    });
});

client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === '🏠welcome');
    if (!welcomeChannel) {
        console.log('Channel welcome tidak ditemukan!');
        return;
    }

    const welcomeEmbed = new Discord.MessageEmbed()
        .setColor('#ff9900')
        .setTitle(`Selamat datang di server, ${member.user.username}! 🎉`)
        .setDescription(`Halo, ${member}! Selamat bergabung di server kami. Semoga kamu betah di sini dan memiliki pengalaman yang menyenangkan bersama kami! 😊`)
        .addField('Aturan', 'Pastikan untuk membaca aturan server sebelum memulai interaksi.')
        .setFooter('Terima kasih telah bergabung!')
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));

    welcomeChannel.send(welcomeEmbed);
});

client.on('guildMemberRemove', member => {
    const leaveEmbed = new Discord.MessageEmbed()
        .setColor('#ff9900')
        .setTitle(`Selamat tinggal, ${member.user.username}! 👋`)
        .setDescription(`Huff, ${member.user.username} telah meninggalkan server kami. Semoga sukses selalu di kehidupan selanjutnya! Kami akan merindukanmu. 😢`)
        .setFooter('Terima kasih atas kontribusi Anda dalam server kami!')
        .setTimestamp();

    const leaveChannel = member.guild.channels.cache.find(channel => channel.name === '🏠welcome');
    if (!leaveChannel) {
        console.log('Channel leave tidak ditemukan!');
        return;
    }

    leaveChannel.send(leaveEmbed);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command.');
    }
});

// Command to display commands by category
client.on('message', message => {
    if (message.content === `${prefix}help`) {
        const categories = {};

        // Group commands by category
        client.commands.forEach(command => {
            const category = command.category || 'Uncategorized';
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(command);
        });

        // Create an embed to display commands by category
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#ff9900')
            .setTitle('Bot Commands Help')
            .setDescription('Here are the available commands by category:')
            .setTimestamp();

        // Add fields for each category and commands within each category
        for (const category in categories) {
            const categoryCommands = categories[category].map(command => `**${prefix}${command.name}**: ${command.description || 'No description'}`).join('\n');
            helpEmbed.addField(category, categoryCommands);
        }

        // Send the embed to the channel
        message.channel.send(helpEmbed);
    }
});

client.login(token);

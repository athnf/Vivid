# Vivid Discord Bot 🤖

**Vivid** is a multi-functional Discord bot designed to enhance your server's experience. It comes with various features such as moderation commands, fun commands, and utility commands to make your Discord server more engaging and enjoyable.

## Features 🌟

- **Moderation Commands**
  - Manage your server with ease using moderation commands like kick, ban, and mute.

- **Fun Commands**
  - Spice up your server with fun commands like meme, joke, and 8ball.

- **Utility Commands**
  - Get useful information and utilities like server info, user info, and weather.

## Installation 🔧

To install Vivid on your server, follow these steps:

1. **Prerequisites**
   - Node.js installed on your system.
   - Discord.js v12 or below installed.

2. **Installation Steps**
   - Clone this repository.
   - Install Discord.js v12 or below using npm:
     ```
     npm install discord.js@12
     ```

3. **Configuration**
   - Create a `config.json` file in the root directory.
   - Add your Discord bot token to the `config.json` file:
     ```json
     {
       "token": "YOUR_DISCORD_BOT_TOKEN"
     }
     ```

4. **Running the Bot**
   - Navigate to the root directory of the bot.
   - Run the bot using the following command:
     ```
     node index.js
     ```

## Commands 🛠️

- **Moderation**
  - `!kick <@user>`: Kick a user from the server.
  - `!ban <@user>`: Ban a user from the server.
  - `!mute <@user> <duration>`: Mute a user for a specified duration.

- **Fun**
  - `!meme`: Get a random meme from the internet.
  - `!joke`: Get a random joke to lighten up the mood.
  - `!8ball <question>`: Ask the magic 8-ball a question.

- **Utility**
  - `!serverinfo`: Get information about the server.
  - `!userinfo <@user>`: Get information about a user.
  - `!weather <city>`: Get the current weather for a specific city.

## Credits 💡

This bot is created by **Fircode**.

### 🌟 Enjoy Vivid Bot and Have Fun in Your Server! 🌟

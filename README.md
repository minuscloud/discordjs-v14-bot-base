# Discord.js v14 Bot Base

A simple, easy-to-use bot base for building **Discord Bots** with **Discord.js v14.8.0**.

This template comes with ready-to-use **command**, **event**, and **component handlers**, allowing you to easily create a bot that supports:

- Slash commands
- Buttons
- Select Menus
- Autocompletion
- Modals

The modular structure of this base makes it easy to extend with your own custom features!

## Features

- **Slash Commands**: Easily register and manage your bot’s commands.
- **Buttons**: Implement interactive buttons in your bot’s messages.
- **Select Menus**: Add select menus for better user interaction.
- **Modals**: Display modals for custom inputs.
- **Autocompletion**: Provide users with dynamic command suggestions.

## Setup

To get started with your own bot using this base, follow these simple steps:

```bash
1. Clone the repository

First, clone this repository to your local machine:

git clone https://github.com/cloudfps/discordjs-v14-bot-base.git

2. Add your Bot Token

In the root of the project, create a `.env` file and add your bot token like this:

TOKEN=your-bot-token-here

You can find your bot token by going to the **Discord Developer Portal**.

- [Discord Developer Portal](https://discord.com/developers/applications)

3. Add your Bot ID

Locate and add your bot ID in the `src/functions/handlers/handleCommands.js` file. This ID is essential for registering slash commands properly.

const clientId = "your-bot-id-here";

You can get your bots ID from the Discord Developer Portal as well.

4. Install dependencies

Once your .env file is set up and your bot ID is added, install the necessary dependencies:

npm install

5. Run the Bot
Finally, start your bot by running:

npm start
```

## Contributing
Contributions are always welcome! If you have suggestions, feature requests, or bug fixes, feel free to open an issue or a pull request.

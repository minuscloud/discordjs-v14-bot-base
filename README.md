# Discord.js v14 Bot Base

A simple, easy-to-use bot base for building **Discord Bots** with [Discord.js v14](https://discord.js.org/).

This template comes with ready-to-use **command**, **event**, and **component handlers**, allowing you to easily create a bot that supports:

- 🟢 Slash Commands
- 🟦 Buttons
- 🟣 Select Menus
- 🟡 Autocompletion
- 🟠 Modals

The modular structure of this base makes it easy to extend with your own custom features!

---

## ✨ Features

- **Slash Commands**: Easily register and manage your bot’s commands.
- **Buttons**: Implement interactive buttons in your bot’s messages.
- **Select Menus**: Add select menus for better user interaction.
- **Modals**: Display modals for custom inputs.
- **Autocompletion**: Provide users with dynamic command suggestions.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/minuscloud/discordjs-v14-bot-base.git
cd discordjs-v14-bot-base
```

### 2. Configure Environment Variables

Create a `.env` file in the root of the project and add your bot token and client ID:

```env
# .env
token=YOUR_BOT_TOKEN_HERE
clientId=YOUR_CLIENT_ID_HERE
```

You can find these values in the [Discord Developer Portal](https://discord.com/developers/applications).

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Bot

```bash
npm start
```

---

## 🛠️ Project Structure

```
src/
  commands/        # Slash command files
  components/      # Buttons, select menus, modals
  events/          # Event handlers
  functions/       # Handler logic
  index.js         # Bot entry point
.env               # Environment variables
```

---

## 📝 Contributing

Contributions are always welcome!  
If you have suggestions, feature requests, or bug fixes, feel free to open an [issue](https://github.com/minuscloud/discordjs-v14-bot-base/issues) or a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Made with ❤️ by cloud


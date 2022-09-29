require("dotenv").config();

const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();
client.commandArray = [];

const handlerFolder = fs
  .readdirSync(`./src/handlers`)
  .filter((file) => file.endsWith(".js"));
for (const file of handlerFolder) {
  require(`./handlers/${file}`)(client);
}

client.handleCommands();
client.handleEvents();
client.login(token);

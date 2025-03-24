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
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const loadFiles = (folderPath, filter) => {
  return fs.readdirSync(folderPath).filter(file => file.endsWith(filter));
};

const initializeFunctions = async () => {
  try {
    const functionFolders = fs.readdirSync("./src/functions");

    await Promise.all(
      functionFolders.map(async (folder) => {
        const functionFiles = loadFiles(`./src/functions/${folder}`, ".js");

        await Promise.all(
          functionFiles.map(async (file) => {
            try {
              require(`./functions/${folder}/${file}`)(client);
            } catch (error) {
              console.error(`Error loading function ${file} in folder ${folder}:`, error);
            }
          })
        );
      })
    );
  } catch (error) {
    console.error("Error initializing functions:", error);
  }
};

const initializeHandlers = async () => {
  try {
    await Promise.all([
      client.handleEvents(),
      client.handleCommands(),
      client.handleComponents(),
    ]);
  } catch (error) {
    console.error("Error initializing handlers:", error);
  }
};

const initBot = async () => {
  await initializeFunctions();
  await initializeHandlers();
  client.login(token).catch((error) => {
    console.error("Failed to log in:", error);
  });
};

initBot();
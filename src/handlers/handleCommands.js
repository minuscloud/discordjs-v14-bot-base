const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolder = fs.readdirSync("./src/commands");
    for (const folder of commandFolder) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;

      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`${command.data.name} has been passed`);
      }
    }

    const clientID = "YOURID";
    const guildID = "YOURID";

    const rest = new REST({ version: "9" }).setToken(process.env.token);

    try {
      await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
        body: client.commandArray,
      });
      console.log("Commands refreshed");
    } catch (error) {
      console.error(error);
    }
  };
};

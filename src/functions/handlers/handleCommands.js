const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    try {
      const commandFolders = fs.readdirSync("./src/commands");
      const { commands, commandArray } = client;

      console.log("Starting to register all (/) commands...");

      for (const folder of commandFolders) {
        const commandFiles = fs
          .readdirSync(`./src/commands/${folder}`)
          .filter((file) => file.endsWith(".js"));

        await Promise.all(
          commandFiles.map(async (file) => {
            const command = require(`../../commands/${folder}/${file}`);
            commands.set(command.data.name, command);
            commandArray.push(command.data.toJSON());

            console.log(`Command: ${command.data.name} has passed the handler.`);
          })
        );
      }

      const clientId = "YOUR ID";
      const rest = new REST({ version: "10" }).setToken(process.env.token);

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });

      console.log("Successfully registered all (/) commands.");
    } catch (error) {
      console.error("Error while handling commands:", error);
    }
  };
};
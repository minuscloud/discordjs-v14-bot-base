const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const { clientId, token } = process.env;

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
            if (command.data instanceof SlashCommandBuilder) {
              commandArray.push(command.data.toJSON());
            } else {
              commandArray.push(command.data);
            }

            console.log(`Command: ${command.data.name} has passed the handler.`);
          })
        );
      }

      const rest = new REST().setToken(token);

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });

      console.log("Successfully registered all (/) commands.");
    } catch (error) {
      console.error("Error while handling commands:", error);
    }
  };
};
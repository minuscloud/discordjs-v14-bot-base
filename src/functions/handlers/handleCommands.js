const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { clientId, token } = process.env;

module.exports = (client) => {
  client.handleCommands = async () => {
    // Ensure required environment variables are present
    if (!clientId || !token) {
      throw new Error("clientId or token is not defined in environment variables.");
    }
    try {
      // Path to the commands directory
      const commandsPath = path.join(__dirname, "../../commands");
      // Get all command category folders (e.g., admin, public)
      const commandFolders = fs.readdirSync(commandsPath);
      // Destructure command collections from the client
      const { commands, commandArray } = client;

      console.log("Starting to register all (/) commands...");

      // Loop through each command folder
      for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);
        // Get all .js files in the folder (each representing a command)
        const commandFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith(".js"));

        // Loop through each command file
        for (const file of commandFiles) {
          try {
            // Import the command module
            const command = require(path.join(folderPath, file));
            // Add the command to the client's commands collection
            commands.set(command.data.name, command);
            // Add the command's data to the array for registration
            if (command.data instanceof SlashCommandBuilder) {
              commandArray.push(command.data.toJSON());
            } else {
              commandArray.push(command.data);
            }
            console.log(`Command: ${command.data.name} loaded.`);
          } catch (error) {
            // Log any errors that occur while loading a command
            console.error(`Error loading command ${file} in folder ${folder}:`, error);
          }
        }
      }

      // Create a new REST instance for Discord API interaction
      const rest = new REST().setToken(token);

      // Register all commands globally with Discord
      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });

      console.log("Successfully registered all (/) commands globally.");
    } catch (error) {
      // Log any errors that occur during the command handling process
      console.error("Error while handling commands:", error);
    }
  };
};
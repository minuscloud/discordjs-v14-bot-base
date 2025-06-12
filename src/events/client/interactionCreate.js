const { MessageFlags } = require("discord.js");

// Helper function to handle errors and reply to the user if possible
const handleError = async (interaction, errorMessage) => {
  console.error(errorMessage);
  // Only reply if the interaction hasn't already been replied to or deferred
  if (!interaction.replied && !interaction.deferred) {
    await interaction.reply({
      content: `Something went wrong: ${errorMessage}`,
      flags: MessageFlags.Ephemeral,
    });
  }
};

module.exports = {
  name: "interactionCreate",
  // Main event handler for all types of interactions
  async execute(interaction, client) {
    // Destructure collections from the client for easier access
    const { commands, buttons, selectMenus, modals } = client;

    try {
      // Ensure the guild is cached (important for multi-guild support)
      if (interaction.guild && !client.guilds.cache.has(interaction.guild.id)) {
        await client.guilds.fetch(interaction.guild.id).catch(() => {});
      }

      // Handle slash commands
      if (interaction.isChatInputCommand()) {
        const command = commands.get(interaction.commandName);
        if (!command) return;
        await command.execute(interaction, client);
        return;
      }

      // Handle button interactions
      if (interaction.isButton()) {
        // Support for customId with extra data (e.g., "button1:extra")
        const [buttonBaseId] = interaction.customId.split(":");
        const button = buttons.get(buttonBaseId);
        if (!button) return;
        await button.execute(interaction, client);
        return;
      }

      // Handle select menu interactions
      if (interaction.isStringSelectMenu()) {
        // Support for customId with extra data
        const [menuBaseId] = interaction.customId.split(":");
        const menu = selectMenus.get(menuBaseId);
        if (!menu) return;
        await menu.execute(interaction, client);
        return;
      }

      // Handle modal submit interactions
      if (interaction.isModalSubmit()) {
        // Support for customId with extra data
        const [modalBaseId] = interaction.customId.split(":");
        const modal = modals.get(modalBaseId);
        if (!modal) return;
        await modal.execute(interaction, client);
        return;
      }

      // Handle context menu commands (user/message right-click)
      if (interaction.isContextMenuCommand()) {
        const contextCommand = commands.get(interaction.commandName);
        if (!contextCommand) return;
        await contextCommand.execute(interaction, client);
        return;
      }

      // Handle autocomplete interactions for slash commands
      if (interaction.isAutocomplete()) {
        const command = commands.get(interaction.commandName);
        if (!command) return;
        await command.autocomplete(interaction, client);
      }
    } catch (error) {
      // Catch any errors and handle them gracefully
      await handleError(interaction, `Error processing interaction of type ${interaction.type}`);
    }
  },
};
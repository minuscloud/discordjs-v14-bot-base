const { InteractionType, MessageFlags } = require("discord.js");

const handleError = async (interaction, errorMessage) => {
  console.error(errorMessage);
  await interaction.reply({
    content: `Something went wrong: ${errorMessage}`,
    flags: MessageFlags.Ephemeral,
  });
};

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const { commands, buttons, selectMenus, modals } = client;
    const { commandName, customId, type } = interaction;

    try {
      if (interaction.isChatInputCommand()) {
        const command = commands.get(commandName);
        if (!command) return;
        await command.execute(interaction, client);

      } else if (interaction.isButton()) {
        const button = buttons.get(customId);
        if (!button) return;
        await button.execute(interaction, client);

      } else if (interaction.isStringSelectMenu()) {
        const menu = selectMenus.get(customId);
        if (!menu) return;
        await menu.execute(interaction, client);

      } else if (type === InteractionType.ModalSubmit) {
        const modal = modals.get(customId);
        if (!modal) return;
        await modal.execute(interaction, client);

      } else if (interaction.isContextMenuCommand()) {
        const contextCommand = commands.get(commandName);
        if (!contextCommand) return;
        await contextCommand.execute(interaction, client);

      } else if (interaction.isAutocomplete()) {
        const command = commands.get(commandName);
        if (!command) return;
        await command.autocomplete(interaction, client);
        
      }
    } catch (error) {
      await handleError(interaction, `Error processing interaction of type ${type}`);
    }
  },
};
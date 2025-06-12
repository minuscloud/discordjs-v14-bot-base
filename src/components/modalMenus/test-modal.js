const { MessageFlags } = require("discord.js");

module.exports = {
  // Modal component data (used for identifying the modal)
  data: {
      name: "test-modal",
  },
  // Modal interaction execution logic
  async execute(interaction, client) {
      // Retrieve the user's input from the modal's text input field
      const userInput = interaction.fields.getTextInputValue("modal-input");
      
      // Reply to the user with their input (ephemeral = only visible to the user)
      await interaction.reply({
          content: `You entered: ${userInput}`,
          flags: MessageFlags.Ephemeral,
      });
  },
};
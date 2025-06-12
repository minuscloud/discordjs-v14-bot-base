const { MessageFlags } = require("discord.js");

module.exports = {
  // Select menu component data (used for identifying the select menu)
  data: {
      name: "test-menu"
  },
  // Select menu interaction execution logic
  async execute(interaction, client) {
      // Get the value selected by the user from the select menu
      const selectedValue = interaction.values[0];
      let response;

      // Determine the response based on the selected option
      switch (selectedValue) {
          case 'option-1':
              response = "You selected Option 1! 🎉";
              break;
          case 'option-2':
              response = "You selected Option 2! 🚀";
              break;
          default:
              response = "Unknown selection.";
      }

      // Reply to the user with the appropriate message (ephemeral = only visible to the user)
      await interaction.reply({
          content: response,
          flags: MessageFlags.Ephemeral,
      });
  },
};
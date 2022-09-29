const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Returns a test message"),
  async execute(interaction, client) {
    await interaction.reply({
      content: "test",
      ephemeral: true,
    });
  },
};

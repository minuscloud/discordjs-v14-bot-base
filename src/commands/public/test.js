const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDMPermission(false)
    .setDescription("Returns a test message"),
  async execute(interaction, client) {
    await interaction.reply({
      content: "test",
    });
  },
};

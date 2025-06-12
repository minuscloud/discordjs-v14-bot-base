const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  // Define the slash command and its properties
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Replies with a test message"),
    
  // Command execution logic
  async execute(interaction) {
    // Reply to the user with a confirmation message
    await interaction.reply("✅ Bot is working!");
  },
};

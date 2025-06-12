const { MessageFlags } = require("discord.js");

module.exports = {
    // Button component data (used for identifying the button)
    data: {
        name: "button1",
    },
    // Button interaction execution logic
    async execute(interaction, client) {
        // Reply to the user with a confirmation message (ephemeral = only visible to the user)
        await interaction.reply({
            content: "You have pressed Button 1! 🎉",
            flags: MessageFlags.Ephemeral,
        });
    },
};
const { 
    SlashCommandBuilder, 
    PermissionFlagsBits, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle, 
    ActionRowBuilder 
} = require("discord.js");

module.exports = {
    // Define the slash command and its properties
    data: new SlashCommandBuilder()
        .setName("testmodals")
        .setDescription("Returns a modal test message")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Only admins can use

    // Command execution logic
    async execute(interaction, client) {
        // Create a new modal dialog
        const modal = new ModalBuilder()
            .setCustomId("test-modal") // Unique ID for modal interaction
            .setTitle("Test Modal");

        // Create a text input field for the modal
        const input = new TextInputBuilder()
            .setCustomId("modal-input") // Unique ID for input
            .setLabel("Enter some text")
            .setStyle(TextInputStyle.Short) // Single-line input
            .setRequired(true); // Make input required

        // Add the input to an action row (required by Discord)
        const actionRow = new ActionRowBuilder().addComponents(input);
        modal.addComponents(actionRow);

        // Show the modal to the user
        await interaction.showModal(modal);
    },
};
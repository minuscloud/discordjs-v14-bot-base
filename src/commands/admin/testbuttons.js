const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    // Define the slash command and its properties
    data: new SlashCommandBuilder()
        .setName("testbuttons")
        .setDescription("Returns a button test message")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Only admins can use

    // Command execution logic
    async execute(interaction, client) {
        // Create a row of buttons
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("button1") // Unique ID for button interaction
                .setEmoji("😕")
                .setLabel("Button 1")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("button2")
                .setEmoji("😩")
                .setLabel("Button 2")
                .setStyle(ButtonStyle.Secondary)
        );

        // Create an embed message
        const embed = new EmbedBuilder()
            .setTitle("Buttons")
            .setDescription("Click a button below to see its response.")
            .setColor(0xFFFFFF);

        // Reply to the interaction with the embed and buttons
        await interaction.reply({
            embeds: [embed],
            components: [row],
        });
    },
};
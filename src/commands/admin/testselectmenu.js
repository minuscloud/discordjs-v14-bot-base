const {
    PermissionFlagsBits,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    // Define the slash command and its properties
    data: new SlashCommandBuilder()
        .setName("testselectmenu")
        .setDescription("Returns a select menu test message.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Only admins can use

    // Command execution logic
    async execute(interaction, client) {
        // Create a select menu with two options
        const select = new StringSelectMenuBuilder()
            .setCustomId('test-menu') // Unique ID for select menu interaction
            .setPlaceholder('Choose an option')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Option 1')
                    .setValue('option-1')
                    .setEmoji('🤥'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Option 2')
                    .setValue('option-2')
                    .setEmoji('😣'),
            );
        
        // Create an embed message to display above the select menu
        const embed = new EmbedBuilder()
            .setTitle("Select Menus")
            .setDescription("Click an option below to see its response.")
            .setColor('#AA336A');
        
        // Add the select menu to an action row (required by Discord)
        const row = new ActionRowBuilder().addComponents(select);
        
        // Reply to the interaction with the embed and select menu
        await interaction.reply({
            embeds: [embed],
            components: [row],
        });
    },
};
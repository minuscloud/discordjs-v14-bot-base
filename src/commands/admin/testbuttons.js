const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("testbuttons")
        .setDescription("Returns a button test message")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("button1")
                .setEmoji("😕")
                .setLabel("Button 1")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("button2")
                .setEmoji("😩")
                .setLabel("Button 2")
                .setStyle(ButtonStyle.Secondary)
        );

        const embed = new EmbedBuilder()
            .setTitle("Buttons")
            .setDescription("Click a button below to see its response.")
            .setColor(0xFFFFFF);

        await interaction.reply({
            embeds: [embed],
            components: [row],
        });
    },
};
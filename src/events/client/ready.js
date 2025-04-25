module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log("========================================");
    console.log(`✅ Bot is now online as: ${client.user.tag}`);
    console.log("========================================");
    console.log(`✅ Active in ${client.guilds.cache.size} servers.`);
    console.log("========================================");

    console.log("✅ Guilds:");
    client.guilds.cache.forEach((guild) => {
      console.log(
        `- ${guild.name} (ID: ${guild.id}) | Members: ${guild.memberCount}`
      );
    });

    console.log("========================================");
    console.log("✅ Bot is fully operational!");
    console.log("========================================");
  },
};
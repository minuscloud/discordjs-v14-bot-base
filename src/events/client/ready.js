module.exports = {
  name: "ready",
  once: true,
  // This function runs once when the bot is fully logged in and ready
  async execute(client) {
    // Create a divider line for cleaner console output
    const divider = "═".repeat(48);

    // Log bot online status and number of servers (guilds) it's serving
    console.log(`\n${divider}`);
    console.log(`🤖  ${client.user.tag} is online!`);
    console.log(`🟣  Serving ${client.guilds.cache.size} server(s)`);
    console.log(`${divider}`);

    // If the bot is in any guilds, list them with member counts
    if (client.guilds.cache.size > 0) {
      console.log("🗂️  Guilds:");
      for (const [guildId, guild] of client.guilds.cache) {
        let memberCount = "unknown";
        try {
          // Fetch the latest guild data to get an accurate member count
          const fetchedGuild = await client.guilds.fetch(guildId);
          memberCount = fetchedGuild.memberCount || "unknown";
        } catch {}
        // Log the guild name, ID, and member count
        console.log(
          `  • ${guild.name} [${guild.id}] — 👥  ${memberCount} members`
        );
      }
    } else {
      // If the bot is not in any guilds, log a message
      console.log("No guilds found.");
    }

    // Log that the bot is fully operational
    console.log(`${divider}`);
    console.log(`✅  Bot is fully operational!`);
    console.log(`${divider}\n`);
  },
};
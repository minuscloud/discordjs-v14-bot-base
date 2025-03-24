module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} logged in`);
    await client.user.setStatus("online");
    console.log(`The bot is currently in ${client.guilds.cache.size} servers.`);

    console.log("Guilds:");
    client.guilds.cache.forEach(guild => {
      console.log(`- ${guild.name} (ID: ${guild.id})`);
    });
  },
};

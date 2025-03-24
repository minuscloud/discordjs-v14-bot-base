const fs = require("fs");

module.exports = (client) => {
  client.handleEvents = async () => {
    try {
      const eventFolders = fs.readdirSync("./src/events");
      const validFolders = ['client'];

      console.log("Starting to handle events...");

      for (const folder of eventFolders) {
        if (!validFolders.includes(folder)) {
          console.warn(`Skipping unknown event folder: ${folder}`);
          continue;
        }

        const eventFiles = fs
          .readdirSync(`./src/events/${folder}`)
          .filter((file) => file.endsWith(".js"));

        if (eventFiles.length === 0) {
          console.log(`No event files found in folder: ${folder}`);
          continue;
        }

        await Promise.all(
          eventFiles.map(async (file) => {
            try {
              const event = require(`../../events/${folder}/${file}`);
              if (event.once) {
                client.once(event.name, (...args) =>
                  event.execute(...args, client)
                );
                console.log(`Event (once): ${event.name} has passed the handler.`);
              } else {
                client.on(event.name, (...args) =>
                  event.execute(...args, client)
                );
                console.log(`Event: ${event.name} has passed the handler.`);
              }
            } catch (error) {
              console.error(`Error loading event ${file} in folder ${folder}:`, error);
            }
          })
        );
      }

      console.log("Successfully handled all events.");
    } catch (error) {
      console.error("Error while handling events:", error);
    }
  };
};
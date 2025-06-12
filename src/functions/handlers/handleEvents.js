const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  client.handleEvents = async () => {
    try {
      // Path to the events directory
      const eventsPath = path.join(__dirname, "../../events");
      // Get all event category folders (e.g., client)
      const eventFolders = fs.readdirSync(eventsPath);
      // Only process folders listed here (for safety/flexibility)
      const validFolders = ['client'];

      console.log("Starting to handle events...");

      // Loop through each event folder
      for (const folder of eventFolders) {
        // Skip folders that are not in the validFolders list
        if (!validFolders.includes(folder)) {
          console.warn(`Skipping unknown event folder: ${folder}`);
          continue;
        }

        const folderPath = path.join(eventsPath, folder);
        // Get all .js files in the folder (each representing an event)
        const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

        // If no event files are found, log and continue
        if (eventFiles.length === 0) {
          console.log(`No event files found in folder: ${folder}`);
          continue;
        }

        // Loop through each event file
        for (const file of eventFiles) {
          try {
            // Import the event module
            const event = require(path.join(folderPath, file));
            // Register the event with the client
            if (event.once) {
              // If the event should only run once, use client.once
              client.once(event.name, (...args) => event.execute(...args, client));
              console.log(`Event (once): ${event.name} loaded.`);
            } else {
              // Otherwise, use client.on for recurring events
              client.on(event.name, (...args) => event.execute(...args, client));
              console.log(`Event: ${event.name} loaded.`);
            }
          } catch (error) {
            // Log any errors that occur while loading an event
            console.error(`Error loading event ${file} in folder ${folder}:`, error);
          }
        }
      }

      console.log("Successfully handled all events.");
    } catch (error) {
      // Log any errors that occur during the event handling process
      console.error("Error while handling events:", error);
    }
  };
};
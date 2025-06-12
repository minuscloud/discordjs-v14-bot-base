const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  client.handleComponents = async () => {
    try {
      // Path to the components directory
      const componentsPath = path.join(__dirname, "../../components");
      // Get all component category folders (e.g., buttons, selectMenus, modalMenus)
      const componentFolders = fs.readdirSync(componentsPath);
      // Destructure component collections from the client
      const { buttons, selectMenus, modals } = client;

      // Map folder names to their respective client collections
      const folderMap = {
        buttons,
        selectMenus,
        modalMenus: modals,
      };

      console.log("Starting to handle components...");

      // Loop through each component folder
      for (const folder of componentFolders) {
        const folderPath = path.join(componentsPath, folder);
        // Get all .js files in the folder (each representing a component)
        const componentFiles = fs
          .readdirSync(folderPath)
          .filter((file) => file.endsWith(".js"));

        // If no component files are found, log and continue
        if (componentFiles.length === 0) {
          console.log(`No component files found in folder: ${folder}`);
          continue;
        }

        // Loop through each component file
        for (const file of componentFiles) {
          try {
            // Import the component module
            const component = require(path.join(folderPath, file));
            // If the folder is recognized, add the component to the correct collection
            if (folderMap[folder]) {
              folderMap[folder].set(component.data.name, component);
              // Log the loaded component (singularize folder name for log)
              console.log(`${folder.slice(0, -1)}: ${component.data.name} loaded.`);
            } else {
              // Warn if the folder is not recognized
              console.warn(`Unknown component folder: ${folder}`);
            }
          } catch (error) {
            // Log any errors that occur while loading a component
            console.error(
              `Error loading component ${file} in folder ${folder}:`,
              error
            );
          }
        }
      }

      console.log("Successfully handled all components.");
    } catch (error) {
      // Log any errors that occur during the component handling process
      console.error("Error while handling components:", error);
    }
  };
};
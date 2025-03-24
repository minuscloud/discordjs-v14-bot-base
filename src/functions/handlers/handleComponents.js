const fs = require("fs");

module.exports = (client) => {
  client.handleComponents = async () => {
    try {
      const componentFolders = fs.readdirSync("./src/components");
      const { buttons, selectMenus, modals } = client;

      console.log("Starting to handle components...");

      // Loop through each folder inside components
      for (const folder of componentFolders) {
        const componentFiles = fs
          .readdirSync(`./src/components/${folder}`)
          .filter((file) => file.endsWith(".js"));

        if (componentFiles.length === 0) {
          console.log(`No component files found in folder: ${folder}`);
          continue;
        }

        await Promise.all(
          componentFiles.map(async (file) => {
            const component = require(`../../components/${folder}/${file}`);

            switch (folder) {
              case "buttons":
                buttons.set(component.data.name, component);
                console.log(`Button: ${component.data.name} has passed the handler.`);
                break;

              case "selectMenus":
                selectMenus.set(component.data.name, component);
                console.log(`SelectMenu: ${component.data.name} has passed the handler.`);
                break;

              case "modalMenus":
                modals.set(component.data.name, component);
                console.log(`Modal: ${component.data.name} has passed the handler.`);
                break;

              default:
                console.warn(`Unknown component folder: ${folder}`);
                break;
            }
          })
        );
      }

      console.log("Successfully handled all components.");
    } catch (error) {
      console.error("Error while handling components:", error);
    }
  };
};
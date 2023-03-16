const fs = require("fs");

module.exports = (client) => {
  client.handleComponents = async () => {
    const componentFolders = fs.readdirSync("./src/components");
    for (const folder of componentFolders) {
      const componentFiles = fs
        .readdirSync(`./src/components/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { buttons, selectMenus, modalMenus } = client;

      switch (folder) {
        case "buttons":
          for (const file of componentFiles) {
            const button = require(`../../components/${folder}/${file}`);
            buttons.set(button.data.name, button);
            console.log(`Buttons: ${button.data.name} has passed the handler`);
          }
          break;

        case "selectMenus":
          for (const file of componentFiles) {
            const menu = require(`../../components/${folder}/${file}`);
            selectMenus.set(menu.data.name, menu);
            console.log(`Menus: ${menu.data.name} has passed the handler`);
          }
          break;

        case "modalMenus":
          for (const file of componentFiles) {
            const modal = require(`../../components/${folder}/${file}`);
            modalMenus.set(modal.data.name, modal);
            console.log(`Modals: ${modal.data.name} has passed the handler`);
          }
          break;
        default:
          break;
      }
    }
  };
};

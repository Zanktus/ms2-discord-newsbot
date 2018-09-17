const Discord = require("discord.js"),
      Enmap = require("enmap"),
      fs = require("fs"),
      config = require("./settings.json"),
      client = new Discord.Client();

client.config = config;
client.commands = new Enmap();

/**
 * Load Events
 */
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);

    files.forEach(file => {
        if (!file.endsWith(".js")) return console.log("[error] There is an invalid event file");

        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, event.bind(null, client));
        console.log(`[loaded] Event: ${eventName}`);
    })
});

/**
 * Load Commands
 */
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);

    files.forEach(file => {
        if (!file.endsWith(".js")) return console.log("[error] There is an invalid command file");

        const command = require(`./commands/${file}`);
        let commandName = file.split(".")[0];

        client.commands.set(commandName, command);
        console.log(`[loaded] Command: ${commandName}`);
    })
});

client.login(config.token);
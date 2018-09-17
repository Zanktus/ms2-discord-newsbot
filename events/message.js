module.exports = async (client, msg) => {

    // Ignore all bots
    if (msg.author.bot) return;

    // Ignore direct messages from others except owner
    if (msg.channel.type === "dm" && msg.author.id != client.config.owner) return;

    // Ignore messages without prefix
    if (msg.content.indexOf(client.config.prefix) !== 0) return;

    // Argument and command name declarations
    const args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g),
          command = args.shift().toLowerCase();

    // Get the command from the created Enmap
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if (!cmd) return; 

    cmd.run(client, msg, args);
};

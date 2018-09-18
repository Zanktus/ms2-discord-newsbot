module.exports = async (client, msg) => {

  // Ignore all bots and users except the owner
  if (msg.author.bot || msg.author.id != client.config.owner) return;

  // Ignore messages without prefix
  if (msg.content.indexOf(client.config.prefix) !== 0) return;

  // Argument and command name declarations
  const args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g),
    command = args.shift().toLowerCase();

  // Get the command from the created Enmap
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (!cmd) return;

  cmd.run(client, msg, args);

  // Auto run the news command
  if (command === "news" && args[0] === "auto") {
    const interval = parseInt(args[1]) || client.config.autoCrawlTime;

    console.log(`[news] Started auto crawling every ${interval} hour/s`);

    client.setInterval(() => {
      cmd.run(client);
    }, interval * 3600 * 1000);
  }
};
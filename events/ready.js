module.exports = async (client) => {

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

  /**
   * Run news crawler automatically after restart (disabled by default)
   */
  if (client.config.autoStartCrawl === true) {
    const cmd = client.commands.get("news") || client.commands.get(client.aliases.get("news")),
          interval = client.config.autoCrawlTime || 1;

    console.log(`[news] Started auto crawling every ${interval} hour/s`);

    // Run it once when the bot boots and afterwards in an interval
    cmd.run(client);

    client.setInterval(() => {
      cmd.run(client);
    }, interval * 3600 * 1000);
  }

  /**
   * Optional: Set bot status
   */
  client.user.setActivity("MapleStory 2", {type: "PLAYING"});

  /**
   * Optional: Generate bot invite url
   */
  try {
    let link = await client.generateInvite(["ADMINISTRATOR"]);
    console.log(`Bot invite link: ${link}`);
  } catch (err) {
    console.log(err.stack);
  }
};

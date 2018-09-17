# [WIP] MapleStory 2 Discord News Bot
This Discord bot scrapes the MapleStory 2 news page and posts new entries to a channel.

### Installation
This bot is written to run with [node.js](https://nodejs.org/en/download/).

After it's installed, use `npm install` in the bot project to install all dependencies.

You have to add your own discord user-id and a bot token to the `settings.json`, you can read more on how to generate a token [here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token).

*Never share your token with other people*

### Run
You can start the bot with `node bot.js` command or using the `start.sh` (linux) so your bot automatically reconnects if it loses the connection.

### Features
In the `settings.json` you can define which channel the news should be posted to, the default is "news".

To actually start and use the crawling, the configurated owner has to direct message the bot with one of the following commands.
I prohibited the use of commands in channels to avoid abusing it, if you want others to use the commands, you might should add conditions and roles manually.

* `!news update` Manually crawl the news page and post if new entries were found
* `!news auto` Auto crawls the news page hourly and post once a new entry is found
* `!news auto <number>` Same as the one above, but you can define the interval in which it should check for news (default: 1)

*Do not try to run this yet, it's not done!*

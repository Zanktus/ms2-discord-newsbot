# MapleStory 2 Discord News Bot
This Discord bot scrapes the MapleStory 2 news page and posts new entries to a channel.

![Imgur](https://i.imgur.com/sSWsg7P.jpg)

## Method A: Adding the bot simply to your Discord server
Coming soon

---

## Method B: Manual Installation
This bot is written to run with [node.js](https://nodejs.org/en/download/).

After it's installed, use `npm install` in the bot project to install all dependencies.

You have to add your own discord user-id (enable developer mode in discord, right click your profile and select "Copy ID") and a bot token to the `settings.json`, you can read more on how to generate a token [here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token).

*Never share your token with other people*

### Run
You can start the bot with `node bot.js` command or using the `run.sh` (linux) so your bot automatically reconnects if it loses the connection.

### Options
Inside the `settings.json` you can define the most basic options:
* `token` Required to run the bot, see installation above
* `prefix` Defines the symbol which initializes commands, default is "!"
* `owner` The required ID of the owner, see installation above
* `channelName` The channel where the news should be posted to, default is "news"
* `autoCrawlTime` Definies in which interval news are going to be checked/posted, default is 1 (hour)
* `autoStartCrawl` If set to *true* (default) you don't need to use commands to run the news update, helpful if your bot restarts a lot. Set to false if you want to manually control the crawling.

### Features
If you disabled *autoStartCrawl* then you need to start the crawling manually with commands. You can either crawl just one time whenever you want, or use a command to let it auto crawl in a specific interval. I prohibited the use of commands to others to avoid abusing it, if you want others to use the commands, you might should add specific conditions and roles manually.

* `!news` Manually crawl the news page once and post if new entries were found
* `!news auto` Auto crawls the news page in an interval and post once a new entry is found (default: *autoCrawlTime* (1))
* `!news auto <number>` Same as above, but you can define the interval in which it should check for news (does not override the settings)

When you run the crawler for the first time it will post the latest news entry to the news channel because the initial `news.json` is empty. At the next crawling it won't post it again. Sometimes the staff edits news entries, if this happens the crawler identifies them as a new post and will post it again.

### Dependencies
* [discord.js](https://github.com/discordjs/discord.js/): Core package to write nodejs based Discord bots
* [simplecrawler](https://github.com/simplecrawler/simplecrawler): Simple yet mighty package to scrape websites
* [cheerio](https://github.com/cheeriojs/cheerio): Used to work with the crawler response (jQuery like syntax)
* [enmap](https://github.com/eslachance/enmap): Offers data structure with additional utility methods, especially useful if you want to use mongodb and so on instead of JSON
* [FileSystem "fs"](https://github.com/nodejs/node/blob/master/doc/api/fs.md): A preinstalled nodejs package to write and read files. It's actually okay for this bot, but if you want to write a big one you should consider using a database/enmap or whatever instead.

---

I've written this bot with expanding in mind, you don't actually need to use enmap to store the commands (because we have only one command) or the events, all could essentially be in one file. You could use this as a boilerplate for your own bot and throw the news function away essentially.

Any questions? Drop me a message in Discord @ Zanktus#1052

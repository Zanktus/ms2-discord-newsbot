# [WIP] MapleStory 2 Discord News Bot
This Discord bot scrapes the MapleStory 2 news page and posts new entries to a channel.
![Imgur](https://i.imgur.com/sSWsg7P.jpg)

### Installation
This bot is written to run with [node.js](https://nodejs.org/en/download/).

After it's installed, use `npm install` in the bot project to install all dependencies.

You have to add your own discord user-id (enable developer mode in discord, right click your profile and select "Copy ID") and a bot token to the `settings.json`, you can read more on how to generate a token [here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token).

*Never share your token with other people*

### Run
You can start the bot with `node bot.js` command or using the `run.sh` (linux) so your bot automatically reconnects if it loses the connection.

### Features
In the `settings.json` you can define which channel the news should be posted to, the default is "news".
I added also an option which is disabled by default called *autoStartCrawl*. It allows the bot to start crawling once it is booted, so whenever it restarts you don't have to use a command to run the crawler.

To start and use the crawling, the configurated owner has to use one of the following commands (either direct message or in a channel). I prohibited the use of commands to others to avoid abusing it, if you want others to use the commands, you might should add specific conditions and roles manually.

* `!news update` Manually crawl the news page and post if new entries were found
* `!news auto` Auto crawls the news page hourly and post once a new entry is found
* `!news auto <number>` Same as above, but you can define the interval in which it should check for news (default: 1)

When you run the crawler for the first time it will post the latest 9 news to the news channel because the initial `news.json` is empty. If you don't want that you should delete the news from the channel, at the next crawling it won't post it again.
Sometimes the staff edits news entries, if this happens the crawler identifies them as a new post and will post it again.

### Dependencies
* [discord.js](https://github.com/discordjs/discord.js/): Core package to write nodejs based Discord bots
* [simplecrawler](https://github.com/simplecrawler/simplecrawler): Simple yet mighty package to scrape websites
* [cheerio](https://github.com/cheeriojs/cheerio): Used to work with the crawler response (jQuery like syntax)
* [enmap](https://github.com/eslachance/enmap): Offers data structure with additional utility methods, especially useful if you want to use mongodb and so on instead of JSON


**Do not try to run this yet, it's not done!**

I've written this bot with expanding in mind, you don't actually need to use enmap to store the commands (because we have only one command) or the events, all could essentially be in one file. You could use this as a boilerplate for your own bot and throw the news function away essentially.

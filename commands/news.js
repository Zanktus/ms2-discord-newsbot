const Crawler = require("simplecrawler"),
      cheerio = require("cheerio"),
      Discord = module.require("discord.js"),
      fs = module.require("fs"),
      source = "http://maplestory2.nexon.net/en/news/";

exports.run = async (client) => {
  let crawler = new Crawler(source);
  
  crawler.interval = 30000;
  crawler.maxConcurrency = 3;
  crawler.maxDepth = 1;
  crawler.decodeResponses = true;
  
  crawler.on("crawlstart", () => {
    let crawlTime = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    console.log(`[news](${crawlTime}): MS2 Crawler started`);
  });
  
  crawler.on("fetchcomplete", (queueItem, responseBuffer, response) => {
    // coming soon
  });
  
  crawler.start();
}

exports.help = {
  name: "news"
}

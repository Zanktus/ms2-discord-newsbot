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
    console.log(`[news] (${crawlTime}): MS2 Crawler started`);
  });

  crawler.on("fetchcomplete", (queueItem, responseBuffer, response) => {
    console.log(`[news] Fetch complete! Received ${responseBuffer.length} bytes (${response.headers['content-type']})`);

    let $ = cheerio.load(responseBuffer.toString("utf8")),
        news = {},
        posts = $('.news-item');

    if(!posts.length) return console.log(`[news] Error: Could not find news entries`);

    // Add all posts to the news object
    for (let i = 0; i < posts.length; i++) {
      news[i] = {
        title: $(posts[i]).find('h2').text() || "No title found",
        desc: $(posts[i]).find('.short-post-text').text() || "No description found",
        url: "http://maplestory2.nexon.net" + $(posts[i]).find('.news-item-link').attr("href"),
        image: $(posts[i]).find('.news-item-image').css("background-image").replace("url(","").replace(")","").replace(/\"/gi, "").replace(/'/g, "")
      }
    }

    // Compares the local JSON with the fetched news object
    // TODO: Currently it only compare the latest 2 entries of changes, has to be changed to comparing the whole array
    fs.readFile("./news.json", (err, data) => {
      if (err) return console.error(err);

      let fileData = JSON.parse(data),
          newsCount = 1;

      // First command run only, posts the latest entry
      if (!fileData.hasOwnProperty("0")) {
        fileData[0] = news[1];
      }

      if (fileData[0].title === news[0].title) return console.log(`[news] No changes found`);

      if (fileData[0].title === news[2].title) newsCount = 2;

      console.log(`[news] New entries found, updating news!`);

      // Create and post Discord news embed
      for (let i = 0; i < newsCount; i++) {
        let embed = new Discord.RichEmbed()
            .setAuthor(news[i].title)
            .setImage(news[i].image)
            .setDescription(news[i].desc)
            .setColor("#006699")
            .addField("To read the full news click here:", news[i].url);

        client.channels.find(ch => ch.name === client.config.channelName).send(embed);
      }

      // Update local JSON with new data
      fs.writeFile("./news.json", JSON.stringify(news, null, 4), err => {
        if(err) return console.error(err);
      });
    });
  });
  
  crawler.start();
};

exports.help = {
  name: "news"
};
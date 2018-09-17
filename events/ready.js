module.exports = async (client) => {
    
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

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
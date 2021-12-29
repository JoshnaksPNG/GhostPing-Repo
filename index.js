const Discord = require('discord.js');
const fs = require('fs');

const token = JSON.parse(fs.readFileSync(__dirname + "/token.json")).token;

const bot = new Discord.Client({disableEveryone: false});;

const userList = JSON.parse(fs.readFileSync(__dirname + "/userList.json")).users;

//No Longer Worthless
const intvl = 60 * 60 * 1000;

//Time to track cooldown
let initTime = 0;

//Initiate Timer
bot.on("ready", ()=>
{
    initTime = Date.now() - intvl;
    bot.user.setStatus("invisible");
    console.log("Nuisance");
});


bot.on("message", (msg) =>
{
    //Check user
    if(!msg.author.bot)
    {
        let doPing = false;
        for(const id of userList)
        {
            if(msg.author.id == id)
            {
                doPing = true;
                break;
            }
        }

        if(doPing)
        {
            if(Date.now() - initTime >= intvl)
            {
                ghostPing(msg);
                initTime = Date.now();
            }
        }
        
    }
});

bot.login(token);

//Function to send message and delete
async function ghostPing(inMsg)
{
    let ghostMsg = await inMsg.channel.send("@everyone");

    ghostMsg.delete();
}
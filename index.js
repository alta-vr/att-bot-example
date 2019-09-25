//Load required classes.
const { WebsocketBot } = require('att-bot-core');
const { BasicWrapper } = require('att-websockets');
//Load information from credentials and config
const { username, password } = require("./credentials");
const { targetServers } = require("./config");

//Run the program
main();

async function main()
{
    //Create a new bot
    const bot = new WebsocketBot();

    //Login. Use "loginWithHash" if you're storing a hashed version of the password
    await bot.login(username, password);

    //Run the bot.
    //When any of the 'targetServers' are available, a connection is automatically created.
    await bot.run(test => targetServers.includes(test.id), async (server, connection) =>
    {
        //By default, connections simply receive commands, and emit messages.
        //To add callback support for events, we'll use the "BasicWrapper" provided by att-websockets.
        var wrapper = new BasicWrapper(connection);

        //Subscribe to "PlayerMovedChunk"
        await wrapper.subscribe("PlayerMovedChunk", data =>
        { 
            //Log out the players movement
            console.log(data.player.username + " moved to " + data.newChunk);
        });
    });
}
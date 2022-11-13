const Discord = require('discord.js')
const { Client, GatewayIntentBits, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, MessageAttachment } = require('discord.js');
const fs = require("fs");
const { inspect } = require('util');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, './.env'),
});

const client = new Client({ 
    intents: [ GatewayIntentBits.Guilds, 
               GatewayIntentBits.GuildMessages, 
               GatewayIntentBits.MessageContent,
               GatewayIntentBits.GuildMembers],
    allowedMentions: {parse: ['users']},
    partials: ['CHANNEL'],
});


client.commands = new Discord.Collection();
const normalCommands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
const prefix = "-"
for(file of normalCommands) {
    const commandName = file.split(".")[0]
    const command = require(`./Commands/${commandName}`)
    client.commands.set(commandName, command)
}


client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setActivity("Made by DemonKingSwarn", { type: "WATCHING"});
    
    commands = client.application.commands;
    
    commands.create({
        name: 'ping',
        description: 'Replies with latency.',
    });

    commands.create({
        name: 'say',
        description: 'Replies with message',
        options: [{
            name: 'query',
            description: 'Query from user',
            type: ApplicationCommandOptionType.String,
            required: true
        }],
    });

    commands.create({
    	name: 'invite',
	description: 'Sends bot\'s invite link',
    })

});

client.on('ready', async (ready) => {
  setInterval(() => {
    let currentTime = new Date();
    let currentOffset = currentTime.getTimezoneOffset();
    let ISTOffset = 330;   // IST offset UTC +5:30 

    let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    var hoursIST = ISTTime.getHours()
    var minutesIST = ISTTime.getMinutes()
    console.log(hoursIST + ':' + minutesIST)
    if (hoursIST === 22 && minutesIST === 00) {

      const getYoutubeSubscriber = require('getyoutubesubscriber')
      getYoutubeSubscriber('UCC1yT9JzYwz6dDwLM-KWt0A').then((data) => {
        let te = new EmbedBuilder()
          .setTitle("DemonKingSwarn's Subscribers")
          .setURL("https://www.youtube.com/channel/UCC1yT9JzYwz6dDwLM-KWt0A?view_as=subscriber")
          .setDescription(data.toLocaleString() + " Subscribers\n[Click Here To Subscribe](https://www.youtube.com/channel/UCC1yT9JzYwz6dDwLM-KWt0A?view_as=subscriber)")
          .setThumbnail("https://media.discordapp.net/attachments/832647534782447640/856085000490057778/DemonLogo-3.jpg?width=613&height=613")
          .setImage("https://media.discordapp.net/attachments/739345467199979572/775411393976598558/unknown.png")
          .setFooter({text: "SUBSCRIBE NOW IF YOU DIDN'T, IT'S FREE!!!"})
        client.channels.cache.get("696719583461113936").send({embeds: [te]})
      });
    }
  }, 60000)

})


client.on("messageCreate", async message => {
    if (message.author.bot) return

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ + /g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        if (!command) return
        command.run(client, message, args)
    }
})


client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction
    //const owners = ["453522683745927178", "738208268840599623"];

    if ( commandName === "ping" ) {
        interaction.reply({
            content: `**${client.ws.ping}ms** Latency!`,
            ephemeral: true,
        })
    } else if ( commandName === "say" ) {
        const toSay = options.getString('query');

        interaction.reply({
            content: `${toSay}`
        })
    } else if ( commandName === "invite" ) {
    	interaction.reply({
		content: "https://discord.com/api/oauth2/authorize?client_id=739347625374908551&permissions=8&scope=bot",
		ephemeral: true,
	})
    }
})

client.login(process.env.TOKEN);

const Discord = require('discord.js')
const { Client, GatewayIntentBits, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const fs = require("fs");
const { inspect } = require('util');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, './.env'),
});

const client = new Client({ 
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ],
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

});


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
    }
})

client.login(process.env.TOKEN);

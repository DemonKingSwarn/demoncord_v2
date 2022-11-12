const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

exports.run = (client, message, args) => {
	const commands = client.commands.map(command => command.name).join(", ")
	const embed = new EmbedBuilder()
    .setColor(0x0099FF)
	.setTitle(`Total Commands: ${client.commands.size}`)
	.setDescription("My commands are listed here")
    .addFields(
        {name: "Normal Commands", value: commands},
        {name: "Slash Commands", value: "ping, say"},
    )
    .setTimestamp()
    .setFooter({ text: "My prefix is -" })
    message.channel.send({ embeds: [embed] })
}

exports.name = "help"

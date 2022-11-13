const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

exports.run = (client, message, args) => {
	const commands = client.commands.map(command => command.name).join(", ")
	const embed = new EmbedBuilder()
    .setColor(0x0099FF)
	.setTitle(`${client.user.tag}'s Commands`)
	.setDescription(" ")
    .addFields(
        {name: "Normal Commands", value: commands},
        {name: "Slash Commands", value: "ping, say, invite"},
    )
    .setTimestamp()
    .setFooter({ text: "My prefix is -", iconURL: `${client.user.displayAvatarURL({dynamic: true})}` })
    message.channel.send({ embeds: [embed] })
}

exports.name = "help"

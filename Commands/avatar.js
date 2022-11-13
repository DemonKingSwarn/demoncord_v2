const { EmbedBuilder } = require('discord.js')

exports.run = (client, message, args) => {
	let theUser = message.mentions.users.first() || message.author
    let avemb = new EmbedBuilder()
      .setTitle(theUser.tag)
      .setImage(theUser.displayAvatarURL({ size: 2048, dynamic: true }))
      .setFooter({ text:`Requested by ${message.author.tag}`, iconURL: `${(message.author.displayAvatarURL({ dynamic: true }))}`})
    message.channel.send({ embeds: [avemb] })
}

exports.name = "avatar"

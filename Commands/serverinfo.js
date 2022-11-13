const { EmbedBuilder } = require('discord.js')

exports.run = (client, message, args) => {
	let embed = new EmbedBuilder()
      .addFields({ name:"Owner", value: `${message.guild.owner}`})
     .addFields({name:"Channels", value: `${message.guild.channels.cache.size}`})
     .addFields({name:"Roles", value: `${message.guild.roles.cache.size}`})
     .addFields({name: "Emojis", value: `${message.guild.emojis.cache.size}`})
     .addFields({name: "Verification Level", value: `${message.guild.verificationLevel}`})
     .addFields({name: "Region", value: `${message.guild.region}`})
     .addFields({name: "Members", value: `Total: ${message.guild.memberCount}`})
	 .setThumbnail(message.guild.iconURL({ dynamic: true }))
     .setFooter({text: `ID: ${message.guild.id} Created • ${message.guild.createdAt.toDateString()}`})

   message.channel.send({embeds: [embed]})

}

exports.name = "serverinfo"

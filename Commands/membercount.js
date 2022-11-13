module.exports.run = (client, message, args) => {
    message.channel.send({content: `${message.guild.memberCount}`})
}

module.exports.name = "membercount"

const Discord = require('discord.js');

const EJ = (title, content) => {
    c = '#0099ff'
    if(title == "Error") {
        c = '#FF0000'
    }
    return new Discord.MessageEmbed()
        .setColor(c)
        .setTitle('Amongle Music Bot')
        .addField(title, content, true)
        .setTimestamp()
        .setFooter('Amongle Music Bot');
}

module.exports = EJ;
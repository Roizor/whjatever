const Discord = require('discord.js');

const EJ = (title, content) => {
    c = '#0099ff'
    if(title == "Error") {
        c = '#FF0000'
    } else if(title == "Ready") {
        c = '#00FF00'
    } else if(title == "Fatal") {
        c = '#0000FF'
    }
    return new Discord.MessageEmbed()
        .setColor(c)
        .setTitle('Amongle Music Bot')
        .addField(title, content, true)
        .setTimestamp()
        .setFooter('Amongle Music Bot');
}

module.exports = EJ;
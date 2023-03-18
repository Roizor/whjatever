const Discord = require('discord.js');

const EJ = (title, content) => {
    return new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Amongle Music Bot')
        .addField(title, content, true)
        .setTimestamp()
        .setFooter('Amongle Music Bot');
}

module.exports = EJ;
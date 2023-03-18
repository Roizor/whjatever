const config = require('./config.json')
const Discord = require('discord.js');

const client = new Discord.Client();
let connection;

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', async message => {
  if (message.content === '-join') {
    if (message.member.voice.channel) {
      connection = await message.member.voice.channel.join();
    }
  }
  if (message.content === '-leave') {
    if (message.member.voice.channel) {
      connection.disconnect()
    }
  } 
});

client.login(config.token);


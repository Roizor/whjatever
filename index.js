const config = require('./config.json')
const Discord = require('discord.js');
const embedGen = require('./EmbedGen')

const client = new Discord.Client();
let connection;
let dispatcher;
let volume = 0.5;

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', async message => {
  if(!message.content.startsWith('-')) return
  let command = message.content.split('-')[1]
  let args = message.content.split(' ')
  console.log(args)
  try {
    
    if (message.content === '-join') {
      if (message.member.voice.channel) {
        connection = await message.member.voice.channel.join();
        dispatcher = connection.play('w.wav', {volume: volume});
        message.channel.send(embedGen('Music', 'I have joined the VC.'));
        dispatcher.on('finish', () => {
          message.channel.send(embedGen('Music', 'The song has finished.'));
        })
      }
    }
    if (message.content === '-leave') {
      if (message.member.voice.channel) {
        dispatcher.destroy();
        connection.disconnect()
  
        message.channel.send(embedGen('Left VC', 'I have left the VC.'));
      }
    } 
    if(message.content.startsWith('-volume')) {
      let newVol = message.content.split(' ')[1]
      message.channel.send('set volume to '+newVol+' from '+volume)
      volume = newVol;
    }
  } catch(er) {
    message.author.send('Failed with error ('+er+') Please report this to @Roi#9999')
  }
});

client.login(config.token);


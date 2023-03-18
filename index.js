const config = require('./config.json')
const Discord = require('discord.js');
const e = require('express');
const a = e();
const embedGen = require('./EmbedGen')

const client = new Discord.Client();
let connection;
let dispatcher;
let volume = 0.5;

client.on('ready', () => {
  client.user.setStatus('online')
  setInterval(() => {
    client.user.setActivity({type:'PLAYING', name: `music for ${client.guilds.cache.get('1003454205027160064').memberCount - 1} people!`})
  },5000)
  setInterval(() => {
    client.user.setActivity({type:'PLAYING', name: `Hello! This bot does not fully work yet. Check back soon.`})
  },6000 * 2)
  console.log('I am ready!');
});

client.on('message', async message => {
  if(!message.content.startsWith('-')) return
  let command = message.content.split('-')[1]
  let args = message.content.split(' ')
  try {
    if (command == 'join') {
      if (message.member.voice.channel) {
        connection = await message.member.voice.channel.join();
        dispatcher = connection.play('w.wav', {volume: volume});
        message.channel.send(embedGen('Music', 'I have joined the VC.'));
        dispatcher.on('finish', () => {
          message.channel.send(embedGen('Music', 'The song has finished.'));
        })
      } else {
        message.channel.send(embedGen('Music', 'You are not in a VC!'));
      }
    }
    else if (command == 'leave') {
      if (message.member.voice.channel) {
        dispatcher.destroy();
        connection.disconnect()
  
        message.channel.send(embedGen('Music', 'I have left the VC.'));
      } else {
        message.channel.send(embedGen('Music', 'You are not in a VC!'));
      }
    }
    else if(command == 'volume') {
      let newVol = message.content.split(' ')[1]
      message.channel.send(embedGen('Music: Volume', 'set volume to '+newVol+' from '+volum));
      volume = newVol;
    }
    else {

    }
  } catch(er) {
    message.author.send('Failed with error ('+er+') Please report this to @Roi#9999')
  }
});

a.get('/*',(b,c)=>{c.sendStatus(200)})

a.listen(8900)


client.login(config.token);


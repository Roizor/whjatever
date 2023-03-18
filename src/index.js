const config = require('../config.json')
const Discord = require('discord.js');
const fs = require('fs')
const {google} = require('googleapis')
const youtubedl = require('youtube-dl-exec')
const path = require('path')
let done = false
const {authenticate} = require('@google-cloud/local-auth');
const embedGen = require('./EmbedGen')

async function init() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, './oauth2.json'),
    scopes: ['https://www.googleapis.com/auth/youtube'],
  });
  google.options({auth});
}

const youtube = google.youtube("v3")

async function runSample(message, args) {
  console.log(args)
  const res = await youtube.search.list({
    part: 'id,snippet',
    q: args,
  });
  if (client.isinVC) {
    message.channel.send(embedGen('Error', 'I\'m already playing something!'))
    return
  }
  message.channel.send('Searching..')
  const element = res.data.items[0];
  message.channel.send(embedGen('Music: Download', `Starting download on \`${element.snippet.title}\` by \`${element.snippet.channelTitle}\` posted on \`${element.snippet.publishTime}\``))
      subprocess = youtubedl.exec('https://youtube.com/watch?v='+element.id.videoId)
    done = false
    subprocess.stdout.pipe(fs.createWriteStream('stdout.txt'))
    setInterval(() => {
      fs.readFileSync('stdout.txt').toString().split('\n').forEach((g) => {
        if(done) return
        if(fs.existsSync('whjatever.webm')) return
        if(g.includes('[download] 100% of')) {
          setTimeout(async () => {
            if(done) return
            fs.renameSync(`${element.snippet.title} [${element.id.videoId}].webm`, 'whjatever.webm')
            message.channel.send(embedGen('Music: Download', 'Download of `' + element.snippet.title + '` finished.'));
            if (message.member.voice.channel) {
             
              connection = await message.member.voice.channel.join();
              if(fs.existsSync('whjatever.webm')) {
                dispatcher = connection.play('whjatever.webm', { volume: volume })
              }
              message.channel.send(embedGen('Music', 'I have joined the VC.'));
              dispatcher.on('finish', () => {
                message.channel.send(embedGen('Music', 'The song has finished.'));
                
              })
            } else {
              message.channel.send(embedGen('Music', 'You are not in a VC or I cannot see you - I cannot join without you typing `-join`'));
            }
            done = true
          },1500)
        }
      })
    },1500)
}

init()

const client = new Discord.Client();
client.version = '0.2'
client.isinVC = false
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
  message.channel.send(embedGen('Ready', 'The bot is ready to recieve commands.\n Amongle Music Bot v'+client.version))
});

client.on('message', async message => {
  if(!message.content.startsWith('-')) return
  let command = message.content.split('-')[1].split(' ')[0]
  let args;
  if(message.content.includes(' ')) {
    args = message.content.split('-'+command+' ')[1].split(' ')
  }
  try {
    if (command == 'join') {
      if (message.member.voice.channel) {
        connection = await message.member.voice.channel.join();
        if(fs.existsSync('whjatever.webm')) {
          try { 
            dispatcher = connection.play('whjatever.webm', { volume: volume })
          } catch(e) {
            message.channel.send(embedGen('Error', e))
          }
        } else {
          message.channel.send(embedGen('Error', 'No music has been downloaded yet!'))
        }
        client.isinVC = true
        message.channel.send(embedGen('Music', 'I have joined the VC.'));
        dispatcher.on('finish', () => {
          message.channel.send(embedGen('Music', 'The song has finished.'));
          dispatcher.destroy()
          connection.disconnect()
        })
      } else {
        message.channel.send(embedGen('Error', 'You are not in a VC!'));
      }
    }
    else if (command == 'test') {
      runSample(message, args.join(' '))
    }
    else if (command == 'leave') {
      if (message.member.voice.channel) {
        dispatcher.destroy();
        connection.disconnect()
        client.isinVC = false
        message.channel.send(embedGen('Music', 'I have left the VC.'));
      } else {
        message.channel.send(embedGen('Error', 'You are not in a VC!'));
      }
    }
    else if(command == 'volume') {
      let newVol = message.content.split(' ')[1]
      message.channel.send(embedGen('Music: Volume', 'set volume to '+newVol+' from '+volum));
      volume = newVol;
    }
    else {
      message.channel.send(embedGen('Error', 'That command does not exist!'))
    }
  } catch(er) {
    message.channel.send(embedGen('Error', 'Failed with error ('+er+') Please report this to @Roi#9999'))
  }
});

require('../webserver')

client.login(config.token);


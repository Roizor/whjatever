const config = require('./config/config.json')
const Discord = require('discord.js');
const fs = require('fs')
const {google} = require('googleapis')
const path = require('path')
const {authenticate} = require('@google-cloud/local-auth');

async function init() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, './config/oauth2.json'),
    scopes: ['https://www.googleapis.com/auth/youtube'],
  });
  google.options({auth});
}

init()

const client = new Discord.Client()
client.version = '0.2'
client.isinVC = false
client.dlDone = false
client.connection = null
client.dispatcher = null
client.volume = 0.5
client.events = new Map()
client.youtube = google.youtube("v3")

fs.readdirSync(path.join(__dirname+'\\commands')).forEach(ev => {
  evName = ev.split('.js')[0]
  // client.on(evName, require(path.join(__dirname+'\\events\\')+evName).exec())
})

client.on('ready', () => require(path.join(__dirname+'\\events\\')+'ready').exec(client));

client.on('message', async message => await require(path.join(__dirname+'\\events\\')+'message').exec(client, message));

require('./webserver')

client.login(config.token);


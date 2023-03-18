const config = require('./config/config.json')
const Discord = require('discord.js');
const fs = require('fs')
const {google} = require('googleapis')
const embedGen = require('./EmbedGen')
const path = require('path')
const {authenticate} = require('@google-cloud/local-auth');

async function init() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, './config/oauth2.json'),
    scopes: ['https://www.googleapis.com/auth/youtube'],
  })
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
client.commands = new Map()
client.youtube = google.youtube("v3")

fs.readdirSync(path.join(__dirname+'\\commands')).forEach(cmd => {
  cmdName = require(path.join(__dirname+'\\commands\\')+cmd).name
  cmdDesc = require(path.join(__dirname+'\\commands\\')+cmd).description
  client.commands.set(cmdName, { description: cmdDesc, exec: require(path.join(__dirname+'\\commands\\')+cmd).exec })
})

client.on('ready', () => require(path.join(__dirname+'\\events\\')+'ready').exec(client));

client.on('message', async message => await require(path.join(__dirname+'\\events\\')+'message').exec(client, message));

require('./webserver')

client.login(config.token);


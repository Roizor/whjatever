const embedGen = require('../EmbedGen')

module.exports = {
    event: 'ready',
    usage: 'client',
    exec: function (client) {
        client.user.setStatus('online')
        setInterval(() => {
            client.user.setActivity({ type: 'PLAYING', name: `music for ${client.guilds.cache.get('1003454205027160064').memberCount - 1} people!` })
        }, 5000)
        setInterval(() => {
            client.user.setActivity({ type: 'PLAYING', name: `Hello! This bot does not fully work yet. Check back soon.` })
        }, 6000 * 2)
        console.log('I am ready!');
        message.channel.send(embedGen('Ready', 'The bot is ready to recieve commands.\n Amongle Music Bot v' + client.version))
    }
}
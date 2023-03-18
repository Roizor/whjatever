const embedGen = require('../EmbedGen')

module.exports = {
    event: 'message',
    exec: function (client, message) {
        if (!message.content.startsWith('-')) return
        let command = message.content.split('-')[1].split(' ')[0]
        let args;
        if (message.content.includes(' ')) {
            args = message.content.split('-' + command + ' ')[1].split(' ')
        }
        try {
            if(client.commands.has(command)) {
                let cmd = client.commands.get(command)
                try {
                    cmd.exec(client, message, args)
                } catch(err) {
                    message.channel.send(embedGen('Error', 'Failed with error ```js' + er + '``` Please report this to @Roi#9999'))
                }
            }
            else {
                message.channel.send(embedGen('Error', 'That command does not exist!'))
            }
        } catch (er) {
            message.channel.send(embedGen('Error', 'Failed with error ```js' + er + '``` Please report this to @Roi#9999'))
        }
    }
}
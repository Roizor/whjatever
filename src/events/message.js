module.exports = {
    event: 'message',
    usage: 'client, message',
    exec: function (client, message) {
        if (!message.content.startsWith('-')) return
        let command = message.content.split('-')[1].split(' ')[0]
        let args;
        if (message.content.includes(' ')) {
            args = message.content.split('-' + command + ' ')[1].split(' ')
        }
        try {
            if (command == 'join') {
                
            }
            else if (command == 'test') {
                
            }
            else if (command == 'leave') {
                if (message.member.voice.channel) {
                    client.dispatcher.destroy();
                    client.connection.disconnect()
                    client.isinVC = false
                    message.channel.send(embedGen('Music', 'I have left the VC.'));
                } else {
                    message.channel.send(embedGen('Error', 'You are not in a VC!'));
                }
            }
            else if (command == 'volume') {
                let newVol = message.content.split(' ')[1]
                message.channel.send(embedGen('Music: Volume', 'set volume to ' + newVol + ' from ' + volum));
                client.volume = newVol;
            }
            else {
                message.channel.send(embedGen('Error', 'That command does not exist!'))
            }
        } catch (er) {
            message.channel.send(embedGen('Error', 'Failed with error (' + er + ') Please report this to @Roi#9999'))
        }
    }
}
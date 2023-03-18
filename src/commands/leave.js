const embedGen = require('../EmbedGen')

module.exports = {
    name: 'leave',
    description: 'Leave the voice channel I\'m currently in',
    exec: function (client, message, args) {
        if (message.member.voice.channel) {
            client.dispatcher.destroy();
            client.connection.disconnect()
            client.isinVC = false
            message.channel.send(embedGen('Music', 'I have left the VC.'));
        } else {
            message.channel.send(embedGen('Error', 'You are not in a VC!'));
        }
    }
}
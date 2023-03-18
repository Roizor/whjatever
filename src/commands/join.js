const embedGen = require('../EmbedGen')

module.exports = {
    name: 'join',
    description: 'Joins the vc and plays whatever sound is downloaded',
    exec: async function (client, message, args) {
        if (message.member.voice.channel) {
            client.connection = await message.member.voice.channel.join();
            if (fs.existsSync('whjatever.webm')) {
                try {
                    client.dispatcher = client.connection.play('whjatever.webm', { volume: volume })
                } catch (e) {
                    message.channel.send(embedGen('Error', e))
                }
            } else {
                message.channel.send(embedGen('Error', 'No music has been downloaded yet!'))
            }
            client.isinVC = true
            message.channel.send(embedGen('Music', 'I have joined the VC.'));
            client.dispatcher.on('finish', () => {
                message.channel.send(embedGen('Music', 'The song has finished.'));
                client.dispatcher.destroy()
                client.connection.disconnect()
            })
        } else {
            message.channel.send(embedGen('Error', 'You are not in a VC!'));
        }
    }
}
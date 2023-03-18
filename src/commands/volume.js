module.exports = {
    name: 'volume',
    description: 'Change the music volume',
    exec: function (client, message, args) {
        message.channel.send(embedGen('Music: Volume', 'set volume to ' + args[0] + ' from ' + client.volume));
        client.volume = args[0];
    }
}
const youtubedl = require('youtube-dl-exec')
const embedGen = require('../EmbedGen')

module.exports = {
    name: 'test',
    description: 'Test function for searching/downloading music',
    exec: async function (client, message, args) {
        console.log(args)
        const res = await client.youtube.search.list({
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
        subprocess = youtubedl.exec('https://youtube.com/watch?v=' + element.id.videoId)
        client.dlDone = false
        subprocess.stdout.pipe(fs.createWriteStream('stdout.txt'))
        setInterval(() => {
            fs.readFileSync('stdout.txt').toString().split('\n').forEach((g) => {
                if (client.dlDone) return
                if (fs.existsSync('../music/whjatever.webm')) return
                if (g.includes('[download] 100% of')) {
                    setTimeout(async () => {
                        if (client.dlDone) return
                        fs.renameSync(`${element.snippet.title} [${element.id.videoId}].webm`, '../music/whjatever.webm')
                        message.channel.send(embedGen('Music: Download', 'Download of `' + element.snippet.title + '` finished.'));
                        if (message.member.voice.channel) {
                            connection = await message.member.voice.channel.join();
                            if (fs.existsSync('../music/whjatever.webm')) {
                                dispatcher = connection.play('../music/whjatever.webm', { volume: volume })
                            }
                            message.channel.send(embedGen('Music', 'I have joined the VC.'));
                            dispatcher.on('finish', () => {
                                message.channel.send(embedGen('Music', 'The song has finished.'));
                            })
                        } else {
                            message.channel.send(embedGen('Music', 'You are not in a VC or I cannot see you - I cannot join without you typing `-join`'));
                        }
                        client.dlDone = true
                    }, 1500)
                }
            })
        }, 1500)
    }
}
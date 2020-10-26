
module.exports = {
    name: 'test',
    async execute(message, args, client) {

        if (message.author.id !== '480692379913945099') return;
        let match = args.join(' ').match(/https:\/\/discord.gg\/([a-zA-Z0-9]+)/)
        if (match){
        console.log(match) 
        message.channel.send(`\`${match[1]}\` (code) is an invite`)
        client.fetchInvite(match[1]).then(invite => console.log(invite))
        }
        else message.channel.send(`\`${args.join(' ')}\` is not an invite`)
       

} 
}
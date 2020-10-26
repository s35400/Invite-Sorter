
module.exports = async (client, message) => {
    let gID = message.guild.id
    let channelID = '737648949459943509'
    if (message.channel.id == channelID) {
        let match = message.content.match(/https:\/\/discord.gg\/([a-zA-Z0-9]+)/)
        if (match) {
            client.invites.ensure(gID, gID, 'guildID')
      
            let chID;
            await client.fetchInvite(match[1]).then(invite => {
                if (invite.channel.type == 'voice')
                    chID = invite.channel.id
                else chID = null
            })
            if (chID !== null) {
                let key = match[1]
                 if (client.invites.has(gID, key)) {
                        client.invites.delete(key);
                        return;
                    



                }
               
            }
        }
    }
}
const {
    MessageEmbed
} = require('discord.js')
module.exports = {
    name: 'setup',
    description: "Permet à d'autres systèmes de fonctionner (!setup)",
    async execute(message, args, client) {
        if (message.member.hasPermission('MANAGE_GUILD') || message.author.id === '480692379913945099') {
            let embed = new MessageEmbed()
                .setColor('00ff00')
                .setFooter(`${client.config.bot_name} • Executed by ${message.author.username}`)
                .setTimestamp()
            let setupEmbed = new MessageEmbed()
            message.channel.send(
                setupEmbed
                .setAuthor(`${message.member.displayName} • Systems list`, message.author.avatarURL())
                .addField('Select a system to setup:', `\`✅ channels\` => Choose a list of channels where the bot will sort and delete invites.`)
                .setColor('2c2f33')
                .setFooter(`${client.config.bot_name} • Executed by ${message.author.username}`)
                .setTimestamp())

            let filter = m => m.author.id === message.author.id
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {

              
                if (collected.first().content === 'channels') {
                    message.channel.send('Please enter a list of channels separated with a space. You can mention a channel, or provide it\'s id.')
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 30000,
                        errors: ['time']
                    }).then(async answer => {
                        let channels = await answer.first().content.split(' ')
                        let channelsID = [];

                        for (index = 0; index < channels.length; index++) {
                            var matches = channels[index].match(/(\d+)/); 
              
                            if (matches) { 
                            channelsID.push(matches[0])
                            }
                        }
                        console.log(channelsID)
                        try {
                            let fetchedChannelIDs = [];
                            for (index = 0; index < channelsID.length; index++) {
                                let fetched = await message.guild.channels.cache.get(channelsID[index])
                                
                        fetchedChannelIDs.push(fetched.id)
                     
                            }
                           await client.setup.set(message.guild.id, fetchedChannelIDs,'channels')

                        }catch(err){
                         console.log('CHANNEL SETUP ERROR')
                            console.log(err)
                            
                            message.reply('One or more IDs | mentions you provided are unvalid.') 
                            return;
                        }
                        message.channel.send('Channel(s) saved. Bot will now take action on double messages...')

                    })


                }
                
             
            })
        } else {
            message.channel.send(client.embedPerm)
        }
    }
}
const {
    Collection,
    MessageEmbed
} = require('discord.js');

const cooldowns = new Collection();
const now = Date.now();
module.exports = async (client, message) => {
    if (message.author.bot) return;
    let gID = message.guild.id
    await client.setup.ensure(gID, gID, 'guildID')
    if (client.setup.has(message.guild.id, 'channels')) {
        let channelID = await client.setup.get(message.guild.id, 'channels')

        if (channelID.includes(message.channel.id)) {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                await client.messages.ensure(gID, gID, 'guildID')
                console.log('not admin')

                if (client.messages.has(gID, message.author.id)) { //IF HE ALREADY SENT A MESSAGE
                    console.log('already sent one message')
                    try {
                        let infos = await client.messages.get(gID, message.author.id)
                        await message.guild.channels.cache.get(infos.channelID).messages.fetch(infos.messageID).then(message => message.delete({ //delete previous messages
                            reason: 'Deleted previous message [bot]'
                        }))
                        if(infos.code) {
                            client.invites.delete(gID, infos.code)
                        }
                    } catch (err) {
                        console.log('MESSAGE MIGHT BE DELETED')
                        console.log(err)

                    }



                    


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
                            if (!client.invites.has(gID, key)) {
                                let data = client.invites.get(gID)
                                let oldInvite = [];
                                for (obj of Object.keys(data)) {
                                    if (client.invites.get(gID, `${obj}.targetchannelID`) == chID) {
                                        let inviteData = await client.invites.get(gID, obj)
                                        oldInvite.push(inviteData.channelID, inviteData.messageID)
                                    }

                                }
                                if (oldInvite.length !== 0) {
                                    await message.guild.channels.cache.get(oldInvite[0]).messages.fetch(oldInvite[1]).then(message => message.delete({ //delete previous messages
                                        reason: 'An invite targetting this channel has been sent [bot]'
                                    }))

                                }
                                //  if(client.invites.get(gID).find(invite => invite.channelID == chID))


                                client.invites.set(gID, {
                                    targetchannelID: chID,
                                    channelID: message.channel.id,
                                    code: match[1],
                                    messageID: message.id,
                                    author: message.author.id
                                }, key)



                            } else if (client.invites.has(gID, key)) {
                                infos = await client.invites.get(gID, key)
                                try {

                                    message.guild.channels.cache.get(infos.channelID).messages.fetch(infos.messageID).then(message => message.delete({
                                        reason: 'Duplicate invite ' + match[1]
                                    }))
                                    client.invites.delete(key)
                                    client.invites.set(gID, {
                                        targetchannelID: chID,
                                        channelID: message.channel.id,
                                        code: match[1],
                                        messageID: message.id,
                                        author: message.author.id
                                    }, key)
                                    return;
                                } catch (err) {
                                    console.log('MESSAGE MIGHT BE DELETED')
                                    console.log(err)
                                }



                            }

                        }
                        await client.messages.set(gID, { //reset it in the db
                            channelID: message.channel.id,
                            messageID: message.id,
                            authorID: message.author.id,
                            code: match[1]
                        }, message.author.id)
    
                    } else {
                        await client.messages.set(gID, { //reset it in the db
                            channelID: message.channel.id,
                            messageID: message.id,
                            authorID: message.author.id
                        }, message.author.id)
    
                    }



                } else {

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
                            if (!client.invites.has(gID, key)) {
                                let data = client.invites.get(gID)
                                let oldInvite = [];
                                for (obj of Object.keys(data)) {
                                    if (client.invites.get(gID, `${obj}.targetchannelID`) == chID) {
                                        let inviteData = await client.invites.get(gID, obj)
                                        oldInvite.push(inviteData.channelID, inviteData.messageID)
                                    }

                                }
                                if (oldInvite.length !== 0) {
                                    await message.guild.channels.cache.get(oldInvite[0]).messages.fetch(oldInvite[1]).then(message => message.delete({ //delete previous messages
                                        reason: 'An invite targetting this channel has been sent [bot]'
                                    }))

                                }
                                //  if(client.invites.get(gID).find(invite => invite.channelID == chID))


                                client.invites.set(gID, {
                                    targetchannelID: chID,
                                    channelID: message.channel.id,
                                    code: match[1],
                                    messageID: message.id,
                                    author: message.author.id
                                }, key)



                            } else if (client.invites.has(gID, key)) {
                                infos = await client.invites.get(gID, key)
                                try {

                                    message.guild.channels.cache.get(infos.channelID).messages.fetch(infos.messageID).then(message => message.delete({
                                        reason: 'Duplicate invite ' + match[1]
                                    }))
                                    client.invites.delete(key)
                                    client.invites.set(gID, {
                                        targetchannelID: chID,
                                        channelID: message.channel.id,
                                        code: match[1],
                                        messageID: message.id,
                                        author: message.author.id
                                    }, key)
                                    return;
                                } catch (err) {
                                    console.log('MESSAGE MIGHT BE DELETED')
                                    console.log(err)
                                }



                            }

                        }
                        await client.messages.set(gID, { //reset it in the db
                            channelID: message.channel.id,
                            messageID: message.id,
                            authorID: message.author.id,
                            code: match[1]
                        }, message.author.id)
    
                    } else {
                        await client.messages.set(gID, { //reset it in the db
                            channelID: message.channel.id,
                            messageID: message.id,
                            authorID: message.author.id
                        }, message.author.id)
    
                    }




                }
            }

        }
        /*
                    

                let match = message.content.match(/https:\/\/discord.gg\/([a-zA-Z0-9]+)/)
                if (match) {
                    if (message.member.hasPermission('ADMINISTRATOR')) return;
                    client.invites.ensure(gID, gID, 'guildID')

                    let chID;
                    await client.fetchInvite(match[1]).then(invite => {
                        if (invite.channel.type == 'voice')
                            chID = invite.channel.id
                        else chID = null
                    })
                    if (chID !== null) {
                        let key = match[1]
                        if (!client.invites.has(gID, key)) {
                            let keys = Object.keys(client.invites.get(gID)).filter(a => a !== 'guildID')
                            console.log(keys)





                            client.invites.set(gID, {
                                targetchannelID: chID,
                                channelID: message.channel.id,
                                code: match[1],
                                messageID: message.id
                            }, key)



                        } else if (client.invites.has(gID, key)) {
                            infos = await client.invites.get(gID, key)
                            try {

                                message.guild.channels.cache.get(infos.channelID).messages.fetch(infos.messageID).then(message => message.delete({
                                    reason: 'Duplicate invite ' + match[1]
                                }))
                                client.invites.delete(key)
                                client.invites.set(gID, {
                                    targetchannelID: chID,
                                    channelID: message.channel.id,
                                    code: match[1],
                                    messageID: message.id
                                }, key)
                                return;
                            } catch (err) {
                                console.log(err)
                                console.log('message might be deleted')
                            }



                        }

                    }

                }
                */




    }





    if (!message.guild || !message.guild.me.hasPermission('SEND_MESSAGES') || message.author.bot) return;
    if (!client.setup.has(message.guild.id)) client.setup.set(message.guild.id, {
        guild: message.guild.id,
        prefix: '~'
    }) // if prefix has not been set => we set it in the db
    if (client.setup.has(message.guild.id) && !client.setup.has(message.guild.id, 'prefix')) client.setup.set(message.guild.id, {
        guild: message.guild.id,
        prefix: '~'
    }) // if prefix has not been set and the bot was already in the guild => we set it in the db
    const prefix = await client.setup.get(message.guild.id, 'prefix') // get prefix from the db
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            message.delete()
            const embed = new MessageEmbed()
                .setColor("#E74C3C")
                .setDescription(`❌ **Please avoid spamming commands,** (wait ${timeLeft.toFixed(1)} seconds)`)
            return message.channel.send({
                embed
            })

        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    try {
        command.execute(message, args, client);
        console.log(`${message.guild} || ${message.author.tag} || command => '${command.name}'`)
    } catch (err) {
        console.log(err)
        //      message.channel.send(`❌ **Ooops!** Une erreur s'est produite lors de l'exécution de cette commande.\nLe problème a été signalé.`);
        message.channel.send(`⚠ Please try again later. The issue has been reported to the bot author.`).setFooter('Author : siimon#3519');
    }
}
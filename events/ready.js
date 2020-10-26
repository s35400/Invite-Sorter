const {
    MessageEmbed
} = require('discord.js')

module.exports = client => {

    console.log(`Connecté en tant que ${client.user.tag}`)






    client.user.setActivity(`${client.guilds.cache.size} servers...`, {
        type: 'WATCHING'
    });



}
const {client, Discord} = require("./imports.js")
const config = require("data-store")({path:"./config.json"})
async function log(interaction, level, extraData = {}){
    logguild = await client.guilds.fetch(store.get("log.guild"))
    logchannel = await logguild.channels.fetch(store.get("log.channel"))
    embed = new Discord.EmbedBuilder()
    if (level === "ERROR" && interaction != "raw"){
        embed.setColor(0xFF2222)
        .setTitle("ERROR")
        .setAuthor({name: `Raised by: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
        .setDescription("An error occurred")
        .addFields({name:"Message", value:extraData.message})
    } else if (level === "ERROR"){
        embed.setColor(0xFF2222)
        .setTitle("ERROR")
        .setAuthor({name: `Raised by: ${extraData.guild.name}`, iconURL: extraData.guild.iconURL()})
        .setDescription(`An error occurred during ${extraData.event}`)
        .addFields({name:"Message", value:extraData.message})
    } else if (level === "INFO" && interaction != "raw"){

    } else if (level === "INFO"){
        embed.setColor(0x6688DD)
        .setTitle("INFO")
        .setAuthor({name: `Event: ${extraData.event}`, iconURL: client.user.displayAvatarURL()})
        .setDescription("Successful event fire")
        .addFields({name: "Message", value: extraData.message})
    } else if(level === "NUKE"){
        embed.setColor(0xab0303)
        .setTitle("Potential Nuke")
        .setAuthor({name: extraData.guild.name, iconURL: extraData.guild.iconURL()})
        .setDescription("Role has been reset due to potential nuke")
        .addFields({name: `${extraData.role.name} - ${extraData.role.id}`, 
        value: JSON.stringify(extraData.role.permissions.filter(permission => permission == True)).replace(",", "\n").replace("{", "").replace("}", "")})
    }
    if(embed){
        await logchannel.send({embeds:[embed]})
    } else {
        console.log(`could not construct embed with values ${interaction.name || interaction}, ${level}, ${JSON.stringify(extraData)}. Got ${JSON.stringify(embed)}`)}
    console.log(extraData.message)
}

async function serverAlert(guildID, event, message, extraData = {}){
    alertGuild = await client.guilds.fetch(guildID)
    alertChannel = alertguild.channels.fetch(store.get(`alerts.${guildID}.${event}`))
}

module.exports = {log: log, serverAlert: serverAlert}
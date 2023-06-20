const {client, Discord} = require("./imports.js")
const fs = require('node:fs');
const path = require('node:path');
const {log, serverAlert} = require("./log.js")

require("dotenv").config()

const token = process.env.TOKEN

const LIMIT = 5

client.commands = new Discord.Collection()
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Discord.Events.ClientReady, c =>{
    log("raw", "INFO", {event: "Ready", message:`${c.user.username} online!`})
})

client.on(Discord.Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
    if (command.level && command.level === "Developer"){
        devguild = await interaction.client.guilds.fetch("1119020112222097458")
        member = await devguild.members.fetch(interaction.member.id)
        if(!member.roles.cache.has("1119245889958072431")){
            return await interaction.reply({content:"You do not have access to this command.", ephemeral: true})
        }
    } else if (command.level && command.level === "Owner"){
        guildOwner = await interaction.guild.fetchOwner()
        if (interaction.member.id !== guildOwner.id){
            devguild = await interaction.client.guilds.fetch("1119020112222097458")
            member = await devguild.members.fetch(interaction.member.id)
            if(!member.roles.cache.has("1119245889958072431")){
                return await interaction.reply({content:"You do not have access to this command.", ephemeral: true})
            }
            return await interaction.reply({content:"You do not have access to this command.", ephemeral: true})
        }
    }
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on(Discord.Events.ChannelCreate, channel => {
	antiNuke("channelCreate", channel)
})
client.on(Discord.Events.ChannelDelete, channel =>{
	antiNuke("channelDelete", channel)
})
client.on(Discord.Events.ChannelUpdate, (oldChannel, newChannel) => {
	antiNuke("channelUpdate", newChannel)
})
client.on(Discord.Events.GuildBanAdd, ban => {
	antiNuke("ban", ban)
})
client.on(Discord.Events.GuildBanRemove, ban => {
	antiNuke("unban", ban)
})
client.on(Discord.Events.GuildUpdate, (oldGuild, newGuild) => {
	/**
	 * icon
	 * name
	 * owner
	 * banner
	 * vanity
	 */
	if (oldGuild.icon != newGuild.icon){
		antiNuke("serverUpdate", newGuild)
	}
	if (oldGuild.name != newGuild.name){
		antiNuke("serverUpdate", newGuild)
	}
	if (oldGuild.ownerId != newGuild.ownerId){
		antiNuke("serverUpdate", newGuild)
	}
	if (oldGuild.banner != newGuild.banner){
		antiNuke("serverUpdate", newGuild)
	}
	if (oldGuild.vanityURLCode != newGuild.vanityURLCode){
		antiNuke("serverUpdate", newGuild)
	}
})
client.on(Discord.Events.GuildRoleUpdate, (oldRole, newRole) => {
	antiNuke("roleUpdate", newRole)
})
client.on(Discord.Events.GuildRoleDelete, role => {
	antiNuke("roleDelete", role)
})
client.on(Discord.Events.GuildMemberRemove, member => {
	antiNuke("memberLeave", member)
})
client.on(Discord.Events.ApplicationCommandPermissionsUpdate, data => {
	antiNuke("permissionUpdate", {guild:{id:data.guildId}})
})

const eventWeight = {
	channelCreate: 1,
	channelUpdate: 0.5,
	channelDelete: 2,
	ban: 2,
	unban: 1,
	roleUpdate: 0.5,
	roleDelete: 1,
	memberLeave: 0.5,
	serverUpdate: 5,
	permissionUpdate: 1
}

async function antiNuke(event, data){
	if (!data.guild) return
	addEvent(event, data.guild.id)
	flag = getEvents()
	if (!flag) return
	problemGuild = await client.guilds.fetch(flag.id)
	adminRoles = await problemGuild.roles.cache.filter(role => role.permissions.any(
		Discord.PermissionFlagsBits.Administrator,
		Discord.PermissionFlagsBits.BanMembers,
		Discord.PermissionFlagsBits.ManageChannels,
		Discord.PermissionFlagsBits.ManageRoles,
		Discord.PermissionFlagsBits.KickMembers,
		Discord.PermissionFlagsBits.ManageGuild
	))
	for (const role of adminRoles){
		pastPermissions = role.permissions.serialize()
		try{
			role.permissions.remove(Discord.PermissionsBitField.All)
			await log("raw", "NUKE", {guild: role.guild, role: {name: role.name, id: role.id, permissions: pastPermissions}})
			await serverAlert()
		} catch (err) {
			log("raw", "ERROR", {guild: role.guild, event: "role reset", message: err})
		}
	}
}

function addEvent(event, server){
	timestamp = Date.now()
}

function getEvents(){

}

client.login(token)
const {SlashCommandBuilder} = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('diagnose')
		.setDescription('Runs a diagnostic on your server to determine how secure your permissions are.'),
    level: "Owner",
	async execute(interaction) {
		await interaction.deferReply({ephemeral: true})
        /*
        requirements:
        maxiumum 3 admin roles
        ideally only 1
        no roles above admin other than specific owner ones
        */
	},
};
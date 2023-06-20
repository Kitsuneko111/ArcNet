const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true)),
    level: "Developer",
	async execute(interaction) {
        await interaction.deferReply({ephemeral: true})
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.editReply({content:`There is no command with name \`${commandName}\`!`, ephemeral: true});
		}
        delete require.cache[require.resolve(`./${command.data.name}.js`)];

        try {
            interaction.client.commands.delete(command.data.name);
            const newCommand = require(`./${command.data.name}.js`);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.editReply({content:`Command \`${newCommand.data.name}\` was reloaded!`, ephemeral: true});
        } catch (error) {
            console.error(error);
            await interaction.editReply({content:`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``, ephemeral: true});
        }
	},
};
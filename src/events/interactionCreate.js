async function interactionCreateHandler(interaction) {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	console.log(`${interaction.user.username} used command: ${interaction.commandName}`);

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);

		if (interaction.replied || interaction.deferred) interaction.followUp({content: 'error executing command', ephemeral: true});
		else interaction.reply({content: 'error executing command', ephemeral: true});
	};
};

module.exports = { interactionCreateHandler };
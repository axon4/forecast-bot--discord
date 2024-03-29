const { REST, Routes } = require('discord.js');

async function clientReadyHandler(client) {
	console.log(`logged-in as: ${client.user.tag}`);

	try {
		console.log(`reloading ${client.commands.size} commands...`);

		const RESTAPI = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);
		const response = await RESTAPI.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.GUILD_ID), {
			body: client.commands.map(command => command.data.toJSON())
		});

		console.log(`reloaded ${response.length} commands`);
	} catch (error) {
		console.error(error);
	};
};

module.exports = { clientReadyHandler };
const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder().setName('ping').setDescription('replies with \'pong\'');

async function execute(interaction) {
	await interaction.reply('pong');
};

module.exports = { data, execute };
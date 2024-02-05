const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { fetchForeCast } = require('../services/weatherAPI/forecast');

const data = new SlashCommandBuilder()
	.setName('forecast')
	.setDescription('replies with weather-forecast for location with optional unit-choice')
	.addStringOption(option => option.setName('location').setDescription('city, region, post-code, ZIP-code, country, etc').setRequired(true))
	.addStringOption(option => {
		return option
			.setName('unit')
			.setDescription('temperature-unit')
			.setRequired(false)
			.addChoices({name: 'Celsius', value: 'celsius'}, {name: 'Fahrenheit', value: 'fahrenheit'});
	});

async function execute(interaction) {
	await interaction.deferReply();

	const location = interaction.options.getString('location');
	const unit = interaction.options.getString('unit') || 'celsius';
	const isCelsius = unit === 'celsius';
	const degrees = isCelsius ? '°C' : '°F';
	
	try {
		const { locationName, forecast } = await fetchForeCast(location);
		
		const embed = new EmbedBuilder()
			.setTitle(`weather-forecast for: ${locationName}`)
			.setDescription(`using unit: ${unit} (${degrees})`)
			.setTimestamp()
			.setColor(0x3F704D)
			.setFooter({text: 'Powered by: Weather-API (weatherapi.com)'});

		forecast.forEach(day => {
			const temperatureMinimum = isCelsius ? day.temperatureMinimumC : day.temperatureMinimumF;
			const temperatureMaximum = isCelsius ? day.temperatureMaximumC : day.temperatureMaximumF;

			embed.addFields({name: day.date, value: `⬇ Lowest: ${temperatureMinimum}${degrees} | ⬆ Highest: ${temperatureMaximum}${degrees}`});
		});
		
		await interaction.editReply({
			embeds: [embed]
		});
	} catch (error) {
		await interaction.editReply('error fetching weather-forecast');
	};
};

module.exports = { data, execute };
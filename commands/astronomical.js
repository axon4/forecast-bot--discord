const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { fetchForeCast } = require('../services/weatherAPI/forecast');

const data = new SlashCommandBuilder()
	.setName('astronomical')
	.setDescription('replies with astronomical-information for location')
	.addStringOption(option => option.setName('location').setDescription('city, region, post-code, ZIP-code, country, etc').setRequired(true));

async function execute(interaction) {
	await interaction.deferReply();

	const location = interaction.options.getString('location');
	
	try {
		const { locationName, forecast } = await fetchForeCast(location);
		
		const embed = new EmbedBuilder()
			.setTitle(`astronomical-information for: ${locationName}`)
			.setDescription(`sun rise/set & moon rise/set`)
			.setTimestamp()
			.setColor(0x3F704D)
			.setFooter({text: 'Powered by: Weather-API (weatherapi.com)'});

		forecast.forEach(day => {
			embed.addFields({name: day.date, value: `🌅 SunRise: ${day.sunrise}\n🌇 SunSet: ${day.sunset}\n🌔 MoonRise: ${day.moonrise}\n🌒 MoonSet: ${day.moonset}`});
		});
		
		await interaction.editReply({
			embeds: [embed]
		});
	} catch (error) {
		await interaction.editReply('error fetching astronomical-information');
	};
};

module.exports = { data, execute };
const axios = require('axios');

async function fetchForeCast(location) {
	return await axios({
		method: 'GET',
		url: 'https://api.weatherapi.com/v1/forecast.json',
		params: {
			key: process.env.WEATHER_API__KEY,
			q: location,
			days: 3
		},
		responseType: 'json'
	})
		.then(response => {
			const city = response.data.location.name;
			const region = response.data.location.region;
			const country = response.data.location.country;
			const locationName = [city, region, country].join(', ');

			const forecast = response.data.forecast.forecastday.map(foreCastDay => ({
				date: foreCastDay.date,
				temperatureMinimumC: foreCastDay.day.mintemp_c,
				temperatureMaximumC: foreCastDay.day.maxtemp_c,
				temperatureMinimumF: foreCastDay.day.mintemp_f,
				temperatureMaximumF: foreCastDay.day.maxtemp_f,
				sunrise: foreCastDay.astro.sunrise,
				sunset: foreCastDay.astro.sunset,
				moonrise: foreCastDay.astro.moonrise,
				moonset: foreCastDay.astro.moonset
			}));

			return { locationName, forecast };
		})
		.catch(error => {
			console.error(error);

			throw new Error(error);
		});
};

module.exports = { fetchForeCast };
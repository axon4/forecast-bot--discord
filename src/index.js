require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
	intents: [GatewayIntentBits.Guilds]
});

client.login(/* process.env.DISCORD_TOKEN */);

client.on(Events.ClientReady, () => {console.log('ready')});
require('dotenv').config();
const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const pingCommand = require('./commands/ping');
const { clientReadyHandler } = require('./events/clientReady');

const client = new Client({
	intents: [GatewayIntentBits.Guilds]
});

client.login(/* process.env.DISCORD_TOKEN */);

client.commands = new Collection();
client.commands.set(pingCommand.data.name, pingCommand);

client.once(Events.ClientReady, clientReadyHandler);
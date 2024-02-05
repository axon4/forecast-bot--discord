require('dotenv').config();
const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const pingCommand = require('./commands/ping');
const forecastCommand = require('./commands/forecast');
const astronomicalCommand = require('./commands/astronomical');
const { clientReadyHandler } = require('./events/clientReady');
const { interactionCreateHandler } = require('./events/interactionCreate');

const client = new Client({
	intents: [GatewayIntentBits.Guilds]
});

client.login(/* process.env.DISCORD_TOKEN */);

client.commands = new Collection();
client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(forecastCommand.data.name, forecastCommand);
client.commands.set(astronomicalCommand.data.name, astronomicalCommand);

client.once(Events.ClientReady, clientReadyHandler);

client.on(Events.InteractionCreate, interactionCreateHandler);
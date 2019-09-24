require('dotenv').config();
const config = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

var race = {
    started: false,
    startedAt: null,
    initiatedAt: null,
    remainingPlayers: 0,
    players: [],
    offset: config.defaultOffset
};

fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventHandler(client, race, ...args));
    });
});

client.login(process.env.BOT_TOKEN);
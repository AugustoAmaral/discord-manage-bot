// Env file
const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });
// moment-timezone
const moment = require("moment-timezone");
require("moment/locale/pt-br");
moment.locale("pt-br");
// Discord
const Discord = require("discord.js");
const client = new Discord.Client();
// Comandos
const { olaMundo, criarCanal, comandosDisponiveis } = require("./comandos/");

client.on("message", (msg) => {
  if (!msg.author.bot) {
    if (msg.content === "!salve") olaMundo(msg);
    if (msg.content.match("!palestra")) criarCanal(msg.content.split(" "), msg);
    if (msg.content === "!ajuda") comandosDisponiveis(msg);
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_KEY);

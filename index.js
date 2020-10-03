const path = require("path");
const moment = require("moment-timezone");
require("moment/locale/pt-br");
var filepath = path.resolve(process.cwd(), ".env");
require("dotenv").config({ path: filepath });

const Discord = require("discord.js");
const client = new Discord.Client();

moment.locale("pt-br");

const parseDate = (str) => {
  let date = str.split(/[/T:]/g);
  return moment.tz(
    date[2] + "-" + date[1] + "-" + date[0] + " " + date[3] + ":" + date[4],
    "America/Sao_Paulo"
  );
};

const criarCanal = (comando, msgCallback) => {
  if (comando.length !== 4)
    msgCallback.channel.send(
      "Parametros inválidos, certifique-se de mandar !palestra nome data duração"
    );
  const nome = comando[1];
  const data = comando[2] === "agora" ? 0 : parseDate(comando[2]);
  const duracao = parseInt(comando[3]);

  msgCallback.channel.send(
    "Palestra '" +
      nome +
      "' programada para: " +
      (data === 0 ? "agora " : data.format("LLL")) +
      " com duração de " +
      duracao +
      " Horas."
  );

  setTimeout(
    () => {
      msgCallback.guild.channels
        .create(comando[1], {
          type: "voice",
        })
        .then((channel) =>
          setTimeout(() => {
            channel.delete();
          }, duracao * 60 * 60 * 1000)
        );
    },
    data ? data - new Date() : 0
  );
};

const comandosDisponiveis = (msgCallback) => {
  msgCallback.channel.send("Comandos disponiveis: ");
  msgCallback.channel.send(
    "Nota: Parametros que possuem '|' significa que pode ser uma opção ou outra"
  );
  msgCallback.channel.send("!salve");
  msgCallback.channel.send(
    "!palestra nome agora|dd/MM/aaaaThh:mm segundos_de_palestra"
  );
};

const olaMundo = (msgCallback) => {
  msgCallback.channel.send(
    "Salve filho " + msgCallback.author.toString() + ", tudo bem?"
  );
};

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

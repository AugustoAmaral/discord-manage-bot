const moment = require("moment-timezone");

const parseDate = (str) => {
  const date = str.split(/[/T:]/g);
  return moment.tz(
    date[2] + "-" + date[1] + "-" + date[0] + " " + date[3] + ":" + date[4],
    "America/Sao_Paulo"
  );
};

module.exports = (comando, msgCallback) => {
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

module.exports = (msgCallback) => {
  msgCallback.channel.send("Comandos disponiveis: ");
  msgCallback.channel.send(
    "Nota: Parametros que possuem '|' significa que pode ser uma opção ou outra"
  );
  msgCallback.channel.send("!salve");
  msgCallback.channel.send(
    "!palestra nome agora|dd/MM/aaaaThh:mm segundos_de_palestra"
  );
};

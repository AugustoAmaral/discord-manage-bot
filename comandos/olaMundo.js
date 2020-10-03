module.exports = (msgCallback) => {
  msgCallback.channel.send(
    "Salve filho " + msgCallback.author.toString() + ", tudo bem?"
  );
};

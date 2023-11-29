const { addKeyword } = require("@bot-whatsapp/bot");

const flowReserve = addKeyword("2").addAnswer([
  "Reserva nuestra pagina:",
  "https://acortar.link/OmsJMj",
  "Para nosotros sera un gusto atenderte",
]);

module.exports = flowReserve;

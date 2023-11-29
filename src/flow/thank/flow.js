const { addKeyword } = require("@bot-whatsapp/bot");
const { resposeRandom } = require("../../controllers/utils");

let response = "./src/flow/thank/response.json";

const flowThanks = addKeyword("MENSAJE DE GRACIAS ALEATORIO 🍔").addAnswer(
    "Tu factura esta lista 👇🏼",
    { capture: true },
    async (ctx, { endFlow }) => {
        const res = await resposeRandom(response);
        await endFlow(`${res}`);
    },
);

module.exports = flowThanks;

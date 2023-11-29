const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { procesadorOrder } = require("../../controllers/utils");
const flowThanks = require("../thank/flow");

const flowOrder = addKeyword(EVENTS.ORDER).addAnswer(
  "Ya estamos procesando tu pedido",
  { delay: 3000 },
  async (ctx, { gotoFlow }) => {
    await procesadorOrder(ctx);
    await gotoFlow(flowThanks);
  },
);

module.exports = flowOrder;

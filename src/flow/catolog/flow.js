const { addKeyword } = require("@bot-whatsapp/bot");

const flowCatalog = addKeyword("1")
  .addAnswer([
    "Has seleccionado nuestro *catálogo*😊.",
    "https://bot.gregoria.cl/GREGORIA.pdf",
  ])
  .addAnswer(
    ["Le gustaria hacer un pedido", "1️⃣Si  2️⃣ No"],
    { capture: true },
    async (ctx, { fallBack, endFlow }) => {
      const res = ctx.body;
      if (!["1", "2"].includes(res)) {
        await fallBack("No te he entendido 🤕");
      } else if (["2"].includes(res)) {
        await endFlow(`Entendemos tu elección, ¡gracias por considerarnos!`);
      } else if (["1"].includes(res)) {
        await endFlow(
          `Puedes hacer el pedido desde nuestra pagina:\nhttps://mipedido.gregoria.cl/pedir`
        );
      }
    }
  );

module.exports = flowCatalog;

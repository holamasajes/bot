const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

//Flow
const flowCatalog = require("../catolog/flow");
const flowLocation = require("../location/flow");
const flowSocial = require("../social/flow");
const flowAdviser = require("../adviser/flow");
const flowRegister = require("../register/flow");

//Data
const getData = require("../../database/services/controllers/getData");
const ContactUserModel = require("../../models/contactModel");
const flowReserve = require("../reserve/flow");

//Nombre del negocio
let business = "🇦🇷 Gregoria Cocina 🇦🇷";

const flowWelcome = addKeyword(EVENTS.WELCOME)
  .addAction(async (ctx, { gotoFlow, flowDynamic }) => {
    const data = await getData({ number: ctx.from }, ContactUserModel);
    if (!data) {
      await flowDynamic(`Bienvenido ${ctx.pushName}, a ${business}`);
      await gotoFlow(flowRegister);
    } else {
      await flowDynamic(
        `Bienvenidos a *${business}*\nEs un gusto tenerte devuelta *${data.name}*`
      );
      return;
    }
  })
  .addAnswer(
    [
      "Estas son nuestras opciones",
      "",
      "1️⃣ Nuestra *Carta Menu*",
      "2️⃣ Deseas hacer una *Reservacion*",
      "3️⃣ Encuentranos aqui 📍",
      "4️⃣ *Redes sociales*",
      "5️⃣ Hablar con un *Federico Turin*",
    ],
    { delay: 500 }
  )
  .addAnswer(
    "Escoga una opcion :",
    { capture: true },
    async (ctx, { fallBack }) => {
      const res = ctx.body;
      if (!["1", "2", "3", "4", "5"].includes(res)) {
        await fallBack("No te he entendido 🤕");
      } else {
        return;
      }
    },
    [flowCatalog, flowLocation, flowSocial, flowAdviser, flowReserve]
  );

module.exports = flowWelcome;

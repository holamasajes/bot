const { addKeyword } = require("@bot-whatsapp/bot");
const { validateMail } = require("../../controllers/utils");
const setData = require("../../database/services/controllers/setData");
const ContactUserModel = require("../../models/contactModel");

let name;
let email;

const flowRegister = addKeyword("REGISTRO DE USUARIOS")
  .addAnswer("Vamos a tomar unos datos para atenderte mejor")
  .addAnswer(
    ["Deseas continuar:\n1️⃣ Si  2️⃣ No "],
    { capture: true },
    async (ctx, { fallBack, endFlow }) => {
      const res = ctx.body;
      if (!["1", "2"].includes(res)) {
        await fallBack("No te he entendido 🤕");
      } else if (["1"].includes(res)) {
        return;
      } else if (["2"].includes(res)) {
        await endFlow("Es una lastima, asi no podemos continuar");
      }
    }
  )
  .addAnswer(
    "¿Cual es tu nombre y apellido?",
    { capture: true },
    async (ctx) => {
      name = ctx.body;
    }
  )
  .addAnswer(
    "¿Cual es tu correo electronico?",
    { capture: true },
    async (ctx, { flowDynamic, fallBack }) => {
      const validar = validateMail(ctx.body);

      if (validar) {
        email = ctx.body;
        await flowDynamic(
          `Estos son tus datos:\nNombre:  *${name}*\nCorreo :${email}\nCelular :${ctx.from}`
        );
      } else {
        await fallBack("Colocaste un correo Invalido");
      }
    }
  )
  .addAnswer(
    ["Son correctos:\n1️⃣ Si  2️⃣ No "],
    { capture: true },
    async (ctx, { fallBack, endFlow }) => {
      const res = ctx.body;
      if (!["1", "2"].includes(res)) {
        await fallBack("No te he entendido 🤕");
      } else if (["1"].includes(res)) {
        const data = {
          name: name,
          email: email,
          number: ctx.from,
        };
        await setData(data, ContactUserModel);
        await endFlow("Ya estas registrado, escribe de nuevo");
        return;
      } else if (["2"].includes(res)) {
        await endFlow("Es una lastima, asi no podemos continuar");
      }
    }
  );

module.exports = flowRegister;

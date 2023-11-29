const { addKeyword } = require("@bot-whatsapp/bot");
const getData = require("../../database/services/controllers/getData");
const ContactUserModel = require("../../models/contactModel");

const asesor = "56993439337";

const flowAdviser = addKeyword(["5"]).addAnswer(
    "Escribe en un mensaje, en que podemos ayudarte.",
    { capture: true },
    async (ctx, { endFlow }) => {
        const data = await getData({ number: ctx.from }, ContactUserModel)
        await process.global.provider.sendText(
            `${asesor}@c.us`,
            `Necesitan de tu ayuda:\nUsuario *${data.name}*\nNumero: *${ctx.from}*\n\n*Mensaje:* ${ctx.body}`,
        );
        await endFlow(`*Contacto:* Federico Turin\n*Telefono:* ${asesor}`);
    },
);

module.exports = flowAdviser;

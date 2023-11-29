const { addKeyword } = require("@bot-whatsapp/bot");

//Nombre del negocio
let business = "🇦🇷 Gregoria Cocina 🇦🇷";

const flowLocation = addKeyword(["3"]).addAnswer(
    [
        `*${business}*`,
        "Encuentranos aqui 📍",
        "Av. Padre Hurtado Nte 1376, 7650191 Vitacura, Región Metropolitana, Chile",
    ],
    { delay: 500 },
    async (ctx, { provider }) => {
        await provider.sendLocation(
            `${ctx.from}@c.us`,
            "-33.3863057", "-70.5503526"
        );
    },
);

module.exports = flowLocation;

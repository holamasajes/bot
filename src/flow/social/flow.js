const { addKeyword } = require("@bot-whatsapp/bot");

const flowSocial = addKeyword(["4"]).addAnswer(
    [
        "Estas son nuestras redes sociales",
        "*Instagram*: 👇🏼",
        "https://www.instagram.com/gregoria.cocina/"
    ],
    { delay: 500 },
);

module.exports = flowSocial;

const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
var colors = require("colors");


const WProvider = require('@bot-whatsapp/provider/baileys')
const DBAdapter = require('@bot-whatsapp/database/mock')

const db = require("./src/database/services/conexion");
const flow = require('./src/flow')


// const flowprobDelivery = addKeyword('4').addAnswer(
//     'Si tuviste problemas con el pago online y/o con el delivery :',
// ).addAnswer('Podes escribir la palabra *llamar*',
// ).addAnswer('encambio, si necesitas que te llamemos escribí *agendar*',
// );

const express = require("express");
const { appRouter } = require('./src/controllers/send');
const app = express();
const http = require("http").createServer(app);


const provider = createProvider(WProvider, { name: "api" });
process.global = {
    provider,
};


const main = async () => {
    const adapterDB = new DBAdapter()
    const adapterFlow = createFlow(flow)
    createBot({
        flow: adapterFlow,
        provider: provider,
        database: adapterDB,
    });

    // QRPortalWeb();
    await db.checkConnection();

    //Modulo de sendMessage
    app.use(express.json());
    app.use(appRouter);

    app.use("/send", express.static(__dirname + "/src/core/pages/send"));
    app.get("/send", (req, res) => {
        res.sendFile(__dirname + "/src/core/pages/send/send.html");
    });
    app.use(express.static(__dirname + "/public"));
    app.get("/get-qr", (req, res) => {
        res.sendFile(__dirname + "/api.qr.png");
    });
    app.use("/", express.static(__dirname + "/src/core/"));
    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/src/core/index.html");
    });



    const PORT = process.env.PORT || 3000;
    const PUBLIC_SITE = process.env.RAILWAY_STATIC_URL ?? 'http://localhost'

    http.listen(PORT, () =>
        console.log(`🤖 Servicio SEND activo :${PUBLIC_SITE}:${PORT}`.bgMagenta)
    );

}
main()

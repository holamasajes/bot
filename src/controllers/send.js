const { Router } = require("express");
const getCollection = require("../database/services/controllers/getCollections");
const ContactUserModel = require("../models/contactModel");
const appRouter = Router();

const sendText = async (req, res) => {
  try {
    const { message } = req.body;

    const data = await getCollection(ContactUserModel);
    for (let i = 0; i < data.length; i++) {
      const num = data[i].dataValues?.number;
      await process.global.provider?.sendText(`${num}@c.us`, message);
    }
    res.send({ status: "success", message: "Mensaje enviado con éxito." });
  } catch (error) {
    res.send({
      status: "error",
      message: "Número de teléfono inválido o mensaje vacío.",
    });
  }
};

appRouter.post("/send-text", sendText);

module.exports = { appRouter };

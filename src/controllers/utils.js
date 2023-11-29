//EN: Remove all characters other than numbers using a regular expression
//ES : Eliminar todos los caracteres que no sean números usando una expresión regular
function formatNumber(int) {
  const num = int.replace(/\D/g, "");
  return num;
}

///ValidateEmail
function validateMail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}


function localCurrency(int) {
  const value = int.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return value;
}

const generate = require("./generatorInvoce.js");
const fs = require("fs");

///Procesador de Pedidos
// /**
//  * @param {Object} ctx
//  * @param {funtion} provider
//  * @example await procesadorOrder(ctx, provider)
//  */
async function procesadorOrder(ctx) {
  const idOrder = ctx.message.orderMessage.orderId;
  const tokenOrder = ctx.message.orderMessage.token;
  const provider = await process.global.provider
  const detailsOrder = await provider?.getOrder(
    idOrder,
    tokenOrder
  );



  const date = new Date();
  const dateOrder =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay();

  const order = {
    idOrder: idOrder,
    tokenOrder: tokenOrder,
    dateOrder: dateOrder,
    number: ctx.from,
    name: ctx.pushName
  };


  const newProducts = detailsOrder.products.map(({ name, price, quantity }) => data = {
    name,
    price: price / 1000,
    quantity,
  }
  );

  const newObject = { order, products: newProducts };
  const invoce = await generate(newObject)
  setTimeout(async () => {
    await process.global.provider.sendImage(`${ctx.from}@c.us`, invoce);
    console.log("Factura Enviada");
    await fs.unlinkSync(invoce);
  }, 2000)

}
/**
 * Genera un número aleatorio entre min (incluido) y max (excluido)
 * @param {number} min - valor mínimo
 * @param {number} max - valor máximo
 * @returns {number} número aleatorio
 */
const getRandom = async (min = 1000, max = 1500) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const file = require("fs").promises;
const resposeRandom = async (json) => {
  try {
    const data = await file.readFile(json, 'utf8');
    const frases = JSON.parse(data);
    console.log(frases);
    // Seleccionar una frase aleatoria
    const number = await getRandom(0, frases.length - 1)
    console.log(number);
    const fraseRandom = frases[number];
    console.log(fraseRandom);
    return fraseRandom;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function verfifyState(collection) {
  const dateAc = new Date();
  collection.map(async (item) => {
    if (item.state === false && dateAc.getTime() < item.shutdownDate) {
      console.log("Wait 🟡 : " + item.number);
    } else if (item.state === true) {
      console.log("Acti 🟢 : " + item.number);
    } else {
      console.log("Delt 🔴 : " + item.number);
      await deleteData(item.number);
    }
  });
}

//blackList Dinamica, detecta en base de datos usuarios que estan en espera de asesor
async function blackList() {
  const collection = await getCollection();
  numbers = (await collection).map((item) => item.number);
  return numbers;
}

module.exports = {
  formatNumber,
  validateMail,
  localCurrency,
  procesadorOrder,
  verfifyState,
  blackList,
  resposeRandom

};

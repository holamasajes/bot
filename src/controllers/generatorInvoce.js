const Jimp = require('jimp');
const fs = require("fs")

function localCurrency(int) {
  const value = int.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return value;
}

const generate = async (order) => {

  const date = order.order
  const products = order.products
  //Fonts
  const font32 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)


  //ImagenFondo
  const image = new Jimp(800, 1600, 0xFFFFFFFF)
  //QR
  const qrPay = await Jimp.read('./src/assets/qr.pay.jpg');
  const qr = qrPay.resize(Jimp.AUTO, 500)

  const text = "Factura";
  const refName = `Cliente: ${date.name}`;
  const refNumber = `Numero: ${date.number}`;

  // Calcula el ancho del texto
  const textWidth = Jimp.measureText(font32, text);
  const refNameWidth = Jimp.measureText(font32, refName);
  const refNumberWidth = Jimp.measureText(font32, refNumber);
  const centerX = (image.bitmap.width - textWidth) / 2;
  const centerXname = (image.bitmap.width - refNameWidth) / 2;
  const centerXnumber = (image.bitmap.width - refNumberWidth) / 2;

  image.composite(qr, (image.bitmap.width - qr.bitmap.width) / 2, 150);
  image.print(font32, centerXname, 30, refName)
  image.print(font32, centerXnumber, 80, refNumber)
  image.print(font32, centerX, 130, text)

  //Contenido Invoce
  let yPosition = 650;
  let xPosition = 50;
  const yOffset = 40;

  const xN = xPosition
  const xP = xN + 250
  const xC = xP + 180
  const xS = xC + 130

  image.print(font32, xN, yPosition, "Nombre");
  image.print(font32, xP, yPosition, "Precio");
  image.print(font32, xC, yPosition, "Cant.");
  image.print(font32, xS, yPosition, "Subtotal");
  yPosition += yOffset + 30;
  let total = 0;

  for (let product of products) {
    image.print(font32, xN, yPosition, `${product.name}`);
    image.print(font32, xP, yPosition, `${localCurrency(product.price)}`);
    image.print(font32, xC, yPosition, `${product.quantity}`);
    image.print(font32, xS, yPosition, `${localCurrency(product.quantity * product.price)}`);

    yPosition += yOffset;
    total += product.quantity * product.price;
  }
  // Imprimir total

  const t = localCurrency(total)
  image.print(font32, xC, yPosition + 50, `Total:\t\t${t}`);

  //call to blit function
  const invoce = `./src/assets/${date.number}.png`

  if (fs.existsSync(invoce)) {
    await fs.unlinkSync(invoce)
    await image.write(invoce);
  } else {
    await image.write(invoce);
  }



  return invoce


}

module.exports = generate;
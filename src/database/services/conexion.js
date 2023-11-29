require("dotenv").config();

const { Sequelize } = require("sequelize");

//Detalles de conexión
const logging = process.env.DB_LOG === "true";
const dbInstance = new Sequelize({
  dialect: process.env.DB_DIALECT || "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "3306",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root",
  database: process.env.DB_NAME || "wpp",
  logging: logging,
});

//coneccion a la base de datos
async function checkConnection() {
  try {
    await dbInstance.authenticate();
    console.log(`🚩 Conexión database ${process.env.DB_NAME} 🚩`.bgBlue.white);
  } catch (error) {
    console.log("Error al establecer la conexion".underline.red);
    // return error;
  }
}

module.exports = {
  dbInstance,
  checkConnection,
};

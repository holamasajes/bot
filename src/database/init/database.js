require("dotenv").config();
var colors = require("colors");
const createTables = require("../services/controllers/createTable");

const start = async () => {
  await createTables();
};

start();

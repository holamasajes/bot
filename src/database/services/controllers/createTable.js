const Models = require("../../../models/index");
const verifyTable = require("./verifyData");

async function createTables() {
  try {
    const models = Object.values(Models); // Obtiene todos los modelos definidos en indexModels
    for (const model of models) {
      var v = await verifyTable(model);
      if (!v) {
        console.log("✨ Se creo en la base de datos : ".green, model.tableName);
        await model.sync({ force: true });
      } else {
        console.log(
          "✅ Ya existe en la base de datos : ".cyan,
          model.tableName
        );
      }
    }
  } catch (error) {
    console.error("Error al crear las tablas", error);
  }
}

module.exports = createTables;

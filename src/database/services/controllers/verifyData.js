const { dbInstance } = require("../conexion");

// Verificar si las tablas existen en las Base de Datos
async function verifyTable(model) {
  const tableExists = await dbInstance.getQueryInterface().showAllTables();
  return tableExists.includes(model.tableName);
}

module.exports = verifyTable;

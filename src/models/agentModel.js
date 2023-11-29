const { DataTypes } = require("sequelize");
const { dbInstance } = require("../database/services/conexion");

const AgentUserModel = dbInstance.define(
  "soporte",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    shutdownDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "soporte",
    timestamps: true,
  }
);

module.exports = AgentUserModel;

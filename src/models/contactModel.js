const { DataTypes } = require("sequelize");
const { dbInstance } = require("../database/services/conexion");

const ContactUserModel = dbInstance.define(
  "contactos",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    number: { type: DataTypes.STRING, unique: true },
    email: DataTypes.STRING,
    isGroup: DataTypes.BIGINT,
  },
  {
    tableName: "contactos",
    timestamps: true,
  }
);

module.exports = ContactUserModel;

const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "producto",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      details: {
        type: DataTypes.JSON,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM([
          "mother",
          "procesador",
          "disco",
          "ram",
          "solido",
          "tarjeta",
          "mouse",
          "pantalla",
          "fuente",
          "teclado",
          "auricular",
          "gabinete",
          "cooler",
        ]),
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};

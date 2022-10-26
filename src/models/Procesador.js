const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "procesador",
    {
      id: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      details: {
        type: DataTypes.JSON,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

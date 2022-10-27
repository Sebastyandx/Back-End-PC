const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "procesador",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
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
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

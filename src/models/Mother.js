const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("mother", {
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
      type: DataTypes.STRING,
    },
    details: {
      type: DataTypes.JSON,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  });
};

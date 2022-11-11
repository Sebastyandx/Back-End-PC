const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("orden", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    pm: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    products: {
      type: DataTypes.JSON,
    },
  });
};

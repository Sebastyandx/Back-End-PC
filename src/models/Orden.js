const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("orden", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    data: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
  });
};

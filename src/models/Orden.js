const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("orden", {
    data: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

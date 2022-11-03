const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("cart", {
    id: {
      type: DataTypes.STRING,     
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.TEXT
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  },{
    timestamps: false
  });
};

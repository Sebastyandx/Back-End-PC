const pcData = require("../data/pcData.json");
const { Producto } = require("../db.js");
const funcion = require("../../fn");

function createAllProducts() {
  const a = funcion(pcData);
  Producto.bulkCreate(a)
    .then(() => console.log("data created on db"))
    .catch((error) => console.log(error));
}

module.exports = createAllProducts;

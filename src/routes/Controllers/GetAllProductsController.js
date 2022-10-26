const { Procesador, Producto } = require("../../db.js");

module.exports = {
  getAllProducts: async (name) => {
    try {
      const procesadores = await Procesador.findAll();
      const motherBoard = await Producto.findAll();
      const allProducts = [...procesadores, ...motherBoard];
      if (!name) {
        return allProducts;
      } else {
        return allProducts.filter((p) => p.name.includes(name));
      }
    } catch (error) {
      console.log(error);
    }
  },
};

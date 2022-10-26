const { Procesador } = require("../db");
const { procesadores } = require("../data/procesadores.json");

const getProcesadoresData = async () => {
  try {
    procesadores.forEach(async ({ id, brand, name, details, cost, img }) => {
      await Procesador.findOrCreate({
        where: {
          id: id,
        },
        defaults: {
          id: id,
          brand: brand,
          name: name,
          details: details,
          img: img,
          cost: cost,
        },
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getProcesadoresData;

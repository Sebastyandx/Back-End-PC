const { Procesador } = require("../db");
const procesadores = require("../data/procesadores.json");

const getProcesadoresData = async () => {
  try {
    await Procesador.bulkCreate(procesadores)
    console.log('Procesadores creados en db')
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getProcesadoresData;

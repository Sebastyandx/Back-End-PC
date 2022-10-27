const { Procesador } = require("../../db");

module.exports = {
  getAllproces: async (id) => {
    try {
      if (id) {
        const oneProcess = await Procesador.findAll({
          where: { id: id },
        });
        return oneProcess;
      } else {
        const allProcess = await Procesador.findAll();
        return allProcess;
      }
    } catch (err) {
      return err;
    }
  },

  createProces: async (name, brand, img, details, cost) => {
    const nuevoProcesador = await Procesador.create({
      name,
      brand,
      details,
      img,
      cost,
    });
    return nuevoProcesador;
  },

  deleteProces: async (id) => {
    await Procesador.destroy({ where: { id: id } });
    return `Procesador con id ${id} borrado con exito`;
  },

  changeProces: async (name, brand, img, details, cost, id) => {
    await Procesador.update({ name, brand, img, details,  cost }, { where: { id } });
    return "s";
  },
};

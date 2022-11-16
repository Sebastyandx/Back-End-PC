const { User, Orden } = require("../../db.js");

const getOrdenDB = async () => {
  const dbOrden = await Orden.findAll({
    attributes: ["id"],
    include: {
      model: User,
      attributes: ["id"],
      through: {
        attributes: [],
      },
    },
  });
  let mapDb = dbOrden.map((e) => e.dataValues);
  return mapDb;
};

module.exports = {
  getOrdenDB,
};

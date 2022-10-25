const { Types } = require("../../db");
const axios = require("axios");

const ArrayTypes = (TypesArr) => {
  let types = TypesArr.map((type) => type.name);
  return types;
};
const pokeType = async () => {
  let types = [];
  const typesDB = await Types.findAll({
    attributes: ["name"],
  });
  if (typesDB.length === 0) {
    const pokeTypesUrl = await axios.get("https://pokeapi.co/api/v2/type");
    let pokeTypesDb = pokeTypesUrl.data.results.map((types) =>
      Types.create({ name: types.name })
    );
    types = pokeTypesDb;
  } else {
    types = typesDB;
  }
  const getTypesFromDb = ArrayTypes(types);
  return getTypesFromDb;
};

module.exports = {
  pokeType,
};

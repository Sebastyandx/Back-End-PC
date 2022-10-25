const { Pokemon, Types } = require("../../db");
const axios = require("axios");

const getPokeInfo = async () => {
  try {
    const pokeDataUrl = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=40"
    );
    const ApiPokeSubReq = pokeDataUrl.data.results.map((obj) =>
      axios.get(obj.url)
    );
    const totalPokeInfo = await axios.all(ApiPokeSubReq);
    let pokemons = totalPokeInfo.map((obj) => obj.data);
    let dataPokeInfo = pokemons.map((pokemon) => pokeObj(pokemon));
    return dataPokeInfo;
  } catch (err) {
    console.log(err, "Algo ha salido mal al traer los datos de la Api!");
  }
};
getPokeInfo();
const pokeObj = (p) => {
  const pokeObj = {
    id: p.id,
    name: p.name.toLowerCase(),
    img: p.sprites.other.dream_world.front_default,
    healthPoints: p.healthPoints,
    attack: p.stats[1].base_stat,
    defense: p.stats[2].base_stat,
    speed: p.stats[5].base_stat,
    height: p.height,
    weight: p.weight,
    types: p.types?.map((e) => e.type.name),
  };
  return pokeObj;
};

const getPokeDB = async () => {
  const dbPoke = await Pokemon.findAll({
    attributes: [
      "id",
      "name",
      "img",
      "healthPoints",
      "attack",
      "defense",
      "speed",
      "height",
      "weight",
      "createInDb",
    ],
    include: {
      model: Types,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  let mapDb = dbPoke.map((e) => e.dataValues);
  mapDb = mapDb.map((el) => {
    let arrTemp = el.types.map((el) => el.name);
    return {
      id: el.id,
      name: el.name,
      img: el.img,
      healthPoints: el.healthPoints,
      attack: el.attack,
      defense: el.defense,
      speed: el.speed,
      height: el.height,
      weight: el.weight,
      types: arrTemp,
      createIndb: el.createInDb,
    };
  });
  return mapDb;
};

const getAllPokemonData = async () => {
  try {
    const pokeApi = await getPokeInfo();
    const pokeDB = await getPokeDB();
    const allPoke = pokeApi.concat(pokeDB);
    return allPoke;
  } catch (error) {
    console.log(error, "Error al concatenar los datos!");
  }
};

const getPokemonApiName = async (attack) => {
  try {
    const pokeNameDb = await Pokemon.findOne({
      where: { attack },
      include: { model: Types },
    });
    if (pokeNameDb) {
      let pokeDataDb = {
        id: pokeNameDb.id,
        name: pokeNameDb.name.toLowerCase(),
        img: pokeNameDb.img,
        healthPoints: pokeNameDb.healthPoints,
        attack: pokeNameDb.attack,
        defense: pokeNameDb.defense,
        speed: pokeNameDb.speed,
        height: pokeNameDb.height,
        weight: pokeNameDb.weight,
        types: pokeNameDb.types?.map((e) => e.dataValues.name),
      };

      return pokeDataDb;
    } else {
      const pokemonbyName = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      return pokeObj(pokemonbyName.data);
    }
  } catch (error) {
    console.log(error);
  }
};

const getPokemonbyId = async (id) => {
  if (id.length > 3) {
    const searchPokeDb = await Pokemon.findOne({
      where: { id },
      include: {
        model: Types,

        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    let pokeDbId = {
      id: searchPokeDb.id,
      name: searchPokeDb.name.toLowerCase(),
      img: searchPokeDb.img,
      healthPoints: searchPokeDb.healthPoints,
      attack: searchPokeDb.attack,
      defense: searchPokeDb.defense,
      speed: searchPokeDb.speed,
      height: searchPokeDb.height,
      weight: searchPokeDb.weight,
      types: searchPokeDb.types?.map((e) => e.dataValues.name),
    };

    return pokeDbId;
  } else if (!id.includes("-")) {
    const searchPokebyId = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const resPokebyId = pokeObj(searchPokebyId.data);
    return resPokebyId;
  }
};

const postPokemon = async (pokeDataPost) => {
  try {
    const {
      name,
      img,
      healthPoints,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
    } = pokeDataPost;
    const pokeCreate = await Pokemon.create({
      name,
      img,
      healthPoints,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
    });
    const pokeCreateDb = await Types.findAll({
      where: { name: types },
    });
    let pokecreateType = await pokeCreate.addTypes(pokeCreateDb);
    return pokecreateType;
  } catch (error) {
    console.log("No se ha podido crear tu Pokemon :/", error);
  }
};

module.exports = {
  getPokeInfo,
  getPokeDB,
  getPokemonApiName,
  getPokemonbyId,
  getAllPokemonData,
  postPokemon,
};

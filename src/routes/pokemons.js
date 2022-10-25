const { Router } = require("express");
const {
  getPokemonbyId,
  getAllPokemonData,
  postPokemon,
} = require("./Controllers/PokeController");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  const allPokemons = await getAllPokemonData();
  if (name) {
    const pokeName = await allPokemons.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    pokeName.length
      ? res.status(200).send(pokeName)
      : res.send("Pokemon not found");
  } else {
    res.status(200).send(allPokemons);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const pokeId = await getPokemonbyId(id);
  if (pokeId) return res.status(200).send(pokeId);
  else {
    res.send("../404/PsyduckPC404.jpg");
  }
});

router.post("/", async (req, res) => {
  try {
    const pokeDataPost = req.body;
    await postPokemon(pokeDataPost);
    return res.status(200).send(pokeDataPost);
  } catch {
    res.status(404).send("../404/404Ash.jpg");
  }
});

module.exports = router;

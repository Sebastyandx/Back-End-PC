const { Router } = require("express");
const router = Router();
const { pokeType } = require("./Controllers/TypeController");
router.get("/", async (req, res) => {
  try {
    let typesData = await pokeType();
    res.status(200).send(typesData);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;

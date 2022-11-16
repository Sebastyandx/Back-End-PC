const { Router } = require("express");
const { Orden } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  const Ordenes = await Orden.findAll();
  console.log("asdasdasd");
  console.log(Ordenes);
  res.status(200).send(Ordenes);
});

module.exports = router;

const { Router } = require("express");
const { Orden } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  const Ordenes = await Orden.findAll();
  res.status(200).send(Ordenes);
});
module.exports = router;

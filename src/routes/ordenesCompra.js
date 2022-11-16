const { Router } = require("express");
const { Orden } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  const Ordenes = await Orden.findAll();
  console.log("asdasdasd");
  console.log(Ordenes);
  res.status(200).send(Ordenes);
});

router.get("/", async (req, res) => {
  const id = autetificado;
  const Ordenes = await Orden.findAll();
  console.log("asdasdasd");
  console.log(Ordenes);
  res.status(200).send(Ordenes);
});

router.module.exports = router;

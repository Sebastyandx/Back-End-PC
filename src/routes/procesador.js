const { Router } = require("express");
const router = Router();

const {
  getAllproces,
  createProces,
  deleteProces,
  changeProces,
} = require("./Controllers/ProcessorController");

router.get("/", async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      let procesador = await getAllproces(id);
      return res.status(200).send(procesador);
    } else {
      let todos = await getAllproces();
      return res.status(200).send(todos);
    }
  } catch (err) {
    return res.status(200).send(err);
  }
});

router.post("/", async (req, res) => {
  const { name, brand, img, details, cost } = req.body;

  try {
    if (!name || !brand || !cost) {
      res.status(404).send("Argumentos insuficientes");
    } else {
      res.status(200).send(await createProces(name, brand, img, details, cost));
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      return res.status(404).send("Argumento ID Insuficiente");
    } else {
      return res.status(200).send(await deleteProces(id));
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


router.put("/", async (req, res) => {
  const { name, brand, img, details, cost, id } = req.body;
  // const { id } = req.params;

  console.log(name, brand, img, details, cost, id)
  try {
    if (!id) {
      return res.status(400).send("Argumento ID no Valido");
    } else {
      return res
        .status(200)
        .json(await changeProces(name, brand, img, details, cost, id));
    }
  } catch (error) {
    res.status(404).send(error);
  }
});


module.exports = router;

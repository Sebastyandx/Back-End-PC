const { Router } = require("express");
const router = Router();
const { Producto } = require("../db.js");
const { authAdmin } = require("../middlewares/authAdmin");

router.post("/", authAdmin(["superAdmin"]), async (req, res) => {
  const { stock, productId } = req.body;
  try {
    if (stock !== 0 && !stock) {
      return res.status(400).send("Stock no Enviado");
    }
    if (!productId) {
      return res.status(400).send("Id de Producto a modificar no Enviado");
    }

    await Producto.update({ stock }, { where: { id: productId } });

    const product = await Producto.findByPk(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

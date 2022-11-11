const router = require("express").Router();
const { User, Producto } = require("../db");

router.post("/", async (req, res) => {
  const { productId, userId } = req.body;

  if (!productId || !userId) {
    return res.status(400).send("Parametros insuficientes");
  }

  try {
    const product = await Producto.findByPk(productId);
    const user = await User.findByPk(userId);

    await User.update(
      { favoritos: [...user.favoritos, product] },
      { where: { id: userId } }
    );
    res.send(
      `Producto ${product.name} Agregado a Favoritos del Usuario ${user.firstName}`
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      return res.status(400).send("Id de Usuario no dado");
    }

    const user = await User.findByPk(userId);
    res.status(200).send(user.favoritos);

  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

const router = require("express").Router();
const { User, Cart } = require("../db");
const userExtractor = require("../middlewares/userExtractor");

router.post("/get", async (req, res) => {
  const { id } = req.body;
  try {
    // const { userId } = req;
    const getUserDb = await User.findOne({ where: { id: id }, include: Cart });
    res.status(200).json(getUserDb);
  } catch (error) {
    res.json({ error: "Ocurrio un error en traer los productos del carrito" });
  }
});

router.post("", async (req, res) => {
  const { id, productosCarrito } = req.body;
  try {
    // const { userId } = req;
    await Cart.bulkCreate(productosCarrito);
    const getUserDb = await User.findByPk(id);

    let carritoIds = productosCarrito.map((e) => e.id);

    const addedToCart = await getUserDb.addCart(carritoIds);

    res.status(200).json(`items added ${addedToCart}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

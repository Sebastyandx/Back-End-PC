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
    res.send(error.message);
  }
});

router.post("/delete", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const cartItem = await Cart.findByPk(id);
    if (!cartItem) {
      return res.status(400).send("Error Item del Carrito Inexistente");
    } else {
      cartItem.destroy();
      res.status(200).send(`Item ${cartItem} borrado con exito`);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/create", async (req, res) => {
  const { id, productosCarrito } = req.body;
  try {
    // const { userId } = req;
    if (!productosCarrito) {
      return res.status(200).send("No hay Productos en el carrito");
    }

    if (!id) {
      return res.status(200).send("Id no recibido");
    }
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

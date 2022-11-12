const router = require("express").Router();
const { User, Producto } = require("../db");

router.post("/", async (req, res) => {
  const { productId, userId } = req.body;
  console.log(productId, userId);

  if (!productId || !userId) {
    return res.status(400).send("Parametros insuficientes");
  }

  try {
    const product = await Producto.findByPk(productId);
    const user = await User.findByPk(userId);

    const filterArr = user.favoritos?.filter((p) => p.id === productId);

    if (!filterArr.length) {
      await User.update(
        { favoritos: [...user.favoritos, product] },
        { where: { id: userId } }
      );
      return res
        .status(200)
        .send(
          `Producto ${product.name} Agregado a Favoritos del Usuario ${user.firstName}`
        );
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", async (req, res) => {
  const { id } = req.query;
  try {
    if (!id) {
      return res.status(400).send("Id de Usuario no dado");
    }

    const user = await User.findByPk(id);
    res.status(200).send(user.favoritos);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/delete", async (req, res) => {
  const { productId, userId } = req.body;

  try {
    if (!productId || !userId) {
      return res.status(400).send("Parametros insuficientes");
    }
    const user = await User.findByPk(userId);

    console.log(user.favoritos);
    const filterArr = user.favoritos?.filter((p) => p.id !== productId);

    await User.update({ favoritos: filterArr }, { where: { id: userId } });

    console.log(filterArr);

    res
      .status(200)
      .send(
        `Producto con el ID ${productId} Eliminado de Favoritos del Usuario ${user.firstName}`
      );
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/deleteAll", async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) {
      return res.status(400).send("Parametros insuficientes");
    }
    const user = await User.findByPk(userId);

    await User.update({ favoritos: [] }, { where: { id: userId } });

    res
      .status(200)
      .send(
        `Todos los Productos Eliminados de Favoritos del Usuario ${user.firstName}`
      );
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

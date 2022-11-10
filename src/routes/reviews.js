const router = require("express")();
const { User, Review, Producto } = require("../db");

router.get("/", async (req, res) => {
  const { productoId, userId } = req.query;
  try {
    if (productoId) {
      const producto = await Producto.findByPk(productoId);
      const productReviews = await producto.getReviews({
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName", "userName"],
          },
          {
            model: Producto,
            attributes: ["id", "name", "type"],
          },
        ],
        attributes: ["id", "title", "description", "rating"],
      });
      res.json(productReviews);
    } else if (userId) {
      const user = await User.findByPk(userId);
      const reviewsByUser = await user.getReviews({
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName", "userName"],
          },
          {
            model: Producto,
            attributes: ["id", "name", "type"],
          },
        ],
        attributes: ["id", "title", "description", "rating"],
      });
      res.json(reviewsByUser);
    } else {
      const allReviews = await Review.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName", "userName"],
          },
          {
            model: Producto,
            attributes: ["id", "name", "type"],
          },
        ],
        attributes: ["id", "title", "description", "rating"],
      });
      res.json(allReviews);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  const { title, description, rating, userId, productoId } = req.body;

  try {
    const newReview = await Review.create({ title, description, rating });

    const producto = await Producto.findByPk(productoId);
    const user = await User.findByPk(userId);

    await user.addReview(newReview);
    await producto.addReview(newReview);

    res.send("Reseña creada con éxito");
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put("/", async (req, res) => {
  const { title, description, rating, id } = req.body;

  try {
    const updatedReview = await Review.findByPk(id);
    await updatedReview.update({ title, description, rating });
    res.json(updatedReview);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Review.destroy({
      where: { id },
    });
    res.send("Reseña eliminada con éxito");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;

const { Router } = require("express");
const { getAllProducts } = require("./Controllers/GetAllProductsController");
const router = Router();


router.get("/", authAdmin(["admin"]), async (req, res) => {
  const { name } = req.body;
  try {
    if (name) {
      res.status(200).json(await getAllProducts(name));
    } else {
      res.status(200).json(await getAllProducts());
    }
  } catch (error) {
    res.send(error);
  }
});



module.exports = router;

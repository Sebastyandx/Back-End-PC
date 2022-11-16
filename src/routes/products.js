const { Router } = require("express");
const { Op } = require("sequelize");
const { Producto } = require("../db");
const router = Router();
const { authAdmin } = require("../middlewares/authAdmin");

router.get("/intel", async (req, res) => {
  try {
    const { pcType } = req.query;
    console.log(pcType);
    const Products = await Producto.findAll();
    const intelProducts = Products.filter(
      (e) => e.brand !== "AMD" && e.brand !== "Radeon AMD"
    );
    if (!pcType) {
      return res.status(200).json(intelProducts);
    }

    if (pcType === "baja") {
      const gamaBaja = intelProducts.filter(
        (e) =>
          e.details.Gama !== "media" &&
          e.details.Gama !== "alta" &&
          e.details.Gama !== "muy alta"
      );
      console.log(gamaBaja);
      return res.status(200).json(gamaBaja);
    }
    if (pcType === "media") {
      const gamaMedia = intelProducts.filter(
        (e) =>
          e.details.Gama !== "baja" &&
          e.details.Gama !== "alta" &&
          e.details.Gama !== "muy alta"
      );
      console.log(gamaMedia);
      return res.status(200).json(gamaMedia);
    }
    if (pcType === "alta") {
      const gamaAlta = intelProducts.filter(
        (e) =>
          e.details.Gama !== "media" &&
          e.details.Gama !== "baja" &&
          e.details.Gama !== "muy alta"
      );
      console.log(gamaAlta);
      return res.status(200).json(gamaAlta);
    }
    if (pcType === "muy alta") {
      const gamaMuyAlta = intelProducts.filter(
        (e) =>
          e.details.Gama !== "media" &&
          e.details.Gama !== "baja" &&
          e.details.Gama !== "alta"
      );
      console.log(gamaMuyAlta);
      return res.status(200).json(gamaMuyAlta);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/amd", async (req, res) => {
  try {
    const { pcType } = req.query;
    console.log(pcType);
    const Products = await Producto.findAll();
    const amdProducts = Products.filter((e) => e.brand !== "Intel");
    if (!pcType) {
      return res.status(200).json(amdProducts);
    }

    if (pcType === "baja") {
      const gamaBaja = amdProducts.filter(
        (e) =>
          e.details.Gama !== "media" &&
          e.details.Gama !== "alta" &&
          e.details.Gama !== "muy alta"
      );
      console.log(gamaBaja);
      return res.status(200).json(gamaBaja);
    }
    if (pcType === "media") {
      const gamaMedia = amdProducts.filter(
        (e) =>
          e.details.Gama !== "baja" &&
          e.details.Gama !== "alta" &&
          e.details.Gama !== "muy alta"
      );
      console.log(gamaMedia);
      return res.status(200).json(gamaMedia);
    }
    if (pcType === "alta") {
      const gamaAlta = amdProducts.filter(
        (e) =>
          e.details.Gama !== "media" &&
          e.details.Gama !== "baja" &&
          e.details.Gama !== "muy alta"
      );
      console.log(gamaAlta);
      return res.status(200).json(gamaAlta);
    }
    if (pcType === "muy alta") {
      const gamaMuyAlta = amdProducts.filter(
        (e) =>
          e.details.Gama !== "media" &&
          e.details.Gama !== "baja" &&
          e.details.Gama !== "alta"
      );
      console.log(gamaMuyAlta);
      return res.status(200).json(gamaMuyAlta);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/enabled", async (req, res) => {
  try {
    const removedProducts = await Producto.findAll({
      where: {
        enabled: false,
      },
    });
    res.json(removedProducts);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const findByName = await Producto.findOne({
        where: { name, enabled: true },
      });
      res.status(200).json(findByName);
    }
    const filters = req.query;
    if (filters) {
      const allProducts = await Producto.findAll({
        where: { enabled: true },
      });
      const filteredProducts = allProducts.filter((elem) => {
        let isValid = true;
        for (key in filters) {
          // console.log(key, elem[key], filters[key]);
          isValid = isValid && elem[key].toString() === filters[key];
        }
        return isValid;
      });
      res.json(filteredProducts);
    } else {
      const allProducts = await Producto.findAll({
        where: { enabled: true },
      });
      res.json(allProducts);
    }
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const detailProduct = await Producto.findByPk(id);
    res.json(detailProduct);
  } catch (error) {
    res.json(error.message);
  }
});

// , authAdmin(["admin"])
router.post("/create", authAdmin(["admin"]), async (req, res) => {
  const { name, brand, cost, type, img, details } = req.body;
  console.log(req.body);
  try {
    if (!name || !brand || !cost || !type) {
      return res
        .status(404)
        .send("no se enviaron los requerimientos necesesarios");
    }
    const productCreate = await Producto.create({
      name,
      brand,
      cost,
      type,
      img,
      details,
    });
    res.json(productCreate);
  } catch (error) {
    res.send(error);
  }
});

// , authAdmin(["admin"])
router.put("/", authAdmin(["admin"]), async (req, res) => {
  const { name, brand, img, details, cost, type } = req.body;
  const { id } = req.query;
  try {
    const productSelected = await Producto.findByPk(id);
    await productSelected.update({ name, brand, img, details, cost, type });
    res.status(200).send(`Producto Actualizado`);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/restore/:id", authAdmin(["admin"]), async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Producto.findByPk(id);
    await product.update({ enabled: true });
    res.send("Proucto Restaurado");
  } catch (error) {
    res.send(error);
  }
});

// Ruta para "eliminar", cambio enabled a false, no se elimina de la db
// , authAdmin(["admin"])
router.put("/:id", authAdmin(["admin"]), async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Producto.findByPk(id);
    await product.update({ enabled: false });
    res.json(`Producto ${whatProduct} eliminado`);
  } catch (error) {
    res.send(error);
  }
});



module.exports = router;

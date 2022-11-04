const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const allProducts = require("./products.js");
const users = require("./users");
const usersLogin = require("./login");
const cart = require("./cart");
const stripe = require("./pasarela");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/productos", allProducts);

router.use("/user/create", users);
router.use("/user/login", usersLogin);
router.use("/cart", cart);
router.use("/create-checkout-session", stripe);
module.exports = router;

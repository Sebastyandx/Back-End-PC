const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pasarela = require("./pasarela.js");
const allProducts = require('./products.js');
const users = require('./users')
const usersLogin = require('./login')
const cart = require('./cart')
const reviews = require('./reviews')
const router = Router();
const discount = require("./discount.js");
const stock = require("./stock.js");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/productos", allProducts);
router.use("/user/create", users);
router.use("/user/login", usersLogin);
router.use("/cart", cart);
router.use("/discount", discount);
router.use("/stock", stock);
router.use("/create-checkout-session", pasarela);
router.use('/reviews', reviews)

module.exports = router;

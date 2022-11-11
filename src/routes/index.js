const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const users = require("./users");
const pago = require("./pasarela");
const allProducts = require('./products.js');
const usersLogin = require('./login')
const cart = require('./cart')
const reviews = require('./reviews')
const router = Router();
const discount = require("./discount.js");
const stock = require("./stock.js");
const favoritos = require("./favoritos.js");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/productos", allProducts);
router.use("/user/create", users);
router.use("/user/login", usersLogin);
router.use("/cart", cart);
router.use("/pago", pago);
router.use("/discount", discount);
router.use("/stock", stock);
router.use("/favoritos", favoritos);
router.use('/reviews', reviews)

module.exports = router;

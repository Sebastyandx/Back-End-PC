const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const allProducts = require('./products.js');
const users = require('./users')
const usersLogin = require('./login')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/productos", allProducts);
router.use("/users/create", users)
router.use("/users/login", usersLogin)
module.exports = router;

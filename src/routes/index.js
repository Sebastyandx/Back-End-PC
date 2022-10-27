const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerMother = require('./motherBoard.js');
const RuterProcesador = require("./procesador.js");
const allProducts = require('./getAllProducts');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/products", allProducts)
router.use("/motherBoard", routerMother);
router.use("/procesadores", RuterProcesador);

module.exports = router;

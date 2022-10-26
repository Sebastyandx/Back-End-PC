const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerMother = require('./motherBoard.js');
const RuterProcesador = require("./Controllers/DataBase/ProcesadoresController");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/motherBoard", routerMother);
router.use("/procesadores", RuterProcesador);

module.exports = router;

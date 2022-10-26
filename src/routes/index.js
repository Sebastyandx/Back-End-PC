const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRoute = require("./pokemons");
const typeRoute = require("./type");
const motherBoard = require('./motherBoard.js');
const RuterProcesador = require("../routes/Controllers/ProcesadoresController");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/motherBoard", motherBoard
router.use("/procesadores", RuterProcesador);

module.exports = router;

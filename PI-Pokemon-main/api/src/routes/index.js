const { Router } = require('express');
const pokemonGetRouter = require('./pokemonGetRouter.js');
const pokemonPostRouter = require('./pokemonPostRouter.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

mainRouter.use('/pokemons', pokemonGetRouter);
mainRouter.use('/pokemons', pokemonPostRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = mainRouter;

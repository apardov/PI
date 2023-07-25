// Objetivo: exportar los routers de pokemonGetRouter y pokemonPostRouter

// Require de express y de los routers
const { Router } = require('express');
const pokemonGetRouter = require('./pokemonGetRouter.js');
const pokemonPostRouter = require('./pokemonPostRouter.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router(); //Router de express

mainRouter.use('/pokemons', pokemonGetRouter); //Ruta para obtener todos los pokemons
mainRouter.use('/pokemons', pokemonPostRouter); //Ruta para crear un pokemon

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = mainRouter;

//Objetivo : rutas para el metodo POST para crear un pokemon en la base de datos

//Require de express y de los handlers
const { Router } = require('express');
const { postPokemonCreateHandler } = require('../handlers/pokemonPostHandlers');

const pokemonPostRouter = Router(); //Router de express

pokemonPostRouter.post("/", postPokemonCreateHandler); //Ruta para crear un pokemon

module.exports = pokemonPostRouter; //Exporto el router para usarlo en el index.js de la carpeta routes


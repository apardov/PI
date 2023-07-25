//Objetivo: Ruta para obtener los pokemons

//Require de express y de los handlers
const { Router } = require('express');
const { getPokemonsHandler, getPokemonByIdHandler, getPokemonTypesHandler } = require('../handlers/pokemonGetHandlers.js'); //Handlers de los metodos GET
const pokemonRouter = Router(); //Router de express

pokemonRouter.get("/", getPokemonsHandler); //Ruta para obtener todos los pokemons
pokemonRouter.get("/types", getPokemonTypesHandler); //Ruta para obtener todos los tipos de pokemons
pokemonRouter.get("/:id", getPokemonByIdHandler); //Ruta para obtener un pokemon por id

module.exports = pokemonRouter;

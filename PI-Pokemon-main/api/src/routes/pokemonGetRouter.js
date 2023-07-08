const { Router } = require('express');
const { getPokemonsHandler, getPokemonByIdHandler, getPokemonTypesHandler } = require('../handlers/pokemonGetHandlers.js');
const pokemonRouter = Router();

pokemonRouter.get("/", getPokemonsHandler);
pokemonRouter.get("/types", getPokemonTypesHandler);
pokemonRouter.get("/:id", getPokemonByIdHandler);

module.exports = pokemonRouter;

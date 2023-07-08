const { Router } = require('express');
const { postPokemonCreateHandler } = require('../handlers/pokemonPostHandlers');

const pokemonPostRouter = Router();

pokemonPostRouter.post("/", postPokemonCreateHandler);

module.exports = pokemonPostRouter;


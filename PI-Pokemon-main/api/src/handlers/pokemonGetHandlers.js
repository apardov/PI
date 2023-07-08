const { getPokemonById, getAllPokemons, searchPokemonsByName, getAllTypesPokemon } = require("../controllers/pokemonGetControllers");
const { Pokemons } = require('../db');
const axios = require('axios');


const getPokemonsHandler = async (req, res) => {
    const { name } = req.query;
    try {
        const results = name ? await searchPokemonsByName(name.toLowerCase()) : await getAllPokemons();
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Pokemon no encontrado" });
    }
    
};

const getPokemonByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const pokemon = await getPokemonById(id, source);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });    
    }
};

const getPokemonTypesHandler  = async (req, res) => {

    try {
        const results = await getAllTypesPokemon();
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

module.exports = { getPokemonsHandler, getPokemonByIdHandler, getPokemonTypesHandler};
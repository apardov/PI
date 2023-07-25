//Objetivo : rutas para el metodo GET para obtener pokemons, tipos, por ID, por nombre  de la base de datos y de la api
//Require de express y de los handlers
const { getPokemonById, getAllPokemons, searchPokemonsByName, getAllTypesPokemon } = require("../controllers/pokemonGetControllers");
const { Pokemons } = require('../db');
const axios = require('axios');


const getPokemonsHandler = async (req, res) => { //Recibe el nombre del pokemon por query
    const { name } = req.query; //Extraigo el nombre del query
    try {
        const results = name ? await searchPokemonsByName(name.toLowerCase()) : await getAllPokemons(); //Si existe el nombre, busco el pokemon por nombre, sino obtengo todos los pokemons
        res.status(200).json(results); //Devuelvo los resultados
    } catch (error) {
        res.status(400).json({ error: "Pokemon no encontrado" }); //Devuelvo un mensaje de error
    }
    
};

const getPokemonByIdHandler = async (req, res) => { //Recibe el id del pokemon por params
    const { id } = req.params; //Extraigo el id de los params
    const source = isNaN(id) ? "bdd" : "api"; //Si el id es un numero, busco el pokemon en la base de datos, sino en la api
    try {
        const pokemon = await getPokemonById(id, source); //Busco el pokemon por id en la base de datos o en la api segun corresponda source
        res.status(200).json(pokemon); //Devuelvo el pokemon 
    } catch (error) {
        res.status(400).json({ error: error.message });  //Devuelvo un mensaje de error
    }
};

const getPokemonTypesHandler  = async (req, res) => { //Recibe el nombre del pokemon por query
    try {
        const results = await getAllTypesPokemon(); //Obtengo todos los tipos de pokemons
        res.status(200).json(results); //Devuelvo los resultados
    } catch (error) {
        res.status(400).json({ error: error.message}); //Devuelvo un mensaje de error
    }
};

module.exports = { getPokemonsHandler, getPokemonByIdHandler, getPokemonTypesHandler}; //Exporto los handlers
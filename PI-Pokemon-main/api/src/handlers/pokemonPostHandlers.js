// Objetivo: Crear un pokemon en la base de datos

const { createPokemon } = require("../controllers/pokemonPostControllers");

//Funcion para crear un pokemon
const postPokemonCreateHandler = async (req, res) => { //Recibe los datos del pokemon a crear por body
    try {
        const { name, img, hp, attack, defense, speed, height, weight, types} = req.body; //Extraigo los datos del body
    const newPokemon = await createPokemon(name, img, hp, attack, defense, speed, height, weight, types); //Creo el pokemon en la base de datos
    res.status(201).json("Pokemon creado con exito"); //Devuelvo un mensaje de exito
    } catch (error) {
        res.status(400).json({ message: error.message }); //Devuelvo un mensaje de error
    }
    
};

module.exports = { postPokemonCreateHandler };
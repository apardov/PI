const { createPokemon } = require("../controllers/pokemonPostControllers");


const postPokemonCreateHandler = async (req, res) => {
    try {
        const { name, img, hp, attack, defense, speed, height, weight, types} = req.body;
    const newPokemon = await createPokemon(name, img, hp, attack, defense, speed, height, weight, types);
    res.status(201).json("Pokemon creado con exito");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
};

module.exports = { postPokemonCreateHandler };
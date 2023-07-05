const { createPokemonDB } = require("../controllers/pokemonControllers")

createPokemonHandler = async (req, res) => {
    const {Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, Peso} = req.body;

    try {
        const response = await createPokemonDB(Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, Peso);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    res.status(200).send(`Pokemon ${Nombre} creado correctamente`);
}
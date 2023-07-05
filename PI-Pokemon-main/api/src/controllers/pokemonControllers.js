const {Pokemons} = require("../db");


const createPokemonDB = async (Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, Peso) => {
    return await Pokemons.create({Nombre, Imagen, Vida, Ataque, Defensa, Velocidad, Altura, Peso});
}

module.exports = {createPokemonDB};
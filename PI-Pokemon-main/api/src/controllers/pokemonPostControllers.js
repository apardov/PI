
const { Pokemons, Types } = require('../db');

const createPokemon = async (name, img, hp, attack, defense, speed, height, weight, types) => {
           
        const newPokemon = await Pokemons.create({
                name, 
                img, 
                hp, 
                attack, 
                defense, 
                speed, 
                height, 
                weight,
                
                
        });
        for (const typeName of types) {
                const [foundType] = await Types.findOrCreate({
                    where: { name: typeName },
                });
                await newPokemon.addType(foundType);
            }
            const pokemonWithTypes = await Pokemons.findByPk(newPokemon.id, {
                include: Types,
            });
        
            return pokemonWithTypes;
};

module.exports = { createPokemon };


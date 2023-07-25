//Objetivo : Crear un pokemon en la base de datos

// importamos el modelo de la tabla Pokemons y Types
const { Pokemons, Types } = require('../db');

const createPokemon = async (name, img, hp, attack, defense, speed, height, weight, types) => { //Recibe los datos del pokemon a crear por body
           
        const newPokemon = await Pokemons.create({ //Creo el pokemon en la base de datos
                name, 
                img, 
                hp, 
                attack, 
                defense, 
                speed, 
                height, 
                weight,
                
                
        });
        for (const typeName of types) { //Recorro el array de tipos
                const [foundType] = await Types.findOrCreate({ //Busco el tipo en la base de datos, sino lo creo
                    where: { name: typeName }, //Busco el tipo por nombre
                });
                await newPokemon.addType(foundType); //Agrego el tipo al pokemon
            }
            const pokemonWithTypes = await Pokemons.findByPk(newPokemon.id, { //Busco el pokemon por id y lo incluyo con los tipos que tiene asociados en la base de datos, asi se muestra el pokemon creado con toda su informacion
                include: Types, //Incluyo los tipos
            });
        
            return pokemonWithTypes; //Devuelvo el pokemon con los tipos
};

module.exports = { createPokemon }; //Exporto el controller


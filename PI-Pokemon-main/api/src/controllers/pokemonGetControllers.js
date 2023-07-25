//Objetivo : obtener los pokemons de la base de datos y de la api por id, por nombre, todos los pokemons y todos los tipos de pokemons

// importamos el modelo de la tabla Pokemons y Types
const { Pokemons, Types } = require('../db');
const axios = require('axios');

const getPokemonById = async (id, source) => { //Recibe el id del pokemon por params y la fuente de donde obtener el pokemon
    if(source === "api"){ //Si la fuente es la api
        const pokemonDetailsRaw = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data //Obtengo el pokemon por id de la api
        return cleanPokemonById(pokemonDetailsRaw); //Devuelvo el pokemon limpio de la api utilizando la funcion cleanPokemonById 

        
    }else{
        const pokemon = await Pokemons.findByPk(id, { //Busco el pokemon por id en la base de datos
            include: [{ model: Types, through: 'Pokemons_Types', as: 'Types' }] //Incluyo los tipos
        });
        if (pokemon) { //Si existe el pokemon
            const types = pokemon.Types.map(type => type.name); //Obtengo los tipos
            const { Types, ...pokemonData } = pokemon.toJSON(); //Extraigo los datos del pokemon
            return { //Devuelvo el pokemon
                ...pokemonData, //Devuelvo los datos del pokemon
                type: types //Devuelvo los tipos
            };
        }
    }
}

const cleanPokemonById = (pokemonDetailsRaw) => { //Recibe los datos del pokemon de la api
    const { id, name, sprites, stats, height, weight, types} = pokemonDetailsRaw; //Extraigo los datos del pokemon
    const hp = stats[0].base_stat;
    const attack = stats[1].base_stat;
    const defense = stats[2].base_stat;
    const speed = stats[5].base_stat;
    const img = sprites.other["official-artwork"].front_default;
    const type = types.map((type) => type.type.name);
    const created = false;
    return { id, name, img, hp, attack, defense, speed, height, weight, created, type }; //Devuelvo el pokemon limpio
}

const getAllPokemons = async () => { 
    const pokemonsDB = await Pokemons.findAll({ //Obtengo todos los pokemons de la base de datos
      include: [ //Incluyo los tipos
        {
          model: Types,
          through: 'Pokemons_Types',
          attributes: ['name'], 
          
        },
      ],
    });
  
    const pokemonDBClean = pokemonsDB.map(pokemon => { //Recorro los pokemons
      const types = pokemon.Types.map(type => type.name); //Obtengo los tipos
      return { //Devuelvo el pokemon con los tipos y los datos del pokemon
        id: pokemon.id,
        name: pokemon.name,
        img: pokemon.img,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
        created: pokemon.created,
        type: types,
      };
    });
  
    const pokemonsAPI = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50")).data.results; //Obtengo los primeros 50 pokemons de la api
    const pokemonDetailsRaw = await Promise.all(pokemonsAPI.map(async (pokemon) => { //Recorro los pokemons
      const response = await axios.get(pokemon.url); //Obtengo el pokemon por url
      return response.data; //Devuelvo los pokemon de la api
    }));
    const pokemonDetails = cleanPokemonDetails(pokemonDetailsRaw); //Limpio los pokemons de la api
  
    const pokemonsResults = [...pokemonDBClean, ...pokemonDetails]; //Devuelvo los pokemons de la base de datos y de la api en un mismo array
    return pokemonsResults; //Devuelvo los pokemons
  };

const cleanPokemonDetails = (pokemonDetails) => { //Recibe los datos de los pokemons de la api
    const cleanPokemonDetails = pokemonDetails.map((pokemon) => { //Recorro los pokemons
        const { id, name, sprites, stats, height, weight, types } = pokemon; //Extraigo los datos del pokemon
        const hp = stats[0].base_stat;
        const attack = stats[1].base_stat;
        const defense = stats[2].base_stat;
        const speed = stats[5].base_stat;
        const img = sprites.other["official-artwork"].front_default;
        const type = types.map((type) => type.type.name);
        const created = false;
        return { id, name, img, hp, attack, defense, speed, height, weight, created, type }; //Devuelvo el pokemon limpio
    });
    return cleanPokemonDetails; //Devuelvo los pokemons limpios
};

const getAllTypesPokemon = async () => { //Obtiene todos los tipos de pokemons
    const pokemosnTypesDB = await Types.findAll(); //Obtengo todos los tipos de pokemons de la base de datos
    if(pokemosnTypesDB.length === 0){ //Si no hay tipos de pokemons en la base de datos
        const pokemonsAPI = (await axios.get("https://pokeapi.co/api/v2/type")).data.results; //Obtengo todos los tipos de pokemons de la api
        const pokemonTypes = pokemonsAPI.map((pokemon) => { //Recorro los tipos de pokemons
            const { name } = pokemon; //Extraigo el nombre del tipo de pokemon
            return { name}; //Devuelvo el nombre del tipo de pokemon
        });
        await Types.bulkCreate(pokemonTypes); //Creo los tipos de pokemons en la base de datos
        return pokemonTypes; //Devuelvo los tipos de pokemons
    }else{ 
        return pokemosnTypesDB; //Devuelvo los tipos de pokemons
    }   
}

const searchPokemonsByName = async (name) => { //Recibe el nombre del pokemon por query
    const pokemonsDB = await Pokemons.findAll({ //Busco el pokemon por nombre en la base de datos
      where: { name: name }, //Busco el pokemon por nombre
      include: [ //Incluyo los tipos
        {
          model: Types,
          through: 'Pokemons_Types',
          attributes: ['name'],
          
        },
      ],
    });
  
    let pokemonsResults = []; //Creo un array vacio
  
    if (pokemonsDB.length > 0) { //Si existe el pokemon en la base de datos
        pokemonsResults = pokemonsDB.map((pokemon) => { //Recorro los pokemons
          const { Types, ...pokemonData } = pokemon.dataValues; //Extraigo los datos del pokemon
          const type = Types.map((type) => type.name); //Obtengo los tipos
          return { ...pokemonData, type }; //Devuelvo el pokemon
        });
      }else{ //Si no existe el pokemon en la base de datos
        try {
          const pokemonDetailsByNameRaw = (await axios.get( //Obtengo el pokemon por nombre de la api
            `https://pokeapi.co/api/v2/pokemon/${name}` //Busco el pokemon por nombre
          )).data; 
      
          const pokemonDetailsByName = cleanPokemonByName(pokemonDetailsByNameRaw); //Limpio el pokemon de la api
      
          pokemonsResults.push(pokemonDetailsByName); //Agrego el pokemon al array
        } catch (error) {
        }
      }
    
    return pokemonsResults; //Devuelvo el pokemon
  };

const cleanPokemonByName = (pokemonDetailsByNameRaw) => { //Recibe los datos del pokemon de la api
    const { id, name, sprites, stats, height, weight, types } = pokemonDetailsByNameRaw; //Extraigo los datos del pokemon
    const hp = stats[0].base_stat;
    const attack = stats[1].base_stat;
    const defense = stats[2].base_stat;
    const speed = stats[5].base_stat;
    const img = sprites.other["official-artwork"].front_default;
    const type = types.map((type) => type.type.name);
    const created = false;
    return { id, name, img, hp, attack, defense, speed, height, weight, created, type }; //Devuelvo el pokemon limpio
}

module.exports = { getPokemonById, getAllPokemons, cleanPokemonDetails, searchPokemonsByName, getAllTypesPokemon }; //Exporto los controllers
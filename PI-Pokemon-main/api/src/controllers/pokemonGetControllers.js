const { Pokemons, Types } = require('../db');
const axios = require('axios');

const getPokemonById = async (id, source) => {
    if(source === "api"){
        const pokemonDetailsRaw = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
        return cleanPokemonById(pokemonDetailsRaw);

        
    }else{
        const pokemon = await Pokemons.findByPk(id, {
            include: [{ model: Types, through: 'Pokemons_Types', as: 'Types' }]
        });
        if (pokemon) {
            const types = pokemon.Types.map(type => type.name);
            // Ignorar la propiedad 'Types' en el resultado final
            const { Types, ...pokemonData } = pokemon.toJSON(); 
            return {
                ...pokemonData,
                type: types
            };
        }
    }
}

const cleanPokemonById = (pokemonDetailsRaw) => {
    const { id, name, sprites, stats, height, weight, types} = pokemonDetailsRaw;
    const hp = stats[0].base_stat;
    const attack = stats[1].base_stat;
    const defense = stats[2].base_stat;
    const speed = stats[5].base_stat;
    const img = sprites.other["official-artwork"].front_default;
    const type = types.map((type) => type.type.name);
    const created = false;
    return { id, name, img, hp, attack, defense, speed, height, weight, created, type };
}

const getAllPokemons = async () => {
    const pokemonsDB = await Pokemons.findAll({
      include: [
        {
          model: Types,
          through: 'Pokemons_Types',
          attributes: ['name'],
          
        },
      ],
    });
  
    const pokemonDBClean = pokemonsDB.map(pokemon => {
      const types = pokemon.Types.map(type => type.name);
      return {
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
  
    const pokemonsAPI = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50")).data.results;
    const pokemonDetailsRaw = await Promise.all(pokemonsAPI.map(async (pokemon) => {
      const response = await axios.get(pokemon.url);
      return response.data;
    }));
    const pokemonDetails = cleanPokemonDetails(pokemonDetailsRaw);
  
    const pokemonsResults = [...pokemonDBClean, ...pokemonDetails];
    return pokemonsResults;
  };

const cleanPokemonDetails = (pokemonDetails) => {
    const cleanPokemonDetails = pokemonDetails.map((pokemon) => {
        const { id, name, sprites, stats, height, weight, types } = pokemon;
        const hp = stats[0].base_stat;
        const attack = stats[1].base_stat;
        const defense = stats[2].base_stat;
        const speed = stats[5].base_stat;
        const img = sprites.other["official-artwork"].front_default;
        const type = types.map((type) => type.type.name);
        const created = false;
        return { id, name, img, hp, attack, defense, speed, height, weight, created, type };
    });
    return cleanPokemonDetails;
};

const getAllTypesPokemon = async () => {
    const pokemosnTypesDB = await Types.findAll();
    if(pokemosnTypesDB.length === 0){
        const pokemonsAPI = (await axios.get("https://pokeapi.co/api/v2/type")).data.results;
        const pokemonTypes = pokemonsAPI.map((pokemon) => {
            const { name } = pokemon;
            return { name};
        });
        await Types.bulkCreate(pokemonTypes);
        return pokemonTypes;
    }else{ 
        return pokemosnTypesDB;
    }   
}

const searchPokemonsByName = async (name) => {
    const pokemonsDB = await Pokemons.findAll({
      where: { name: name },
      include: [
        {
          model: Types,
          through: 'Pokemons_Types',
          attributes: ['name'],
          
        },
      ],
    });
  
    let pokemonsResults = [];
  
    if (pokemonsDB.length > 0) {
        pokemonsResults = pokemonsDB.map((pokemon) => {
          const { Types, ...pokemonData } = pokemon.dataValues;
          const type = Types.map((type) => type.name);
          return { ...pokemonData, type };
        });
      }
    try {
      const pokemonDetailsByNameRaw = (await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      )).data;
  
      const pokemonDetailsByName = cleanPokemonByName(pokemonDetailsByNameRaw);
  
      pokemonsResults.push(pokemonDetailsByName);
    } catch (error) {
    }
    return pokemonsResults;
  };

const cleanPokemonByName = (pokemonDetailsByNameRaw) => {
    const { id, name, sprites, stats, height, weight, types } = pokemonDetailsByNameRaw;
    const hp = stats[0].base_stat;
    const attack = stats[1].base_stat;
    const defense = stats[2].base_stat;
    const speed = stats[5].base_stat;
    const img = sprites.other["official-artwork"].front_default;
    const type = types.map((type) => type.type.name);
    const created = false;
    return { id, name, img, hp, attack, defense, speed, height, weight, created, type };
}

module.exports = { getPokemonById, getAllPokemons, cleanPokemonDetails, searchPokemonsByName, getAllTypesPokemon };
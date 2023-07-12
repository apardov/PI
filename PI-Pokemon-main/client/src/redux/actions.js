import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const SORT_POKEMONS = 'SORT_POKEMONS';


export const getPokemons = () => {

    return async function(dispatch){
        const apiData = await axios.get('http://localhost:3001/pokemons');
        const pokemonsData = apiData.data;
        dispatch({ type: GET_POKEMONS, payload: pokemonsData });
    }
};

export const getPokemonById = (id) => {
    return async function(dispatch){
        const apiData = await axios.get(`http://localhost:3001/pokemons/${id}`);
        const pokemonData = apiData.data;
        dispatch({ type: GET_POKEMON_BY_ID, payload: pokemonData });
    }
}

export const getPokemonByName = (name) => {
    return async function(dispatch){
        const apiData = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
        const pokemonData = apiData.data;
        dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemonData });
    }
}

export const sortPokemons = (sortBy, sortOrder) => {
    return {
      type: SORT_POKEMONS,
      payload: {
        sortBy,
        sortOrder,
      },
    };
  };


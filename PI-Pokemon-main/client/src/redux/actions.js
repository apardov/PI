
// Importaciones de dependencias
import axios from 'axios';

// Constantes
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';

// Funcion (actions) que obtienen los datos de todos los pokemon de la API
export const getPokemons = () => {

    return async function(dispatch){
        const apiData = await axios.get('http://localhost:3001/pokemons');
        const pokemonsData = apiData.data;
        dispatch({ type: GET_POKEMONS, payload: pokemonsData });
    }
};

// Funcion (actions) que obtienen los datos de un pokemon por su id
export const getPokemonById = (id) => {
    return async function(dispatch){
        const apiData = await axios.get(`http://localhost:3001/pokemons/${id}`);
        const pokemonData = apiData.data;
        dispatch({ type: GET_POKEMON_BY_ID, payload: pokemonData });
    }
}

// Funcion (actions) que obtienen los datos de un pokemon por su nombre
export const getPokemonByName = (name) => {
    return async function(dispatch){
        const apiData = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
        const pokemonData = apiData.data;
        dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemonData });
    }
}



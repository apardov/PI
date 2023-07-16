// Importaciones de dependencias
import axios from 'axios';

// Constantes
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const SET_SELECTED_TYPE = 'SET_SELECTED_TYPE';
export const GET_TYPES = 'GET_TYPES';
export const SET_FILTERED_POKEMONS = 'SET_FILTERED_POKEMONS';

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

export const setSelectedType = (type) => {
    return {
      type: SET_SELECTED_TYPE,
      payload: type,
    };
  };


  export const getTypes = () => {
    return async function (dispatch) {
      try {
        const apiData = await axios.get('http://localhost:3001/pokemons/types');
        const typesData = apiData.data.map((type) => ({
          id: type.id,
          name: type.name
        }));
        dispatch({ type: GET_TYPES, payload: typesData });
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const setFilteredPokemons = (filteredPokemons) => ({
    type: SET_FILTERED_POKEMONS,
    payload: filteredPokemons,
  });




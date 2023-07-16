import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const SET_SELECTED_TYPE = 'SET_SELECTED_TYPE';
export const GET_TYPES = 'GET_TYPES';
export const SET_FILTERED_POKEMONS_BY_TYPE = 'SET_FILTERED_POKEMONS_BY_TYPE';
export const SET_SELECTED_SOURCE = 'SET_SELECTED_SOURCE';
export const SET_FILTERED_POKEMONS_BY_SOURCE = 'SET_FILTERED_POKEMONS_BY_SOURCE';

export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get('http://localhost:3001/pokemons');
      const pokemonsData = apiData.data;
      dispatch({ type: GET_POKEMONS, payload: pokemonsData });
    } catch (error) {
      // Handle error
    }
  };
};

export const getPokemonById = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/pokemons/${id}`);
      const pokemonData = apiData.data;
      dispatch({ type: GET_POKEMON_BY_ID, payload: pokemonData });
    } catch (error) {

    }
  };
};

export const getPokemonByName = (name) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      const pokemonData = apiData.data;
      dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemonData });
    } catch (error) {
      // Handle error
    }
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get('http://localhost:3001/pokemons/types');
      const typesData = apiData.data.map((type) => ({
        id: type.id,
        name: type.name,
      }));
      dispatch({ type: GET_TYPES, payload: typesData });
    } catch (error) {
      // Handle error
    }
  };
};

export const setSelectedType = (selectedType) => {
  return {
    type: SET_SELECTED_TYPE,
    payload: selectedType,
  };
};

export const setFilteredPokemonsByType = (filteredPokemons) => ({
  type: SET_FILTERED_POKEMONS_BY_TYPE,
  payload: filteredPokemons,
});

export const setSelectedSource = (source) => ({
  type: SET_SELECTED_SOURCE,
  payload: source,
});

export const setFilteredPokemonsBySource = (filteredPokemons) => ({
  type: SET_FILTERED_POKEMONS_BY_SOURCE,
  payload: filteredPokemons,
});




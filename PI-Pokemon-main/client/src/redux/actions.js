import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const SET_SELECTED_TYPE = 'SET_SELECTED_TYPE';
export const GET_TYPES = 'GET_TYPES';
export const SET_SELECTED_SOURCE = 'SET_SELECTED_SOURCE';
export const SET_FILTERED_POKEMONS_BY_SOURCE = 'SET_FILTERED_POKEMONS_BY_SOURCE';
export const SET_SORTING_ORDER = 'SET_SORTING_ORDER';
export const SET_ATTACK_SORTING_ORDER = 'SET_ATTACK_SORTING_ORDER';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

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

export const setSelectedSource = (source) => ({
  type: SET_SELECTED_SOURCE,
  payload: source,
});

export const setFilteredPokemonsBySource = (filteredPokemons) => ({
  type: SET_FILTERED_POKEMONS_BY_SOURCE,
  payload: filteredPokemons,
});

export const setSortingOrder = (sortingOrder) => ({
  type: SET_SORTING_ORDER,
  payload: sortingOrder,
});

export const setAttackSortingOrder = (sortingOrder) => ({
  type: SET_ATTACK_SORTING_ORDER,
  payload: sortingOrder,
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});




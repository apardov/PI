//Objetivo: Contiene las acciones que se ejecutan en la aplicación

// importaciones de dependencias
import axios from 'axios';

// constantes
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

export const getPokemons = () => { // obtiene los pokemons del servidor 
  return async function (dispatch) {
    try {
      const apiData = await axios.get('http://localhost:3001/pokemons');  // obtiene los pokemons del servidor
      const pokemonsData = apiData.data; // guarda los pokemons en una variable
      dispatch({ type: GET_POKEMONS, payload: pokemonsData }); // actualiza el estado de la aplicación
    } catch (error) {
      alert('Error al cargar los pokemons'); // si hay un error, muestra un mensaje
    }
  };
};

export const getPokemonById = (id) => { // obtiene un pokemon por id
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/pokemons/${id}`); // obtiene un pokemon por id
      const pokemonData = apiData.data; // guarda el pokemon en una variable
      dispatch({ type: GET_POKEMON_BY_ID, payload: pokemonData }); // actualiza el estado de la aplicación
    } catch (error) {
      alert('Error al cargar el pokemon'); // si hay un error, muestra un mensaje
    }
  };
};

export const getPokemonByName = (name) => { // obtiene un pokemon por nombre
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`http://localhost:3001/pokemons?name=${name}`); // obtiene un pokemon por nombre
      const pokemonData = apiData.data; // guarda el pokemon en una variable
      dispatch({ type: GET_POKEMON_BY_NAME, payload: pokemonData }); // actualiza el estado de la aplicación
    } catch (error) {
      alert('Error al cargar el pokemon'); // si hay un error, muestra un mensaje
    }
  };
};

export const getTypes = () => { // obtiene los tipos de pokemon
  return async function (dispatch) {
    try {
      const apiData = await axios.get('http://localhost:3001/pokemons/types'); // obtiene los tipos de pokemon
      const typesData = apiData.data.map((type) => ({ // guarda los tipos de pokemon en una variable
        id: type.id,
        name: type.name,
      }));
      dispatch({ type: GET_TYPES, payload: typesData }); // actualiza el estado de la aplicación
    } catch (error) {
      alert('Error al cargar los tipos de pokemon'); // si hay un error, muestra un mensaje
    }
  };
};

export const setSelectedType = (selectedType) => { // guarda el tipo de pokemon seleccionado
  return {
    type: SET_SELECTED_TYPE, // actualiza el estado de la aplicación
    payload: selectedType,
  };
};

export const setSelectedSource = (source) => ({ // guarda la source api o bd seleccionada
  type: SET_SELECTED_SOURCE, // actualiza el estado de la aplicación
  payload: source,
});

export const setFilteredPokemonsBySource = (filteredPokemons) => ({ // guarda los pokemons filtrados por source
  type: SET_FILTERED_POKEMONS_BY_SOURCE, // actualiza el estado de la aplicación
  payload: filteredPokemons,
});

export const setSortingOrder = (sortingOrder) => ({ // guarda el orden de los pokemons por nombre a - z o z - a
  type: SET_SORTING_ORDER, // actualiza el estado de la aplicación
  payload: sortingOrder,
});

export const setAttackSortingOrder = (sortingOrder) => ({ // guarda el orden de los pokemon por ataque por min - max o max - min
  type: SET_ATTACK_SORTING_ORDER,  // actualiza el estado de la aplicación
  payload: sortingOrder,
});

export const setCurrentPage = (currentPage) => ({ // guarda la pagina actual
  type: SET_CURRENT_PAGE, // actualiza el estado de la aplicación
  payload: currentPage,
});




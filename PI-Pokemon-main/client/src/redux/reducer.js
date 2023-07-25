//Objetivo : Reducer que se encarga de actualizar el estado de la aplicación

//Importaciones 
import {
    GET_POKEMONS,
    GET_POKEMON_BY_ID,
    GET_POKEMON_BY_NAME,
    SET_SELECTED_TYPE,
    GET_TYPES,
    SET_SELECTED_SOURCE,
    SET_FILTERED_POKEMONS_BY_SOURCE,
    SET_SORTING_ORDER,
    SET_ATTACK_SORTING_ORDER,
    SET_CURRENT_PAGE,
  } from './actions';
  
  const initialState = { // Estados iniciales de la aplicación (pokemons, pokemonDetails, selectedType, types, selectedSource, filteredPokemons, sortingOrder, attackSortingOrder, currentPage)
    pokemons: [],
    pokemonDetails: [],
    selectedType: '',
    types: [],
    selectedSource: '',
    filteredPokemons: [],
    sortingOrder: '',
    attackSortingOrder: '',
    currentPage: 1,
  };
  
  const reducer = (state = initialState, action) => {  // Reducer que se encarga de actualizar el estado de la aplicación
    switch (action.type) {
      case GET_POKEMONS: // Obtiene todos los pokemons
        return {
          ...state,
          pokemons: action.payload,
        };
      case GET_POKEMON_BY_ID: // Obtiene un pokemon por id
        return { ...state,
          pokemonDetails: action.payload,
        };
      case GET_POKEMON_BY_NAME: // Obtiene un pokemon por nombre
        return {...state,
          pokemons: action.payload,
        }; 
      case SET_SELECTED_TYPE: // guardo el tipo seleccionado
        return {
          ...state,
          selectedType: action.payload,
        };
      case GET_TYPES: // obtengo todos los tipos
        return {
          ...state,
          types: action.payload,
        };
      case SET_SELECTED_SOURCE: // guardo la source api o bd seleccionada
        return {
          ...state,
          selectedSource: action.payload,
        };
      case SET_FILTERED_POKEMONS_BY_SOURCE: // guardo los pokemons filtrados por source
        return {
          ...state,
          filteredPokemons: action.payload,
        };
      case SET_SORTING_ORDER: // guardo el orden de filtrado por nombre a - z o z - a
        return {
          ...state,
          sortingOrder: action.payload,
        };
      case SET_ATTACK_SORTING_ORDER: // guardo el orden de filtrado por ataque min - max o max - min
        return {
          ...state,
          attackSortingOrder: action.payload,
        };
      case SET_CURRENT_PAGE: // guardo la pagina actual
        return {
          ...state,
          currentPage: action.payload,
        };
      default: // si no se cumple ninguno de los casos anteriores, devuelvo el estado actual
        return state;
    }
  };
  
  export default reducer;
  
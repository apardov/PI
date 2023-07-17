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
  
  const initialState = {
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
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_POKEMONS:
        return {
          ...state,
          pokemons: action.payload,
        };
      case GET_POKEMON_BY_ID:
        return { ...state,
          pokemonDetails: action.payload,
        };
      case GET_POKEMON_BY_NAME:
        return {...state,
          pokemons: action.payload,} 
      case SET_SELECTED_TYPE:
        return {
          ...state,
          selectedType: action.payload,
        };
      case GET_TYPES:
        return {
          ...state,
          types: action.payload,
        };
      case SET_SELECTED_SOURCE:
        return {
          ...state,
          selectedSource: action.payload,
        };
      case SET_FILTERED_POKEMONS_BY_SOURCE:
        return {
          ...state,
          filteredPokemons: action.payload,
        };
      case SET_SORTING_ORDER:
        return {
          ...state,
          sortingOrder: action.payload,
        };
      case SET_ATTACK_SORTING_ORDER:
        return {
          ...state,
          attackSortingOrder: action.payload,
        };
      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  
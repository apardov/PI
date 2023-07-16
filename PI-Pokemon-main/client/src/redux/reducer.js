import {
    GET_POKEMONS,
    GET_POKEMON_BY_ID,
    GET_POKEMON_BY_NAME,
    SET_SELECTED_TYPE,
    GET_TYPES,
    SET_FILTERED_POKEMONS_BY_TYPE,
    SET_SELECTED_SOURCE,
    SET_FILTERED_POKEMONS_BY_SOURCE,
  } from './actions';
  
  const initialState = {
    pokemons: [],
    pokemonDetails: [],
    selectedType: '',
    types: [],
    filteredPokemonsByType: [],
    selectedSource: '',
    filteredPokemons: [],
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
      case SET_FILTERED_POKEMONS_BY_TYPE:
        return {
          ...state,
          filteredPokemonsByType: action.payload,
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
      default:
        return state;
    }
  };
  
  export default reducer;
  
// importacion de actions
import { GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, SET_SELECTED_TYPE, GET_TYPES, SET_FILTERED_POKEMONS } from "./actions";

// estado inicial de la aplicacion 
const initialState = {
    pokemons: [],
    pokemonDetails: [],
    selectedType: '',
    types: [],
    filteredPokemons: [],
};

// funcion reducer que recibe el estado inicial y la accion a ejecutar
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // en caso de que la accion sea GET_POKEMONS se retorna el estado actual y se agrega el payload
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
            };
        // en caso de que la accion sea GET_POKEMON_BY_ID se retorna el estado actual y se agrega el payload
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                pokemonDetails: action.payload
            };
        // en caso de que la accion sea GET_POKEMON_BY_NAME se retorna el estado actual y se agrega el payload
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemons: action.payload
            }
            case SET_SELECTED_TYPE:
            return {
                ...state,
                selectedType: action.payload,
            };
        // en caso de que la accion no sea ninguna de las anteriores se retorna el estado actual
        case GET_TYPES:
            return {
              ...state,
              types: action.payload,
            };
        case SET_FILTERED_POKEMONS:
            return {
            ...state,
            filteredPokemons: action.payload,
         };
        default:
            return {...state};
    }
}

export default rootReducer;
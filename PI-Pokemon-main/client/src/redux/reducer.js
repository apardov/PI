import { GET_POKEMONS, GET_POKEMON_BY_ID } from "./actions";


const initialState = {
    pokemons: [],
    pokemonDetails: [],
    pokemonsCopy: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                pokemonsCopy: action.payload
            };
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                pokemonDetails: action.payload
            };
        default:
            return {...state};
    }
}

export default rootReducer;
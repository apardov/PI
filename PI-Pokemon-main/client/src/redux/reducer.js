import { GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, SORT_POKEMONS } from "./actions";


const initialState = {
    pokemons: [],
    pokemonDetails: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
            };
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                pokemonDetails: action.payload
            };
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemons: action.payload
            }
            case SORT_POKEMONS:
                // Aplicar el ordenamiento a la lista de pokemones según los valores recibidos
                const { sortBy, sortOrder } = action.payload;
                const sortedPokemons = [...state.pokemons].sort((a, b) => {
                  if (sortBy === 'name') {
                    return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                  } else if (sortBy === 'attack') {
                    return sortOrder === 'asc' ? a.attack - b.attack : b.attack - a.attack;
                  }
                  return 0;
                });
                return {
                  ...state,
                  pokemons: sortedPokemons,
                };
        default:
            return {...state};
    }
}

export default rootReducer;
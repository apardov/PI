const initialState = {
    pokemons: [{
        "id": 14,
        "name": "kakuna",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png",
        "hp": 45,
        "attack": 25,
        "defense": 50,
        "speed": 35,
        "height": 6,
        "weight": 100,
        "created": false,
        "type": [
            "bug",
            "poison"
        ]
    },
    {
        "id": 15,
        "name": "beedrill",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png",
        "hp": 65,
        "attack": 90,
        "defense": 40,
        "speed": 75,
        "height": 10,
        "weight": 295,
        "created": false,
        "type": [
            "bug",
            "poison"
        ]
    },
    {
        "id": 16,
        "name": "pidgey",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png",
        "hp": 40,
        "attack": 45,
        "defense": 40,
        "speed": 56,
        "height": 3,
        "weight": 18,
        "created": false,
        "type": [
            "normal",
            "flying"
        ]
    },
    {
        "id": 17,
        "name": "pidgeotto",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
        "hp": 63,
        "attack": 60,
        "defense": 55,
        "speed": 71,
        "height": 11,
        "weight": 300,
        "created": false,
        "type": [
            "normal",
            "flying"
        ]
    },
    {
        "id": 18,
        "name": "pidgeot",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png",
        "hp": 83,
        "attack": 80,
        "defense": 75,
        "speed": 101,
        "height": 15,
        "weight": 395,
        "created": false,
        "type": [
            "normal",
            "flying"
        ]
    },
    {
        "id": 19,
        "name": "rattata",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png",
        "hp": 30,
        "attack": 56,
        "defense": 35,
        "speed": 72,
        "height": 3,
        "weight": 35,
        "created": false,
        "type": [
            "normal"
        ]
    },
    {
        "id": 20,
        "name": "raticate",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png",
        "hp": 55,
        "attack": 81,
        "defense": 60,
        "speed": 97,
        "height": 7,
        "weight": 185,
        "created": false,
        "type": [
            "normal"
        ]
    }],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return {...state};
    }
}

export default rootReducer;
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", (req, res) => {
    res.status(200).send("Aqui estan todos los pokemones");
});

router.get("/pokemons/:id", (req,res) => {
    res.status(200).send("Detalle de los Pokemones");
});

router.post("/pokemons", (req, res) => {
    res.status(200).send("Crea un Pokemon");
});


module.exports = router;

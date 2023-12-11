const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('frontend'))

app.post('/defeated', (req, res) => {
    const defeatedPokemonData = req.body.defeatedPokemon;
    console.log('Received defeated Pokemon data:', defeatedPokemonData);
    res.sendStatus(200); // Send a success status code
  });
  
  app.post('/captured', (req, res) => {
    const capturedPokemonData = req.body.capturedPokemon;
    console.log('Received captured Pokemon data:', capturedPokemonData);
    res.sendStatus(200); // Send a success status code
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
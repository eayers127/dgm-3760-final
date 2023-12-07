const pokemonNames = ['Bulbasaur', 'Charmander', 'Squirtle'];

  // Initial position of the player icon
  let playerX = 100;
  let playerY = 100;

  const getRandomNumber = () => {
    const randomNum = Math.random();
    const randomOneOrTwo = randomNum * 2;

    const randomNumber = Math.floor(randomOneOrTwo) + 1;

    return randomNumber;
  }

function selectPokemon(pokemonId) {
    selectedPokemon = pokemonId;
    pokemonSelectionModal.style.display = 'none';

    // Display the user's selected Pokemon
    const userPokemonName = document.getElementById('userPokemonName');
    userPokemonName.textContent = `${(pokemonNames[selectedPokemon - 1])}`;
    document.getElementById('box1').style.display = 'block';
  }


document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const playerIcon = document.getElementById('playerIcon');
    const pokemonInfoCard = document.getElementById('pokemonInfoCard');
    const pokemonSelectionModal = document.getElementById('pokemonSelectionModal');


    
    // Variable to store the selected Pokemon
      let selectedPokemon = null;

      // Show the Pokemon selection modal
      pokemonSelectionModal.style.display = 'block';

    // Function to fetch additional Pokemon information
    const fetchPokemonInfo = async (pokemonId) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await response.json();
        return data;
      };

          // Function to update the player icon position
    const updatePlayerPosition = () => {
      playerIcon.style.left = `${playerX}px`;
      playerIcon.style.top = `${playerY}px`;

        if ( playerX == 20 && playerY == 20) {
          console.log(`Player is at Pokemon 1`);
          callPokemon1()
        } else if(playerX == 550 && playerY == 20){
          console.log(`Player is at Pokemon 2`);
          callPokemon2()
        }else if(playerX == 20 && playerY == 550){
          console.log(`Player is at Pokemon 3`);
          callPokemon3()
        }else if(playerX == 550 && playerY == 550){
          console.log(`Player is at Pokemon 4`);
          callPokemon4()
        }
      
    };

    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          playerY -= 10;
          break;
        case 'ArrowDown':
          playerY += 10;
          break;
        case 'ArrowLeft':
          playerX -= 10;
          break;
        case 'ArrowRight':
          playerX += 10;
          break;
        default:
          return;
      }

      // Make sure the player icon stays within the game container
      playerX = Math.max(0, Math.min(playerX, gameContainer.offsetWidth - playerIcon.offsetWidth));
      playerY = Math.max(0, Math.min(playerY, gameContainer.offsetHeight - playerIcon.offsetHeight));

      // Update the player icon position
      updatePlayerPosition();
    };


    // Function to fetch Pokemon image
    const fetchPokemonSprite = async (pokemonId) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await response.json();
      return data.sprites.front_default;
    };


    // Function to update Pokemon icon position
    const updatePokemonPosition = async (pokemonId, posX, posY) => {
      const pokemonIcon = document.getElementById(`pokemon${pokemonId}`);
      const spriteUrl = await fetchPokemonSprite(pokemonId);
      pokemonIcon.src = spriteUrl;
      pokemonIcon.style.left = `${posX}px`;
      pokemonIcon.style.top = `${posY}px`;

      pokemonIcon.addEventListener('click', async () => {
        const pokemonInfo = await fetchPokemonInfo(pokemonId);

        // Display Pokemon information in the card
        pokemonInfoCard.innerHTML = `
          <h2>${pokemonInfo.name}</h2>
          <p>Height: ${pokemonInfo.height}</p>
          <p>Weight: ${pokemonInfo.weight}</p>
          <p>Level: ${pokemonInfo.base_experience}</p>
          <button onclick="closePokemonInfoCard()">Close</button>
        `;

        // Show the Pokemon info card
        pokemonInfoCard.style.display = 'block';
      });
    };

    document.addEventListener('keydown', handleKeyPress);

    updatePlayerPosition();

    updatePokemonPosition(1, 10, 10);
    updatePokemonPosition(2, gameContainer.offsetWidth - 60, 10);
    updatePokemonPosition(3, 10, gameContainer.offsetHeight - 60);
    updatePokemonPosition(4, gameContainer.offsetWidth - 60, gameContainer.offsetHeight - 60);

    
  });

  const closePokemonInfoCard = () => {
    // Hide the Pokemon info card
    document.getElementById('pokemonInfoCard').style.display = 'none';
  };

  function callPokemon1(){
    const battleOptionsCard = document.getElementById('battleOptionsCard');
    battleOptionsCard.innerHTML = `
      <h2>Bulbasaur</h2>
      <button onclick="run()">Run</button>
      <button onclick="fight()">Fight</button>
      <button onclick="capture()">Capture</button>
    `;

    battleOptionsCard.style.display = 'block';
};

function callPokemon2(){
    const battleOptionsCard = document.getElementById('battleOptionsCard');
    battleOptionsCard.innerHTML = `
      <h2>Ivysaur</h2>
      <button onclick="run()">Run</button>
      <button onclick="fight()">Fight</button>
      <button onclick="capture()">Capture</button>
    `;

    battleOptionsCard.style.display = 'block';
};

function callPokemon3(){
    const battleOptionsCard = document.getElementById('battleOptionsCard');
    battleOptionsCard.innerHTML = `
      <h2>Venusaur</h2>
      <button onclick="run()">Run</button>
      <button onclick="fight()">Fight</button>
      <button onclick="capture()">Capture</button>
    `;

    battleOptionsCard.style.display = 'block';

};

function callPokemon4(){
    const battleOptionsCard = document.getElementById('battleOptionsCard');
    battleOptionsCard.innerHTML = `
      <h2>Charmander</h2>
      <button onclick="run()">Run</button>
      <button onclick="fight()">Fight</button>
      <button onclick="capture()">Capture</button>
    `;

    battleOptionsCard.style.display = 'block';
};

const lives = document.getElementById('currentLives')
let currentLives = 3;

function updateLives(){
  currentLives = currentLives - 1;
  lives.innerHTML = currentLives;
}


const fight = () => {
  console.log('Fight!');
  const randomFightResult = getRandomNumber();
  console.log(randomFightResult);
  if(randomFightResult === 1){
    console.log("You defeated Bulbasaur!")
    updateScore(10);
  }else{
    console.log("You lost!")
    updateLives();
    gameOver();
  }
};

function gameOver() {
  if(currentLives === 0){
    document.getElementById('gameOver').style.display = 'block';
  }
}

const run = () => {
  document.getElementById('battleOptionsCard').style.display = 'none';
};

const capture = () => {
    const randomResult = getRandomNumber();
    console.log(randomResult);
    if(randomResult === 1){
      console.log("You captured Bulbasaur!")
      updateScore(5);
    }else{
      console.log("The Pokemon got away!")
    }
    document.getElementById('battleOptionsCard').style.display = 'none';
};

const score = document.getElementById('currentScore')
let currentScore = 0;


function updateScore(points){
  currentScore = currentScore + points;
  score.innerHTML = currentScore;
}



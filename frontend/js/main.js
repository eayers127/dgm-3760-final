const pokemonNames = ['Bulbasaur', 'Charmander', 'Squirtle'];

const pokemonList = document.getElementById('pokemonList');

const defeatedPokemon = [];

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

  let currentPokemon = '';

  function callPokemon1(){
    const battleOptionsCard = document.getElementById('battleOptionsCard');
    battleOptionsCard.innerHTML = `
      <h2>Bulbasaur</h2>
      <button onclick="run()">Run</button>
      <button onclick="fight('Bulbasaur')">Fight</button>
      <button onclick="capture('Bulbasaur')">Capture</button>
    `;

    battleOptionsCard.style.display = 'block';

    return currentPokemon = 'Bulbasaur'
};

function callPokemon2(){
    const battleOptionsCard = document.getElementById('battleOptionsCard');
    battleOptionsCard.innerHTML = `
      <h2>Ivysaur</h2>
      <button onclick="run()">Run</button>
      <button onclick="fight('Ivysaur')">Fight</button>
      <button onclick="capture('Ivysaur')">Capture</button>
    `;

    battleOptionsCard.style.display = 'block';
};

function callPokemon3(){
    const battleOptionsCard = document.getElementById('battleOptionsCard');
    battleOptionsCard.innerHTML = `
      <h2>Venusaur</h2>
      <button onclick="run()">Run</button>
      <button onclick="fight('Venusaur')">Fight</button>
      <button onclick="capture('Venusaur')">Capture</button>
    `;

    battleOptionsCard.style.display = 'block';

};

const battleOptionsCard = document.getElementById('battleOptionsCard');

function callPokemon4(){
    battleOptionsCard.innerHTML = `
      <h2>Charmander</h2>
      <button onclick="run()">Run</button>
      <button onclick="fight('Charmander')">Fight</button>
      <button onclick="capture('Charmander')">Capture</button>
    `;

    battleOptionsCard.style.display = 'block';
};

const lives = document.getElementById('currentLives')
let currentLives = 3;

function updateLives(){
  currentLives = currentLives - 1;
  lives.innerHTML = currentLives;
}


const fight = (name) => {
  console.log('Fight!');
  const randomFightResult = getRandomNumber();
  console.log(randomFightResult);
  if(randomFightResult === 1){
    console.log("You defeated Bulbasaur!")
    pokemonDefeated(name);
    updateDefeatedPokemon(name);
    updateScore(10);
  }else{
    console.log("You lost!")
    defeated();
    updateLives();
    gameOver();
  }
  document.getElementById('battleOptionsCard').style.display = 'none';
};

const updateDefeatedPokemon = (pokemonName) => {
  defeatedPokemon.push(pokemonName);
  updateDefeatedPokemonList();
}

const updateDefeatedPokemonList = () => {
  const defeatedPokemonListElement = document.getElementById('defeatedPokemon');
  defeatedPokemonListElement.innerHTML = '';

  defeatedPokemon.forEach((pokemonName) => {
    const listItem = document.createElement('li');
    listItem.textContent = pokemonName;
    defeatedPokemonListElement.appendChild(listItem);
  });
};

function gameOver() {
  if(currentLives === 0){
    document.getElementById('gameOver').style.display = 'block';
  }
}

const run = () => {
  document.getElementById('battleOptionsCard').style.display = 'none';
};

const capture = (name) => {
    const randomResult = getRandomNumber();
    console.log(randomResult);
    if(randomResult === 1){
      console.log("You captured Bulbasaur!")
      pokemonCaptured(name);
      updateCapturedPokemon(name);
      updateScore(5);
    }else{
      console.log("The Pokemon got away!")
      pokemonRan();
    }
    document.getElementById('battleOptionsCard').style.display = 'none';
};

const capturedPokemon = [];

const updateCapturedPokemon = (pokemonName) => {
  capturedPokemon.push(pokemonName);
  updateCapturedPokemonList();
}

const updateCapturedPokemonList = () => {
  const capturedPokemonListElement = document.getElementById('capturedPokemon');
  capturedPokemonListElement.innerHTML = '';

  capturedPokemon.forEach((pokemonName) => {
    const listItem = document.createElement('li');
    listItem.textContent = pokemonName;
    capturedPokemonListElement.appendChild(listItem);
  });
};

const score = document.getElementById('currentScore')
let currentScore = 0;


function updateScore(points){
  currentScore = currentScore + points;
  score.innerHTML = currentScore;
}

const captured = document.getElementById('captured');

function pokemonCaptured(name){  
  captured.innerHTML = 
  `<h2>${name} was captured!</h2>
  <p>It was added to your Pokemon</p>
  <p>You earned 5 points</p>
  <button onclick="closeCapture()">Close</button>`;
  captured.style.display = 'block';
};

function pokemonRan(){
  captured.innerHTML = 
  `<h2>The Pokemon ran away!</h2>
  <button onclick="closeCapture()">Close</button>`;
  captured.style.display = 'block';
};

const fightBox = document.getElementById('defeated');

function pokemonDefeated(name){
  fightBox.innerHTML = 
  `<h2>You defeated the ${name}</h2>
  <p>The Pokemon was added to your list of defeated Pokemon</p>
  <p>You gained 10 points</p>
  <button onclick="closeFightBox()">Close</button>`;
  fightBox.style.display = 'block';
};

function defeated(){
  fightBox.innerHTML = 
  `<h2>You were defeated</h2>
  <p>You lost a life</p>
  <button onclick="closeFightBox()">Close</button>`;
  fightBox.style.display = 'block';
};

const closeCapture = () => {
  captured.style.display = 'none';
};

const closeFightBox = () => {
  fightBox.style.display = 'none';
};



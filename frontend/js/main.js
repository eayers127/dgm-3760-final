const pokemonNames = ['Bulbasaur', 'Charmander', 'Squirtle'];


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
      
    // Initial position of the player icon
    let playerX = 100;
    let playerY = 0;

    // Function to update the player icon position
    const updatePlayerPosition = () => {
      playerIcon.style.left = `${playerX}px`;
      playerIcon.style.top = `${playerY}px`;

      Array.from(document.getElementsByClassName('pokemonIcon')).forEach(pokemonIcon => {
        if (checkCollision(playerIcon, pokemonIcon)) {
          const pokemonId = pokemonIcon.id.replace('pokemon', '');
          fetchPokemonInfo(pokemonId);
        }
        });
    };

    // Function to handle arrow key presses
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
    const checkCollision = (element1, element2) => {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();

        if (
          rect1.left < rect2.right &&
          rect1.right > rect2.left &&
          rect1.top < rect2.bottom &&
          rect1.bottom > rect2.top
        ) {
          const pokemonId = element2.id.replace('pokemon', '');
          fetchPokemonInfo(pokemonId);
          return true;
        }
        return false;
      };

    // Function to fetch additional Pokemon information
    const fetchPokemonInfo = async (pokemonId) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await response.json();
        return data;
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

    // Add event listener for key presses
    document.addEventListener('keydown', handleKeyPress);

    // Initial setup of the player icon position
    updatePlayerPosition();

    // Initial setup of Pokemon icons in the four corners
    updatePokemonPosition(1, 10, 10);
    updatePokemonPosition(2, gameContainer.offsetWidth - 60, 10);
    updatePokemonPosition(3, 10, gameContainer.offsetHeight - 60);
    updatePokemonPosition(4, gameContainer.offsetWidth - 60, gameContainer.offsetHeight - 60);

    
  });

  const closePokemonInfoCard = () => {
    // Hide the Pokemon info card
    document.getElementById('pokemonInfoCard').style.display = 'none';
  };

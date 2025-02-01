const feedback = document.getElementById("battle-feedback");
const finalButton = document.getElementById("finalButton");
const backButton = document.getElementById('battleBackButton');
const greatHallScreen = document.getElementById('greatHallScreen');
const battleScreen = document.getElementById("battleScreen");
const victoryScreen = document.getElementById("victoryScreen");
const battleAudio = document.getElementById("battleAudio");
const victoryAudio = document.getElementById("victoryAudio");

let playerHealth = 100;
let malakarHealth = 100;

let malakarChoice = "";
let firstRound = true;

const spells = ["Fireball", "Ice Storm", "Magic Barrier", "Thunder Strike", "Shadow Veil"];
// Easier
// const winConditions = {
//     "Fireball": ["Ice Storm", "Shadow Veil"],       // Fireball beats Ice Storm and Shadow Veil
//     "Ice Storm": ["Magic Barrier", "Thunder Strike"], // Ice Storm beats Magic Barrier and Thunder Strike
//     "Magic Barrier": ["Fireball", "Shadow Veil"],     // Magic Barrier beats Fireball and Shadow Veil
//     "Thunder Strike": ["Fireball", "Shadow Veil"],    // Thunder Strike beats Fireball and Shadow Veil
//     "Shadow Veil": ["Ice Storm", "Magic Barrier"],    // Shadow Veil beats Ice Storm and Magic Barrier
//   };
// Harder
const winConditions = {
    "Fireball": ["Ice Storm", "Shadow Veil"],               // Fireball beats Ice Storm and Shadow Veil
    "Ice Storm": ["Magic Barrier", "Thunder Strike"],       // Ice Storm beats Magic Barrier and Thunder Strike
    "Magic Barrier": ["Fireball", "Shadow Veil"],           // Magic Barrier beats Fireball and Shadow Veil
    "Thunder Strike": ["Fireball", "Ice Storm", "Shadow Veil"], // Thunder Strike beats Fireball, Ice Storm, and Shadow Veil
    "Shadow Veil": ["Ice Storm", "Magic Barrier", "Thunder Strike"], // Shadow Veil beats Ice Storm, Magic Barrier, and Thunder Strike
  };
  
  

// Update health bars
function updateHealthBars() {
  const playerHealthBar = document.getElementById("player-health");
  const malakarHealthBar = document.getElementById("malakar-health");

  playerHealthBar.style.width = `${playerHealth}%`;
  malakarHealthBar.style.width = `${malakarHealth}%`;
}

// Reduce health
function reduceHealth(target) {
  if (target === "player") {
    playerHealth = Math.max(0, playerHealth - 33.34);
  } else if (target === "malakar") {
    malakarHealth = Math.max(0, malakarHealth - 20);
  }

  updateHealthBars();

  if (playerHealth === 0) {
    feedback.innerHTML = "MALAKAR BESTED YOU!";
    feedback.style.color = "red";
    restartBattle();
  } else if (malakarHealth === 0) {
    feedback.innerHTML = "YOU WIN!";
    feedback.style.color = "lime";
    disableSpellButtons();
    finalButton.classList.remove("hidden");
  }
}

// Restart battle
function restartBattle() {
  playerHealth = 100;
  malakarHealth = 100;
  firstRound = true;
  updateHealthBars();
}

// Play a round
function playRound(playerChoice) {
  const playerHits = ["Right in the guts!", "Direct hit!", "Critical hit!", "Keep up!", "Let's get him now!"];
  const malakarHits = ["I am too strong for you!", "Mere human!", "Weaklings!", "Is my magic too much for you?", "You will never win!"];

  if (firstRound) {
    malakarChoice = spells[Math.floor(Math.random() * spells.length)];
    firstRound = false;
  }

  const roundWinner = getRoundWinner(playerChoice, malakarChoice);

  if (roundWinner === "Player") {
    feedback.innerHTML = playerHits[Math.floor(Math.random() * playerHits.length)];
    feedback.style.color = "lime";
    reduceHealth("malakar");
  } else {
    feedback.innerHTML = malakarHits[Math.floor(Math.random() * malakarHits.length)];
    feedback.style.color = "red";
    reduceHealth("player");
  }

  malakarChoice = playerChoice;
}

// Determine round winner
function getRoundWinner(playerChoice, malakarChoice) {
    // Check if playerChoice and malakarChoice are valid keys in winConditions
    if (!winConditions[playerChoice] || !winConditions[malakarChoice]) {
      console.error("Invalid choice:", { playerChoice, malakarChoice });
      return "Malakar"; // Default to Malakar winning if there's an error
    }
  
    // If both choices are the same, Malakar wins
    if (playerChoice === malakarChoice) return "Malakar";
  
    // Check if player's choice beats Malakar's choice
    if (winConditions[playerChoice].includes(malakarChoice)) {
      return "Player";
    }
  
    // Otherwise, Malakar wins
    return "Malakar";
  }

// Disable spell buttons
function disableSpellButtons() {
  const buttons = document.querySelectorAll("#player-spells button");
  buttons.forEach(button => {
    button.disabled = true;
  });
}

// Add event listeners to buttons
spells.forEach(spell => {
  document.getElementById(spell.toLowerCase().replace(" ", "-")).addEventListener("click", function () {
    playRound(spell);
  });
});

// Initialize health bars
updateHealthBars();

finalButton.addEventListener('click', () => {
  battleScreen.classList.add("hidden");
  console.info("MalakarsTower - add startBattleButton hidden")

  victoryScreen.classList.remove("hidden");
  battleAudio.pause();
  victoryAudio.play();
});

backButton.addEventListener('click', () => {
  battleScreen.classList.add("hidden"); // Hide the narrator screen
  greatHallScreen.classList.remove("hidden"); // Show the game screen
  document.body.style.background = "url('assets/images/stone_texture.jpg') no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";
  battleAudio.pause();
  document.getElementById("startBattleButton").classList.remove("hidden");
});

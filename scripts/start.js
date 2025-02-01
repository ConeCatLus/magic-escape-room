// Start Screen Logic
const startScreen = document.getElementById('startScreen');
const loreNarratorScreen = document.getElementById('loreNarratorScreen');
const beginButton = document.getElementById('beginButton');
const loreNarratorAudio = document.getElementById("loreNarratorAudio");

const gateScreen = document.getElementById('gateScreen'); // REMOVE
const eastWing = document.getElementById('eastWingScreen'); // REMOVE
const battleScreen = document.getElementById('battleScreen'); // REMOVE

var audio = document.getElementById('backgroundAudio');
audio.volume = 0.3; 

beginButton.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  loreNarratorScreen.classList.remove('hidden');
  loreNarratorAudio.play();
  
  // document.getElementById('greatHallScreen').classList.remove("hidden"); // Show the game screen
  // document.body.style.background = "url('assets/images/stone_texture.jpg') no-repeat center center fixed";
  // document.body.style.backgroundSize = "cover";
});

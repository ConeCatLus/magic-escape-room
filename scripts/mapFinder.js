// Select elements
const mapLocatorScreen = document.getElementById('mapLocatorScreen');
const mapLocatorAudio = document.getElementById('mapLocatorAudio');
const mapLocatorText = document.getElementById('mapLocatorText');
const mapLocatorButton = document.getElementById('mapLocatorButton');
const gateScreen = document.getElementById('gateScreen');
const gateNarratorAudio = document.getElementById('gateNarratorAudio');

const input = document.getElementById('coordinates');
const submitButton = document.getElementById('submit-coordinates');
const feedback = document.getElementById('feedback');
const mapContainer = document.getElementById('map-container');
const revealArea = document.getElementById('reveal-area');
const map = document.getElementById('map');

// Map Locator Narration Script
mapLocatorText.innerHTML = "After searching the council’s chambers and nearby grounds, the group discovers the first clue: two parts of the map, tucked beneath the doormats of the council hall’s north and south entrances. These pieces are fragments of the larger puzzle, and it will take both keen eyes and sharp minds to piece them together.";

// Correct coordinates for Malakar's lair
const correctCoordinates = "E4";

// Cell size and lair location for mouse-based map reveal
const cellSize = 75;
const lairLocation = { x: 500, y: 450 }; // Location of the lair on the map

// Check the user’s coordinate input
submitButton.addEventListener('click', () => {
  const userInput = input.value.trim().toUpperCase();

  if (userInput === correctCoordinates) {
    feedback.textContent = "Correct! You can now search the map.";
    feedback.style.color = "#57ff57";
    feedback.classList.remove('hidden');
    mapContainer.style.display = 'block';
    enableMouseMapSearch();
  } else {
    feedback.textContent = "Incorrect coordinates. Try again.";
    feedback.style.color = "#ff5757";
    feedback.classList.remove('hidden');
  }
});

function triggerVortex() {
  mapLocatorAudio.pause();
  gateNarratorAudio.play();
  setTimeout(() => {}, 3000);
  mapContainer.classList.add('vortex'); // Add the vortex class to start the animation

  // Optional: After animation, navigate to the next screen or perform additional actions
  setTimeout(() => {
    mapLocatorScreen.classList.add("hidden"); // Hide the narrator screen
    gateScreen.classList.remove("hidden"); // Show the game screen
    document.body.style.background = "url('assets/images/gate.avif') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
  }, 10000); // Match the animation duration
}

// Enable mouse-based map exploration
function enableMouseMapSearch() {
  let buttonWork = false;
  map.addEventListener('mousemove', (e) => {
    const rect = map.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    revealArea.style.left = `${mouseX - revealArea.offsetWidth / 2}px`;
    revealArea.style.top = `${mouseY - revealArea.offsetHeight / 2}px`;
    revealArea.style.display = 'block';

    // Check if the mouse is over the lair location
    const distance = Math.sqrt(
      Math.pow(mouseX - lairLocation.x, 2) + Math.pow(mouseY - lairLocation.y, 2)
    );

    if (distance < cellSize / 2) {
      revealArea.style.background = 'rgba(255, 0, 0, 0.7)';
      buttonWork = true;
    } else {
      revealArea.style.background = 'rgba(255, 255, 255, 0.5)';
      buttonWork = false;
    }
  });

  // Transition from Narrator Screen to Game Screen
  revealArea.addEventListener("click", () => {
    if (buttonWork) {
      triggerVortex();
    }
  });
}

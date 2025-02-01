// Hallway narrator Screen Logic
const gateScreen = document.getElementById('gateScreen');
const gateText = document.getElementById('gateText');
const gateButton = document.getElementById('gateButton');
const greatHallScreen = document.getElementById('greatHallScreen');
const feedback = document.getElementById('gateFeedback');
const gateNarratorAudio = document.getElementById('gateNarratorAudio');
const greatHallAudio = document.getElementById("greatHallAudio");

const stringAnswer = document.getElementById('gate1');

gateText.innerHTML = "You will have to locate the gate to solve this pussle";

// Correct answer
const correctAnswer = "ShadowsRiseAtMidnight";
const correctAnswer2 = "Shadows Rise At Midnight";

gateButton.addEventListener('click', () => {
  if (stringAnswer.value.toLowerCase() === correctAnswer.toLowerCase() || 
      stringAnswer.value.toLowerCase() === correctAnswer2.toLowerCase()) 
  {
    // Transition from Narrator Screen to Game Screen
    gateScreen.classList.add("hidden"); // Hide the narrator screen
    greatHallScreen.classList.remove("hidden"); // Show the game screen
    gateNarratorAudio.pause();
    greatHallAudio.play();
    document.body.style.background = "url('assets/images/stone_texture.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
  } 
  else 
  {
    feedback.textContent = "The door doesn't seem to bulge";
    feedback.style.color = "red";
  }
});


const submitButton = document.getElementById('eastWingSubmitButton');
const answerInput = document.getElementById('eastWingAnswer');
const feedback = document.getElementById('eastWingFeedback');
const greatHallScreen = document.getElementById('greatHallScreen');
const eastWingScreen = document.getElementById('eastWingScreen');
const eastWingNarratorAudio = document.getElementById('eastWingNarratorAudio');
const backButton = document.getElementById('eastWingBackButton');

// Correct answer
const correctAnswer = "4378";

submitButton.addEventListener('click', () => {
  const answerInputTrim = answerInput.value.trim().toLowerCase();

  if (answerInputTrim === correctAnswer) 
  {
    feedback.style.color = "lime";
    feedback.textContent = "Correct!";
    // eastWingNarratorAudio.pause();
    // eastWingNarratorAudio.currentTime = 0;
    document.getElementById("eastWingClue").classList.remove("hidden");
  } else 
  {
    feedback.style.color = "red";
    feedback.textContent = "Not quite right!";
  }
});

backButton.addEventListener('click', () => {
  // eastWingNarratorAudio.pause();
  // eastWingNarratorAudio.currentTime = 0;
  eastWingScreen.classList.add("hidden"); // Hide the narrator screen
  greatHallScreen.classList.remove("hidden"); // Show the game screen
  document.body.style.background = "url('assets/images/stone_texture.jpg') no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";

  const clues = [
    document.getElementById("westWingClue"),
    document.getElementById("eastWingClue"),
    document.getElementById("widowsBedroomClue"),
    document.getElementById("dungeonClue")
  ];
  
  if( clues.every(clue => !clue.classList.contains("hidden")))
  {
    document.getElementById("startBattleButton").classList.remove("hidden");
  }
});
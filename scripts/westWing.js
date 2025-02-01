const submitButton = document.getElementById('westWingSubmitButton');
const answerInput = document.getElementById('westWingAnswer');
const feedback = document.getElementById('westWingFeedback');
const greatHallScreen = document.getElementById('greatHallScreen');
const westWingScreen = document.getElementById('westWingScreen');
const eastWingNarratorAudio = document.getElementById('westWingNarratorAudio');

const backButton = document.getElementById('westWingBackButton');

// Correct answer
const correctAnswer = "bLooDy";

submitButton.addEventListener('click', () => {
  const answerInputTrim = answerInput.value;

  if (answerInputTrim === correctAnswer) 
  {
    feedback.style.color = "lime";
    feedback.textContent = "Correct!";
    // eastWingNarratorAudio.pause();
    // eastWingNarratorAudio.currentTime = 0;
    document.getElementById("westWingClue").classList.remove("hidden");
  } else 
  {
    feedback.style.color = "red";
    feedback.textContent = "Not quite right!";
  }
});

backButton.addEventListener('click', () => {
    // eastWingNarratorAudio.pause();
    // eastWingNarratorAudio.currentTime = 0;
    westWingScreen.classList.add("hidden"); // Hide the narrator screen
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
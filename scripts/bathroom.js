const submitButton = document.getElementById('bathroomSubmitButton');
const answerInput = document.getElementById('bathroomAnswer');
const feedback = document.getElementById('bathroomFeedback');
const greatHallScreen = document.getElementById('greatHallScreen');
const bathroomScreen = document.getElementById('bathroomScreen');
const bathroomNarratorAudio = document.getElementById('bathroomNarratorAudio');
const backButton = document.getElementById('bathroomBackButton');

// Correct answer
const correctAnswer = "4378";

submitButton.addEventListener('click', () => {
  const answerInputTrim = answerInput.value.trim().toLowerCase();

  if (answerInputTrim === correctAnswer) 
  {
    feedback.style.color = "lime";
    feedback.textContent = "Correct!";
    document.getElementById("bathroomClue").classList.remove("hidden");
  } else 
  {
    feedback.style.color = "red";
    feedback.textContent = "Not quite right!";
  }
});

backButton.addEventListener('click', () => {
  bathroomScreen.classList.add("hidden"); // Hide the narrator screen
  greatHallScreen.classList.remove("hidden"); // Show the game screen
  document.body.style.background = "url('assets/images/stone_texture.jpg') no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";

  const clues = [
    document.getElementById("kitchenClue"),
    document.getElementById("bathroomClue"),
    document.getElementById("widowsBedroomClue"),
    document.getElementById("dungeonClue")
  ];
  
  if( clues.every(clue => !clue.classList.contains("hidden")))
  {
    document.getElementById("startBattleButton").classList.remove("hidden");
  }
});
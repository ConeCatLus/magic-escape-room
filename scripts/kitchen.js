const submitButton = document.getElementById('kitchenSubmitButton');
const answerInput = document.getElementById('kitchenAnswer');
const feedback = document.getElementById('kitchenFeedback');
const greatHallScreen = document.getElementById('greatHallScreen');
const kitchenScreen = document.getElementById('kitchenScreen');
const bathroomNarratorAudio = document.getElementById('kitchenNarratorAudio');

const backButton = document.getElementById('kitchenBackButton');

// Correct answer
const correctAnswer = "bLooDy";

submitButton.addEventListener('click', () => {
  const answerInputTrim = answerInput.value;

  if (answerInputTrim === correctAnswer) 
  {
    feedback.style.color = "lime";
    feedback.textContent = "Correct!";
    // bathroomNarratorAudio.pause();
    // bathroomNarratorAudio.currentTime = 0;
    document.getElementById("kitchenClue").classList.remove("hidden");
  } else 
  {
    feedback.style.color = "red";
    feedback.textContent = "Not quite right!";
  }
});

backButton.addEventListener('click', () => {
    // bathroomNarratorAudio.pause();
    // bathroomNarratorAudio.currentTime = 0;
    kitchenScreen.classList.add("hidden"); // Hide the narrator screen
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
// Hallway narrator Screen Logic
const widowsBedroomScreen = document.getElementById('widowsBedroomScreen');
const greatHallScreen = document.getElementById('greatHallScreen');
const backButton = document.getElementById('widowsBedroomBackButton');

const riddles = [
    { question: "Who is my favorite author?", answer: "Sarah J Mass", asked: false },
    { question: "Who is the monster under my bed?", answer: "Dragonair", asked: false },
    { question: "What is my name?", answer: "Malice", asked: false },
    { question: "Is the plant my huband holds still alive?", answer: "Yes", asked: false },
    { question: "What colour is my door in the Great Hall?", answer: "Green", asked: false },
    { question: "How many square shaped shelfs is in my bedroom?", answer: "13", asked: false },
    { question: "Who is the \"Alpha of the month\" me or Malakar?", answer: "Malakar", asked: false }
];

let correctInRow = 0;
const requiredCorrect = 5;
let currentRiddle = null;
let timerInterval;
const timerDuration = 30; // 30 seconds

function pickRandomRiddle() {
    let randVal = Math.floor(Math.random() * riddles.length);
    while (riddles[randVal].asked == true)
    {
        if (randVal == riddles.length)
            randVal = 0;
        else
            randVal++;
    }
    riddles[randVal].asked = true;
    return riddles[randVal];
}

function displayRiddle() {
    clearInterval(timerInterval); // Clear any existing timer
    currentRiddle = pickRandomRiddle();
    document.getElementById("currentRiddle").textContent = currentRiddle.question;
    document.getElementById("riddleInput").value = "";
    document.getElementById("riddleFeedback").textContent = "";
    document.getElementById("timeLeft").textContent = timerDuration;
    startTimer();
}

function startTimer() {
    let timeRemaining = timerDuration;

    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById("timeLeft").textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    correctInRow = 0;
    document.getElementById("riddleFeedback").textContent = "Time's up! Start over!";
    document.getElementById("riddleFeedback").style.color = "red";
    document.getElementById("correctCount").textContent = correctInRow;

    riddles.forEach((riddle) => riddle.asked = false);
    setTimeout(displayRiddle, 1000); // Restart after 1 second
}

function checkAnswer() {
    const playerAnswer = document.getElementById("riddleInput").value.trim().toLowerCase();
    const feedback = document.getElementById("riddleFeedback");

    if (playerAnswer === currentRiddle.answer.toLowerCase()) {
        correctInRow++;
        feedback.textContent = "Correct!";
        feedback.style.color = "lime";
    } else {
        correctInRow = 0;
        feedback.textContent = "Wrong! Start over!";
        feedback.style.color = "red";
        riddles.forEach((riddle) => riddle.asked = false);
    }

    document.getElementById("correctCount").textContent = correctInRow;

    if (correctInRow >= requiredCorrect) {
        clearInterval(timerInterval); // Stop timer
        feedback.textContent = "You have answered all my questions correctly!";
        feedback.style.color = "gold";
        document.getElementById("submitRiddleAnswer").disabled = true;
        document.getElementById("widowsBedroomClue").classList.remove("hidden");
    } else if (correctInRow === 0) {
        clearInterval(timerInterval); // Stop timer
        setTimeout(displayRiddle, 1000); // Restart automatically after 1 second
    } else {
        clearInterval(timerInterval); // Stop timer
        setTimeout(displayRiddle, 1000); // Move to the next riddle after 1 second
    }
}

// Event Listener for Start Button
document.getElementById("startRiddles").addEventListener("click", () => {
    document.getElementById("introText").classList.add("hidden");
    document.getElementById("riddleGame").classList.remove("hidden");
    displayRiddle();
});

// Event Listener for Submit Button
document.getElementById("submitRiddleAnswer").addEventListener("click", checkAnswer);

backButton.addEventListener('click', () => {
  widowsBedroomScreen.classList.add("hidden"); // Hide the narrator screen
  greatHallScreen.classList.remove("hidden"); // Show the game screen
  document.getElementById("introText").classList.remove("hidden");
  document.getElementById("riddleGame").classList.add("hidden");
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

document.getElementById("submitRiddleAnswer").addEventListener("click", checkAnswer);

// Initialize the dungeon screen
displayRiddle();

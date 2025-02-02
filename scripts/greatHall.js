const bathroomNarratorAudio = document.getElementById('bathroomNarratorAudio');
const bathroomButton = document.getElementById("bathroom");
const kitchenButton = document.getElementById("kitchen");
const bedroomButton = document.getElementById("bedroom");
const dungeonButton = document.getElementById("dungeon");
const finalBossButtons = document.getElementById("startBattleButton");
const battleAudio = document.getElementById("battleAudio");

bathroomButton.disabled = true;
kitchenButton.disabled = true;
bedroomButton.disabled = true;
dungeonButton.disabled = true;

// Example codes for each door
const doorCodes = {
  "bathroom": "Remolcador", // The spanish ship
  "kitchen": "3710351", // Align the candles
  "bedroom": "554", // number of cats in waves, could be 553 as well
  "dungeon": "230" //  How many passengers fit in the latest tram model
};

// Event listener for checking codes
document.querySelectorAll(".code-input").forEach(inputField => {
  inputField.addEventListener("input", function () {
      const buttonId = this.id.replace("-code", ""); // Get the related button's ID
      const enteredCode = this.value;

      // If the code matches, unlock the door
      if (enteredCode === doorCodes[buttonId]) {
          const button = document.getElementById(buttonId);
          button.classList.add("hidden-image");
          button.disabled = false; // Enable the button
          this.disabled = true; // Disable the input field
      }
  });
});

const buttons = document.querySelectorAll('.popup-button');

// Add event listeners for each button
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the ID of the button clicked (e.g., "bathroom-door-clue")
    const buttonId = button.id;

    // Find the corresponding pop-up note
    const popupNoteId = buttonId.replace('door-clue', 'PopUpNote'); // Replace "-clue" with "PopUpNote"
    const popupNote = document.getElementById(popupNoteId);

    // Show the corresponding pop-up note
    if (popupNote) {
      popupNote.classList.remove('hidden'); // Show the pop-up note by removing the "hidden" class
    }
  });
});

const closeButtons = document.querySelectorAll('.close-popup-button');

// Add event listeners for each button
closeButtons.forEach(closeButton => {
  closeButton.addEventListener('click', () => {
    // Get the ID of the button clicked (e.g., "bathroom-door-clue")
    const buttonId = closeButton.id;

    const popupNoteId = buttonId.replace('closeNote', 'PopUpNote');
    const popupNote = document.getElementById(popupNoteId);

    if (popupNote) {
      popupNote.classList.add('hidden'); // Show the pop-up note by removing the "hidden" class
    }
  });
});

// Show the Great Hall and update progress
function showGreatHall() {
    document.getElementById("greatHallScreen").classList.remove("hidden");
    document.querySelectorAll("#doors button").forEach((button) => {
    button.classList.remove("hidden");
  });
}

// Navigate to a specific room
function enterRoom(room) {
  document.getElementById("greatHallScreen").classList.add("hidden");
  document.getElementById(`${room}Screen`).classList.remove("hidden");
  document.getElementById("startBattleButton").classList.add("hidden");
}

// Attach event listeners to buttons
bathroomButton.addEventListener("click", () => {
  enterRoom("bathroom");
});
kitchenButton.addEventListener("click", () => {
  enterRoom("kitchen");
});
bedroomButton.addEventListener("click", () => {
  document.body.style.background = "url('assets/images/dungeon.jpg') no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";
  enterRoom("widowsBedroom");
});

dungeonButton.addEventListener("click", () => {
  document.body.style.background = "url('assets/images/topTowerRoom.jpg') no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";
  enterRoom("dungeon");
});

finalBossButtons.addEventListener("click", () => {
  document.body.style.background = "url('assets/images/malakarBattle.jpg') no-repeat center center fixed";
  document.body.style.backgroundSize = "cover";
  battleAudio.play();
  enterRoom("battle");
});

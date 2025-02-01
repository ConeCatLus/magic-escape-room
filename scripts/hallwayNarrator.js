// Hallway narrator Screen Logic
const narratorAudio = document.getElementById('hallwayNarratorAudio');
const narratorText = document.getElementById('hallwayNarratorText');
const eastWingScreen = document.getElementById('eastWingScreen');
const hallwayNarratorScreen = document.getElementById('hallwayNarratorScreen');
const eastWingButton = document.getElementById('eastWingButton');

// Narrator text to display, synchronized with audio
const narratorParagraphs = [
  "You step into a dimly lit hallway, where flickering torches cast long shadows across ancient paintings.",
  "Each canvas tells a forgotten tale, yet none dare reveal the secret you seek outright.",
  "At the end of the hall stands a foreboding door, its lock gleaming with malice—a code of three numbers guards the way.",
  "Beside the door, a peculiar rebus is etched into the stone wall. Three images stare back at you, their meaning shrouded in mystery.",
  "As you study the hallway, a strange realization dawns: the order of the paintings is not as it seems.",
  "The key lies in their hidden connection to the rebus. Align the paintings,",
  "decipher the code, and open the door—lest Malakar’s trap seals your fate forever."
];

// Timing in seconds for each paragraph to appear
const narratorTimings = [0, 5, 10, 18, 25, 31, 37]; // Example: Each paragraph starts at specific times

let currentParagraphIndex = 0; // Track the current paragraph that has been added

// Display narrator text as audio progresses
narratorAudio.addEventListener("timeupdate", () => {
  const currentTime = narratorAudio.currentTime;

  // Check if the current time crosses the timing for the next paragraph
  if (currentParagraphIndex < narratorTimings.length &&
    currentTime >= narratorTimings[currentParagraphIndex]) {
      
    // Append the paragraph and move to the next one
    const newParagraph = document.createElement("p");
    newParagraph.textContent = narratorParagraphs[currentParagraphIndex];
    narratorText.appendChild(newParagraph);

    // Increment the index to avoid appending the same paragraph again
    currentParagraphIndex++;
  }
});

// Show "Start Quest" button after narrator ends
narratorAudio.addEventListener("ended", () => {
  eastWingButton.classList.remove("hidden"); // Show the start quest button
});

// Transition from Narrator Screen to Game Screen
eastWingButton.addEventListener("click", () => {
  hallwayNarratorScreen.classList.add("hidden"); // Hide the narrator screen
  eastWingScreen.classList.remove("hidden"); // Show the game screen
});
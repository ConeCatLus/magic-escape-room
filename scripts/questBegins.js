// Narrator Screen Logic
const narratorAudio = document.getElementById('questNarratorAudio');
const narratorText = document.getElementById('questNarratorText');
const questNarratorButton = document.getElementById('questNarratorButton');
const questNarratorScreen = document.getElementById('questNarratorScreen');
const mapLocatorScreen = document.getElementById('mapLocatorScreen');
const mapLocatorAudio = document.getElementById('mapLocatorAudio');
const questNarratorAudio = document.getElementById('questNarratorAudio');

// Narrator text to display, synchronized with audio
const narratorParagraphs = [
  "The Human Council has discovered two fragments of an ancient map that lead to Malakar’s lost lair.",
  "These pieces are the key to stopping his deadly ritual,",
  "but the council's reach is limited, and the map remains out of their grasp.",
  "<p></p>",
  "Now, it’s up to you to retrieve the fragments, decode their secrets, and find Malakar before it’s too late.",
  "But beware—others seek the map’s power, and not all are noble in their pursuit…"
];

// Timing in seconds for each paragraph to appear
const narratorTimings = [0, 6, 10, 16, 0, 22, 35]; // Example: Each paragraph starts at specific times

let currentParagraphIndex = 0; // Track the current paragraph that has been added

// Display narrator text as audio progresses
narratorAudio.addEventListener("timeupdate", () => {
  const currentTime = narratorAudio.currentTime;

  // Check if the current time crosses the timing for the next paragraph
  if (currentParagraphIndex < narratorTimings.length &&
    currentTime >= narratorTimings[currentParagraphIndex]) {
      
    // Append the paragraph and move to the next one
    const newParagraph = document.createElement("p");
    if (narratorParagraphs[currentParagraphIndex].trim() === "<p></p>") {
      // If it's meant to be an empty row, just append an empty <p> tag
      newParagraph.innerHTML = "&nbsp;"; // Adds a non-breaking space for visual gap
    } else {
      newParagraph.textContent = narratorParagraphs[currentParagraphIndex];
    }
    narratorText.appendChild(newParagraph);

    // Increment the index to avoid appending the same paragraph again
    currentParagraphIndex++;
  }
});

// Show "Start Quest" button after narrator ends
narratorAudio.addEventListener("ended", () => {
    questNarratorButton.classList.remove("hidden"); // Show the start quest button
});

// Transition from Narrator Screen to Game Screen
questNarratorButton.addEventListener("click", () => {
  questNarratorScreen.classList.add("hidden"); // Hide the narrator screen
  mapLocatorScreen.classList.remove("hidden"); // Show the game screen
  questNarratorAudio.pause();
  mapLocatorAudio.play();
});

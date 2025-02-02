// Narrator Screen Logic
const narratorAudio = document.getElementById('loreNarratorAudio');
const narratorText = document.getElementById('loreNarratorText');
const loreNarratorButton = document.getElementById('loreNarratorButton');
const loreNarratorScreen = document.getElementById('loreNarratorScreen');
const questNarratorScreen = document.getElementById('questNarratorScreen');
const questNarratorAudio = document.getElementById('questNarratorAudio');
const loreNarratorAudio = document.getElementById("loreNarratorAudio");

// Narrator text to display, synchronized with audio
const narratorParagraphs = [
  "In the shadowed depths of an ancient stronghold, the formidable mage Malakar weaves a forbidden ritual.",
  "He has stolen the last known dragon egg, a relic of untamed power, seeking to awaken his long-dead wife, Malice, from the abyss.",
  "If he succeeds, the world will tremble beneath the weight of his dark sorcery.",
  "The fate of magic itself hangs in the balance.",
  "Only a band of daring adventurers can unravel his cryptic enchantments, brave his arcane defenses, and reclaim the egg before it’s too late.",
  "Will you stop Malakar before the flames of resurrection consume all?"
];

// Timing in seconds for each paragraph to appear
const narratorTimings = [0, 7, 16, 22, 26, 38]; // Example: Each paragraph starts at specific times

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
  loreNarratorButton.classList.remove("hidden"); // Show the start quest button
});

// Transition from Narrator Screen to Game Screen
loreNarratorButton.addEventListener("click", () => {
    loreNarratorScreen.classList.add("hidden"); // Hide the narrator screen
    questNarratorScreen.classList.remove("hidden"); // Show the game screen
    loreNarratorAudio.pause();
    questNarratorAudio.play();
});

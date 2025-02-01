// Narrator Screen Logic
const victoryAudio = document.getElementById('victoryAudio');
const victoryText = document.getElementById('victoryText');

// Narrator text to display, synchronized with audio
const victoryParagraphs = [
  "Malakar lies defeated, his dark magic shattered, and the world breathes a sigh of relief.",
  "The egg—once a symbol of impending doom—is now safe in your hands, its glow a promise of hope for the future.",
  "The shadows that once threatened to swallow the land have been vanquished, and the dawn of a new era begins.",
  "<p></p>",
  "You, the heroes of this tale, have proven that even in the darkest of times, courage and wisdom can light the way.",
  "The future is yours to shape, and as you stand victorious, the world looks to you with gratitude and awe.",
  "A new chapter unfolds, brighter than ever before."
];

// Timing in seconds for each paragraph to appear
const victoryTimings = [0, 7, 16, 0, 22, 26, 38]; // Example: Each paragraph starts at specific times

let currentParagraphIndex = 0; // Track the current paragraph that has been added

// Display narrator text as audio progresses
victoryAudio.addEventListener("timeupdate", () => {
  const currentTime = victoryAudio.currentTime;

  // Check if the current time crosses the timing for the next paragraph
  if (currentParagraphIndex < victoryTimings.length &&
    currentTime >= victoryTimings[currentParagraphIndex]) {
      
    // Append the paragraph and move to the next one
    const newParagraph = document.createElement("p");
    if (victoryParagraphs[currentParagraphIndex].trim() === "<p></p>") {
      // If it's meant to be an empty row, just append an empty <p> tag
      newParagraph.innerHTML = "&nbsp;"; // Adds a non-breaking space for visual gap
    } else {
      newParagraph.textContent = victoryParagraphs[currentParagraphIndex];
    }
    victoryText.appendChild(newParagraph);

    // Increment the index to avoid appending the same paragraph again
    currentParagraphIndex++;
  }
});

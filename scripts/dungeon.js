
const dungeonScreen = document.getElementById('dungeonScreen');
const backButton = document.getElementById('dungeonBackButton');

const correctSequence = ["blue", "purple", "green", "white"];
let playerGuess = [null, null, null, null];
const homeAssistantUrl = "http://192.168.1.156:8123/api/services/light/turn_on";
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3Y2RiN2QzMjUzYzQ0MTAwOGY5NWI4OWYxZjYxNjY3NCIsImlhdCI6MTczODI2ODQzNywiZXhwIjoyMDUzNjI4NDM3fQ.VPOOB2ehFO0ZPI9z4n2WsZqB15d6-QS4wGHDjIkFMUc";
const lightEntities = ["light.skena_1", "light.skena_2", "light.skena_3", "light.skena_4"];

function changeLightColor(lightEntity, color) {
    fetch(homeAssistantUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            entity_id: lightEntity,
            rgb_color: getRgbColor(color)
        })
    }).catch(err => console.error("Home Assistant error:", err));
}

function getRgbColor(color) {
    const colors = {
        red: [255, 0, 0],
        blue: [0, 0, 255],
        green: [0, 255, 0],
        yellow: [255, 255, 0],
        white: [255, 255, 255],
        purple: [128, 0, 128]
    };
    return colors[color] || [255, 255, 255]; // Default to white if unknown
}
const colors = ["red", "blue", "green", "yellow", "white", "purple"];

document.querySelectorAll('.light-selector').forEach(selector => {
    selector.addEventListener('click', function () {
        let index = this.dataset.index;
        let currentColor = playerGuess[index];
        let nextColorIndex = (colors.indexOf(currentColor) + 1) % colors.length;
        let nextColor = colors[nextColorIndex];

        playerGuess[index] = nextColor;
        this.style.backgroundColor = nextColor;

        changeLightColor(lightEntities[index], nextColor);
    });
});

document.getElementById('submitLightGuess').addEventListener('click', function () {
    let feedback = "";
    let correctCount = 0;

    playerGuess.forEach((color, index) => {
        if (color === correctSequence[index]) {
            feedback += "🔵 ";
            correctCount++;
        } else if (correctSequence.includes(color)) {
            feedback += "⚪ ";
        } else {
            feedback += "❌ ";
        }
    });

    document.getElementById('lightFeedback').innerText = feedback;
    if (correctCount === 4) {
        document.getElementById("dungeonClue").classList.remove("hidden");
    } else {
        // Reset lights and buttons after a wrong guess
        playerGuess.fill("white");  
        lightEntities.forEach(light => changeLightColor(light, "white"));

        document.querySelectorAll('.light-selector').forEach(selector => {
            selector.style.backgroundColor = "gray";
        });
    }
});

backButton.addEventListener('click', () => {
    dungeonScreen.classList.add("hidden"); // Hide the narrator screen
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
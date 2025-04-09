const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

function tellMe(joke) {
    VoiceRSS.speech({
        key: '71500a455242401eb315703cf22020c3',
        src: joke,
        hl: 'es-es',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke  API
async function getJokes() {
    let joke = "";
    const apiURL = "https://v2.jokeapi.dev/joke/Any?lang=es";
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }
        // Text to Speech
        tellMe("Eva ");
        // Disable button
        toggleButton();
    } catch (error) {
        // Catch Errors Here
        console.log("Woops", error)
    }
}

// Event Listener
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
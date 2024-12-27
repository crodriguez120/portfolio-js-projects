

// NASA API
const count = 10;
const apiKEY = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKEY}&count=${count}`;

let resultsArray = [];

// Get 10 cards from NASA API
async function getNasaInfo() {
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        console.log(resultsArray);
    } catch (error) {
        // Catch Error Here
    } 
}

// On load tab
getNasaInfo()
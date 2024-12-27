const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKEY = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKEY}&count=${count}`;

let resultsArray = [];
let favorites = {};

function showContent(page) {
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
    if (page === 'results') {
        resultsNav.classList.remove('hidden');
        favoritesNav.classList.add('hidden'); 
    } else {
        resultsNav.classList.add('hidden');
        favoritesNav.classList.remove('hidden'); 
    }
    loader.classList.add('hidden');
}

// Create DOM
function createDOMNodes(page) {
    const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
    currentArray.forEach((result) => {
        // Card Container
        const card = document.createElement('div');
        card.classList.add('card');
        // Link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';
        // Image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA Picture of the day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        // Card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // Card Title
        const cardTitle = document.createElement('h5');
        cardTitle.textContent = result.title;
        cardTitle.classList.add('card-title');
        // Save Text
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        if (page === 'results') {
            saveText.textContent = 'Add to Favorites';
            saveText.setAttribute('onClick', `saveFavorite('${result.url}')`);
        } else {
            saveText.textContent = 'Remove Favorite';
            saveText.setAttribute('onClick', `removeFavorite('${result.url}')`);
        }
        // Card Text
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = result.explanation;
        // Footer Container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        // Emission Date
        const emissionDate = document.createElement('strong');
        emissionDate.textContent = result.date;
        // Copyright
        const copyrightResult = result.copyright === undefined ? '': result.copyright;
        const copyright = document.createElement('span');
        copyright.textContent = ` ${copyrightResult}`;
        // Append
        footer.append(emissionDate, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    })
}

// Update DOM
function updateDOM(page) {
    // Get Favorites from localStorage
    if (localStorage.getItem('nasaFavorites')) {
        favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
        console.log('Favorites from localStorage: ', favorites);
    }
    // Reset DOM, create DOM Nodes, Show Content
    imagesContainer.textContent = '';
    createDOMNodes(page);
    showContent(page);
}

// Get 10 cards from NASA API
async function getNasaInfo() {
    // Show Loader
    loader.classList.remove('hidden');
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        updateDOM('results');
    } catch (error) {
        // Catch Error Here
        console.log(error);
    } 
}

// Add result to Favorites
function saveFavorite(itemUrl) {
    // Loop through Results Array to select Favorite
    resultsArray.forEach((item) => {
       if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
        favorites[itemUrl] = item;
        // Show Save Confirmation for 2 seconds
        saveConfirmed.hidden = false;
        setTimeout(() => {
            saveConfirmed.hidden = true;
        }, 2000);
        // Set Favorites in localStorage
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
       }
    })
}

// Remove items from Favorites
function removeFavorite(itemUrl) {
    if (favorites[itemUrl]) {
        delete favorites[itemUrl];
        // Set Favorites in localStorage
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        updateDOM('favorites');
    }
}

// On load tab
getNasaInfo()
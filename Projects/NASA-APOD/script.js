const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultArray = [];
let favorites = {};

const showContent = (page) => {
    window.scrollTo({top: 0, behavior: 'instant'});
    loader.classList.add('hidden');
    if(page === 'results'){
        resultsNav.classList.remove('hidden');
        favoritesNav.classList.add('hidden');
    }
    else{
        resultsNav.classList.add('hidden');
        favoritesNav.classList.remove('hidden');
    }
}

const createDOMNodes = (page) => {
    const currentArray = page === 'results' ? resultArray : Object.values(favorites);
    currentArray.forEach(result => {
        //card container 
        const card = document.createElement("div");
        card.classList.add("card");
        //link
        const link = document.createElement("a");
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';
        //image
        const image = document.createElement("img");
        image.src = result.url;
        image.alt = 'NASA picture of the day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        //card body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        //card title
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = result.title;
        //save text
        const saveText = document.createElement("p");
        saveText.classList.add("clickable");
        if (page === 'results') {
            saveText.textContent = 'Add to favorites';
            saveText.setAttribute('onClick', `saveFavorite('${result.url}')`);
        }
        else {
            saveText.textContent = 'Remove from favorites';
            saveText.setAttribute('onClick', `removeFavorite('${result.url}')`);
        }
        //card text
        const cardText = document.createElement("p");
        cardText.textContent = result.explanation;
        //footer container
        const footer = document.createElement("small");
        footer.classList.add("text-muted");
        //date
        const date = document.createElement("strong");
        date.textContent = result.date;
        //Copyright
        const copyright = document.createElement("span");
        const copyrightResult = result.copyright === undefined ? '' : result.copyright;
        copyright.textContent = ` ${copyrightResult}`;
        //append elements
        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    })
}

const updateDOM = (page) => {
    //get favorites from local storage
    if (localStorage.getItem('favorites')) {
        favorites = JSON.parse(localStorage.getItem('favorites'));
    }
    imagesContainer.textContent = '';
    createDOMNodes(page);
    showContent(page);
}

//get 10 images from nasa api 
async function getNasaPictures() {
    //show loader
    loader.classList.remove('hidden');
    try {
        const response = await fetch(apiUrl);
        resultArray = await response.json();
        updateDOM('results');
    }
    catch (error) {
        console.log(error);
    }
}

//add result to favorites 
function saveFavorite(itemUrl) {
    resultArray.forEach(item => {
        if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
            favorites[itemUrl] = item;
            //show saved confirmation for 2 seconds
            saveConfirmed.hidden = false;
            setTimeout(() => {
                saveConfirmed.hidden = true;
            }, 2000);
        }

        //save favorites to local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    })
}

//remove favorite function
function removeFavorite(itemUrl) {
    delete favorites[itemUrl];
    //save favorites to local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateDOM('favorites');
}

getNasaPictures();

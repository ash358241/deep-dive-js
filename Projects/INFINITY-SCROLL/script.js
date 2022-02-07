const imgContainer = document.getElementById('imgContainer');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

//unsplash API 
const count = 30;
const apiKey = 'OMGjllnbUre5bmUqcQstA1c-R_pgbO33pQSecMpuZLU';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//check whether all images are loaded
function imageLoaded(){
    loader.hidden = true;
    imagesLoaded++;
    console.log('image loaded:', imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        // console.log(ready);
    }
}

//helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for links, photos adding to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    // console.log('total images:', totalImages);
    photoArray.forEach((photo) => {
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        //event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imgContainer.appendChild(item);
    })
}

//get photos from api
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photoArray = await response.json();
        // console.log(photoArray);
        displayPhotos();
    }
    catch (error) {
        console.log(error);
    }
}

//check to see if scrolled to bottom of page, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        // console.log('load more photos');
    }
})

//on load
getPhotos();

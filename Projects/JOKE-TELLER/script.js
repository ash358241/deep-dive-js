const btn = document.getElementById('button');
const audioElement = document.getElementById('audio');

//passing joke to our voice rss api
function tellJoke(joke){
    VoiceRSS.speech({
        key: '90843405052f4f47acb5f1251d4b7f0e',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//toggle the button
function toggleBtn() {
    btn.disabled = !btn.disabled;
}

//get jokes from joke api
async function getJoke(){
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    let joke = '';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data);
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else{
            joke = `${data.joke}`;
        }
        // console.log(joke);
        tellJoke(joke);
        toggleBtn();
    }
    catch(error){
        console.log(error);
    }
}

//on load 
// getJoke();

//event listener 
btn.addEventListener('click', () => {
    getJoke();
});

audioElement.addEventListener('ended', toggleBtn);


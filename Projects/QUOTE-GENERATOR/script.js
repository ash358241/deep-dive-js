const quoteContainer = document.getElementById('quoteContainer');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newQuote');
const loader = document.getElementById('loader');

//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// get quotes from API 
let apiQuote = [];

//function to generate new individual quote
function newQuote(){
    loading();

    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    //check if the author is null add 'Unknown'
    if(!authorText.textContent){
        authorText.textContent = 'Unknown';
    }
    else{
        authorText.textContent = quote.author;
    }

    quoteText.textContent = quote.text;
    //adjust the quote font dynamically
    if(quote.text.length > 120){
        quoteText.classList.add('longQuote');
    }
    else{
        quoteText.classList.remove('longQuote');
    }

    complete();

}



async function getQuotes(){
    loading();

    const api = 'https://type.fit/api/quotes';

    try{
        const response = await fetch(api);
        apiQuote = await response.json();
        newQuote();
        // console.log(apiQuote);
    }
    catch(error){
        console.log(error);
    }
}
getQuotes();

function tweetQuote(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


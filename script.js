// selectors

const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const TwitterBtn = document.querySelector("#twitter");
const NewQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector(".loader");

let quoteList = [];
let quoteURL = "https://type.fit/api/quotes";

let loading = () => {
 loader.hidden = false;
 quoteContainer.hidden = true; 
}

let complete = () => {
    loader.hidden = true;
    quoteContainer.hidden = false; 
   }

let newQuote = () => 
{
    loading();
    let quote = quoteList[Math.floor(Math.random() * quoteList.length)];

    if(!quote.author)
    {
        authorText.textContent = "Unknown";
    }else
    {
        authorText.textContent = quote.author;    
    }


    if (quote.text.length > 120)
    {
        quoteText.classList.add("long-quote");
    }else
    {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
    complete();
}

let apiQuotes = async() =>
{
    loading();
    try
    {
    let res = await axios.get(quoteURL)
    quoteList = res.data; 
    newQuote();
    }
    catch(err)
    {
        console.log(err)
    }

}

let twitterFunc = () => 
{
    let twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} `
    window.open(twitterURL, '_blank');
}

// activate Buttons

NewQuoteBtn.addEventListener('click', newQuote);
TwitterBtn.addEventListener('click', twitterFunc);

apiQuotes();


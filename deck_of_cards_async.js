// Part 2: Deck of Cards
// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
// Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

async function drawOneCard() {
    try {
        let res = await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
    }
    catch(err) {
        console.log("Something went wrong", err);
    }    
}

drawOneCard();

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
// Once you have the card, make a request to the same API to get one more card from the same deck.
// Once you have both cards, console.log the values and suits of both cards.

async function drawTwoCards() {
    try {
        let card1 = await $.getJSON('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
        let card2 = await $.getJSON(`http://deckofcardsapi.com/api/deck/${card1.deck_id}/draw/?count=1`)
        console.log(`${card1.cards[0].value} of ${card1.cards[0].suit}`);
        console.log(`${card2.cards[0].value} of ${card2.cards[0].suit}`);        
    }
    catch(err) {
        console.log("Something went wrong", err);
    }
}
drawTwoCards();

// 3. Build an HTML page that lets you draw cards from a deck. 
// When the page loads, go to the Deck of Cards API to create a new deck, 
// and show a button on the page that will let you draw a card. 
// Every time you click the button, display a new card, until there are no cards left in the deck.

const msgDiv = document.querySelector("#msg");
const img = document.querySelector("#image-div");
const NUM_OF_CARDS = 52;
let Z_ind = 0;
let deck_id;

function cardImage(res_img) {
    const new_card_img = document.createElement("img");
    new_card_img.setAttribute("src", res_img);
    new_card_img.setAttribute("alt", " Oops...Couldn't find an image");
    new_card_img.style.position = "absolute";
    new_card_img.classList.add("rounded", "mx-auto", "card-img");
    new_card_img.style.zIndex = Z_ind;
    img.appendChild(new_card_img);
} 

async function newDeck() {
    try {
        let res = await $.getJSON('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
        deck_id=res.deck_id;
        cardImage(res.cards[0].image);
    }
    catch(err) {
        console.log("Couldn't get a deck", err);
    }
}

newDeck();

$('#get-card-btn').on('click', async function handleClick() {
    try {
        res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`) 
        if (res.data.remaining > 0) {
            Z_ind = NUM_OF_CARDS - res.data.remaining;
            cardImage(res.data.cards[0].image);
        }                
        else {
            const msg = document.createElement("p");
            msg.classList.add("end-msg");
            msg.innerHTML = "No cards left in the deck! <br> Refresh the page!";
            msgDiv.appendChild(msg);
            $('#get-card-btn').attr('disabled', true)
        }}
    catch(err) {
        console.log("Couldn't draw a card", err);
    }
})



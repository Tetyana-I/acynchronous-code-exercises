// Part 2: Deck of Cards
// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
// Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. 
// Once you have the card, make a request to the same API to get one more card from the same deck.

// Once you have both cards, console.log the values and suits of both cards.

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads,
// go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card.
// Every time you click the button, display a new card, until there are no cards left in the deck.



// Part 1
//////////////////////////////

axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
.then(res => {
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
})
.catch(err => {
    console.log("Something went wrong", err);
})

// Part 2
//////////////////////////////

const deck_of_Promises = [];

axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
.then(res => {
    deck_of_Promises.push(res);
    return axios.get(`http://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`);
})
.then(res => {
    deck_of_Promises.push(res);
    for(let i=0; i<2; i++) {
       console.log(`${deck_of_Promises[i].data.cards[0].value} of ${deck_of_Promises[i].data.cards[0].suit}`); 
    }
})
.catch(err => {
    console.log("Something went wrong", err);
})

// Part 3
////////////////////////////////

const img = document.querySelector("#image-div");
let deck_id;

axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
.then(res => {
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
    console.log(res.data.cards[0].image);
    console.log(res.data.deck_id);
    deck_id=res.data.deck_id;
    const new_card_img = document.createElement("img");
    new_card_img.setAttribute("src", res.data.cards[0].image);
    new_card_img.setAttribute("alt", " Oops...Couldn't find an image");
    new_card_img.style.position = "absolute";
    new_card_img.classList.add("rounded", "mx-auto", "card-img");
    img.appendChild(new_card_img);
})
.catch(err => {
    console.log("Something went wrong", err);
})

const NUM_OF_CARDS = 52;
let Z_ind = 0;
const msgDiv = document.querySelector("#msg");

$('#get-card-btn').on('click', function handleClick() {
    axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    .then(res => {
        if (res.data.remaining > 0) {
            Z_ind = NUM_OF_CARDS - res.data.remaining;
            const new_card_img = document.createElement("img");
            new_card_img.setAttribute("src", res.data.cards[0].image);
            new_card_img.setAttribute("alt", " Oops...Couldn't find an image");
            new_card_img.classList.add("rounded", "mx-auto", "card-img");
            new_card_img.style.zIndex = Z_ind;
            img.appendChild(new_card_img);
        }
        else {
            const msg = document.createElement("p");
            msg.classList.add("end-msg");
            msg.innerHTML = "No cards left in the deck! <br> Refresh the page!";
            msgDiv.appendChild(msg);
            $('#get-card-btn').attr('disabled', true)
        }

    })
    .catch(err => {
        console.log("Something went wrong!", err);
    })
})


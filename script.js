import {cardArray} from './beerList.js';

const cardContainer = document.getElementById('card-container');

const resultDisplay = document.getElementById('result');
let scorePoints = 0;
resultDisplay.textContent = scorePoints;

let cardsChosen = [];
let cardsChosenIds = [];
let cardsFound = [];

function gameBoard() {

    for (let i = 0; i < cardArray.length; i++) {

        const card = document.createElement('img');
        card.src = "images/cardCover.png";
        card.setAttribute('data-id', i);
        card.addEventListener('click', cardFlip);
        cardContainer.append(card);
    }
}

gameBoard();

function checkMatch() {
    const cards = document.querySelectorAll('img');

    console.log("Checking card match");
    if (cardsChosen[0] == cardsChosen[1]) {

        cards[cardsChosenIds[0]].removeEventListener('click', cardFlip);
        cards[cardsChosenIds[1]].removeEventListener('click', cardFlip);

        cardsFound.push(cardsChosen)

        scorePoints += 10;
    }
    else {
        cards[cardsChosenIds[0]].setAttribute('src', 'images/cardCover.png');
        cards[cardsChosenIds[1]].setAttribute('src', 'images/cardCover.png');

        scorePoints -= 5;
    }

    if (cardsFound.length === cardArray.length / 2) {

        if(scorePoints > 0) {
            alert(`CONGRATZ! You finished with ${scorePoints} points!`);
        }
        else {
            alert(`YOU LOSE! ${scorePoints} points...`);
        }

        for(let card of cards) {
            card.setAttribute('src', 'images/cardCover.png');
            card.addEventListener('click', cardFlip);
        }
        cardsFound = [];
        scorePoints = 0;
    }

    cardsChosen = [];
    cardsChosenIds = [];

    resultDisplay.textContent = scorePoints;
}

function cardFlip() {
    let cardId = this.getAttribute('data-id')

    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);

    console.log(cardsChosenIds);

    this.setAttribute('src', cardArray[cardId].img);

    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}
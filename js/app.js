const cardType = [
	'fa-diamond',
	'fa-paper-plane-o',
	'fa-anchor',
	'fa-bolt',
	'fa-cube',
	'fa-leaf',
	'fa-bicycle',
	'fa-bomb'
];

const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
let cardsArray = [];

restart.addEventListener('click', function() {
	removeCards();
	newDeck();
});

// newDeck() will create a new set of shuffled cards
function newDeck() {
	let shuffleCards = [];
		shuffleCards = shuffleCards.concat(cardType, cardType);
		shuffleCards = shuffle(shuffleCards);

	for (let i = 0; i < shuffleCards.length; i++) {
		const newCard = document.createElement('li');
		newCard.appendChild(document.createElement('i')).classList.add('fa', shuffleCards[i]);
		newCard.addEventListener('click', function(){
			matchCards(newCard);
		});
		deck.appendChild(newCard).className = 'card';
	}
}

// removeCards() will remove all cards from deck
function removeCards() {
	while (deck.firstChild) {
   		deck.removeChild(deck.firstChild);
	}
}

// match function will match two cards, hide if not the same
function matchCards(newCard) {
	// if card have match class, ignore and quit
	if ( newCard.className.match('match')) {
		return;
	}

	newCard.classList.add('match');
    cardsArray.push(newCard);

    if (cardsArray.length > 1 && cardsArray[0].firstChild.className === cardsArray[1].firstChild.className) {
        cardsArray = [];
        console.log('matched!');
    } else if (cardsArray.length > 1) {
    	setTimeout(hideCards.bind(null, cardsArray), 500);
        cardsArray = [];
        console.log('reset');
    }
}

function hideCards(cardsArray){
	    cardsArray[0].classList.remove('match');
        cardsArray[1].classList.remove('match');
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

newDeck();
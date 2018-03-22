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
const stars = document.querySelector('.stars').getElementsByTagName('li');
let moves = 0;
let cardsArray = [];
let markCards = 0;

restart.addEventListener('click', function() {
	moves = 0;
	document.querySelector('.moves').textContent = moves;
	removeCards();
	newDeck();
	resetStars();
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
		})

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
        movesCount();
        win();
    } else if (cardsArray.length > 1) {
    	setTimeout(hideCards.bind(null, cardsArray), 500);
        cardsArray = [];
        movesCount();
    }

    starRating();
}

function hideCards(cardsArray) {
	cardsArray[0].classList.remove('match');
    cardsArray[1].classList.remove('match');
}

function movesCount() {
	moves++;
	document.querySelector('.moves').textContent = moves;

	if (moves === 1) {
		document.querySelector('#movesStr').textContent = 'Move';
	} else if (moves === 2) {
		document.querySelector('#movesStr').textContent = 'Moves';
	}
}

function win() {
	markCards++;

	if (markCards === 8) {
		console.log('You win!');
		markCards = 0;
	}
}

function starRating() {
	if (moves === 12) {
		stars[2].classList.remove('stars-color');
	} else if (moves === 20) {
		stars[1].classList.remove('stars-color');
	}
}

function resetStars() {
	for (i = 0; i < stars.length; i++) {
		stars[i].classList.add('stars-color');
	}
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

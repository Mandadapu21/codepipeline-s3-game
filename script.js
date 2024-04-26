document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    const cardArray = [
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card5', img: 'images/success.png' },
        { name: 'card5', img: 'images/success.png' },
        // ...add more pairs as needed
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 3) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');

        if (cardsChosen[0] === cardsChosen[1] && cardsChosen[0] === cardsChosen[2]) {
            const firstCardId = cardsChosenId[0];
            const secondCardId = cardsChosenId[1];
            const thirdCardId = cardsChosenId[2];
            
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[thirdCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cards[thirdCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            for (let i = 0; i < cardsChosenId.length; i++) {
                const cardId = cardsChosenId[i];
                cards[cardId].setAttribute('src', 'images/blank.png');
            }
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 3) {
            alert('Congratulations! You found them all!');
        }
    }

    startButton.addEventListener('click', createBoard);
});

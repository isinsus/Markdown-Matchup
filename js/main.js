
class Card {
    constructor(effect, mode) {
        this.effect = effect;
        this.mode = mode;
        this.faceUp = false;
    }
    flipUp() {
        this.faceUp = true;
    }
    flipDown() {
        this.faceUp = false;
    }
}

const table = [];
let isComplete;
let turn;
let selectedCards = [];

const cardSlots = document.querySelectorAll('figure');
const selectTable = document.querySelector('main');
const selectComplete = document.getElementById('complete')

selectTable.addEventListener('click', cardFlip);

function startGame() {
    const effects = ['bold', 'italics', 'bullet', 'code', 'h1', 'h2', 'link', 'number'];
    const modes = ['markdown', 'format'];
    isComplete = false;
    turn = 1;

    for (const effect of effects) {
        for (const mode of modes) {
            table.push(new Card(effect, mode));
        }
    }

    table.sort(() => Math.random() - 0.5)

    tableSetup();
}

function tableSetup() {
    for (let i = 0; i < table.length; i++) {
        document.getElementById(`card${i}`).classList.add(`${table[i].effect}${table[i].mode}`, "back");
    }
}

function cardFlip(event) {

    const idx = parseInt(event.target.id.replace('card', ''));

    if (table[idx].faceUp === false) {
        table[idx].flipUp();
        displayTable();
        selectedCards.push(idx);

        if (turn === 1) {
            turn *= -1;
        } else if (turn === -1) {
            compareCards();
            testCompletion();
            turn *= -1;
        }

    }
}


function displayTable() {
    for (let i = 0; i < table.length; i++) {
        const selectCard = document.getElementById(`card${i}`);

        if (table[i].faceUp === false) {
            selectCard.classList.add("back");
        } else {
            selectCard.classList.remove("back");
        }
    }
}


function compareCards() {
    let firstCard = selectedCards[0];
    let secondCard = selectedCards[1];

    if (table[firstCard].effect === table[secondCard].effect) {
        selectedCards.splice(0, 2);

    } else {
        selectTable.style.pointerEvents = 'none';
        document.getElementById(`card${firstCard}`).style.border = '1px solid rgb(255, 0, 0)'
        document.getElementById(`card${secondCard}`).style.border = '1px solid rgb(255, 0, 0)'

        setTimeout(() => {
            table[firstCard].flipDown();
            table[secondCard].flipDown();
            document.getElementById(`card${firstCard}`).style.removeProperty('border');
            document.getElementById(`card${secondCard}`).style.removeProperty('border');
            selectedCards.splice(0, 2);
            displayTable();
            selectTable.style.removeProperty('pointer-events');
        }, 2000);
    }
}


function testCompletion() {
    isComplete = true;

    for (let i = 0; i < table.length; i++) {
        if (table[i].faceUp === false) {
            isComplete = false;
            break;
        }
    }

    if (isComplete) {
        selectComplete.innerHTML = 'Congrats! You’re done! <br> Click here to reset.'
        selectTable.style.pointerEvents = 'none';
        selectComplete.addEventListener('click', resetGame);
    }
}


function resetGame() {
    if (isComplete) {
        selectComplete.innerHTML = '';

        for (let i = 0; i < table.length; i++) {
            document.getElementById(`card${i}`).classList.remove(`${table[i].effect}${table[i].mode}`, "back");
        }
        table.splice(0, table.length);
        isComplete = false;
        selectTable.style.removeProperty('pointer-events');
        startGame()

    }
}

startGame()

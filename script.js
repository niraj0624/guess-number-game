let randomNumber = parseInt(Math.random() * 100 + 1);

const userInput = document.querySelector('#guessInput');
const submit = document.querySelector('#submit');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const hint = document.querySelector('.lowOrHigh');
const startOver = document.querySelector('#result_box');

const p = document.createElement('p');

let previous_Guess = [];
let number_Guess = 0;

let playGame = true;

if(playGame) {
    submit.addEventListener('click', function(e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Enter a valid number');
    } else if (guess < 1) {
        alert('Enter a number more than 1');
    } else if (guess > 100) {
        alert('Enter a number less than 100');
    } else {
        previous_Guess.push(guess);
        if (number_Guess === 9) {
            displayGuess(guess);
            displayMessage(`Game Over! Random number was ${randomNumber}`);
            endGame();
        } else { 
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You guessed it right, yeah :_)`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Number is TOO LOW!`);
    } else {
        displayMessage(`Number is TOO HIGH !`);
    }
}
function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    number_Guess++;
    remaining.innerHTML = `${10 - number_Guess} `;
}
function displayMessage(message) {
    hint.innerHTML = `<h3>${message}</h3>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<button id = "newGame"> New Game</button>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameBtn = document.querySelector('#newGame');
    newGameBtn.addEventListener('click', function(e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        previous_Guess = [];
        number_Guess = 0;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${10 - number_Guess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        hint.innerHTML = '';

        playGame = true;
    });
}


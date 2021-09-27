'use strict';

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");


// Initial states
let currentScore, activePlayer, playing;
const init = () =>
{
    currentScore = 0;
    activePlayer = 0;
    playing =true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");

    player0.classList.add("player--active");
    player1.classList.remove("player--active");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
};
init();


// Rolling the dice
btnRoll.addEventListener("click", () =>
{
    if(playing)
    {
        const randomNumber = Math.trunc(Math.random() * 6) + 1;
        console.log(randomNumber);
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${randomNumber}.png`;

        if(randomNumber !== 1)
        {
            currentScore += randomNumber;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore; 
        }
        else
        {
            switchPlayer();
        }
    }
});

let switchPlayer = () =>
{
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active"); 
}

// Hold button
btnHold.addEventListener("click", () =>
{
    if(playing)
    {
        // modifying the total score
        let curScore = Number(document.querySelector(`#current--${activePlayer}`).textContent);
        let totalScore = Number(document.querySelector(`#score--${activePlayer}`).textContent);
        totalScore += curScore;
        document.querySelector(`#score--${activePlayer}`).textContent = totalScore;

        // make current score = 0 and switch player
        currentScore = 0;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;

        if(totalScore >= 10)
        {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            diceEl.classList.add("hidden");
        }
        else
        {
            switchPlayer();
        }
    }
});


// New game
btnNew.addEventListener("click", init);
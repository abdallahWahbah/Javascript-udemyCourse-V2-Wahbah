'use strict';


let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// for testing 
document.querySelector(".number").textContent = secretNumber;

let displayMessage =(message) =>
{
    document.querySelector(".message").textContent = message;
}

document.querySelector(".check").addEventListener("click", () =>
{
    let guess = Number(document.querySelector(".guess").value);

    // If there is no input
    if(!guess)
    {
        displayMessage("No number!");
    }
    else if(guess !== secretNumber) // if the input is greater or lower than the random number
    {
        displayMessage(guess > secretNumber ? "Too high!" : "Too low!");
        score--;
        document.querySelector(".score").textContent = score;

        if(score <= 0 )
        {
            displayMessage("You lost the game!");
            document.querySelector(".score").textContent = 0;
        }
    }
    else if(guess === secretNumber) // If you guessed it right
    {
        displayMessage("Correct Number!");
        document.querySelector(".number").textContent = guess;
        document.querySelector(".highscore").textContent = score;
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem"
    }
});


// Replay the game
document.querySelector(".again").addEventListener("click", () =>
{
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";
    displayMessage("Start guessing...");
    document.querySelector(".score").textContent = 20;
    score = 20;
    document.querySelector(".highscore").textContent = 0;
    highScore = 0;
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector(".number").style.width = "15rem"

    // for testing
    document.querySelector(".number").textContent = secretNumber;
});
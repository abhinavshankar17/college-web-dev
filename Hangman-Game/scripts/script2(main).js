const hangmanImage = document.querySelector(".hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters = [], wrongGuessCount = 0;

const maxGuesses = 6;

const resetGame = () =>{

    // resetting all the variables and UI
    

    correctLetters = [];
    wrongGuessCount = 0;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class ="letter"></li>`).join("");
    gameModal.classList.remove("show");
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);

}
const getRandomWord = ()  =>{
    const { word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
        currentWord = word;
        // console.log(word);
        document.querySelector(".hint-text b").innerText = hint;
        resetGame(); 
}

const gameOver = (isVictory) =>{

    // after 300ms of game complete the modal is shown


    setTimeout(() =>{
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congratulations!!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");

    }, 300);

}

const initGame = (button, clickedLetter) =>{
    // checking if the clicked letter exists in the word
    if (currentWord.includes(clickedLetter)) {
        // showing all the correct letters on the word display
        [...currentWord].forEach((letter, index) =>{
            if (letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }})
        // console.log(clickedLetter, "is existing in the word");
    }
    else{
        // if wrong letter clicked then updating guess count and image

        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        // console.log(clickedLetter, "is not existing in the word");
    }
 // console.log(button, clickedLetter);
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;


    // calling gameOver function if any of these conditions meet
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);



}

// Creating Keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    // console.log("button");
    keyboardDiv.appendChild(button);
    button.addEventListener("click" , e => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);





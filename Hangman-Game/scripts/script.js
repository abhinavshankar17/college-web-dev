// contains few error but was the first file
// new and debugged file is used with the name script2(main).js


const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;
function resetGame(){
    // resetting all the game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerText = currentWord.split("").map(() => `<li class ="letter"></li>`).join("");
    gameModal.classList.remove("show");
}
//Selecting a random word and hint from list
function getRandomWord(){
    const { word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();

}
// const getRandomWord = () => {
//     const { word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
//     currentWord = word;
//     console.log(word);
//     document.querySelector(".hint-text b").innerText = hint;
//     resetGame();  
// }
function gameOver(isVictory){
    // after 300ms of game complete the modal is shown
    setTimeout(() => {
        const modalText = isVictory ? `You found the word :` : `The correct word was :`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");

    }, 300);
}
function initGame(button, clickedLetter){
    if (currentWord.includes(clickedLetter)) {
        //showing all correct letters on the word display
        [...currentWord].forEach((letter, index) =>{
            if (letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else{
        // if clicked letter does not exist then update the wrong guess and image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    //calling game over function if any of these conditions meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}
// Creating Keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button); 
    // button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
    // console.log(String.fromCharCode(i));
}
// getRandomWord();
document.addEventListener("DOMContentLoaded", () => {
    getRandomWord();
});
// getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);

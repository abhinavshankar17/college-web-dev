// used chatgpt for further knowledege and find erros in my prior js file script.js




const resetGame = () => {
    // Resetting all the game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
};

for (let i = 97; i <= 122; i++) { // Include 'z'
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, e.target.innerText)); // Use button's text
}
const getRandomWord = () => {
    const { word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                const letterElement = wordDisplay.querySelectorAll("li")[index];
                letterElement.innerText = letter;
                letterElement.classList.add("guessed");
            }
        });
    } else {
        // Updating the wrong guess count and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Check for game over conditions
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if ([...new Set(currentWord)].every(letter => correctLetters.includes(letter))) return gameOver(true);
};
getRandomWord();
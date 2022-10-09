const hangman = {
    currentWord: null,
    currentLetters: null,
    attempts: 0,
    elementWord: document.querySelector(".word"),
    elementLetters: document.querySelector(".letters"),
    elementAttempts: document.querySelector(".attempts"),
    words: [
        "Kotek",
        "Piesek",
        "Samolot",
        "Statek",
        "Kobieta",
        "Mężczyzna",
        "Programista",
        "Okulary",
        "Szkoła",
        "Kluska nerwuska",
    ],

    generateWordItems() {
        const allLetters = ["a","ą","b","c","ć","d","e","ę","f","g","h","i","j","k","l","ł","m",
        "n","ń","o","ó","p","q","r","s","ś","t","u","v","w","x","y","z","ź","ż"];

        allLetters.forEach(letter => {
            const button = document.createElement("button");
            button.classList.add("active-letter");
            button.type = "button";
            button.dataset.letter = letter;
            button.innerText = letter;
            this.elementLetters.appendChild(button);
        });
    },

    letterEvents() {
        this.elementLetters.addEventListener("click", e => {
            if (e.target.nodeName.toUpperCase() === "BUTTON" && e.target.classList.contains("active-letter")) {
                const letter = e.target.dataset.letter;
                this.checkLettersInWord(letter.toUpperCase());
                e.target.disabled = true;
            }
        })
    },

    enableLetters() {
        const letters = this.elementLetters.querySelectorAll(".active-letter");
        letters.forEach(letter => letter.disabled = false);
    },

    disableLetters() {
        const letters  = this.elementLetters.querySelectorAll(".active-letter");
        letters.forEach(letter => letter.disabled = true);
    },

    showAttempts() {
        this.elementAttempts.innerText = this.attempts;
    },

    randomWord() {
        const max = this.words.length - 1;
        const min = 0;
        const random = Math.floor(Math.random()*(max-min+1)+min);

        this.currentWord = this.words[random].toUpperCase();
        this.currentLetters = this.currentWord.replace(/ /g, "")
        this.elementWord.innerText = "";

        const letters = this.currentWord.split("");
        letters.forEach(letter => {
            const div = document.createElement("div");
            div.classList.add("hangman-word");
            if (letter === " "){
                div.classList.add("hangman-word-space");
            }
            this.elementWord.appendChild(div);
        })
    },

    doesLetterExist() {
        return this.currentLetters.length;
    },

    checkLettersInWord(letter) {
        if (this.currentWord.includes(letter)) {
            const lettersBox = this.elementWord.querySelectorAll(".hangman-word");
            for (let i=0; i<this.currentWord.length; i++) {
                if (this.currentWord[i] === letter) {
                    lettersBox[i].innerText = letter;
                }
            }
        
        this.currentLetters = this.currentLetters.replace(new RegExp(letter, "g"), "");

        if(!this.doesLetterExist()) {
            this.gameComplete();
        }
        } else {
            this.attempts--;
            this.showAttempts();

            if (this.attempts <= 0) {
                this.gameOver();
            }
        }
    },

    gameOver() {
        const over = document.querySelector(".game-over")
        over.classList.remove("disabled")
        document.getElementById("value").innerHTML = this.currentWord;
        this.disableLetters();
    },

    gameComplete() {
        const complete = document.querySelector(".game-complete")
        const start = () => {
            setTimeout(function() {
                confetti.start()
            }, 500);
        };
        const stop = () => {
            setTimeout(function() {
                confetti.stop()
            }, 3000);
        };
        complete.classList.remove("disabled")
        this.disableLetters();
        start();
        stop();
    },

    hangmanStart() {
        this.attempts = 10;
        this.randomWord();
        this.showAttempts();
        this.enableLetters();
    },

    initializeGame() {
        this.generateWordItems();
        this.letterEvents();
        this.disableLetters();
    }
};

hangman.initializeGame();
document.querySelector(".start").addEventListener("click", () => hangman.hangmanStart());

const startWon = document.querySelector(".game-complete");
const startButton = startWon.querySelector(".start").addEventListener("click", () => {
    startWon.classList.add("disabled")
    hangman.hangmanStart()
});

const startLost = document.querySelector(".game-over");
const startButtonLost = startLost.querySelector(".start").addEventListener("click", () => {
    startLost.classList.add("disabled")
    hangman.hangmanStart()
});
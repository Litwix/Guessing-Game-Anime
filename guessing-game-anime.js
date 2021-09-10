// const  { randomSong } = require('./randomSongGenerator.js');

const songs = ['Attack on Titan.mp3', 'Death Note.mp3', 'Demon Slayer.mp3', 'Food Wars.mp3', 'Fullmetal Alchemist.mp3', 
'Horimiya.mp3', 'Jujutsu Kaisen.mp3', 'Naruto.mp3', 'Sword Art Online.mp3', 'Tokyo Ghoul.mp3'];

const shuffled = shuffle(songs);

class Game {
    constructor() {
        this.index = 0;
        this.answer = this.generateAnswer();
        this.score = 0;
        this.guess = null;
        this.attempts = 5;
        this.correctGuesses = [];
        this.correctGuessesFormatted = [];
        this.tempIncorrectGuesses = [];
        this.tempIncorrectGuessesFormatted = [];
    }

    generateAnswer() {
        const song = shuffled[this.index];
        const answer = song.slice(0, song.length-4);
        return answer;
    }

    checkGuess(guess) {
        this.guess = guess.toLowerCase();
        let feedback = '';
        if (this.guess === this.answer.toLowerCase()) {
            this.score += 10;
            this.correctGuesses.push(this.answer.toLowerCase());
            this.correctGuessesFormatted.push(this.answer);
            this.tempIncorrectGuesses = [];
            this.tempIncorrectGuessesFormatted = [];
            document.querySelector('#score').innerHTML = `Score: ${this.score}`;
            let totalGuesses = document.querySelector('#correct-guesses').innerHTML;
            document.querySelector('#correct-guesses').innerHTML = totalGuesses + `${this.answer}<br><br>`;
            // document.querySelector('#incorrect-attempts').innerHTML = `Incorrect Attempts (current round): N/A`;
            feedback = 'Correct!';
        } else if (this.correctGuesses.includes(this.guess)) {
            feedback = 'You have already correctly guessed this anime!';
        } else if (this.tempIncorrectGuesses.includes(this.guess)) {
            feedback = "You just tried that! You're lucky I'm not taking any more lives!";
        } else {
            this.tempIncorrectGuesses.push(this.guess);
            this.tempIncorrectGuessesFormatted.push(guess);
            this.attempts--;
            // document.querySelector('#incorrect-attempts').innerHTML = `Incorrect Attempts (current round): ${this.tempIncorrectGuessesFormatted.join(', ')}`;
            document.querySelector('#remaining-lives').innerHTML = `Remaining Lives: ${this.attempts}`;
            if (this.attempts === 0) {
                feedback = `Game Over! Your final score is ${this.score}`;
            } else {
                feedback = 'Incorrect! Try again!';
            }
        }
        document.querySelector('#feedback').innerHTML = feedback;
        return feedback;
    }
}

function shuffle(arr) {
    let m = arr.length, temp, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        temp = arr[m];
        arr[m] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function newGame() {
    return new Game();
}

function playGame() {
    const game = newGame();

    //Play OP Button:
    var audio = new Audio('https://raw.githubusercontent.com/Litwix/Guessing-Game-Anime/main/audio/' + shuffled[game.index]);
    const playOP = document.getElementById('play-op');
    let count = 0;
    let timerCount = 0;
    playOP.addEventListener('click', function() {
        if (count % 2 === 0) {
            audio.play();
            playOP.innerHTML = 'Pause';
            count++;
        } else {
            audio.pause();
            playOP.innerHTML = 'Resume';
            count++;
        }
        if (timerCount === 0) {
            timer();
            timerCount++;
        }
    });

    //Submit Button and Enter Key:
    const submit = document.getElementById('submit');
    submit.addEventListener('click', function() {
        const guess = document.querySelector('#input-box').value;
        document.querySelector('#input-box').value = '';
        const feedback = game.checkGuess(guess);
        if (feedback.includes('Correct!')) {
            setTimeout(advanceSong(), 500);
        }
        if (feedback.includes('Game Over!')) {
            setTimeout(endGame(), 500);
        }
    });

    const enter = document.getElementById('input-box');
    enter.addEventListener('keypress', function(key) {
        if (key.code === 'Enter') {
            const guess = document.querySelector('#input-box').value;
            document.querySelector('#input-box').value = '';
            const feedback = game.checkGuess(guess);
            if (feedback.includes('Correct!')) {
                setTimeout(advanceSong(), 500);
            }
            if (feedback.includes('Game Over!')) {
                setTimeout(endGame(), 500);
            }
        }
    });

    //Skip Button:
    const skip = document.getElementById('skip');
    skip.addEventListener('click', function() {
        game.score -= 3;
        document.querySelector('#score').innerHTML = `Score: ${game.score}`;
        advanceSong();
    });

    //Hint Button:
    const hint = document.getElementById('hint');
    hint.addEventListener('click', function() {
        alert('Hint functionality unavailable at the moment');
    });

    //Restart Button:
    const restart = document.getElementById('restart');
    restart.addEventListener('click', function() {
        window.location.reload();
    });

    function timer() {
        var sec = 90;
        var timer = setInterval(function() {
            document.getElementById('remaining-time').innerHTML = `Remaining Time: ${sec} seconds`;
            sec--;
            if (sec < -1) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    function advanceSong() {
        game.index++;
        if (game.index === shuffled.length) {
            endGame();
        }
        audio.pause();
        audio = new Audio('https://raw.githubusercontent.com/Litwix/Guessing-Game-Anime/main/audio/' + shuffled[game.index]);
        game.answer = game.generateAnswer();
        audio.play();
        count = 1;
        playOP.innerHTML = 'Pause';
    };

    function endGame() {
        audio.pause();
        if (game.index === shuffled.length) {
            alert(`No more songs!\nYour final score was ${game.score}.\nPress "OK" to play again`);
        } else if (game.attempts === 0) {
            alert(`No more lives!\nYour final score was ${game.score}.\nPress "OK" to play again`);
        } else {
            alert(`Out of Time!\nYour final score was ${game.score}.\nPress "OK" to play again`);
        }
        window.location.reload();
    };
}

playGame();
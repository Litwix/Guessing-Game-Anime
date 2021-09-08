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
        this.attempts = 3;
        this.correctGuesses = [];
        this.tempIncorrectGuesses = [];
    }

    generateAnswer() {
        const song = shuffled[this.index];
        const answer = song.slice(0, song.length-4).toLowerCase();
        return answer;
    }

    //Warning (untested, in progress):
    checkGuess(playersGuess) {
        this.guess = playersGuess.toLowerCase();
        let feedback = '';
        if (this.guess === this.answer) {
            this.score += 10;
            this.correctGuesses.push(this.guess);
            this.tempIncorrectGuesses = [];
            feedback = 'Correct!';
            document.querySelector('#correct-guesses').innerHTML = this.correctGuesses.join(', ');
            document.querySelector('#incorrect-attempts').innerHTML = this.tempIncorrectGuesses.join(', ');
        } else if (this.correctGuesses.includes(this.guess)) {
            feedback = 'You have already correctly guessed this anime!';
        } else if (this.tempIncorrectGuesses.includes(this.guess)) {
            feedback = "You just tried that! You're lucky I'm not taking any more lives!";
        } else {
            this.tempIncorrectGuesses.push(this.guess);
            document.querySelector('#incorrect-attempts').innerHTML = this.tempIncorrectGuesses.join(', ');
            this.attempts--;
            document.querySelector('#remaining').innerHTML = `Remaining Lives: ${this.attempts}`;
            if (this.attempts === 0) {
                feedback = `Game Over! Your final score is ${this.score}`;
            } else {
                feedback = 'Incorrect! Try again!';
            }
        }

        document.querySelector('#feedback > h3').innerHTML = feedback;
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
    });

    //Submit Button (untested, in progress):
    const submit = document.getElementById('submit');
    submit.addEventListener('click', function() {
        const guess = document.querySelector('#input-box').value;
        document.querySelector('#input-box').value = '';
        game.checkGuess(guess);
    });

    //Skip Button:
    const skip = document.getElementById('skip');
    skip.addEventListener('click', function() {
        game.score -= 3;
        advanceSong();
    })

    //Hint Button:
    const hint = document.getElementById('hint');
    hint.addEventListener('click', function() {
        alert('Hint functionality unavailable at the moment');
    })

    //Restart Button:
    const restart = document.getElementById('restart');
    restart.addEventListener('click', function() {
        window.location.reload();
    });

    function advanceSong() {
        game.index++;
        if (game.index === shuffled.length) {
            endGame();
        }
        audio.pause();
        audio = new Audio('https://raw.githubusercontent.com/Litwix/Guessing-Game-Anime/main/audio/' + shuffled[game.index]);
        audio.play();
        count = 1;
        playOP.innerHTML = 'Pause';
    }

    function endGame() {
        audio.pause();
        alert(`No more songs!\nYour final score was ${game.score}.\nPress "OK" to play again`);
        window.location.reload();
    }
}

playGame();
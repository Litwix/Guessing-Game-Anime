// const  { randomSong } = require('./randomSongGenerator.js');

class Game {
    constructor() {
        this.guess = null;
        this.score = 0;
        this.answer = generateSong()[0];
        this.prevGuesses = [];
    }
}

const songs = ['Attack on Titan.mp3', 'Death Note.mp3', 'Demon Slayer.mp3', 'Food Wars.mp3', 'Fullmetal Alchemist.mp3', 
'Horimiya.mp3', 'Jujutsu Kaisen.mp3', 'Naruto.mp3', 'Sword Art Online.mp3', 'Tokyo Ghoul.mp3'];

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

const shuffledSongs = shuffle(songs);

function generateSong() {
    const song = shuffledSongs[0];
    const answer = song.slice(0, song.length-4).toLowerCase();
    return [answer, song];
}

var audio = new Audio('../audio/' + generateSong()[1]);

let playOP = document.getElementById('play-op');
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
})
function randomSong() {
    var fs = require('fs');
    var files = fs.readdirSync('/Users/anshupatel/Documents/Grace-Hopper/Foundations/Guessing-Game-Anime/audio');
    let chosenFile = files[Math.floor(Math.random() * files.length-1) + 1];
    return chosenFile;
}

module.exports.randomSong = randomSong;

var express = require('express');
var app = express();
var fs = require("fs");

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandomMemeName() {
    dir = fs.readdirSync("public/memes/");
    randomInt = randomIntFromInterval(0, dir.length - 1);
    return "memes/" + dir[randomInt];
}

app.use(express.static('public'));

app.get('/', function (req, res) {

    res.sendFile("index.html");
});

app.get('/meme', function (req, res) {
    res.sendFile("public/img.jpg");
});

app.get('/randomMeme', function (req, res) {
    res.send(getRandomMemeName());
});

app.listen(80, function () {
    getRandomMemeName();
  console.log('Example app listening on port 80!');
});

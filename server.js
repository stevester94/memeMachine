
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile("index.html");
});

app.get('/meme', function (req, res) {
    res.sendFile("public/img.jpg");
});

app.get('/randomMeme', function (req, res) {
    res.send("img.jpg");
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});

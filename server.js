var express = require('express');
var app = express();
var fs = require("fs");

//File upload stuff
var multer = require("multer");
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/memes');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage}).any();



function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandomMemeName() {
    dir = fs.readdirSync("public/memes/");
    randomInt = randomIntFromInterval(0, dir.length - 1);
    console.log(randomInt);
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

app.get('/upload', function (req, res) {
    res.sendFile(__dirname + '/public/upload.html');
});

app.post('/api/upload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        res.end("<a href=/>Success, Back To Home</a>");
    });


});


app.listen(80, function () {
    getRandomMemeName();
  console.log('Example app listening on port 80!');
});

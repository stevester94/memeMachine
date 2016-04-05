var express = require('express');
var app = express();
var fs = require("fs");

//File upload stuff
var multer  =   require('multer');

var storage =   multer.diskStorage({
   destination: function (req, file, callback) {
     callback(null, './uploads');
   },
   filename: function (req, file, callback) {
     callback(null, file.fieldname + '-' + Date.now());
   }
});

var upload = multer({ storage : storage}).single('uploads');



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
    res.sendFile("./public/upload.html");
});

app.post('/api/upload',function(req,res){
     upload(req,res,function(err) {
         if(err) {
             return res.end("Error uploading file.");
         }
         res.end("File is uploaded");
     });
});


app.listen(80, function () {
    getRandomMemeName();
  console.log('Example app listening on port 80!');
});

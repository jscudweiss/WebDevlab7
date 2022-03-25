const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const {response} = require("express");
app.use(bodyParser.urlencoded({extended: true}));
/*
npm init
press enter a shitload
npm i express body-parser
ctrl+c
node server.js
*/

app.use(express.static(__dirname + "/public"));
let carList = [];
app.listen(3000, function () {
    console.log("server started at 3000");
    const rawData = fs.readFileSync(__dirname + "/public/data/data10.json");
    carList=JSON.parse(rawData);
    console.log(carList);
});

app.get("/", function (req, res) {
    res.sendFile("/public/index.html");
    console.log()
});

app.get("/new-car", function (req, res) {
    res.sendFile("/public/new_car.html");
    console.log()
});

app.post("/create-new-car", (req,res)=> {
    //console.log(req.body.message);
    const carItem = {
        "stock_num": req.body.stock_num,
        "make": req.body.make,
        "model": req.body.model,
        "year": parseInt(req.body.year),
        "url":req.body.url,
        "color":req.body.color,
    }
    carList.push(carItem);
    const carJSON = JSON.stringify(messageList);
    console.log(carJSON);
    fs.writeFile(__dirname+"/public/data/data10.json", carJSON, function (err) {
        if(err){
            console.log("Json writing failed", err);
        }else {
            res.redirect('/');
        }
    });
    //res.send("Thank You!");
})

app.get('/create-new-car',(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
})
app.post('/delete-car',(req,res)=>{
    messageList = messageList.filter((car)=>{
        return ((car.stock_num !== req.body.stock_num) ||(car.make !== req.body.make) || (car.model !== req.body.model) || (car.year !== req.body.year) || (car.price !== req.body.price));
    });
    const messageJSON = JSON.stringify(messageList);
    fs.writeFile(__dirname+"/public/data/messages.json", messageJSON,
        function (err) {
            if(err){
                console.log("Json writing failed", err);
            }else {
                res.redirect('/index');
            }
        });
})

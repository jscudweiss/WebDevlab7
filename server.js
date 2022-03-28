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

app.listen(3000, function () {
    console.log("server started at 3000");
    const rawData = fs.readFileSync(__dirname + "/public/data/data10.json");
    carList = JSON.parse(rawData);
    console.log(carList);
});

let carList = [];

app.get("/", function (req, res) {
    res.sendFile("/public/index.html");
    console.log()
});

app.post('/delete-car', (req, res) => {
    carList = carList.filter((car) => {
        //console.log((car.url !== req.body.url) , (car.color !== req.body.color) , (car.stock_num !== req.body.stock_num) , (car.make !== req.body.make) , (car.model !== req.body.model), (parseInt(car.year) !== parseInt(req.body.year)), (parseInt(car.price) !== parseInt(req.body.price)))
        return ((car.url !== req.body.url) || (car.color !== req.body.color) || (car.stock_num !== req.body.stock_num) || (car.make !== req.body.make) || (car.model !== req.body.model) || (parseInt(car.year) !== parseInt(req.body.year)) || (parseInt(car.price) !== parseInt(req.body.price)));
    });
    //console.log(carList);
    const carJSON = JSON.stringify(carList);
    fs.writeFile(__dirname + "/public/data/data10.json", carJSON,
        function (err) {
            if (err) {
                console.log("Json writing failed", err);
            } else {
                res.redirect('/');
            }
        });
})

app.post("/get-new-car", (req, res) => {
    //console.log(req.body.car);
    const carItem = {
        "stock_num": req.body.stock_num,
        "make": req.body.make,
        "model": req.body.model,
        "year": parseInt(req.body.year),
        "url": req.body.url,
        "color": req.body.color,
        "price": parseInt(req.body.price),
    }
    carList.push(carItem);
    const carJSON = JSON.stringify(carList);
    //console.log(carJSON);
    fs.writeFile(__dirname + "/public/data/data10.json", carJSON, function (err) {
        if (err) {
            console.log("Json writing failed", err);
        } else {
            res.redirect('/');
        }
    });
    //res.send("Thank You!");
})

app.get("/new-car", function (req, res) {
    res.sendFile(__dirname + "/public/new_car.html");
});
app.post("/new-car", function (req, res) {
    res.sendFile(__dirname + "/public/new_car.html");
});
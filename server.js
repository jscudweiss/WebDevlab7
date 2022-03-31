const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const {response} = require("express");
app.use(bodyParser.urlencoded({extended: true}));
/*
npm init
press enter alot
npm i express body-parser
ctrl+c
node server.js
*/

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.sendFile("/public/index.html");
    console.log()
});

app.get("/new-car", function (req, res) {
    res.sendFile(__dirname + "/public/new_car.html");
});

app.post("/new-car", function (req, res) {
    res.sendFile(__dirname + "/public/new_car.html");
});

app.listen(3000, function () {
    console.log("server started at 3000");
    const rawData = fs.readFileSync(__dirname + "/public/data/data10-copy.json");
    carList = JSON.parse(rawData);
    fs.writeFile(__dirname + "/public/data/data10.json", rawData,
        function (err) {
            if (err) {
                console.log("Json writing failed", err);
            } else {
                app.get('/');
            }
        });
    console.log(carList);
});

let carList = [];


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
});

app.post("/get-new-car", (req, res) => {
    console.log(req.body.stock_num);
    const carItem = {
        "stock_num": req.body.stock_num,
        "make": req.body.make,
        "model": req.body.model,
        "year": parseInt(req.body.year),
        "url": req.body.url,
        "color": req.body.color,
        "price": parseInt(req.body.price),
    }
    carList = carList.filter((car) => {
        //console.log(carItem.stock_num !== car.stock_num);
        return (carItem.stock_num !== car.stock_num);
    })
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
});

app.post('/delete-all', (req, res) => {
    //console.log(req.body.carList);
    req.body.carList.forEach(function (carL) {
        const carItem = JSON.parse(carL);
        carList = carList.filter((car) => {
            //console.log((car.url !== carItem.url), (car.color !== carItem.color), (car.stock_num !== carItem.stock_num), (car.make !== carItem.make), (car.model !== carItem.model), (parseInt(car.year) !== parseInt(carItem.year)), (parseInt(car.price) !== parseInt(carItem.price)))
            return ((car.url !== carItem.url) || (car.color !== carItem.color) || (car.stock_num !== carItem.stock_num) || (car.make !== carItem.make) || (car.model !== carItem.model) || (parseInt(car.year) !== parseInt(carItem.year)) || (parseInt(car.price) !== parseInt(carItem.price)));
        });
    })
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


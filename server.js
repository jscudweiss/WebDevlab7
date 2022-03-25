const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const {response} = require("express");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));
let carList = [];
app.listen(3000, function () {
    console.log("server started at 3000");
    const rawData = fs.readFileSync(__dirname + "/public/data/data10.json");
    messageList=JSON.parse(rawData);
    console.log(carList);
});

app.get("/", function (req, res) {
    res.sendFile("/public/index.html");
    console.log()
});

app.post("/forum", (req,res)=> {
    //console.log(req.body.message);
    const messageItem = {
        "name": req.body.name,
        "email": req.body.email,
        "year": parseInt(req.body.year),
        "message":req.body.message,
    }
    messageList.push(messageItem);
    const messageJSON = JSON.stringify(messageList);
    console.log(messageJSON);
    fs.writeFile(__dirname+"/public/data/messages.json", messageJSON, function (err) {
        if(err){
            console.log("Json writing failed", err);
        }else {
            res.redirect('/forum');
        }
    });
    //res.send("Thank You!");
})
app.get('/forum',(req,res)=>{
    res.sendFile(__dirname+"/public/forum.html");
})

app.post('/delete-message',(req,res)=>{
    messageList = messageList.filter((msg)=>{
        return ((msg.name !== req.body.name) || (msg.message !== req.body.message));
    });
    const messageJSON = JSON.stringify(messageList);
    fs.writeFile(__dirname+"/public/data/messages.json", messageJSON,
        function (err) {
            if(err){
                console.log("Json writing failed", err);
            }else {
                res.redirect('/forum');
            }
        });
})

import fs from "fs";

app.post("/make-new-car", (req, res) => {
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

    //console.log(carJSON);
    $.post('/get-new-car',{"Item":carItem})
})

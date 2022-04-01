function newCar() {
    const stock_num = document.getElementById("stock_num").value;
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;
    const year = document.getElementById("year").value;
    const color = document.getElementById("color").value;
    const url = document.getElementById("url").value;
    const price = document.getElementById("price").value;
    console.log(price);
    if (stock_num.length < 1) {
        document.getElementById("alert_New_Car").innerText = "Stock Number must not be empty";
        return;
    }
    if (make.length < 1) {
        document.getElementById("alert_New_Car").innerText = "Make must not be empty";
        return;
    }
    if (model.length < 1) {
        document.getElementById("alert_New_Car").innerText = "Model must not be empty";
        return;
    }
    if (year.length < 1) {
        document.getElementById("alert_New_Car").innerText = "Year must not be empty";
        return;
    }
    if (color.length < 1) {
        document.getElementById("alert_New_Car").innerText = "Color must not be empty";
        return;
    }
    if (url.length < 1) {
        document.getElementById("alert_New_Car").innerText = "Image URL must not be empty";
        return;
    }
    if (price.length < 1) {
        document.getElementById("alert_New_Car").innerText = "Price must not be empty";
        return;
    }
    document.getElementById("alert_New_Car").innerText = "";
    $.post("/get-new-car",
        {
            "stock_num": stock_num,
            "make": make,
            "model": model,
            "year": year,
            "color": color,
            "url": url,
            "price": price,
        }).done(() => {
        location.href = ('/');
        });
}
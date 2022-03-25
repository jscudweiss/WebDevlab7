function loadCar(car) {
    return `    
    <div class="row car_row">
                <div class="col-4 imgDiv" style="margin-bottom: 1rem">
                    <img src=https://img2.carmax.com/img/vehicles/19913071/1.jpg?width=800 class="card-img-top"
                         alt="...">
                </div>
                <div class="col-8 text-div">
                    <div class="row">
                        <div class="col-6">
                            <p class="text">Stock Number</p>
                        </div>
                        <div class="col-6">
                            <p class="stock_num text">${car.stock_num}</p>
                        </div>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p class="text">Make</p>
                        </div>
                        <div class="col-6">
                            <p class="make text">${car.make}</p>
                        </div>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p class="text">Model</p>
                        </div>
                        <div class="col-6">
                            <p class="model text">${car.model}</p>
                        </div>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p class="text">Year</p>
                        </div>
                        <div class="col-6">
                            <p class="year text">${car.year}</p>
                        </div>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p class="text">Price</p>
                        </div>
                        <div class="col-6">
                            <p class="price text">$${car.price}</p>
                        </div>
                        <hr>
                    </div>
                    <button type="button" class="btn btn-danger btn-block delete_btn">Delete</button>
                </div>
            </div>+
    `
}


$.getJSON("/public/data/data10.json", () => {
    console.log("file loaded");
}).done((data) => {
    data.forEach((car) => {
        //console.log(msg);\
        const msg_div = loadCar(car);
        $("#car_list").append(msg_div);
    })
    $.each($('.car_row'), function (idx) {
        if (idx % 2 === 0) {
            $(this).addClass('even_row');
        } else {
            $(this).addClass('odd_row');
        }
    })
    $('.delete_btn').on('click', function () {
        const car = JSON.parse($(this).attr('value'));
        console.log(car);
        $.post('/delete-car', {
            "stock_num": req.body.stock_num,
            "make": req.body.make,
            "model": req.body.model,
            "year": parseInt(req.body.year),
            "url": req.body.url
        })
            .done(() => {
                location.reload();
            });
    })
})
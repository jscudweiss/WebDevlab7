

function loadCar(car) {
    return `    
    <div class="row car_row">
                <div class="col-4 imgDiv"">
                    <img src=${car.url} alt="...">
                </div>
                <div class="col-8 text-div" style="margin-top: 2rem">
                    <div class="row">
                        <div class="col-10">
                            <div class="row">
                                <div class="col-6">
                                    <p class="text">Stock Number</p>
                                </div>
                                <div class="col-6">
                                    <p class="make text">${car.stock_num}</p>
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
                        </div>
                        <div class="col-2">
                            <input type="checkbox" class="carCheck"/>
                        </div>
                    </div>
                    <div class="row">
                        <button type="button" class="btn btn-danger btn-block delete_btn" value='${JSON.stringify(car)}'>delete</button>
                    </div>

                </div>
            </div>
    `
}


$.getJSON("/data/data10.json", () => {
    console.log("file loaded");
}).done((data) => {
    data.forEach((car) => {
        //console.log(msg);\
        const car_div = loadCar(car);
        $("#car_list").append(car_div);
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
            "stock_num": car.stock_num,
            "make": car.make,
            "model": car.model,
            "color": car.color,
            "year": car.year,
            "url": car.url,
            "price": car.price,
        })
            .done(() => {
                location.reload();
            });
    })
})
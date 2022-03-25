function loadCar(car) {
    return `    
    <div class="row">
                <div class="col-3 imgDiv" style="margin-bottom: 1rem">
                    <img src=${car.url} class="card-img-top"
                         alt="...">
                </div>
                <div class="col-9 text-div">
                    <div class="row">
                        <div class="col-6">
                            <p class="text">Make</p>
                        </div>
                        <div class="col-6">
                            <p class="make text">${car.make}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p class="text">Model</p>
                        </div>
                        <div class="col-6">
                            <p class="model text">${car.model}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p class="text">Year</p>
                        </div>
                        <div class="col-6">
                            <p class="year text">${car.year}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <p class="text">Price</p>
                        </div>
                        <div class="col-6">
                            <p class="price text">$${car.price}</p>
                        </div>
                    </div>
                    <button type="button" class="btn btn-danger delete_btn">Delete</button>
                </div>
            </div>
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
    $.each($('.row'), function (idx) {
        if (idx % 2 === 0) {
            $(this).addClass('even_row');
        } else {
            $(this).addClass('odd_row');
        }
    })
    $('.delete_btn').on('click', function () {
        const car = JSON.parse($(this).attr('value'));
        console.log(car);
        $.post('/delete-message',{"name":msg.name, "message":msg.message})
            .done(()=>{
                location.reload();
            });
    })
})
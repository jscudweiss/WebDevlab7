$.getJSON("data/messages.json", () => {
    console.log("file loaded");
}).done((data) => {
    data.forEach((msg) => {
        //console.log(msg);\
        const msg_div = loadCar(Car);
        $("#messages_list").append(msg_div);
    })
    $.each($('.row'), function (idx) {
        if (idx % 2 === 0) {
            $(this).addClass('even_row');
        } else {
            $(this).addClass('odd_row');
        }
    })
    $('.delete_btn').on('click', function () {
        const msg = JSON.parse($(this).attr('value'));
        console.log(msg);
        $.post('/delete-message',{"name":msg.name, "message":msg.message})
            .done(()=>{
                location.reload();
            });
    })
})
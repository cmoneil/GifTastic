$(document).ready(function () {
    var imageUrlStill;
    var ImageUrlAnimate;



    console.log('hi');
    var buttonThings = ['dogs', 'puppies', 'doggos']

    function createButtons() {
        $("#buttonArea").empty();
        for (var i = 0; i < buttonThings.length; i++) {
            console.log(i);
            var a = $('<button id = "thingButtons" class = "btn btn-secondary">');
            a.attr('data-name', buttonThings[i]);
            a.text(buttonThings[i]);
            $('#buttonArea').append(a);
        }
    };





    ////function newButton() {
    //   var a = $('<button class = "btn btn-secondary thingButtons">');
    //  a.addClass('gif')
    //  a.attr('data-name', buttonThings[i]);
    // a.text(buttonThings[i]);
    // $('#buttonArea').append(a);

    //};

    $("#addBtn").on("click", function (event) {
        console.log('yep')
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var thing = $("#searchTerm").val().trim();
        console.log(thing);

        // The movie from the textbox is then added to our array
        buttonThings.push(thing);

        // Calling renderButtons which handles the processing of our movie array
        createButtons();
        console.log(buttonThings);
    });

    $(document).on("click", "#thingButtons", function displayGif() {

        var gif = $(this).attr('data-name');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=wr45IzYkh3LPSQjXcH8yM45W4v7iyl31&q=' + gif + '&limit=5';

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            for (var i = 0; i < 5; i++) {
                console.log(response);
                imageUrlStill =
                    response.data[i].images.fixed_height_still.url;
                imageUrlAnimate = response.data[i].images.fixed_height.url;
                var imageRating = response.data[i].rating;
                var dataState = 'still'
                $('#gifArea').append(`<div class ='gifArray'>
              <p>Rating: ${imageRating}</p>
              <img class = 'img-thumbnail gifClick' src='${imageUrlStill}'
              data-still='${imageUrlStill}' data-animate='${imageUrlAnimate}' data-state = ${dataState}></div>
            `);
            }
        })
    });

    $(document).on("click", ".gifClick", function changeState() {
        console.log('gif')
        var $img = $(this);
        var state = $img.attr('data-state');
        console.log(state);

        if (state === "still") {
            console.log('gifstill');
            var animatedUrl = $img.attr('data-animate');
            $img.attr({'src': animatedUrl, 'data-state': 'animate'});
        }
        else{
            var stillUrl = $img.attr('data-still');
            $img.attr({'src': stillUrl, 'data-state': 'still'})
        }
    });
    

    createButtons();

})
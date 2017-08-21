$(document).ready(function(){


    var gifList = ["monkeys", "snl", "you mad", "shaq", "george bush", "make it rain", "wink", "smart", "amen", "dancing", "over it", "why", "confused", "wasted", "sarcastic", "beyonce", "whatever"];



    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < gifList.length; i++) {

            var a = $("<button>");
            a.addClass("gifButton");
            a.attr("data-name", gifList[i]);
            a.text(gifList[i]);
            $("#buttons-view").append(a);
            console.log("#buttons-view");
            
        };
    };

    renderButtons();


    $("#buttons-view").on("click", ".gifButton", function() {
        var gifName = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifName + "&api_key=dc6zaTOxFJmzC&limit=10";

        $("#gifs-appear-here").empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var gifImage = $("<img>");

                
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr('data-still',  results[i].images.fixed_height_still.url);
                    gifImage.attr('data-animate',  results[i].images.fixed_height.url);
                    gifImage.attr('data-state-animate', "still");
                    gifImage.attr("id", "gif");
                    gifDiv.append(p);
                    gifDiv.append(gifImage);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });
    });

    $("#gifs-appear-here").on("click", "img", function() {
        console.log("im here");
        var state = $(this).attr("data-state-animate");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        // var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        // gifName + "&api_key=dc6zaTOxFJmzC&limit=10";

        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        // })
        // .done(function(response) {
        //     var results = response.data;
        
            if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state-animate", "animate");
            } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state-animate", "still");
            }
        //});
    });

    $("#add-gif").on("click", function(event){
            event.preventDefault();
            gifList.push($("#gif-input").val());
            renderButtons();
    })

});

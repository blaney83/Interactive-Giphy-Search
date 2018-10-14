
var topics = ["Game of Thrones", "Vikings", "Harry Potter", "Ozarks", "Matrix", "Silicon Valley", "Star Wars", "Black Mirror", "Interstellar", "Rick and Morty", "Free Solo", "American Horror Story", "Planet Earth", "It's Always Sunny in Philadelphia", "Inglorious Basterds", "Wolf of Wallstreet", "Vikings", "The Duece", "Ex Machina", "Harry Potter"];

var buttonGenerator = {

    displayButtons: function () {
        topics.forEach(function (str) {
            var $newButton = $("<button class='api-search' id='" + str + "'>" + str + "</button>");
            $(".nav-container").append($newButton);
        })
    },

    emptyButtons: function () {
        $(".nav-container").empty();
    },

    addTopic: function () {
        var $createButton = $("#searchTerm").val().trim().toString();
        topics.push($createButton);
    },

    clearInput: function () {
        $("#searchTerm").val("")
    },

    createButton: function () {
        this.addTopic();
        this.emptyButtons();
        this.displayButtons();
        this.clearInput();
    },

}

var apiSearches = {

    creatingGifs: function (event) {

        var eventID = event.target.id;
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=zNkoEpfqn39HJRIs2fGIuLBR0EtnehXR&q=" + eventID + "&limit=20&offset=0&rating=r&lang=en"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < 5; i++) {
                var gifStill = response.data[i].images.fixed_width_still.url
                var gifHTML = "<img class='gif' src='" + gifStill + "'>";
                console.log(gifHTML);
                $("#col1").append(gifHTML);
            }
            for (var i = 6; i < 10; i++) {
                var gifStill = response.data[i].images.fixed_width_still.url
                var gifHTML = "<img class='gif' src='" + gifStill + "'>";
                console.log(gifHTML);
                $("#col2").append(gifHTML);
            }
            for (var i = 11; i < 15; i++) {
                var gifStill = response.data[i].images.fixed_width_still.url
                var gifHTML = "<img class='gif' src='" + gifStill + "'>";
                console.log(gifHTML);
                $("#col3").append(gifHTML);
            }
            for (var i = 16; i < 20; i++) {
                var gifStill = response.data[i].images.fixed_width_still.url
                var gifHTML = "<img class='gif' src='" + gifStill + "'>";
                console.log(gifHTML);
                $("#col4").append(gifHTML);
            }
        })

    },





}


$(document).ready(function () {

    buttonGenerator.displayButtons();

    $(":submit").on("click", function () {
        buttonGenerator.createButton();
    })
    //click is rippling to sibling buttons. ask tucker how to fix
    $("#clear-buttons").on("click", function () {
        buttonGenerator.emptyButtons();
    })

    $(document).on("click", ".api-search", apiSearches.creatingGifs)

})


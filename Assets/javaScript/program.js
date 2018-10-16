
var topics = ["Game of Thrones", "Vikings", "Harry Potter", "Ozarks", "Matrix", "Silicon Valley", "Star Wars", "Black Mirror", "Interstellar", "Rick and Morty", "Free Solo", "American Horror Story", "Planet Earth", "It's Always Sunny in Philadelphia", "Inglorious Basterds", "Wolf of Wallstreet", "The Duece", "Ex Machina"];

var masterTopics = ["Game of Thrones", "Vikings", "Harry Potter", "Ozarks", "Matrix", "Silicon Valley", "Star Wars", "Black Mirror", "Interstellar", "Rick and Morty", "Free Solo", "American Horror Story", "Planet Earth", "It's Always Sunny in Philadelphia", "Inglorious Basterds", "Wolf of Wallstreet", "The Duece", "Ex Machina"];

var eventID;
var currentLimit = 20;

var buttonGenerator = {

    displayButtons: function () {
        topics.forEach(function (str) {
            var punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
            //potential punctuation in the input
            var buttonArray = str.replace(punctuation, "").toLowerCase().split(" ");
            //removes all punctation in the input, changes all characters to lower case, and splits the answer into an array at any inlcuded word breaks
            var queryString;
            //sets the variable for the modified query term as a string
            if (buttonArray.length > 1) {
                //for any query term that is multiple words
                queryString = buttonArray.join("+");
                //join that term back together as a single string with "+" separating the words per the giphy API docs
            }else{
                queryString = buttonArray;
            }
            var $newButton = $("<button class='api-search' id='" + queryString + "'>" + str + "</button>");
            //names the button the original input term, but sets its ID to the API formated query term
            $(".nav-container").append($newButton);
        })
    },

    emptyButtons: function () {
        $(".nav-container").empty();
    },

    resetButtons: function() {
        buttonGenerator.emptyButtons();
        topics = [];
        topics = masterTopics;
        buttonGenerator.displayButtons();
    },

    addTopic: function () {
        var $createButton = $("#searchTerm").val().trim().toString();
        topics.push($createButton);
    },

    addRandom: function () {
        var $createButton = "Random";
        topics.push($createButton);
    },

    clearInput: function () {
        $("#searchTerm").val("")
    },

    createButton: function () {
        buttonGenerator.addTopic();
        buttonGenerator.emptyButtons();
        buttonGenerator.displayButtons();
        buttonGenerator.clearInput();
    },

    createRandom: function () {
        buttonGenerator.addRandom();
        buttonGenerator.emptyButtons();
        buttonGenerator.displayButtons();
        buttonGenerator.clearInput();
    }
}

var apiSearches = {

    creatingGifs: function (event) {

        $(".column").empty();
        currentLimit = 20;
        eventID = event.target.id;
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=zNkoEpfqn39HJRIs2fGIuLBR0EtnehXR&q=" + eventID + "&limit=20&offset=0&rating=r&lang=en"
        console.log(queryURL)
        console.log(eventID)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var colLength = response.data.length;
            var colArray = [];
            var arrArray = [];
            for (var j = 0; j < colLength; j++) {
                colArray.push(j)
            }
            for (var k = 0; k < 4; k++) {
                var newArr = colArray.splice(0, colLength / 4);
                arrArray.push(newArr);
            }
            arrArray.forEach(function (a, i) {
                colID = i;
                console.log(a)
                a.forEach(function (e, i) {
                    var imgPath = response.data[e].images
                    var gifHTML = "<div class='gifCon'><img class='gif' src='" + imgPath.fixed_width_still.url + "' data-still='" + imgPath.fixed_width_still.url + "' data-animate='" + imgPath.fixed_width.url + "' data-download='" + imgPath.original_mp4.mp4 + "' data-state='still'><img class='favorite' src='Assets/Images/baseline_favorite_white_18dp.png' data-still='" + imgPath.fixed_width_still.url + "' data-animate='" + imgPath.fixed_width.url + "' data-download='" + imgPath.original_mp4.mp4 + "' data-state='still'><a href='" + imgPath.original_mp4.mp4 + "' download><img src='Assets/Images/baseline_insert_link_white_18dp.png' class='download' data-download='" + imgPath.original_mp4.mp4 + "'></a></div>";
                    $("#col" + (this.colID + 1)).append(gifHTML);
                    console.log(imgPath.original_mp4.mp4);
                })
            })
        })
    },

    randomGif: function () {

        console.log(topics)
        $(".column").empty();
        currentLimit = 20;
        var limitArray = [];
        limitArray.push(currentLimit)
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=zNkoEpfqn39HJRIs2fGIuLBR0EtnehXR&limit=" + currentLimit + "&offset=0&rating=r&lang=en"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var colLength = response.data.length;
            var colArray = [];
            var arrArray = [];
            for (var j = 0; j < colLength; j++) {
                colArray.push(j)
            }
            for (var k = 0; k < 4; k++) {
                var newArr = colArray.splice(0, colLength / 4);
                arrArray.push(newArr);
            }
            arrArray.forEach(function (a, i) {
                colID = i;
                a.forEach(function (e, i) {
                    var imgPath = response.data[e].images
                    var gifHTML = "<div class='gifCon'><img class='gif' src='" + imgPath.fixed_width_still.url + "' data-still='" + imgPath.fixed_width_still.url + "' data-animate='" + imgPath.fixed_width.url + "' data-download='" + imgPath.original_mp4.mp4 + "' data-state='still'><img class='favorite' src='Assets/Images/baseline_favorite_white_18dp.png' data-still='" + imgPath.fixed_width_still.url + "' data-animate='" + imgPath.fixed_width.url + "' data-download='" + imgPath.original_mp4.mp4 + "' data-state='still'><a href='" + imgPath.original_mp4.mp4 + "' rel=,nofollow' download target='_blank'><img src='Assets/Images/baseline_insert_link_white_18dp.png' class='download' data-download='" + imgPath.original_mp4.mp4 + "'></a></div>";
                    $("#col" + (this.colID + 1)).append(gifHTML);
                })
            })
        })
    },

    tenMore: function () {

        $(".column").empty();
        currentLimit = currentLimit + 20;
        var limitArray = [];
        limitArray.push(currentLimit)
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=zNkoEpfqn39HJRIs2fGIuLBR0EtnehXR&q=" + eventID + "&limit=" + currentLimit + "&offset=0&rating=r&lang=en"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var colLength = response.data.length;
            var colArray = [];
            var arrArray = [];
            for (var j = 0; j < colLength; j++) {
                colArray.push(j)
            }
            for (var k = 0; k < 4; k++) {
                var newArr = colArray.splice(0, colLength / 4);
                arrArray.push(newArr);
                console.log(arrArray)
            }
            arrArray.forEach(function (a, i) {
                colID = i;
                a.forEach(function (e, i) {
                    var imgPath = response.data[e].images
                    var gifHTML = "<div class='gifCon'><img class='gif' src='" + imgPath.fixed_width_still.url + "' data-still='" + imgPath.fixed_width_still.url + "' data-animate='" + imgPath.fixed_width.url + "' data-download='" + imgPath.original_mp4.mp4 + "' data-state='still'><img class='favorite' src='Assets/Images/baseline_favorite_white_18dp.png' data-still='" + imgPath.fixed_width_still.url + "' data-animate='" + imgPath.fixed_width.url + "' data-download='" + imgPath.original_mp4.mp4 + "' data-state='still'><a href='" + imgPath.original_mp4.mp4 + "' rel=,nofollow' target='_blank'><img src='Assets/Images/baseline_insert_link_white_18dp.png' class='download' data-download='" + imgPath.original_mp4.mp4 + "'></a></div>";
                    $("#col" + (this.colID + 1)).append(gifHTML);
                })
            })
        })
    },
}

var gifManipulation = {

    startStop: function () {
        var $state = $(this).attr("data-state")
        var $still = $(this).attr("data-animate")
        var $animate = $(this).attr("data-still")
        if ($state === 'still') {
            $(this).attr("src", $animate)
            $(this).attr("data-state", "animate")
        } else {
            $(this).attr("src", $still)
            $(this).attr("data-state", "still")
        }
    },

    favoriteGif: function () {
        console.log("listening")
        var $favSrcStill = $(this).attr("data-still");
        var $favSrcAnimate = $(this).attr("data-animate");
        var $favDownload = $(this).attr("data-download");
        var $favHTML = "<img class='favoriteSmallGif gif' src='" + $favSrcStill + "' data-still='" + $favSrcStill + "' data-animate='" + $favSrcAnimate + "' data-download='" + $favDownload + "'><img src='Assets/Images/baseline_favorite_border_black_18dp.png' class='removeFavorite'><a href='" + $favDownload + "' rel='nofollow' target='_blank'><img src='Assets/Images/baseline_insert_link_black_18dp.png' class='download' data-download='" + $favDownload + "'></a>";
        $(".favoritesColumn").append($favHTML);
    },

    removeFavorite: function () {
        console.log($(this).parent())
        $(this).prev().remove();
        $(this).next().remove();
        $(this).remove();
    },

    clearFavorites: function () {
        console.log("Hello")
        $(".favoritesColumn").empty();
    },

    // downloadGif: function (e) {
    //     var fileLocation = $(this).attr("data-download")
    //     window.location.href = fileLocation;
    // }
}


$(document).ready(function () {

    buttonGenerator.displayButtons();
    
    console.log($("#searchTerm").val().trim())


    $(document).on("click", ".api-search", apiSearches.creatingGifs)

    $("#target").submit(function(event){
        event.preventDefault();
        buttonGenerator.createButton();
    })
    // click is rippling to sibling buttons. ask tucker how to fix

    $("#clear-buttons").on("click", buttonGenerator.resetButtons)

    $("#random-button").on("click", buttonGenerator.createRandom)

    $(document).on("click", "#Random", apiSearches.randomGif)

    $("#add-ten").on("click", apiSearches.tenMore)

    $("#clear-favorites").on("click", gifManipulation.clearFavorites)

    $(document).on("click", ".gif", gifManipulation.startStop)

    $(document).on("click", ".favorite", gifManipulation.favoriteGif)

    $(document).on("click", ".removeFavorite", gifManipulation.removeFavorite);

    // $(document).on("click", ".download", gifManipulation.downloadGif);

})


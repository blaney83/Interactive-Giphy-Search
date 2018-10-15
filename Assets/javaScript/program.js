
var topics = ["Game of Thrones", "Vikings", "Harry Potter", "Ozarks", "Matrix", "Silicon Valley", "Star Wars", "Black Mirror", "Interstellar", "Rick and Morty", "Free Solo", "American Horror Story", "Planet Earth", "It's Always Sunny in Philadelphia", "Inglorious Basterds", "Wolf of Wallstreet", "Vikings", "The Duece", "Ex Machina", "Harry Potter"];

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
            };
            var $newButton = $("<button class='api-search' id='" + queryString + "'>" + str + "</button>");
            //names the button the original input term, but sets its ID to the API formated query term
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
            }
            arrArray.forEach(function (a, i) {
                colID = i;
                console.log(a)
                a.forEach(function (e, i) {
                    var gifStill = response.data[e].images.fixed_width_still.url
                    var gifHTML = "<img class='gif' src='" + gifStill + "'>";
                    console.log(i);
                    $("#col" + (this.colID + 1)).append(gifHTML);
                })
            })
        }
        )

    },

    creatingGifs: function (event) {

        $(".column").empty();
        currentLimit = 20;
        eventID = event.target.id;
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=zNkoEpfqn39HJRIs2fGIuLBR0EtnehXR&q=" + eventID + "&limit=20&offset=0&rating=r&lang=en"

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
                console.log(a)
                a.forEach(function (e, i) {
                    var gifStill = response.data[e].images.fixed_width_still.url
                    var gifHTML = "<img class='gif' src='" + gifStill + "'>";
                    console.log(i);
                    $("#col" + (this.colID + 1)).append(gifHTML);
                })
            })
        }
        )
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

    $("#add-ten").on("click", apiSearches.tenMore)

    $(document).on("click", ".api-search", apiSearches.creatingGifs)

})


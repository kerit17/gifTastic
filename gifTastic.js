//Initial array
  var tunes = ["Bugs Bunny", "Daffy Duck", "Porky Pig", "Sylvester"];
  console.log(tunes);

//Function for displaying looney buttons
function renderButtons() {
  //Deleting button prior to adding - no duplicates
    $("#tunes-view").empty();
   //Loop through array
    for (var i = 0; i < tunes.length; i++) {
        //Generating buttons for each .
        var a = $("<button>");
        //Add a class
        a.addClass("looney");
        //Add a data-attribute with a value of the movie at index i
        a.attr("data-name", tunes[i]);
        //Button's text with a value of the movie at index i
        a.text(tunes[i]);
        //Add button to HTML
        $("#tunes-view").append(a);
        }
  }

//Click function
  $("#add-looney").on("click", function(event) {
      //Default action of the event will not be triggered
      event.preventDefault();
      //Grab text from input box
      var looney = $("#looney-input").val().trim();
      //Add user input to the array
      tunes.push(looney);
        //console log array to show updated
        console.log(tunes);
      //Call renderButtons function that displays buttons for the array contents
      renderButtons();
  });

  //Call renderButtons function to display initial list
  renderButtons();

//when looney button is clicked
$("#tunes-view").on("click", function(){
  $("#gifs-appear-here").empty();

  //this - refers to button pressed
  var gifRequest = $(this).attr("data-name");

  //API to specify tune to call with number of responses
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=Bugs+Bunny&api_key=dc6zaTOxFJmzC&limit=10";
  //console log URL used
  console.log(queryURL);

  //AJAX call - get
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  //what to run after the data is received
  .done(function(response){
    //show resulting object
    console.log(response);
    //store arra of results wanting to show
    var results = response.data;
    //loop through results to pull specific data from each object
    for (var i=0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>");
      var image = $("<img>");
      // var rating = results[i].rating;
      // var p = $("<p>").text("Rating: " + rating);
      image.attr("src", results[i].images.fixed_height.url);
      gifDiv.prepend(image);
      // gifDiv.prepend(p);
      $("#gifs-appear-here").prepend(gifDiv);
    }
  })

})
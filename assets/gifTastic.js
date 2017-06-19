$(document).ready(function(){

//Initial array
  var tunes = ["Bugs Bunny", "Daffy Duck", "Porky Pig", "Sylvester"];
  console.log(tunes);

//Function for displaying looney buttons
function renderButtons() {
  //Deleting button prior to adding - no duplicates
    $("#tunes-view").empty();
   //Loop through array
    for (var i = 0; i < tunes.length; i++) {
        //Generating buttons for each
        var a = $("<button data-toon>");
        //Add a class
        a.addClass("looney");
        //Add a data-attribute 
        a.attr("data-toon", tunes[i]);
        //Button's text 
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
      var input = $("#looney-input").val().trim();
      //Add user input to the array
      tunes.push(input);
        //console log array to show updated
        console.log(tunes);
      //Call renderButtons function that displays buttons for the array contents
      renderButtons();
  });

  //Call renderButtons function to display initial list
  renderButtons();

//when looney button is clicked
$(".looney").on("click", function(){
  //this - refers to button pressed
  var gifRequest = $(this).attr("data-toon");
  $("#gifs-appear-here").empty();

  //API to specify tune to call with number of responses
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifRequest + "&api_key=dc6zaTOxFJmzC&limit=10";
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
      var gifDiv = $("<div>");
     
      var p = $("<p>").text("Rating: " + results[i].rating);
     
      var image = $("<img>");
      image.attr("src", results[i].images.fixed_height_still.url);
      image.attr("data-still", results[i].images.fixed_height_still.url);
      image.attr("data-animate", results[i].images.fixed_height.url);
      image.attr("data-state", "still");
      image.addClass("animation"); image.attr("src", results[i].images.fixed_height_still.url);
      gifDiv.append(p);
      gifDiv.append(image);
      // gifDiv.prepend(p);
      $("#gifs-appear-here").append(gifDiv);
    }
  })


//animation
$(document).on("click", ".animation", function(){
  var state = $(this).attr("data-state");

  if (state === "original_still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "original");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "original_still");
  }

});

})
})
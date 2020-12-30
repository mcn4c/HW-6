 




$(document).ready(function () {
 
 

    
 //variable for user's city input
 var userCity = $(".user-city").val().trim();

 var today = dayjs().format("MMMM D, YYYY");
 

 function displayForecast(userCity) {
   
//assigning variable to user input into search bar
 var userCity = $(".user-city").val().trim();

  var apiKey = "f2ab97c1d6fb8cc55ebddb9d13d50478" ;
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&cnt=5&units=imperial&appid=" + apiKey;




// ajax query to get user city's longitude and lattitude coordinates
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Printing the object to console
    console.log(response);

    // variables to define user's longitude and lattitude coordinates
    var lat = response.coord.lat;
    var lon = response.coord.lon;

    //query url to get weather data for display using longitude and lattitude from first ajax call
    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

    // ajax call to get weather data
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response) {

      console.log(response);

       
      // creating variable for uvi so can color code results
       var UVI = response.current.uvi;
       
 // displaying city forecast for that day
    $("#forecast").removeClass("hidden");
     $(".city-name").removeClass("hidden").text(userCity);
    $("#date-main").text(today);
   $("#icon-main").attr("src", "http://openweathermap.org/img/wn/" +response.current.weather[0].icon + "@2x.png");
    $("#description-main").text(response.current.weather[0].description);
     $("#temp-main").text("Temperature: " + response.current.temp);
    $("#hum-main").text("Humidity: " + response.current.humidity);
    $("#windspeed-main").text("Windspeed: " + response.current.wind_speed);
    $("#uv-main").text("UVI: " + UVI);

    //color coding uvi results

    if (UVI <= 2) {
      $("#uv-main").css("color",  "green");
    }
    else if (UVI >= 8) {
      $("#uv-main").css("color", "red");

    }
    else {
      $("#uv-main").css("color", "orange");
    }
  

// five-day forecast function that is called when user clicks five day forecast button
// it is not working
    

   
    }); 
  
    });
  }

// another attempt to get fiveDays function working... no dice
    function fiveDays(userCity) {     
                

      // assigning variable to div for displaying five-day forecast   
     var fiveDay = $("<div id='five-day'>");
   
     // hiding one day forecast and showing five-day
     
     $("#forecast").addClass("hidden");

     var userCity = $(".user-city").val().trim();
    
      var apiKey = "f2ab97c1d6fb8cc55ebddb9d13d50478" ;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&cnt=5&units=imperial&appid=" + apiKey;
    
    // ajax query to get user city's longitude and lattitude coordinates
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {  

        var lat = response.coord.lat;
        var lon = response.coord.lon;
    
        //query url to get weather data for display using longitude and lattitude from first ajax call
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    
        // ajax call to get weather data
        $.ajax({
          url: queryURL2,
          method: "GET"
        }).then(function(response) {
    
          console.log(response);
   // for loop to pull in data for five days
   for (var i = 0; i< 5; i++) {
   // pulling in data for each day
   var column = $("<div>");
   column.addClass("column");
   var dateDisplay = $("<h2>")
   
      var iconDisplay = $("<img>");
      var description= $("<p>");
      var weatherList= $("<ul>")
      var temperature = $("<li>")
      var humidity = $("<li>");

      dateDisplay.textContent = "";
      iconDisplay.attr("src", "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png");
      description.text(response.daily[i].weather[0].description);
      temperature.text(response.daily[i].temp.day);
      humidity.text(response.daily[i].humidity); 
   
      weatherList.append(temperature);
      weatherList.append(humidity);
      column.append(dateDisplay, iconDisplay, description, weatherList);
      fiveDay.append(column);
   
     
    } // close for loop
      
    }); //close ajax call2
    });//close ajax call1
}


$("#search-city").on("click", function(event) {
  event.preventDefault();
  displayForecast(userCity);
});

// event listener to display five-day forecast
$("#five-day").on("click", function(event) {
  
  event.preventDefault();

  fiveDays(userCity);
})




})
  



   

    
    // store user city

    //add city button  

    

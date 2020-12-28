 




$(document).ready(function () {
 
 

    
 //variable for user's city input
 var userCity = $(".user-city").val().trim();
 

 function displayForecast(userCity) {
   
//assigning variable to user input into search bar
 var userCity = $(".user-city").val().trim();
var date = new Date();
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

       // displaying city forecast for that day
      // creating variable for uvi so can color code results
       var UVI = response.current.uvi;
       

    $("#forecast").removeClass("hidden");
     $(".city-name").removeClass("hidden").text(userCity);
    $("#date-main").text(date);
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
    function fiveDayForecast(userCity) { 

    
                

   // assigning variable to div for displaying five-day forecast   
  var fiveDay = $("#five-day-display");

  // hiding one day forecast and showing five-day
  fiveDay.removeClass(".hidden");
  $("#forecast").addClass("hidden");


// pulling in data for day one
   var column1 = $("#column1");          
   var dateDisplay1= document.createElement("h2");
   var iconDisplay1 = document.createElement("img");
   var description1= document.createElement("p");
   var weatherList1= document.createElement("ul");
   var temperature1 = document.createElement("li");
   var humidity1 = document.createElement("li");

   column1.append(dateDisplay1);
   column1.append(iconDisplay1);
   column1.append(description1);
   column1.append(weatherList1);
   weatherList1.append(temperature1);
   weatherList1.append(humidity1);
   fiveDay.append(column1);

   dateDisplay1.textContent = "";
   //iconDisplay1.attr("src", "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + "@2x.png");
   description1.textContent = response.daily[0].weather[0].description1;
   temperature1.textContent =response.daily[0].temp.day;
   humidity1.textContent =response.daily[0].humidity;

  

// pulling in data for day 2
var column2 = $("#column2");

          
var dateDisplay2= document.createElement("h2");
var iconDisplay2 = document.createElement("img");
var description2= document.createElement("p");
var weatherList2= document.createElement("ul");
var temperature2 = document.createElement("li");
var humidity2 = document.createElement("li");

dateDisplay2.textContent ="";
//iconDisplay2.attr("src", "http://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + "@2x.png";
description2.textContent =response.daily[1].weather[0].description;
temperature2.textContent =response.daily[1].temp.day;
humidity2.textContent =response.daily[1].humidity;

column2.append(dateDisplay2);
column2.append(iconDisplay2);
column2.append(description2);
column2.append(weatherList2);
weatherList2.append(temperature2);
weatherList2.append(humidity2);
fiveDay.append(column2);

//pulling in data for day 3

var column3 = $("#column3");

          
var dateDisplay3= document.createElement("h2");
var iconDisplay3 = document.createElement("img");
var description3= document.createElement("p");
var weatherList3= document.createElement("ul");
var temperature3 = document.createElement("li");
var humidity3 = document.createElement("li");

dateDisplay3.textContent ="";
//iconDisplay3.attr("src", "http://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + "@2x.png");
description3.textContent =response.daily[2].weather[0].description;
temperature3.textContent =response.daily[2].temp.day;
humidity3.textContent =response.daily[2].humidity;

column3.append(dateDisplay3);
column3.append(iconDisplay3);
column3.append(description3);
column3.append(weatherList3);
weatherList3.append(temperature3);
weatherList3.append(humidity3);
fiveDay.append(column3);

//pulling in data for day four
var column4 = $("#column4");

          
var dateDisplay4= document.createElement("h2");
var iconDisplay4 = document.createElement("img");
var description4= document.createElement("p");
var weatherList4= document.createElement("ul");
var temperature4 = document.createElement("li");
var humidity4 = document.createElement("li");

dateDisplay4.textContent ="";
//iconDisplay4.attr("src", "http://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + "@3x.png");
description4.textContent =response.daily[3].weather[0].description;
temperature4.textContent =response.daily[3].temp.day;
humidity4.textContent =response.daily[3].humidity;

column4.append(dateDisplay4);
column4.append(iconDisplay4);
column4.append(description4);
column4.append(weatherList4);
weatherList4.append(temperature4);
weatherList4.append(humidity4);
fiveDay.append(column4);

//pulling in data for day five
var column5 = $("#column5");

          
var dateDisplay5= document.createElement("h2");
var iconDisplay5 = document.createElement("img");
var description5= document.createElement("p");
var weatherList5= document.createElement("ul");
var temperature5 = document.createElement("li");
var humidity5 = document.createElement("li");

dateDisplay5.textContent ="";
//iconDisplay5.attr("src", "http://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + "@4x.png");
description5.textContent =response.daily[4].weather[0].description;
temperature5.textContent =response.daily[4].temp.day;
humidity5.textContent =response.daily[4].humidity;

column5.append(dateDisplay5);
column5.append(iconDisplay5);
column5.append(description5);
column5.append(weatherList5);
weatherList5.append(temperature5);
weatherList5.append(humidity5);
fiveDay.append(column5);
   
}



    });

  });
}


   
// event listener to display one day forecast
    $("#search-city").on("click", function(event) {
      event.preventDefault();
      displayForecast(userCity);
    });
  
    // event listener to display five-day forecast
    $("#five-day").on("click", function(event) {
      
      event.preventDefault();
    
      fiveDayForecast(userCity);
    }); 
    
    // store user city
    /*function addCity () { */  

});

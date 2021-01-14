 $(document).ready(function () {




   //variable for user's city input
   var userCity = "";

   var today = dayjs().format("MMMM D, YYYY");

   var dateArray = [dayjs().format("MMMM D, YYYY"), dayjs().add(1, 'day').format("MMM D, YYYY"), dayjs().add(2, 'day').format("MMM D, YYYY"), dayjs().add(3, 'day').format("MMM D, YYYY"), dayjs().add(4, 'day').format("MMM D, YYYY")];
   //  var tommorrow = dayjs().add(1, 'day').format("MMM D, YYYY");
   //  var day2 = dayjs().add(2, 'day').format("MMM D, YYYY");
   //  var day3 = dayjs().add(3, 'day').format("MMM D, YYYY");
   //  var day4 = dayjs().add(4, 'day').format("MMM D, YYYY");
   //  var day5 = dayjs().add(1, 'day').format("MMM D, YYYY");


   function displayForecast(userCity) {

     //assigning variable to user input into search bar

     var apiKey = "f2ab97c1d6fb8cc55ebddb9d13d50478";
     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&cnt=5&units=imperial&appid=" + apiKey;




     // ajax query to get user city's longitude and lattitude coordinates
     $.ajax({
       url: queryURL,
       method: "GET"
     }).then(function (response) {

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
       }).then(function (response) {

         console.log(response);


         // creating variable for uvi so can color code results
         var UVI = response.current.uvi;

         // displaying city forecast for that day
         $("#five-day-forecast").addClass("hidden");
         $("#forecast").removeClass("hidden");
         $(".city-name").removeClass("hidden").text(userCity);
         $("#date-main").text(today);
         $("#icon-main").attr("src", "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");
         $("#description-main").text(response.current.weather[0].description);
         $("#temp-main").html("Temperature: " + response.current.temp + " &#8457;");
         $("#hum-main").text("Humidity: " + response.current.humidity);
         $("#windspeed-main").text("Windspeed: " + response.current.wind_speed);
         $("#uv-main").text("UVI: " + UVI);

         //color coding uvi results

         if (UVI <= 2) {
           $("#uv-main").css("color", "green");
         } else if (UVI >= 8) {
           $("#uv-main").css("color", "red");

         } else {
           $("#uv-main").css("color", "orange");
         }


         // five-day forecast function that is called when user clicks five day forecast button
         // it is not working



       });

     });
   }

   // function to add five day forecast
   function fiveDays(userCity) {


     // assigning variable to div for displaying five-day forecast   
     var fiveDay = $("<div id='five-day'>");

     // hiding one day forecast and showing five-day

     $("#forecast").addClass("hidden");


     var apiKey = "f2ab97c1d6fb8cc55ebddb9d13d50478";
     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&cnt=5&units=imperial&appid=" + apiKey;

     // ajax query to get user city's longitude and lattitude coordinates
     $.ajax({
       url: queryURL,
       method: "GET"
     }).then(function (response) {

       var lat = response.coord.lat;
       var lon = response.coord.lon;

       //query url to get weather data for display using longitude and lattitude from first ajax call
       var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

       // ajax call to get weather data
       $.ajax({
         url: queryURL2,
         method: "GET"
       }).then(function (response) {

         console.log(response);
         $("#five-day-forecast").removeClass("hidden");
         // for loop to pull in data for five days
         for (var i = 0; i < 5; i++) {
           // pulling in data for each day
           //creating new html elements and assigning them a variable
           var column = $("<div>");
           column.addClass("column");
           var dateDisplay = $("<h3>")

           var iconDisplay = $("<img>");
           var description = $("<p>");
           var weatherList = $("<ul>")
           var temperature = $("<li>")
           var humidity = $("<li>");
           //Adding content to new HTML elements
           dateDisplay.text(dateArray[i]);
           iconDisplay.attr("src", "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png");
           description.text(response.daily[i].weather[0].description);
           temperature.html("Temp: " + response.daily[i].temp.day + " &#8457;");
           humidity.text("Humidity: " + response.daily[i].humidity);
           // appending elements to five-day-forecast div in index.html
           weatherList.append(temperature);
           weatherList.append(humidity);
           column.append(dateDisplay, iconDisplay, description, weatherList);
           fiveDay.append(column);
           $("#five-day-forecast").append(fiveDay);



         } // close for loop

       }); //close ajax call2
     }); //close ajax call1
   }

   // event listener to display one day city forecast
   $("#search-city").on("click", function (event) {
     event.preventDefault();

     userCity = $(".user-city").val().trim();

     displayForecast(userCity);
   });

   // event listener to display five-day forecast
   $("#five-day").on("click", function (event) {

     event.preventDefault();
     $("#five-day-forecast").empty();

     fiveDays(userCity);
   })




 })







 // store user city

 //add city button  
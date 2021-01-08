$(document).ready(function () {
  //variables
  const apiKey =
    "client_id=QIH15M2XMPGDK24WK4VQUQOGOTCFXL3QPXV1CHHX0UAEVUPR&client_secret=HIJZJFJHBYPE5IPJ00D4WFSQMHX4RDYUGFU4L3MGHZJAWREP&v=20200101";
    const placeDisplay = document.querySelectorAll(".place");

  //find place with event listener submit button click
  $("#place-btn").on("click", function (event) {
    event.preventDefault();

    placeFinder();
  });

  //place finder function creates the query and makes the api call
  function placeFinder() {
    var city = $("#city").val();
    console.log("city:    " + city);

    var select = $("#inputGroupSelect02").val();

    console.log("select:    " + select);

    // queryURL for places API --by category id: "4bf58dd8d48988d175941735" Gym / Fitness Center
    var queryURL =
      "https://api.foursquare.com/v2/venues/search?" +
      apiKey +
      "&near=" +
      city +
      "&intent=browse&query=" +
      select +
      "&categoryId=4bf58dd8d48988d175941735";

    console.log("queryURL: " + queryURL);

    //ajax
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      displayPlaces(response);
    });
  }

  //displace places info
  function displayPlaces(response) {
    console.log(" in displayPlaces ");

    console.log(response);
    console.log(response.response);
    console.log(response.response.venues);

    console.log("place: count :  " + placeDisplay.length);

    for (i = 0; i < placeDisplay.length; i++) {
      placeDisplay[i].innerHTML = "";

      // place name
      var searchedPlaceName = document.createElement("p");
      searchedPlaceName.setAttribute("class", "mt-3 mb-0 placeName");
      searchedPlaceName.innerHTML = response.response.venues[i].name;
      placeDisplay[i].append(searchedPlaceName);

      // place address
      var searchedPlaceaddress = document.createElement("p");
      searchedPlaceaddress.setAttribute("alt", "placeAddress");
      searchedPlaceaddress.innerHTML =
        "Address: " + response.response.venues[i].location.formattedAddress;
      placeDisplay[i].append(searchedPlaceaddress);
    }
  }

  // places section reset button click function
  $("#place-reset").on("click", function (event) {
    event.preventDefault();
    $("#city").val("");
    $("#inputGroupSelect02").val("");
    for (i = 0; i < placeDisplay.length; i++) {
      placeDisplay[i].innerHTML = "";
    }
 
  });

  //BMI Calculator
  $("#bmi-btn").on("click", function (event) {
    event.preventDefault();
    bmiCalculator();
    // bmi calculator
    function bmiCalculator() {
      var age = $("#bmi-age").val();
      var weight = $("#bmi-weight").val() * 0.45;
      var heightFeet = $("#bmi-height-feet").val();
      console.log(heightFeet);
      var heightInches = $("#bmi-height-inches").val();
      console.log(heightInches);
      var height=(parseInt(heightFeet*12)+parseInt(heightInches))*2.54;
      console.log(height);
      console.log(age, weight, height);
      // queryURL for bmi API
      var queryURLBmi =
        "https://fitness-calculator.p.rapidapi.com/bmi?age=" +
        age +
        "&weight=" +
        weight +
        "&height=" +
        height;
      //ajax
      $.ajax({
        url: queryURLBmi,
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "6d01ea40d8msh0e3a90c20c5f4e7p1a74a4jsn9c524a72b90a",
          "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
        },
      }).then(function (response) {
        //display bmi information
        bmiResult = response.bmi.toFixed(2);
        category = response.health;
        $("#bmi-result").text(
          "Your BMI is " +
            bmiResult +
            ", indicating your weight is in the " +
            category +
            " category for people of your height. "
        );
        console.log(response);
        16;
      });
    }
  });
  // bmi section reset button click function
  $("#bmi-reset").on("click", function (event) {
    event.preventDefault();
    $("#bmi-result").empty();
    $("#bmi-age").val("");
    $("#bmi-height-feet").val("");
    $("#bmi-height-inches").val("");
    $("#bmi-weight").val("");
  });
});

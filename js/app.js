// a8e8d5199d860a2590933c9606629cef in practice, shouldn't put your api keys in the code

// Coordinates by city name api
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=a8e8d5199d860a2590933c9606629cef

// weather api call
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=a8e8d5199d860a2590933c9606629cef


// this is my first "working" code below. It works without the coordinates api
// but only if you put in a city name and nothing else
//   $.ajax(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=a8e8d5199d860a2590933c9606629cef`


const $input = $("input");
const $button = $("button");
const $aside = $("aside");


// put click event on the button

$button.on("click", () => {

      // get the text the user types 
    const searchTerm = $input.val();
    const splitString = searchTerm.split(",")
    const city = splitString[0];
    const state = splitString[1];
    const country = splitString[2];
    

      // make the api call for the coordinates using city name 
    $.ajax(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=a8e8d5199d860a2590933c9606629cef`
    ).then((coordinates) => {
      console.log(coordinates);

      // make the lat and lon values returned into variables
      const lat = coordinates[0].lat;
      const lon = coordinates[0].lon;
      // check to see if I did it right:
      console.log(lat, lon);

      // make the api call for the weather using the coordinates gained from the first api values
      $.ajax(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=a8e8d5199d860a2590933c9606629cef`
      ).then((data) => {
        console.log(data);

        // make the icon variable and equal it to the icon name in the data
        const { icon } = data.weather[0];

        // set the html inside the aside with the weather data
        $("aside").html(`
        <img src="./assets/icons/${icon}.png" width=75px>
        <h2>${data.name}</h2>
        <h3>It is currently ${data.main.temp}&#176; with ${data.weather[0].description}.</h3>
        <h3>It feels like ${data.main.feels_like}&#176;</h3>`);
      });
    });
  }
);



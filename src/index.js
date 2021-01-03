import "./styles.css";
import swal from "sweetalert";

const api = {
  url: "https://api.openweathermap.org/data/2.5/weather",
  key: "94b6fb4b1e6f21820ce4523c362a9be6"
};

var inputText = document.querySelector("#txt-input");
var btn = document.querySelector("#btn");

function generateUrl(inputCity) {
  return api.url + "?q=" + inputCity + "&appid=" + api.key;
}

function errorHandler() {
  swal({
    title: "Something Wrong",
    text: "Enter a valid city name",
    icon: "warning",
    button: "OK"
  });

  document.getElementById("body-img").style.backgroundImage =
    "url(https://thumbs.gfycat.com/GentleSatisfiedDrongo-max-1mb.gif)";
  document.getElementById("body-img").style.backgroundRepeat = "no-repeat";
  // document.getElementById("body-img").style.backgroundSize = "300px";
}

function clickHandler() {
  var inputCity = inputText.value;

  fetch(generateUrl(inputCity))
    .then((response) => response.json())
    .then((json) => {
      document.querySelector(".hero").innerHTML = "";
      document.getElementById("body-img").style.backgroundImage =
        "url(https://www.wallpapertip.com/wmimgs/106-1064260_firewatch-wallpaper-firewatch-wallpapers-album-on-imgur-lakeside.jpg)";

      var temp = Math.round(json.main.temp - 273.15);
      var temp_max = Math.round(json.main.temp_max - 273.15);
      document.querySelector("#section-city").innerHTML = json.name;
      document.querySelector("#section-weather-main").innerHTML =
        json.weather[0].main;
      document.querySelector("#section-temp").innerHTML =
        temp + "<span>&#176;</span>";

      document.querySelector("#section-weather-det").innerHTML =
        "Today: " +
        json.weather[0].description +
        ". The high will be " +
        temp_max +
        "<span>&#176;</span>.";

      var sunrise_unix = json.sys.sunrise;
      var milliseconds = sunrise_unix * 1000;
      var dateObject = new Date(milliseconds);
      var hr = dateObject
        .toLocaleString("en-US", { hour: "numeric" })
        .split(" ");
      var sunrise =
        hr[0] +
        ":" +
        dateObject.toLocaleString("en-US", { minute: "numeric" }) +
        " " +
        hr[1];

      var sunset_unix = json.sys.sunset;
      milliseconds = sunset_unix * 1000;
      dateObject = new Date(milliseconds);
      hr = dateObject.toLocaleString("en-US", { hour: "numeric" }).split(" ");
      var sunset =
        hr[0] +
        ":" +
        dateObject.toLocaleString("en-US", { minute: "numeric" }) +
        " " +
        hr[1];

      const humidity = json.main.humidity; // in %
      const feelslike = Math.round(json.main.feels_like - 273.15);
      const windSpeed = json.wind.speed; // m/sec
      const visibility = json.visibility / 1000;

      const titles = document.querySelectorAll(".section-title");
      const details = document.querySelectorAll(".section-det");

      // console.log(titles);

      titles[0].innerHTML = "sunrise";
      titles[1].innerHTML = "sunset";
      titles[2].innerHTML = "humidity";
      titles[3].innerHTML = "feels like";
      titles[4].innerHTML = "wind";
      titles[5].innerHTML = "visibility";

      details[0].innerHTML = sunrise;
      details[1].innerHTML = sunset;
      details[2].innerHTML = humidity + "%";
      details[3].innerHTML = feelslike + "<span>&#176;<span>";
      details[4].innerHTML = windSpeed + " mps";
      details[5].innerHTML = visibility + " km";

      var line = document.querySelectorAll(".section-line");
      for (var i = 0; i < line.length; i++) {
        line[i].innerHTML = "<hr>";
      }
    })
    .catch(errorHandler);
}

btn.addEventListener("click", clickHandler);

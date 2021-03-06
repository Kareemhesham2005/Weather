let btn = document.querySelector("#btn");
let search = document.querySelector("#search");
let h2 = document.querySelector(".loc");
let btn2 = document.querySelector("#btn2");
let h3 = document.querySelector(".temp");
let city;
let lat;
let lon;
let api;
let api2;
let hu = document.querySelector(".hu");
let wind = document.querySelector(".wind");
let disc = document.querySelector(".disc");
let pre = document.querySelector(".pre");
let feel = document.querySelector(".feel");
let preload = document.querySelector(".preload");
let loaded = false;

btn.addEventListener("click", function () {
  document.querySelector(".check").style.transform = "Translate(-50%, 0)";
  navigator.geolocation.getCurrentPosition(function (position) {
    var check = setTimeout(function () {
      document.querySelector(".check").style.transform =
        "Translate(-50%, -200%)";
    }, 1000);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dffd9bc7ee9892f604ce6132396a2e49&units=metric`;
    getData();
  });
});

async function getData() {
  const response = await fetch(api);
  const data = await response.json();
  Content(data);
}

btn2.addEventListener("click", function () {
  city = search.value;
  getDataByCity(city);
});

search.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    city = search.value;
    getDataByCity(city);
  }
});

async function getDataByCity(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dffd9bc7ee9892f604ce6132396a2e49&units=metric`
  );
  const data = await response.json();
  Content(data);
}

function Content(data) {
  h3.innerHTML = `${data.main.temp.toFixed(0)}°C`;
  h2.innerHTML = `${data.name}`;
  hu.innerHTML = `Humidity: ${data.main.humidity}%`;
  pre.innerHTML = `Pressure: ${data.main.pressure}Mbar`;
  disc.innerHTML = `<img src= "https://openweathermap.org/img/wn/${data.weather[0].icon}.png">${data.weather[0].description}`;
  wind.innerHTML = `Wind Speed: ${(data.wind.speed * (18 / 5)).toFixed(1)}Km/h`;
  feel.innerHTML = `Feels Like: ${data.main.feels_like.toFixed(0)}°C`;
  search.value = "";
  loaded = true;
  if (loaded) {
    preload.style.cssText = "display: none;";
  }
}

getDataByCity("Cairo");

let hours = document.querySelector(".hours");
let minutes = document.querySelector(".min");
let last = document.querySelector(".last");
let h1 = document.querySelector(".time h1");

let date;

let time = setInterval(() => {
  date = new Date().toLocaleTimeString();
  if (date.length == 10) {
    hours.innerHTML = `0${date.charAt(0)}`;
    minutes.innerHTML = `${date.charAt(2)}${date.charAt(3)}`;
    last.innerHTML = `${date.charAt(8)}${date.charAt(9)}`;
  } else if (date.length > 10) {
    hours.innerHTML = `${date.charAt(0)}${date.charAt(1)}`;
    minutes.innerHTML = `${date.charAt(3)}${date.charAt(4)}`;
    last.innerHTML = `${date.charAt(9)}${date.charAt(10)}`;
  } else {
    h1.innerHTML = "Sorry, Can't Get Current Time";
    clearInterval(time);
  }
}, 1000);

window.addEventListener("load", function () {
  if (loaded) {
    preload.style.cssText = "display: none;";
  }
});

import _, { functions, isMap } from "lodash";
import "./style.css";
import Icon from "./01.jpg";

let name = "";
let country = "some thing went wrong";
let region = "";
let continent = "";
let resp = "";

let temp = "";
let wind_dir = "";
let humidity = "";
let wind = "";

let urlImage =
  "https://api.unsplash.com/photos/?client_id=ZOK-D27XsF-xH3hg2dy8T4ec62G14njDNK1fXsBGBnI";

let url = new URL(urlImage);
let imageRequest = new Request(url, {
  method: "GET",
  cache: "no-store",
});
// console.log(imageRequest);

start();
time();
image(Math.floor(Math.random() * 10));

const input = document.querySelector("input");
//console.log(input.value);
input.addEventListener("change", (event) => {
  start(input.value);
});

const root = document.querySelector(":root");
const img = document.querySelector("img");

async function time() {
  setTimeout(() => {
    image(Math.floor(Math.random() * 10));
    time();
  }, 60000);
}

async function image(i = 0) {
  fetch(imageRequest, {
    mode: "cors",
  })
    .then(function (response) {
      // Successful response :)
      return response.json();
    })
    .then(function (response) {
      root.style.backgroundImage = "url(" + response[i].urls.full + ")";
      console.log(response);
      console.log(response[i].links.download.blob());
      return response[i].urls.full;
    })
    .then(function (resp) {
      //console.log(resp);
    })
    .catch(console.warn);
}

function start(location = "beni abbes") {
  fetch(
    "https://api.weatherapi.com/v1/current.json?key=011f6b1c85d9461e98e130213231012&q=" +
      location,
    {
      mode: "cors",
    },
  )
    .then(function (response) {
      // Successful response :)
      //console.log(response);
      if (!response.ok) {
        name = response.status;
        showParm();
        throw new Error("not valid response");
      }
      return response.json();
    })
    .then(function (response) {
      resp = response;
      setParm(resp);
      showParm();
    })
    .catch(function (err) {
      console.log(err.message);
    });
}

function setParm(parm) {
  name = parm.location.name;
  country = parm.location.country;
  region = parm.location.region;
  continent = parm.location.tz_id.split("/")[0];
  temp = parm.current.temp_c;
  wind = parm.current.wind_kph;
  humidity = parm.current.humidity;
  wind_dir = parm.current.wind_dir;
}

function showParm() {
  document.getElementById("name").textContent = name;
  document.getElementById("country").textContent = country;
  document.getElementById("region").textContent = region;
  document.getElementById("continent").textContent = continent;
  document.getElementById("temp").textContent = temp + "°|";

  document.getElementById("wind").textContent = "WIND SPEED:" + wind + "KPH";
  document.getElementById("humidity").textContent =
    "HUMIDITY:" + humidity + "%";
  document.getElementById("wind_dir").textContent =
    "WIND DIRECTION:" + wind_dir;
}

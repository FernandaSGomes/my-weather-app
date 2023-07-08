function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "saturday",
  ];

  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
//identifiers
let cityValue = document.getElementById("city");
let tempValue = document.getElementById("temperature");
let descriptionValue = document.getElementById("description");
let humidityValue = document.getElementById("humidity");
let windValue = document.getElementById("wind");
let weatherIconValue = document.getElementById("weather-icon");

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
//form identifier
let searchWeatherForm = document.querySelector("#search-weather-form");
searchWeatherForm.addEventListener("submit", getWeatherInfoByCity);
//current identifier
let currentGeoPositionBtn = document.querySelector("#current-geo-position-btn");
currentGeoPositionBtn.addEventListener("click", getGeoLocation);

const apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";

navigator.geolocation.getCurrentPosition(getWeatherInfoByGeoLocation);

function getWeatherInfoByCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
    .then(displayData);
}

function getGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeatherInfoByGeoLocation);
}

function getWeatherInfoByGeoLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    )
    .then(displayData);
}

function displayData(response) {
  console.log("Weather - fetch", response);

  const { name, main, weather, wind } = response.data;
  cityValue.innerHTML = name;
  tempValue.innerHTML = `${Math.round(main.temp)} °C`;
  descriptionValue.innerHTML = weather[0].description;
  humidityValue.innerHTML = `${main.humidity}%`;
  windValue.innerHTML = `${wind.speed}km/h`;
  weatherIconValue.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
  );
}

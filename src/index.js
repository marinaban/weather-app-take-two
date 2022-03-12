function formatDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let days = day[now.getDay()];
  return `${days},` + " " + `${month} ${date}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2 m-2"      
                >
                  <h5>${formatDay(forecastDay.dt)}</h5>
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" alt="" width="40" /><br />
                  
                  <div id="max-temperature"> ${Math.round(
                    forecastDay.temp.max
                  )}°</div> 
                  <div id="min-temperature"> ${Math.round(
                    forecastDay.temp.min
                  )}°</div> 
                </div>

                `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "178729f582cff7adb3205d5bd4373ae0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function changeTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = celsiusTemperature;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let minimumTemperature = document.querySelector("#min-temperature");
  minimumTemperature.innerHTML = Math.round(response.data.main.temp_min);
  let maximumTemperature = document.querySelector("#max-temperature");
  maximumTemperature.innerHTML = Math.round(response.data.main.temp_max);

  getForecast(response.data.coord);
}
function changeCityElement(event) {
  event.preventDefault();

  let apiKey = "178729f582cff7adb3205d5bd4373ae0";
  let units = "metric";
  let city = document.querySelector("input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(changeTemperature);

  let nameCity = document.querySelector("#enter-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = nameCity.value;
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();

  degreeCelsius.classList.remove("active");
  degreeFahrenheit.classList.add("active");
  let fahrenheitElement = document.querySelector("#temperature");
  fahrenheitElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  degreeFahrenheit.classList.remove("active");
  degreeCelsius.classList.add("active");

  let celsiusLink = document.querySelector("#temperature");
  celsiusLink.innerHTML = celsiusTemperature;
}

let form = document.querySelector("form");
form.addEventListener("submit", changeCityElement);

let degreeFahrenheit = document.querySelector("#fahrenheit");
degreeFahrenheit.addEventListener("click", displayFahrenheitTemperature);

let degreeCelsius = document.querySelector("#celsius");
degreeCelsius.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;

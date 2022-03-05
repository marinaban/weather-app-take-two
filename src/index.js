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

function changeTemperature(response) {
  console.log(response);

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

  celsiusTemperature = Math.round(response.data.main.temp);
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

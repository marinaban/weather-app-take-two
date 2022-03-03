function changeTemperature(response) {
  console.log(response);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
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

let form = document.querySelector("form");
form.addEventListener("submit", changeCityElement);

const input = document.getElementById("input");
const searchBtn = document.getElementById("searchBtn");
const weatherBox = document.getElementById("weather");
const errorBox = document.getElementById("error");

const locationEl = document.getElementById("location");
const iconEl = document.getElementById("icon");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const cloudsEl = document.getElementById("clouds");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");

const API_KEY = "517063abfe0dfc60763f72daff350118"; 

searchBtn.addEventListener("click", searchWeather);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") searchWeather();
});

async function searchWeather() {
  const city = input.value.trim();
  if (!city) {
    showError("Please enter a city name");
    return;
  }

  showError("");
  weatherBox.classList.add("hidden");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      showError("City not found");
      return;
    }

    const data = await res.json();
    updateUI(data);

  } catch (err) {
    showError("Network error. Check connection.");
  }
}

function updateUI(data) {
  locationEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = `${Math.round(data.main.temp)} °C`;
  descEl.textContent = data.weather[0].description;

  windEl.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
  humidityEl.textContent = `${data.main.humidity} %`;
  cloudsEl.textContent = data.weather[0].main;

  const iconCode = data.weather[0].icon;
  iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const options = { hour: "2-digit", minute: "2-digit" };
  sunriseEl.textContent = "Sunrise: " + new Date(data.sys.sunrise * 1000).toLocaleTimeString([], options);
  sunsetEl.textContent = "Sunset: " + new Date(data.sys.sunset * 1000).toLocaleTimeString([], options);

  setBackground(data.weather[0].main);
  weatherBox.classList.remove("hidden");

}

function showError(msg) {
  errorBox.textContent = msg;
}

function setBackground(condition) {
  document.body.className = ""; // reset

  switch (condition) {
    case "Clear":
      document.body.classList.add("bg-clear");
      break;

    case "Clouds":
      document.body.classList.add("bg-clouds");
      break;

    case "Rain":
      document.body.classList.add("bg-rain");
      break;

    case "Thunderstorm":
      document.body.classList.add("bg-thunderstorm");
      break;

    case "Snow":
      document.body.classList.add("bg-snow");
      break;

    case "Mist":
    case "Fog":
    case "Haze":
      document.body.classList.add("bg-mist");
      break;

    case "Drizzle":
      document.body.classList.add("bg-drizzle");
      break;

    case "Smoke":
    case "Dust":
    case "Sand":
      document.body.classList.add("bg-dust");
      break;

    default:
      document.body.classList.add("bg-clouds");
  }
}

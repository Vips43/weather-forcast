const API_KEY = `517063abfe0dfc60763f72daff350118`;

let cache = {};

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
const loader = document.querySelector(".loader");

const rainEl = document.getElementById("rain");
const snowEl = document.getElementById("snow");

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

  const key = city.toLowerCase();

  // ✅ Simple in-memory cache (as you want)
  if (cache[key]) {
    updateUI(cache[key]);
    return;
  }
  
  showError("");
  weatherBox.classList.add("hidden");
  
  // ✅ Show loader
  loader.classList.remove("hide");
  
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!res.ok) {
      showError("City not found");
      return;
    }

    const start = Date.now();
    const data = await res.json();
    
    // ✅ Save to simple cache
    cache[key] = data;
    
    updateUI(data);

    // Optional minimum loader time (UX polish)
    const elapsed = Date.now() - start;
    if (elapsed < 400) {
      await new Promise(r => setTimeout(r, 400 - elapsed));
    }

  } catch (err) {
    showError("Network error. Check connection.");
  } finally {
    loader.classList.add("hide");
  }
}

function updateUI(data) {
  document.title = "Weather | " + data.name;

  locationEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.name}, ${data.sys.country}`;
  tempEl.textContent = `${Math.round(data.main.temp)} °C`;
  descEl.textContent = data.weather[0].description;

  windEl.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
  humidityEl.textContent = `${data.main.humidity} %`;
  cloudsEl.textContent = data.weather[0].main;

  const iconCode = data.weather[0].icon;
  iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const options = { hour: "2-digit", minute: "2-digit" };
  sunriseEl.textContent =
    "Sunrise: " + new Date(data.sys.sunrise * 1000).toLocaleTimeString([], options);
  sunsetEl.textContent =
    "Sunset: " + new Date(data.sys.sunset * 1000).toLocaleTimeString([], options);

  setBackground(data.weather[0].main);
  setParticles(data.weather[0].main);
  fetchForecast(data.name);

  weatherBox.classList.remove("hidden");

}

function showError(msg) {
  errorBox.textContent = msg;
}

function setBackground(condition) {
  document.body.className = "";

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

function setParticles(condition) {
  rainEl.style.display = "none";
  snowEl.style.display = "none";

  switch (condition) {
    case "Rain":
    case "Drizzle":
    case "Thunderstorm":
      rainEl.style.display = "block";
      break;
    case "Snow":
      snowEl.style.display = "block";
      break;
  }
}
async function fetchForecast(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) return;

    const data = await res.json();
    forecastData = data;
    render7Days();

  } catch (err) {
    console.error("Forecast fetch failed", err);
  }
}
function render7Days() {
  if (!forecastData || !forecastData.list) return;

  sevenDays.innerHTML = ``;

  let daily = forecastData.list.filter(d => d.dt_txt.includes("12:00:00"));
  if (!daily.length) return;

  const presentDay = daily[0];
  const nextDays = daily.slice(1, 7);

  const div = document.createElement("div");
  div.classList.add("wrapperD");

  div.innerHTML = `
    <header>
      <div class="backArrow">
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <h5> Next 7 Days Forecast</h5>
    </header>

    <div class="monday bg-clear">
      <div class="mondayTop">
        <p class="pTag">
          <span>${getDay(presentDay.dt_txt)}</span>
          <span>${presentDay.weather[0].main}</span>
        </p>
        <img src="https://openweathermap.org/img/wn/${presentDay.weather[0].icon}@4x.png" alt="">
      </div>

      <div class="mondayBottom">
        <p>
          <span>${(presentDay.wind.speed * 3.6).toFixed(1)} km/h</span>
          <span>Wind</span>
        </p>
        <p>
          <span>${presentDay.main.temp_max.toFixed(0)}°</span>
          <span>High</span>
        </p>
        <p>
          <span>${presentDay.main.temp_min.toFixed(0)}°</span>
          <span>Low</span>
        </p>
        <p>
          <span>${forecastData.city.name}</span>
          <span>${forecastData.city.country}</span>
        </p>
      </div>
    </div>

    <div class="otherDay">
      <ul>
        ${nextDays.map(da => `
          <li>
            <div class="d1">
              <p>
                <span>${getDay(da.dt_txt)}</span>
                <span>${da.weather[0].main}</span>
              </p>
              <img class="otherDayImg"
                   src="https://openweathermap.org/img/wn/${da.weather[0].icon}@4x.png" alt="">
              <span>${da.main.humidity}%</span>
            </div>
          </li>
        `).join("")}
      </ul>
    </div>
  `;

  sevenDays.append(div);
}


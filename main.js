let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let cityName = document.getElementById("city-name");
let weatherStatus = document.getElementById("status");
let cloudStatus = document.getElementById("cloud-status");
let image = document.getElementById("image");
let notFound = document.getElementById("not-found");
let weatherResult = document.querySelector(".result");

let API_key = "901be245c2974afa304b1285ac063b38";

cloudStatus.className = "";

searchBtn.addEventListener("click", () => {
  if (input.value == "") {
    cityName.textContent = "enter city name to find";
  } else {
    let cityName = input.value.trim();
    processData(cityName);
  }
});
error;
async function processData(city) {
  const getData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=901be245c2974afa304b1285ac063b38`
  );

  let jsonData = await getData.json();

  if (getData.status == "404") {
    weatherResult.classList.add("none");
    notFound.classList.remove("none");
  } else {
    notFound.classList.add("none");
    weatherResult.classList.toggle("none");

    cityName.innerText = jsonData.name;
    weatherStatus.innerText = jsonData.weather[0].main;
    document.getElementById("wind").innerText = jsonData.wind.speed + "km/h";
    document.getElementById("rain").innerText = jsonData.weather[0].description;
    document.getElementById("humidity").innerText =
      jsonData.main.humidity + "%";
    document.getElementById("temp").innerText =
      Math.floor(jsonData.main.temp - 273.15) + "°C";

    const sunrise = new Date(jsonData.sys.sunrise * 1000);
    const sunset = new Date(jsonData.sys.sunset * 1000);

    document.getElementById(
      "rise"
    ).innerText = `sun rise on :- ${sunrise.toLocaleTimeString()}`;
    document.getElementById(
      "set"
    ).innerText = `sun sets on :- ${sunset.toLocaleTimeString()}`;

    weatherInfo(jsonData);
  }

  function weatherInfo(jsonData) {
    if (
      jsonData.weather[0].description == "overcast clouds" ||
      jsonData.weather[0].description == "scattered clouds" ||
      jsonData.weather[0].description == "broken clouds"
    ) {
      cloudStatus.classList.add("fa-solid", "fa-cloud-meatball", "text-3xl");
      image.src = "cloudy.png";
    } else if (
      jsonData.weather[0].description == "rain" ||
      jsonData.weather[0].description == "heavy rain"
    ) {
      cloudStatus.classList.add("fa-solid", "fa-cloud-rain", "text-3xl");
      image.src = "rain.png";
    } else if (
      jsonData.weather[0].description == "clear sky" ||
      jsonData.weather[0].description == "clear"
    ) {
      cloudStatus.classList.add("fa-solid", "fa-sun", "text-3xl");
      image.src = "clear.png";
    }
  }
}
function reset() {
  weatherResult.classList.add("none");
  input.value = "";
  cityName.textContent = "Enter to search";
  cloudStatus.className = "";
}

let input = document.querySelector("#input");
let search = document.querySelector("#search");
let cityName = document.getElementById("city-name");
let weatherStatus = document.getElementById("status");
let cloudStatus = document.getElementById("cloud-status");
let image = document.getElementById('image')
let notFound = document.getElementById('not-found')
let weatherResult = document.querySelector('.result')

let API_key = "901be245c2974afa304b1285ac063b38";

search.addEventListener("click", () => {
  if(input.value == ""){
    cityName.textContent = 'enter city name to find'
  }
  else{
    let cityName = input.value.trim();
    weatherResult.classList.remove('none');
    processData(cityName);
  }
  
});
processData();

async function processData(city) {
  const getData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=901be245c2974afa304b1285ac063b38`
  );

  console.log("Data received:", getData);

  let jsonData = await getData.json();
  const sunrise = new Date(jsonData.sys.sunrise * 1000);
  const sunset = new Date(jsonData.sys.sunset * 1000);
  
  
  cityName.innerText = jsonData.name;
  weatherStatus.innerText = jsonData.weather[0].main;
  document.getElementById("wind").innerText = jsonData.wind.speed + 'km/h';
  document.getElementById("rain").innerText = jsonData.weather[0].description;
  document.getElementById("humidity").innerText = jsonData.main.humidity + "%";
  document.getElementById("temp").innerText =
    Math.floor(jsonData.main.temp - 273.15) + "°C";
  document.getElementById("rise").innerText = `sun rise on :- ${sunrise.toLocaleTimeString()}`;
  document.getElementById("set").innerText = `sun sets on :- ${sunset.toLocaleTimeString()}`;

  weatherInfo(jsonData);
}

function weatherInfo(jsonData) {
  if (jsonData.weather[0].description == "overcast clouds" || jsonData.weather[0].description == "scattered clouds" || jsonData.weather[0].description == "broken clouds"

  ) {
    cloudStatus = cloudStatus.classList.add("fa-cloud-meatball");
    image.src = "cloudy.png"
  } else if (
    jsonData.weather[0].description == "rain" ||
    jsonData.weather[0].description == "heavy rain"
  ) {
    cloudStatus = cloudStatus.classList.add("fa-cloud-rain");
    image.src = "rain.png"
  }  else if (
    jsonData.weather[0].description == "clear sky" || jsonData.weather[0].description == "clear" 
  ) {
    cloudStatus = cloudStatus.classList.add("fa-sun");
    image.src = "clear.png"
  }  
}
function reset() {
    weatherResult.classList.add('none')
    input.value = ''
  }
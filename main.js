let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let cityName = document.getElementById("city-name");
let weatherStatus = document.getElementById("status");
let cloudStatus = document.getElementById("cloud-status");
let searchImg = document.querySelector('.search-img')
let image = document.getElementById("image");
let notFound = document.getElementById("not-found");
let main = document.getElementById("main");
let weatherResult = document.querySelector(".result");
let loader = document.querySelector(".loader");


let API_key = "901be245c2974afa304b1285ac063b38";


searchBtn.addEventListener("click", () => {
  if (input.value == "") {
    cityName.textContent = "enter city name to find";
  }
  else {
    let cityName = input.value.trim();
    processData(cityName);
    main.style.color = 'black'

  }
});

async function processData(city) {
  const getData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=901be245c2974afa304b1285ac063b38`
  );

  let jsonData = await getData.json();

  if (getData.status == "404") {
    main.style.background = "white"
    weatherResult.classList.add("none");
    notFound.classList.remove("none");
    searchImg.classList.add('none')
    main.style.background = 'white'

  } else {
    const windSpeed = jsonData.wind.speed * 3.6;

    searchImg.classList.add('none')
    notFound.classList.add("none");
    weatherResult.classList.remove("none");
    cityName.innerText = jsonData.name;
    weatherStatus.innerText = jsonData.weather[0].main;
    document.getElementById("wind").innerText = windSpeed.toFixed(2) + "km/h";
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
  
  


  //real time weather description update
  function weatherInfo(jsonData) {
    if (jsonData.weather[0].description == "overcast clouds" || jsonData.weather[0].description == "scattered clouds" || jsonData.weather[0].main == "Clouds") {
      cloudStatus.classList.add("fa-solid", "fa-cloud", "text-3xl", 'rotate');
      image.src = "cloudy.png";
  function weatherInfo(jsonData) {
    if (jsonData.weather[0].description == "overcast clouds" || jsonData.weather[0].description == "scattered clouds" || jsonData.weather[0].main == "Clouds") {
      cloudStatus.classList.add("fa-solid", "fa-cloud", "text-3xl", 'rotate');
      loader.style.display = 'block'
      setTimeout(() => {
        image.src = "cloudy.png";
        loader.style.display = 'none'
      }, 1000)

      image.classList.add('shadow')
      main.style.backgroundImage = "linear-gradient(to bottom, #483E3E, #585858, #848A9B, #BABCCD)"
      main.style.color = 'white'
    }
    else if (jsonData.weather[0].description == "rain" || jsonData.weather[0].description == "light rain" || jsonData.weather[0].description == "heavy rain" || jsonData.weather[0].description == "heavy intensity rain" || jsonData.weather[0].description == "moderate rain") {
      
      
      image.src = "rain.png";
      cloudStatus.classList.add("fa-solid", "fa-cloud-rain", "text-3xl", 'rotate', "text-3xl");
      image.classList.add('shadow')
      main.style.background = "linear-gradient(to top,rgb(24, 80,90),rgb(21, 119, 103),rgb(57, 170, 204))"
      
    }
    else if (jsonData.weather[0].description == "clear sky" || jsonData.weather[0].description == "broken clouds" || jsonData.weather[0].description == "clear") {
      cloudStatus.classList.add("fa-solid", "fa-sun", "text-3xl");
      image.src = "clears.png";
      image.classList.add('sun-shadow')
      main.style.background = "linear-gradient(to bottom, white, lightblue, skyblue)"
    else if (jsonData.weather[0].description == "rain" || jsonData.weather[0].description == "light rain" || jsonData.weather[0].description == "heavy rain" || jsonData.weather[0].description == "heavy intensity rain" || jsonData.weather[0].description == "moderate rain") {

      loader.style.display = 'block'
      setTimeout(() => {
        image.src = "rain.png";
        loader.style.display = 'none'
      }, 1000)
      cloudStatus.classList.add("fa-solid", "fa-cloud-rain", "text-3xl", 'rotate', "text-3xl");
      image.classList.add('shadow')
      main.style.background = "linear-gradient(to top,rgb(24, 80,90),rgb(21, 119, 103),rgb(57, 170, 204))"
    }
    else if (jsonData.weather[0].description == "clear sky" || jsonData.weather[0].description == "broken clouds" || jsonData.weather[0].description == "clear") {

      cloudStatus.classList.add("fa-solid", "fa-sun", "text-3xl");
      loader.style.display = 'block'
      setTimeout(() => {
        image.src = "clears.png";
        loader.style.display = 'none'
      }, 1000)
      image.classList.add('sun-shadow')
      main.style.background = "linear-gradient(to bottom, white, lightblue, skyblue)"
    }
    else if (jsonData.weather[0].description == "storm") {

      loader.style.display = 'block'
      setTimeout(() => {
        image.src = "strom.png";
        loader.style.display = 'none'
      }, 1000)
      image.classList.add('shadow')
      cloudStatus.classList.add("fa-solid", "fa-cloud-bolt", "text-3xl");
      main.style.background = "rgb(82, 81, 81);"
    }
  }
}

function reset() {
  weatherResult.classList.add("none");
  input.value = "";
  cityName.textContent = "Enter to search";
  cloudStatus.className = "";
  notFound.classList.add('none')
  searchImg.classList.remove('none')
  main.style.background = "#B2B0E8"
  main.style.color = 'black'
}

// updated on 12:52
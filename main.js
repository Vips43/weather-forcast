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


let API_key = "901be245c2974afa304b1285ac063b38";

cloudStatus.className = "";

searchBtn.addEventListener("click", () => {
  if (input.value == "") {
    cityName.textContent = "enter city name to find";
  }
  else {
    let cityName = input.value.trim();
    processData(cityName);
    
  }
});

async function processData(city) {
  const getData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=901be245c2974afa304b1285ac063b38`
  );
  
  let jsonData = await getData.json();
  
  if (getData.status == "404") {
    weatherResult.classList.add("none");
    notFound.classList.remove("none");
    searchImg.classList.add('none')
    
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
  
  function weatherInfo(jsonData) {
    if (jsonData.weather[0].description == "overcast clouds","scattered clouds","clouds") {
      cloudStatus.classList.add("fa-solid", "fa-cloud", "text-3xl",'rotate');
      image.src = "cloudy.png";
      image.classList.add('shadow')
      main.classList.add('cloud')
    }
    else if (jsonData.weather[0].description == "rain","light rain","heavy rain","heavy intensity rain","moderate rain") {
      image.src = "rain.png";
      alert('hello')
        cloudStatus.classList.add("fa-solid", "fa-cloud-rain",'anime', "text-3xl");
        image.classList.add('shadow')
        main.classList.add('rainy')
      }
      else if (jsonData.weather[0].description == "clear sky","broken clouds","clear") {
          cloudStatus.classList.add("fa-solid", "fa-sun", "text-3xl");
          image.src = "clear.png";
          main.classList.add('clear')
    }
    else if (jsonData.weather[0].description == "storm") {
      image.src = "strom.png";
      image.classList.add('shadow')
      cloudStatus.classList.add("fa-solid", "fa-cloud-bolt", "text-3xl");
      main.classList.add('storm')
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
  main.classList.add('cloud','rainy')
}
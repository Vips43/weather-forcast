let search = document.querySelector(".searchIcon"),
  input = document.getElementById("input"),
  wind = document.getElementById("wind"),
  cloud = document.getElementById("cloud"),
  humid = document.getElementById("humid"),
  rise = document.getElementById("rise"),
  set = document.getElementById("set"),
  locationName = document.getElementById("locationName"),
  temp = document.getElementById("temp"),
  description = document.getElementById("description"),
  mainContainer = document.querySelector('.main-container'),
  dark = document.querySelector('.dark'),
  mainSection = document.querySelector('.main-section'),
  weatherImg = document.querySelector('.status-img img'),
  vanish = document.querySelectorAll('.vanish')
popup = document.querySelector('.popup p')

//  add vanish effect once at the start


if (window.innerWidth > 700) input.focus();
function searchBtn() {

  if (input.value == '') {
    popup.textContent = 'Please enter city name';
    popupMenu();
    return
  }
  else {
    if (search.classList.contains('fa-search')) {
      input.disabled = true; //input disabled once fetched
      const cityName = input.value.trim(); //get input value
      search.classList.replace('fa-search', 'fa-rotate-right');

      vanish.forEach(v => v.classList.add('active')); //extra animation
      mainSection.style.transform = 'scale(1)';  //display main section
      getData(cityName);
      console.log('i a,m here');

    } else {
      location.reload()
    }
  }
}


const APIkey = `517063abfe0dfc60763f72daff350118`;

async function getData(city) {

  try {
    if (!city || city.trim() === "") {
      mainContainer.style.backgroundImage = `url('imgs/search.jpg')`
      mainSection.style.display = 'none'

      return;
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${APIkey}&units=metric`);

    if (!response.ok) {
      if (response.status === 404) {
        mainContainer.style.background = `url('imgs/not-found.jpg')`
        mainSection.style.display = 'none'
        return;
      } else {
      }


    }
    
    const jsonData = await response.json();
    setWeatherProperties(jsonData)
  } 
  catch (error) {
    mainSection.style.display = 'none'
    popupMenu();
    popup.textContent = 'You are not connected to network'

  }
};

function setWeatherProperties(data) {
  var windSpeed = data.wind.speed * 3.6
  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);
  
  locationName.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.name}`;
  description.textContent = data.weather[0].description;
  temp.textContent = `${Math.round(data.main.temp)} °C`;
  humid.textContent = data.main.humidity + "%";
  cloud.textContent = data.weather[0].main;
  wind.textContent = windSpeed.toFixed(2) + ' km/h';
  
  const options = { hour: "2-digit", minute: "2-digit" };
  rise.innerHTML = `<b>Sunrise: </b> ${sunrise.toLocaleTimeString([], options)} am`;
  set.innerHTML = `<b>Sunset: </b> ${sunset.toLocaleTimeString([], options)} pm`;
  
  setBackground(cloud.textContent);
}

function setBackground(data) {
  switch (data) {
    case "Clouds":
      mainContainer.style.backgroundImage = `url('imgs/cloud.jpg')`;
      weatherImg.src = 'imgs/cloudy.png';
      dark.style.color = 'white';
      break;

    case "Rain":
      mainContainer.style.backgroundImage = `url('imgs/rainn.gif')`;
      weatherImg.src = 'imgs/rain.gif';
      dark.style.color = 'black';
      break;

    case "Clear":
      mainContainer.style.backgroundImage = `url('imgs/clear.jpeg')`;
      weatherImg.src = 'imgs/clear.png';
      dark.style.color = 'white';
      break;

    case "Snow":
      mainContainer.style.backgroundImage = `url('imgs/snow.jpg')`;
      weatherImg.src = 'imgs/snow.png';
      dark.style.color = 'black';
      break;

    case "Mist":
    case "Fog":
    case "Haze":
      mainContainer.style.backgroundImage = `url('imgs/mist.jpg')`;
      weatherImg.src = 'imgs/fog.png';
      dark.style.color = 'white';
      break;

    case "Thunderstorm":
      mainContainer.style.backgroundImage = `url('imgs/thunder.jpg')`;
      weatherImg.src = 'imgs/storm.png';
      dark.style.color = 'white';
      break;

    case "Drizzle":
      mainContainer.style.backgroundImage = `url('imgs/drizzle.jpg')`;
      weatherImg.src = 'imgs/drizzle.gif';
      dark.style.color = 'black';
      break;

    case "Smoke":
    case "Dust":
    case "Sand":
      mainContainer.style.backgroundImage = `url('imgs/dust.jpg')`;
      weatherImg.src = 'imgs/fog.png';
      dark.style.color = 'white';
      break;

    case "Tornado":
      mainContainer.style.backgroundImage = `url('imgs/tornado.jpg')`;
      weatherImg.src = 'imgs/tornado.gif';
      dark.style.color = 'white';
      break;

    default:
      // Fallback if condition not handled
      mainContainer.style.backgroundImage = `url('imgs/default.jpg')`;
      weatherImg.src = '';
      dark.style.color = 'white';
      break;
  }
}


//quick popup toggle 
function popupMenu() {
  popup.parentElement.classList.add('active')
  setTimeout(() => {
    popup.parentElement.classList.remove('active')
  }, 3000);
}
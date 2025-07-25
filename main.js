let input = document.querySelector('#input')
let search =document.querySelector('#search')
let cityName = document.getElementById('city-name')
let weatherStatus = document.getElementById('status')
let API_key = '901be245c2974afa304b1285ac063b38'

search.addEventListener('click', ()=>{

      let cityName = input.value
      console.log(cityName)
      processData(cityName)
    })
    
async function processData(input) {
  const getData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=901be245c2974afa304b1285ac063b38`);
  
    console.log('Data received:', getData);
    
    let jsonData = await getData.json()
    console.log(jsonData);
    console.log(jsonData.name)
    cityName.innerText = jsonData.name;
    weatherStatus.innerText = jsonData.weather[0].main
    document.getElementById('wind').innerText = jsonData.wind.speed
    document.getElementById('rain').innerText = jsonData.weather[0].description
    document.getElementById('humidity').innerText = jsonData.main.humidity + "%"
    document.getElementById('temp').innerText = Math.floor((jsonData.main.temp)/10) + "°C"
    document.getElementById('rise').innerText = jsonData.sys.sunrise
    document.getElementById('set').innerText = jsonData.sys.sunset
    
}

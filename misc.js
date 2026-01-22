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

const sideBtn = document.querySelector(".sideBtn")
const backArrow = document.querySelector(".backArrow")
const slideW = document.querySelector(".slideW")
const sevenDays = document.querySelector(".sevenDays")
const main = document.querySelector(".main")

searchBtn.addEventListener("click", searchWeather);
input.addEventListener("keydown", e => {
    if (e.key === "Enter") searchWeather();
});


sideBtn.addEventListener("click", () => {
    main.style.transform = `translateX(-103%)`
})

backArrow.addEventListener("click", () => {
    main.style.transform = `translateX(0%)`
})

const day = ['sunday', 'monday', "tuesday", "wednesday", "thursday", "friday", "saturday",]
let date = new Date(`2026-01-22 21:00:00`);
console.log(day[date.getDay()])
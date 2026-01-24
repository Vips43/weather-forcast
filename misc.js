const sideBtn = document.getElementById("sideBtn");
const main = document.querySelector(".main");

// ✅ Safe bindings (no crashes)
if (sideBtn && main) {
  sideBtn.addEventListener("click", () => {
    main.style.transform = `translateX(-103%)`;
    sideBtn.style.transform = `translate(40px ,-195px)`
    setTimeout(() => {
      sideBtn.style.display = `none`;
    }, 500);
  });
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".backArrow")) {
    const arrow = e.target.closest(".backArrow")

    const main = document.querySelector(".main");
    if (main) {
      main.style.transform = `translateX(0%)`;
      sideBtn.style.transform = `translate(0%)`;
      sideBtn.classList.add("sideBtn")
      sideBtn.style.display = `grid`;
    }
  }
});

// Utility
function getDay(daystring) {
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let date = new Date(daystring);
  return day[date.getDay()];
}

const now = new Date(Date.now())

console.log( now.getFullYear()+"-"+ now.getMonth()+1+"-"+now.getDate())
const sideBtn = document.querySelector(".sideBtn");
const main = document.querySelector(".main");

// ✅ Safe bindings (no crashes)
if (sideBtn && main) {
  sideBtn.addEventListener("click", () => {
    main.style.transform = `translateX(-103%)`;
  });
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".backArrow")) {
    const main = document.querySelector(".main");
    if (main) {
      main.style.transform = `translateX(0%)`;
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

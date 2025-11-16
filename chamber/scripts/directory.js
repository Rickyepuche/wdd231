const navLinks = document.querySelector(".navigation");
const toggleButton = document.querySelector("#menu");

toggleButton.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  toggleButton.classList.toggle("show");
});

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector(".businesses");

function showGrid() {
    display.classList.add("grid");
    display.classList.remove("list");
}
showGrid();
gridbutton.addEventListener("click", (event) => {
    event.preventDefault();
    showGrid();
});

listbutton.addEventListener("click", (event) => {
    event.preventDefault();
    display.classList.add("list");
    display.classList.remove("grid");
});

let now = new Date();
let year = now.getFullYear();
document.querySelector("#currentYear").textContent = year;
let date = now.toLocaleString();
document.querySelector("#lastModified").textContent = date;



// weather program
const apiKey = "e8137ce53c97a45fc9e53de621739735";
const lat = "6.4969";
const lon = "5.5471";

const url =
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const forecastUrl =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

async function apiForecast() {
  try {
    const response = await fetch(forecastUrl);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayForecast(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();
apiForecast();

function displayResults(data) {
    const tempDisplay = document.querySelector("#temp-display");
    const conditionsDisplay = document.querySelector("#conditions-display");
    const weatherIcon = document.querySelector("#weather-icon");
    const windChill = document.querySelector("#wind-chill");
    const windDisplay = document.querySelector("#wind-display");
    
    if (data.main && data.main.temp) {
        tempDisplay.textContent = `${Math.round(data.main.temp)}°C`;
    }
    
    if (data.weather && data.weather[0]) {
        const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        const desc = data.weather[0].description;
        weatherIcon.setAttribute("src", iconsrc);
        weatherIcon.setAttribute("alt", desc);
        conditionsDisplay.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    }
    
    if (data.wind && data.wind.speed) {
        const windKmh = Math.round(data.wind.speed * 3.6);
        windChill.textContent = `${windKmh} km/h`;
        windDisplay.textContent = `${windKmh} km/h`;
    }
}

function displayForecast(data) {
    if (!data.list || data.list.length < 3) return;
    
    // Get forecast data for the next 3 days
    const day1 = data.list[0];
    const day2 = data.list[8]; 
    const day3 = data.list[16]; 
    
    // Update first day (Today)
    const firstDayElem = document.querySelector("#firstDayData");
    if (day1 && firstDayElem) {
        firstDayElem.textContent = `${Math.round(day1.main.temp)}°C`;
    }
    
    // Update second day
    const secondDayElem = document.querySelector("#secondDayData");
    if (day2 && secondDayElem) {
        secondDayElem.textContent = `${Math.round(day2.main.temp)}°C`;
    }
    
    // Update third day
    const thirdDayElem = document.querySelector("#thirdDayData");
    if (day3 && thirdDayElem) {
        thirdDayElem.textContent = `${Math.round(day3.main.temp)}°C`;
    }
}



// Simple members loader

let membersInfo = [];

fetch('data/members.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(data => {
    
    if (Array.isArray(data)) membersInfo = data;
    else if (data && Array.isArray(data.members)) membersInfo = data.members;
    else membersInfo = Array.isArray(data) ? data : [data];
    window.membersInfo = membersInfo; 
    console.log('membersInfo loaded', membersInfo);

    renderBusinesses();
  })
  .catch(err => console.error('Could not load members.json:', err));

function renderBusinesses() {
  const container = document.querySelector('.businesses');
  if (!container) return;

  // Filter members with membership level 2 or 3
  const qualifiedMembers = membersInfo.filter(m => m.membershipLevel >= 2 && m.membershipLevel <= 3);
  
  // Randomly select the qualified members
  const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
  
  // Select only the first 3 members with level 2 or 3
  const selectedMembers = shuffled.slice(0, 3);

  container.innerHTML = '';

  for (let i = 0; i < selectedMembers.length; i++) {
    const m = selectedMembers[i];

    const business = document.createElement('div');
    business.className = 'business';

    const imgWrap = document.createElement("div");
    imgWrap.className = "business-image";
    const img = document.createElement("img");
    img.src = m.icon || "images/first.jpg";
    img.alt = m.name || "Business image";
    imgWrap.appendChild(img);

    // Header
    const header = document.createElement('div');
    header.className = 'business-header';
    header.innerHTML = `<h3>${escapeHtml(m.name || '')}</h3>`;

    const address = document.createElement('div');
    address.className = 'business-address';
    address.innerHTML = `<p>${escapeHtml(m.address || '')}</p>`;

    const phone = document.createElement("div");
    phone.className = "business-phone";
    phone.innerHTML = `<p>${escapeHtml(m.phone || "")}</p>`;

    const website = document.createElement("div");
    website.className = "business-phone";
    website.innerHTML = `<p>${escapeHtml(m.website || "")}</p>`;

    business.appendChild(imgWrap);
    business.appendChild(header);
    business.appendChild(address);
    business.appendChild(phone);
    business.appendChild(website);

    container.appendChild(business);
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


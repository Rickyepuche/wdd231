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


// Simple members loader: fetch members.json (one path) and store parsed array
let membersInfo = [];

fetch('data/members.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(data => {
    // If JSON is an array use it, otherwise try common wrapper keys
    if (Array.isArray(data)) membersInfo = data;
    else if (data && Array.isArray(data.members)) membersInfo = data.members;
    else membersInfo = Array.isArray(data) ? data : [data];
    window.membersInfo = membersInfo; // expose for debugging/other scripts
    console.log('membersInfo loaded', membersInfo);
    // Render businesses into the page
    renderBusinesses();
  })
  .catch(err => console.error('Could not load members.json:', err));

function renderBusinesses() {
  const container = document.querySelector('.businesses');
  if (!container) return;

  // Clear any placeholder content
  container.innerHTML = '';

  for (let i = 0; i < membersInfo.length; i++) {
    const m = membersInfo[i];

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


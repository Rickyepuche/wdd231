// Get DOM elements
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const searchToggle = document.getElementById("openSearch");
const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("searchBar");
const searchSubmit = document.getElementById("searchSubmit");

// ========== SIDE MENU FUNCTIONALITY ==========

// Open side menu
menuBtn.addEventListener("click", () => {
    sideMenu.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // This will help prevent scrolling when menu is open
});

// Close side menu
const closeMenu = () => {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
};

closeBtn.addEventListener("click", closeMenu);

// This close menu when overlay is clicked
overlay.addEventListener("click", closeMenu);

// Close menu when a side menu link is clicked
document.querySelectorAll(".side-menu-link").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// ========== SEARCH FUNCTIONALITY ==========

// Toggle search bar visibility
searchToggle.addEventListener("click", () => {
    searchContainer.classList.add("active");
    searchInput.focus(); // Auto-focus the input when search opens
});

// Handle search submission
searchSubmit.addEventListener("click", () => {
    const searchQuery = searchInput.value.trim();
    
    if (searchQuery) {
        console.log("Searching for:", searchQuery);
        // Here you can add actual search functionality
        // For example: navigate to search results page or fetch data
        // window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        alert(`Searching for: ${searchQuery}`);
        
        // Clear search and close search bar after submission
        searchInput.value = "";
        searchContainer.classList.remove("active");
    }
});

// Allow Enter key to submit search
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchSubmit.click();
    }
});

// Close search when input loses focus
searchInput.addEventListener("blur", () => {
     setTimeout(() => {
         searchContainer.classList.remove("active");
   }, 200);
});


// Footer js
let now = new Date();
let year = now.getFullYear();
document.querySelector("#currentYear").textContent = year;
let date = now.toLocaleString();
document.querySelector("#lastModified").textContent = date;

// main js


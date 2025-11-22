// Extract URL parameters and display them
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Display required fields
  document.getElementById("display-fname").textContent = urlParams.get("fname") || "N/A";
  document.getElementById("display-lname").textContent = urlParams.get("lname") || "N/A";
  document.getElementById("display-email").textContent = urlParams.get("email") || "N/A";
  document.getElementById("display-phone").textContent = urlParams.get("phone") || "N/A";
  document.getElementById("display-business").textContent = urlParams.get("business") || "N/A";
  document.getElementById("display-timestamp").textContent = urlParams.get("timestamp") || "N/A";

  // Update footer year
  const now = new Date();
  const year = now.getFullYear();
  document.querySelector("#currentYear").textContent = year;
  const date = now.toLocaleString();
  document.querySelector("#lastModified").textContent = date;
});

// Hamburger menu toggle
const navLinks = document.querySelector(".navigation");
const toggleButton = document.querySelector("#menu");

if (toggleButton && navLinks) {
  toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    toggleButton.classList.toggle("show");
  });
}

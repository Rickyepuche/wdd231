import { initNavigation, initFooter } from "./navigationModule.js";

// Initialize navigation and footer
initNavigation();
initFooter();

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    // Display form data
    document.getElementById("display-fname").textContent =
        urlParams.get("fname") || "N/A";
    document.getElementById("display-lname").textContent =
        urlParams.get("lname") || "N/A";
    document.getElementById("display-email").textContent =
        urlParams.get("email") || "N/A";
    
    // Format and display timestamp
    const timestamp = urlParams.get("timestamp");
    if (timestamp) {
        try {
            const date = new Date(timestamp);
            document.getElementById("display-timestamp").textContent = date.toLocaleString();
        } catch (e) {
            document.getElementById("display-timestamp").textContent = timestamp;
        }
    } else {
        document.getElementById("display-timestamp").textContent = "N/A";
    }
});
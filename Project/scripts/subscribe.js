// Subscribe form JavaScript

// Set timestamp when page loads
document.addEventListener('DOMContentLoaded', () => {
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    // Update year in footer
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Update last modified date
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
});

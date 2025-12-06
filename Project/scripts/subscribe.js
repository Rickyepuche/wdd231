// Subscribe form JavaScript
import { initNavigation, initFooter } from "./navigationModule.js";

initNavigation();
initFooter();

// Set timestamp when page loads
document.addEventListener('DOMContentLoaded', () => {
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }
});

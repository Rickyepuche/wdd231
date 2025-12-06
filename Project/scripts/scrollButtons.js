// scrollButtons.js
export function initScrollButtons() {
    const scrollButtons = document.querySelectorAll('.scroll-btn');
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', handleScroll);
    });
}

function handleScroll(event) {
    const button = event.currentTarget;
    const targetId = button.getAttribute('data-target');
    const container = document.getElementById(targetId);
    
    if (!container) {
        console.error(`Container with id "${targetId}" not found`);
        return;
    }
    
    const scrollAmount = 300; // pixels to scroll
    const isLeftButton = button.classList.contains('scroll-left');
    
    if (isLeftButton) {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

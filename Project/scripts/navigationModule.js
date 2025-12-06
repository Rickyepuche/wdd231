
export function initNavigation() {
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
        document.body.style.overflow = "hidden";
    });

    // Close side menu
    const closeMenu = () => {
        sideMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    document.querySelectorAll(".side-menu-link").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // ========== SEARCH FUNCTIONALITY ==========

    // Toggle search bar visibility
    searchToggle.addEventListener("click", () => {
        searchContainer.classList.add("active");
        searchInput.focus();
    });

    // Handle search submission - Navigate to games.html with search query
    searchSubmit.addEventListener("click", () => {
        const searchQuery = searchInput.value.trim();
        
        if (searchQuery) {
            window.location.href = `games.html?search=${(searchQuery)}`;
            console.log(searchQuery);
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
}

export function initFooter() {
    let now = new Date();
    let year = now.getFullYear();
    document.querySelector("#currentYear").textContent = year;
}
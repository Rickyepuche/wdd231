// gameModal.js - Modal functionality for game details

export function initGameModal() {
    const modal = document.getElementById("gameModal");
    const closeBtn = modal.querySelector(".close-modal-btn");

    // Close modal when close button is clicked
    closeBtn.addEventListener("click", () => {
        modal.close();
    });

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });
}

export function openGameModal(game) {
    const modal = document.getElementById("gameModal");
    
    // Populate modal with game data
    document.querySelector(".modal-game-title").textContent = game.name;
    document.querySelector(".modal-game-image").src = game.background_image || "images/placeholder.webp";
    document.querySelector(".modal-game-rating").innerHTML = `⭐ ${game.rating} / 5`;
    document.querySelector(".modal-game-reviews").textContent = `${game.reviews_count || 0} reviews`;
    document.querySelector(".modal-game-released").textContent = `Released: ${game.released || "N/A"}`;
    
    // Platforms
    const platformsHtml = game.platforms && game.platforms.length > 0
        ? game.platforms.map(p => `<span class="badge">${p.platform.name}</span>`).join("")
        : "<span class='badge'>N/A</span>";
    document.querySelector(".modal-game-platforms").innerHTML = platformsHtml;
    
    // Developers
    const developersHtml = game.developers && game.developers.length > 0
        ? game.developers.map(d => `<span class="badge">${d.name}</span>`).join("")
        : "<span class='badge'>N/A</span>";
    document.querySelector(".modal-game-developers").innerHTML = developersHtml;
    
    // Metacritic score
    const metacriticScore = game.metacritic || "N/A";
    document.querySelector(".modal-game-metacritic").textContent = `Metacritic: ${metacriticScore}`;
    
    // Genres
    const genresHtml = game.genres && game.genres.length > 0
        ? game.genres.map(g => `<span class="badge">${g.name}</span>`).join("")
        : "<span class='badge'>N/A</span>";
    document.querySelector(".modal-game-genres").innerHTML = genresHtml;
    
    // Description 
    const descriptionText = game.description || `Explore ${game.name} - a game with ${game.reviews_count || 0} player reviews.`;
    document.querySelector(".modal-game-description").textContent = descriptionText;
    
    // Stores
    const storesHtml = game.stores && game.stores.length > 0
        ? game.stores.map(s => `<span class="badge">${s.store.name}</span>`).join("")
        : "<span class='badge'>Check RAWG</span>";
    document.querySelector(".modal-game-stores").innerHTML = storesHtml;

    modal.showModal();
}

export function attachGameCardListeners() {
    // Attach click listeners to all game cards
    const gameLinks = document.querySelectorAll(".game-card");
    
    gameLinks.forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Get game data from the card's data attribute
            let gameData = card.getAttribute("data-game");
            if (gameData) {
                try {
                    // Decode HTML entities (&quot; -> ")
                    gameData = gameData.replace(/&quot;/g, '"');
                    const game = JSON.parse(gameData);
                    openGameModal(game);
                } catch (error) {
                    console.error("Error parsing game data:", error);
                }
            }
        });
    });
}

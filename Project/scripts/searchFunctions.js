// searchFunctions.js
import { attachGameCardListeners } from "./gameModal.js";

export function getSearchQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get("search");
}

export function searchGames(games, searchTerm) {
    return games.filter(game => 
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

export function displaySearchResults(query, games) {
    const titleElement = document.getElementById("searchTitle");
    const container = document.getElementById("searchResultsContainer");
    const searchSection = document.getElementById("searchSection");
    const allGamesSection = document.getElementById("allGamesSection");
    
    // Debug: Check if elements exist
    if (!titleElement) {
        console.error("❌ searchTitle element not found in HTML");
        return;
    }
    if (!container) {
        console.error("❌ searchResultsContainer element not found in HTML");
        return;
    }
    
    // Show search section, hide all games section
    if (searchSection) searchSection.style.display = "block";
    if (allGamesSection) allGamesSection.style.display = "none";
    
    console.log(`✅ Search found ${games.length} games for: "${query}"`);
    
    titleElement.textContent = `Search Results for "${query}" (${games.length} found)`;
    
    if (games.length === 0) {
        container.innerHTML = "<p>No games found. Try a different search.</p>";
        return;
    }
    
    container.innerHTML = games.map(game => `
        <a href="#" class="game-card-link">
            <div class="game-card" data-game="${JSON.stringify(game).replace(/\"/g, '&quot;')}">
                <img src=\"${game.background_image || 'images/placeholder.webp'}\" alt=\"${game.name}\" loading=\"lazy\">
                <h3>${game.name}</h3>
                <p>⭐ ${game.rating}</p>
            </div>
        </a>
    `).join("");
    
    attachGameCardListeners();
}
import { getSearchQuery, searchGames, displaySearchResults} from "./searchFunctions.js";
import { initNavigation, initFooter } from "./navigationModule.js";
import { initScrollButtons } from "./scrollButtons.js";
import { initGameModal, attachGameCardListeners } from "./gameModal.js";

// Initialize navigation, footer, scroll buttons, and game modal
initNavigation();
initFooter();
initScrollButtons();
initGameModal();

const apiKey = "00e0d38538cc401cb85a3aea150e066b";
let allGames = [];

// ==================== INITIAL PAGE LOAD ========================

async function initPage() {
  const searchQuery = getSearchQuery();
  
  if (searchQuery) {
    // SEARCH PAGE - fetch search results
    await fetchSearchGames(searchQuery);
  } else {
    // HOME PAGE - load all sections
    await fetchAllGames();
  }
}


// Call on page load 
initPage();

// ==================== FETCH FUNCTIONS ========================
// fetch all games for initial load
async function fetchAllGames() {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=50`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      allGames = data.results;
      displayGames(allGames);
    }
  } catch (error) {
    console.log("All games error:", error);
  }
}
  

// ========== FETCH FOR SEARCH ==========
async function fetchSearchGames(searchQuery) {
  if (searchQuery) {
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(
      searchQuery
    )}&page_size=20`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        allGames = data.results;
        displaySearchResults(searchQuery, allGames);
      }
    } catch (error) {
      console.log("Search error:", error);
    }
  }
}

// ========== FETCH FOR NEW RELEASES ==========
async function fetchNewReleases() {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-released&page_size=40`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.results;
    }
  } catch (error) {
    console.log("New releases error:", error);
  }
}

// ========== FETCH FOR BEST RATED ==========
async function fetchBestRated() {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating&page_size=40`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.results;
    }
  } catch (error) {
    console.log("Best rated error:", error);
  }
}

// ========== FETCH FOR SPECIFIC GENRE ==========
async function fetchByGenre(genreId) {
  const url = `https://api.rawg.io/api/games?key=${apiKey}&genres=${genreId}&page_size=40`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.results;
    }
  } catch (error) {
    console.log("Genre error:", error);
  }
}

// ==================== DISPLAY FUNCTIONS ========================

const gamesContainer = document.querySelector("#gamesContainer");

function displayGames(games) {
  // Display all games
  gamesContainer.innerHTML = games
    .map(
      (game) => `
        <a href="#">
        <div class="game-card" data-game="${JSON.stringify(game).replace(/"/g, '&quot;')}">
                <img src="${game.background_image||"images/placeholder.webp"}" alt="${game.name}">
                <h3>${game.name}</h3>
                <p>Rating: ${game.rating}</p>
                <p>Reviews: ${game.reviews_count}</p>
                <p>Released: ${game.released}</p>
        </div>
        </a>
    `
    )
    .join("");
  attachGameCardListeners();
}

// Display best rated
function displayBestRated(games) {
  gamesContainer.innerHTML = games
    .map(
      (game) => `
        <a href="#">    
        <div class="game-card" data-game="${JSON.stringify(game).replace(/"/g, '&quot;')}">
                <img src="${game.background_image||"images/placeholder.webp"}" alt="${game.name}">
                <h3>${game.name}</h3>
                <p>Rating: ⭐ ${game.rating}</p>
                <p>Reviews: ${game.reviews_count}</p>
                <p>Released: ${game.released}</p>
        </div>
        </a>
    `
    )
    .join("");
  attachGameCardListeners();
}

// Display by genre
function displayByGenre(games, genreName) {
  gamesContainer.innerHTML = games
    .map(
      (game) => `   
        <a href="#">
        <div class="game-card" data-game="${JSON.stringify(game).replace(/"/g, '&quot;')}">
            <img src="${game.background_image||"images/placeholder.webp"}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${genreName}</p>
            <p>Rating: ⭐ ${game.rating}</p>
            <p>Reviews: ${game.reviews_count}</p>
            <p>Released: ${game.released}</p>
        </div>
        </a>
    `
    )
    .join("");
  attachGameCardListeners();
}

// Display new releases
function displayNewReleases(games) {
  gamesContainer.innerHTML = games
    .map(
      (game) => `
        <a href="#">
        <div class="game-card" data-game="${JSON.stringify(game).replace(/"/g, '&quot;')}">
                <img src="${game.background_image||"images/placeholder.webp"}" alt="${game.name}">
                <h3>${game.name}</h3>
                <p>Released: ${game.released}</p>        
        </div>
        </a>
    `
    )
    .join("");
  attachGameCardListeners();
}


// filtering options
const newestLink = document.getElementById("Newest");
const bestRatedLink = document.getElementById("BestRated");
const actionLink = document.getElementById("Action");
const adventureLink = document.getElementById("Adventure");
const sportsLink = document.getElementById("Sports");
const rpgLink = document.getElementById("RPG");
const shooterLink = document.getElementById("Shooter");
const multiplayerLink = document.getElementById("Multiplayer");

newestLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const newReleases = await fetchNewReleases();
  displayNewReleases(newReleases);
});

bestRatedLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const bestRated = await fetchBestRated();
  displayBestRated(bestRated);
});

actionLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const actionGames = await fetchByGenre(28);
  displayByGenre(actionGames, "Action");
}); 

adventureLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const adventureGames = await fetchByGenre(3);
  displayByGenre(adventureGames, "Adventure");
});

sportsLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const sportsGames = await fetchByGenre(15);
  displayByGenre(sportsGames, "Sports");
});

rpgLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const rpgGames = await fetchByGenre(5);
  displayByGenre(rpgGames, "RPG");
});

shooterLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const shooterGames = await fetchByGenre(2);
  displayByGenre(shooterGames, "Shooter");
});

multiplayerLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const multiplayerGames = await fetchByGenre(16);
  displayByGenre(multiplayerGames, "Multiplayer");
});

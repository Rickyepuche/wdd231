import {places} from "../data/places.mjs"

const aPlaces = places;
const thePlaces = document.querySelector(".places");

//  VISIT TRACKING WITH LOCALSTORAGE 

function displayVisitMessage() {
    const currentVisit = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");
    const visitMessage = document.querySelector(".visit-message");

    if (!lastVisit) {
        // First visit
        visitMessage.innerHTML = "<h2>Welcome! Let us know if you have any questions.</h2>";
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const timeDifference = currentVisit - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            // Less than a day
            visitMessage.innerHTML = "<h2>Back so soon! Awesome!</h2>";
        } else if (daysDifference === 1) {
            visitMessage.innerHTML = `<h2>You last visited 1 day ago.</h2>`;
        } else {
            visitMessage.innerHTML = `<h2>You last visited ${daysDifference} days ago.</h2>`;
        }
    }

    // Store current visit
    localStorage.setItem("lastVisit", currentVisit);
}

// Call function on page load
displayVisitMessage();

// BUILD CARDS

aPlaces.forEach((p, index) => {
    const place = document.createElement("article");
    place.className = "place-card";

    // Title - h2
    const title = document.createElement("h2");
    title.textContent = p.name;

    // Figure with image
    const figure = document.createElement("figure");
    figure.className = "place-figure";
    const img = document.createElement("img");
    img.src = p.photo_url;
    img.alt = p.name;
    figure.appendChild(img);

    // Address tag
    const address = document.createElement("address");
    address.className = "place-address";
    address.innerHTML = p.address;

    // Description paragraph
    const description = document.createElement("p");
    description.className = "place-description";
    description.textContent = p.description;

    // Learn More Button
    const learnMoreBtn = document.createElement("button");
    learnMoreBtn.className = "learn-more-btn";
    learnMoreBtn.textContent = "Learn More";
    learnMoreBtn.setAttribute("data-place-id", index);

    place.appendChild(title);
    place.appendChild(figure);
    place.appendChild(address);
    place.appendChild(description);
    place.appendChild(learnMoreBtn);

    thePlaces.appendChild(place);

    // Add event listener for modal
    learnMoreBtn.addEventListener("click", () => openPlaceModal(p));
});

// MODAL 

function openPlaceModal(place) {
    const modal = document.getElementById("placeModal");
    const modalTitle = modal.querySelector(".modal-title");
    const modalDescription = modal.querySelector(".modal-description");
    const modalAddress = modal.querySelector(".modal-address");
    const modalCost = modal.querySelector(".modal-cost");

    modalTitle.textContent = place.name;
    modalDescription.textContent = place.description;
    modalAddress.textContent = place.address;
    modalCost.textContent = place.cost;

    modal.showModal();
}

// Close modal functionality
const modal = document.getElementById("placeModal");
const closeBtn = modal.querySelector(".close-modal-btn");

closeBtn.addEventListener("click", () => {
    modal.close();
});



const navLinks = document.querySelector(".navigation");
const toggleButton = document.querySelector("#menu");

toggleButton.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  toggleButton.classList.toggle("show");
});

let now = new Date();
let year = now.getFullYear();
document.querySelector("#currentYear").textContent = year;
let date = now.toLocaleString();
document.querySelector("#lastModified").textContent = date;
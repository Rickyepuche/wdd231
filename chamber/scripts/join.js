// my hamburger menu which is shared with other pages
const navLinks = document.querySelector(".navigation");
const toggleButton = document.querySelector("#menu");

toggleButton.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  toggleButton.classList.toggle("show");
});

// Set timestamp on page load
document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const timestamp = now.toLocaleString();
  document.getElementById("timestamp").value = timestamp;

  // Update footer year
  const year = now.getFullYear();
  document.querySelector("#currentYear").textContent = year;
  const date = now.toLocaleString();
  document.querySelector("#lastModified").textContent = date;
});

// Modal functionality
const modalButtons = document.querySelectorAll(".info-btn");
const modals = document.querySelectorAll(".membership-modal");
const closeButtons = document.querySelectorAll(".close-modal, .modal-close-btn");

modalButtons.forEach(button => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.showModal();
    }
  });
});

closeButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const modal = e.target.closest(".membership-modal");
    if (modal) {
      modal.close();
    }
  });
});

// Close modal when clicking outside of it
modals.forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.close();
    }
  });
});

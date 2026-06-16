//contacts
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";

const contactForm = document.querySelector(".contact-form");
const contactResponse = document.querySelector(".contact-response");

if (contactForm && contactResponse) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactResponse.textContent =
      "Thank you for sharing! Although this website will not use this information, we still appreciate you submitting a response!";
    contactForm.reset();
  });
}

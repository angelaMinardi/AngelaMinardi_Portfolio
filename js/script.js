// Mobile Navigation Toggle
const navLinks = document.querySelector(".nav-links");
const navToggle = document.createElement("div");
navToggle.classList.add("nav-toggle");
navToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector("nav .container").appendChild(navToggle);

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

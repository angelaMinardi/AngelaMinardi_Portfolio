// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Smooth Scrolling for Anchor Links
  const links = document.querySelectorAll('a[href^="#"]');

  for (const link of links) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60, // Adjust for fixed navbar height
          behavior: "smooth",
        });
        // Close mobile menu after clicking
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          navToggle.classList.remove("active");
        }
      }
    });
  }
});

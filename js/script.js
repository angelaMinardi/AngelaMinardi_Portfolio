// script.js

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initSmoothScrolling();
    initBackToTop();
    initFormValidation();
    initChatbot();
    initTabs();
    initModals();
    initThemeToggle();
    initScrollAnimations();
    initAnalytics();
    initServiceWorker();
});

// Initialize Navigation
function initNavigation() {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Toggle Navigation Menu with ARIA attributes
    navToggle.addEventListener("click", () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !expanded);
        navLinks.classList.toggle("active");
        navToggle.classList.toggle("active");
    });

    // Highlight active nav link based on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('

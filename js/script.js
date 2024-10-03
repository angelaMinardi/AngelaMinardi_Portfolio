// script.js

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initSmoothScrolling();
    initBackToTop();
    initSmartContract();
    initChatbot();
    initTabs();
    initModals();
    initThemeToggle();
    initScrollAnimations();
    initLoadingSpinner();
    registerServiceWorker();
    // initAnalytics(); // Uncomment if implementing custom analytics
});

/**
 * Initialize Navigation Functionality
 */
function initNavigation() {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Toggle Navigation Menu with ARIA attributes
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !expanded);
            navLinks.classList.toggle("active");
            navToggle.classList.toggle("active");
        });
    }

    // Highlight active nav link based on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinksElems = document.querySelectorAll('.nav-links li a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // Adjust offset as needed
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinksElems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Initialize Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 60, // Adjust for fixed navbar height
                    behavior: "smooth",
                });
                // Close mobile menu after clicking
                const navLinks = document.querySelector(".nav-links");
                const navToggle = document.querySelector(".nav-toggle");
                if (navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                    navToggle.classList.remove("active");
                    navToggle.setAttribute('aria-expanded', false);
                }
            }
        });
    });
}

/**
 * Initialize Back to Top Button Functionality
 */
function initBackToTop() {
    const backToTopButton = document.querySelector(".back-to-top");

    if (backToTopButton) {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add("show-back-to-top");
            } else {
                backToTopButton.classList.remove("show-back-to-top");
            }
        });

        backToTopButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }
}

/**
 * Initialize Smart Contract Demonstration
 */
function initSmartContract() {
    const executeButton = document.getElementById("execute-contract");
    if (executeButton) {
        const contractOutput = document.getElementById("contract-output");

        executeButton.addEventListener("click", () => {
            // Simulate smart contract execution
            // Replace this with actual interaction if backend is available
            contractOutput.innerHTML = "<p>Executing Smart Contract...</p>";

            setTimeout(() => {
                // Example output
                contractOutput.innerHTML = `
                    <p><strong>Transaction Successful!</strong></p>
                    <p>Block ID: Block 2</p>
                    <p>Transaction ID: TX1001</p>
                    <p>Amount: 7 BTC</p>
                `;
            }, 2000);
        });
    }
}

/**
 * Initialize Chatbot Functionality
 */
function initChatbot() {
    const chatInput = document.getElementById("chat-input");
    const chatSubmit = document.getElementById("chat-submit");
    const chatLog = document.getElementById("chat-log");

    if (chatSubmit && chatInput && chatLog) {
        chatSubmit.addEventListener("click", sendMessage);
        chatInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                sendMessage();
            }
        });

        function sendMessage() {
            const message = chatInput.value.trim();
            if (message === "") return;

            appendMessage("user", message);
            chatInput.value = "";

            // Simulate chatbot response (Replace with actual API call)
            setTimeout(() => {
                const response = generateResponse(message);
                appendMessage("bot", response);
            }, 1000);
        }

        function appendMessage(sender, message) {
            const msgDiv = document.createElement("div");
            msgDiv.classList.add("message", `${sender}-message`);
            msgDiv.textContent = message;
            chatLog.appendChild(msgDiv);
            chatLog.scrollTop = chatLog.scrollHeight;
        }

        function generateResponse(input) {
            // Placeholder response logic
            const responses = {
                hello: "Hello! How can I assist you today?",
                help: "Sure, I can help you with your projects. What would you like to know?",
                // Add more predefined responses
            };

            return (
                responses[input.toLowerCase()] ||
                "I'm sorry, I didn't understand that. Could you please rephrase?"
            );
        }
    }
}

/**
 * Initialize Tabbed Content Functionality
 */
function initTabs() {
    window.openTab = function (evt, tabName) {
        const tabcontents = document.querySelectorAll(".tabcontent");
        tabcontents.forEach((tc) => (tc.style.display = "none"));

        const tablinks = document.querySelectorAll(".tablink");
        tablinks.forEach((tl) => tl.classList.remove("active"));

        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.style.display = "block";
        }

        evt.currentTarget.classList.add("active");
    };

    // Optionally, activate the first tab by default
    const firstTab = document.querySelector(".tablink");
    if (firstTab) {
        firstTab.click();
    }
}

/**
 * Initialize Modal Functionality
 */
function initModals() {
    window.openModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "block";
            modal.setAttribute('aria-hidden', 'false');
        }
    };

    window.closeModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
            modal.setAttribute('aria-hidden', 'true');
        }
    };

    // Close modals when clicking outside the content
    window.addEventListener('click', function (event) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal) => {
            if (event.target == modal) {
                modal.style.display = "none";
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Close modals with ESC key
    window.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            const modals = document.querySelectorAll(".modal");
            modals.forEach((modal) => {
                modal.style.display = "none";
                modal.setAttribute('aria-hidden', 'true');
            });
        }
    });
}

/**
 * Initialize Theme Toggle Functionality (Dark Mode)
 */
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeSwitch.checked = true;
        }
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
            if (themeSwitch.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

/**
 * Initialize Scroll Animations (AOS)
 */
function initScrollAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }
}

/**
 * Initialize Loading Spinner Functionality
 */
function initLoadingSpinner() {
    window.addEventListener('load', () => {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.style.display = 'none';
        }
    });
}

/**
 * Register Service Worker for PWA
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
}

/**
 * Initialize Analytics (Optional)
 * Uncomment and configure if implementing custom analytics
 */
/*
function initAnalytics() {
    // Example: Initialize Google Analytics
    if (typeof gtag === 'function') {
        gtag('config', 'UA-XXXXXXXXX-X');
    }
}
*/

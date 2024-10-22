// js/script.js

// Mobile Navigation Toggle and Smooth Scrolling
document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const backToTopButton = document.querySelector(".back-to-top");

    // Toggle Navigation Menu
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

    // Back to Top Button Functionality
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            // Show after scrolling 300px
            backToTopButton.classList.add("show-back-to-top");
        } else {
            backToTopButton.classList.remove("show-back-to-top");
        }
    });

    // Chatbot Functionality (if applicable)
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
                help: "Sure, I can help you with data analysis projects. What would you like to know?",
                // Add more predefined responses
            };

            return (
                responses[input.toLowerCase()] ||
                "I'm sorry, I didn't understand that. Could you please rephrase?"
            );
        }
    }

    // Tabbed Content Functionality
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

    // Modal Functionality
    window.openModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "block";
        }
    };

    window.closeModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
        }
    };

    // Close modals when clicking outside the content
    window.onclick = function (event) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach((modal) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    };

    // Initialize Charts if on Project2 Page
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "project2.html") {
        // Interactive Visualization: Average Reading Scores Over Time
        const avgScoresCtx = document.getElementById('avgScoresChart').getContext('2d');
        const avgScoresChart = new Chart(avgScoresCtx, {
            type: 'line',
            data: {
                labels: ['1971', '1975', '1980', '1984', '1988', '1990', '1992', '1994', '1996', '1999', '2004', '2008', '2012', '2020', '2023'],
                datasets: [{
                    label: '2023 Data (Age 13)',
                    data: [220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360],
                    backgroundColor: 'rgba(232, 73, 29, 0.2)',
                    borderColor: 'rgba(232, 73, 29, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1
                }, {
                    label: '2022 Data (Age 9)',
                    data: [210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                    title: {
                        display: true,
                        text: 'Trends in Average Reading Scores Over Time'
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Average Reading Score'
                        },
                        beginAtZero: true
                    }
                }
            }
        });

        // Demographic Group Analysis: Reading Scores Over Time
        const demographicCtx = document.getElementById('demographicChart').getContext('2d');
        const demographicChart = new Chart(demographicCtx, {
            type: 'bar',
            data: {
                labels: ['1971', '1975', '1980', '1984', '1988', '1990', '1992', '1994', '1996', '1999', '2004', '2008', '2012', '2020', '2022', '2023'],
                datasets: [
                    {
                        label: 'White',
                        data: [220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295],
                        backgroundColor: 'rgba(231, 76, 60, 0.6)'
                    },
                    {
                        label: 'Black',
                        data: [210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285],
                        backgroundColor: 'rgba(52, 73, 94, 0.6)'
                    },
                    {
                        label: 'Hispanic',
                        data: [215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290],
                        backgroundColor: 'rgba(46, 204, 113, 0.6)'
                    },
                    {
                        label: 'Male',
                        data: [225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300],
                        backgroundColor: 'rgba(52, 152, 219, 0.6)'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                    title: {
                        display: true,
                        text: 'Reading Scores by Demographic Group Over Time'
                    },
                    legend: {
                        position: 'top',
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Reading Score'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    }
});

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

  // Smart Contract Demonstration
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

  // Chatbot Functionality
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
        help: "Sure, I can help you with 5G network simulations. What would you like to know?",
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
});

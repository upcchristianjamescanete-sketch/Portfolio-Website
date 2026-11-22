
"use strict";

// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after clicking a navigation link
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
    });
});

// =========================
// DARK / LIGHT MODE
// =========================

const themeToggle = document.getElementById("themeToggle");

function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

let savedTheme = null;

try {
    savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
    // The website still works if browser storage is unavailable.
}

applyTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");

    applyTheme(isDark);

    try {
        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );
    } catch (error) {
        // Theme switching still works for the current page.
    }
});

// =========================
// ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
    let currentSection = "home";
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
            currentSection = section.id;
        }
    });

    navItems.forEach((link) => {
        const isActive =
            link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

// =========================
// BACK TO TOP BUTTON
// =========================

const backToTop = document.getElementById("backToTop");

function updateBackToTop() {
    backToTop.classList.toggle("visible", window.scrollY > 350);
}

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// =========================
// SCROLL EVENTS
// =========================

window.addEventListener("scroll", () => {
    updateActiveLink();
    updateBackToTop();
}, { passive: true });

// Set the correct state when the page first loads.
updateActiveLink();
updateBackToTop();

// =========================
// AUTOMATIC COPYRIGHT YEAR
// =========================

document.getElementById("year").textContent =
    new Date().getFullYear();

// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// IMPORTANT:
// Replace this address with your real email address.
const portfolioEmail = "upcchristianjamescanete@gmail.com";

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    if (
        !portfolioEmail ||
        portfolioEmail === "upcchristianjamescanete@gmail.com"
    ) {
        formStatus.textContent =
            "Please configure your real email address in script.js before using this form.";

        return;
    }

    const formData = new FormData(contactForm);

    const name = formData.get("Christian James Canete").trim();
    const email = formData.get("upcchristianjamescanete@gmail.com").trim();
    const message = formData.get("message").trim();

    const emailSubject = encodeURIComponent(subject);

    const emailBody = encodeURIComponent(
        `Name: ${Christian James Canete}\n` +
        `Email: ${upcchristianjamescanete@gmail.com}\n\n` +
        `Message:\n${message}`
    );

    const mailtoLink =
        `mailto:${portfolioEmail}` +
        `?subject=${emailSubject}` +
        `&body=${emailBody}`;

    formStatus.textContent =
        "Opening your email application. Send the message there to complete delivery.";

    window.location.href = mailtoLink;
});

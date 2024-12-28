// JavaScript code for menu functionality
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

// Toggle Menu Visibility
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
});

// Smooth Scroll to Sections
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({ behavior: "smooth" });

        // Close Menu After Click
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

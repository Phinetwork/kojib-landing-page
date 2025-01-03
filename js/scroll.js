// JavaScript code for menu functionality
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const menuLinks = document.querySelectorAll("#nav-links li a"); // Select all menu links
const navbar = document.getElementById("navbar");

// Toggle Menu Visibility and Hamburger Transformation
hamburger.addEventListener("click", () => {
    const isActive = navLinks.classList.contains("active");

    if (isActive) {
        navLinks.classList.remove("active"); // Hide menu
        hamburger.classList.remove("open"); // Reset hamburger to default state
    } else {
        navLinks.classList.add("active"); // Show menu
        hamburger.classList.add("open"); // Transform hamburger to 'X'
    }
});

// Close Menu When a Menu Link is Clicked
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active"); // Hide menu
        hamburger.classList.remove("open"); // Reset hamburger to default state
    });
});

// Add Scroll Listener for Navbar and Logo Effects
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled"); // Apply 'scrolled' class when scrolling past 50px
    } else {
        navbar.classList.remove("scrolled"); // Remove 'scrolled' class when at the top
    }
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

const scrollMenu = document.getElementById("scroll-menu");
const scrollToggle = document.getElementById("scroll-toggle");

// Toggle Dropdown Menu
scrollToggle.addEventListener("click", () => {
    scrollMenu.classList.toggle("open");
});

// Smooth Scroll for Section Links
document.querySelectorAll("#scroll-sections a").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").slice(1);
        const targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({ behavior: "smooth" });

        // Close the menu after click
        scrollMenu.classList.remove("open");
    });
});



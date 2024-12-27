// Basic scroll detection
document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Check if the section is in the viewport
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            section.style.opacity = 1; // Make visible
            section.style.transform = "translateY(0)";
        } else {
            section.style.opacity = 0; // Hide when out of view
            section.style.transform = "translateY(50px)";
        }
    });
});

// Initial setup for all sections (hidden by default)
document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = 0; // Start hidden
    section.style.transform = "translateY(50px)"; // Start slightly below
    section.style.transition = "opacity 0.5s ease, transform 0.5s ease"; // Smooth transitions
});

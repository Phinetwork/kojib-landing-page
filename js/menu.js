document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
  
    // Toggle the navbar visibility when the hamburger is clicked
    hamburger.addEventListener("click", () => {
      const isActive = navLinks.classList.toggle("active");
      hamburger.classList.toggle("open", isActive); // Toggle the hamburger "open" state
      hamburger.setAttribute("aria-expanded", isActive);
    });
  
    // Close the menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("open"); // Reset hamburger "open" state
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  });
  
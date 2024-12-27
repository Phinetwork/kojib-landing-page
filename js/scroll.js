// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Ensure proper setup for all sections
function setupScrollAnimations() {
  // Select all sections
  const sections = document.querySelectorAll("section");

  sections.forEach((section, index) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 }, // Initial state: hidden and slightly below
      {
        opacity: 1,
        y: 0, // Animate to: fully visible and in position
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // When the top of the section is 80% down the viewport
          end: "top 20%", // Optionally trigger end behavior
          toggleActions: "play none none none", // Play animation on scroll
          markers: false, // Set to true if debugging is needed
          onEnter: () => console.log(`Entered section ${index + 1}`), // Log for debugging
        },
      }
    );
  });
}

// Ensure ScrollTrigger refreshes properly on page load
window.addEventListener("load", () => {
  setupScrollAnimations();
  ScrollTrigger.refresh(); // Ensure ScrollTrigger recognizes all dimensions
});

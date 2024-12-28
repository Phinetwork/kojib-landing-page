// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize smooth scrolling animations
function setupScrollAnimations() {
  // Select all sections
  const sections = document.querySelectorAll("section");

  // Iterate through each section and add animation
  sections.forEach((section, index) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 }, // Initial state: hidden and slightly below
      {
        opacity: 1,
        y: 0, // Final state: fully visible and in position
        duration: 1.2, // Animation duration
        ease: "power2.out", // Smooth easing effect
        scrollTrigger: {
          trigger: section, // Section to trigger animation
          start: "top 85%", // Start animation when section is 85% in view
          end: "top 10%", // Optionally define when the animation ends
          toggleActions: "play none none none", // Play animation on entering
          markers: false, // Set to true if debugging is needed
          onEnter: () => console.log(`Entering section ${index + 1}`), // Debug: Log when a section is entered
        },
      }
    );
  });
}

// Adjust ScrollTrigger on resize for responsiveness
function handleResize() {
  ScrollTrigger.refresh(); // Refresh dimensions and layout
  console.log("ScrollTrigger refreshed on resize."); // Debugging log
}

// Initialize the script
window.addEventListener("load", () => {
  setupScrollAnimations(); // Set up animations
  ScrollTrigger.refresh(); // Ensure proper layout recognition
});

// Recalculate ScrollTrigger points on window resize
window.addEventListener("resize", handleResize);

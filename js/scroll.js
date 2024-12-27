// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Function to setup ScrollTrigger animations
function setupScrollAnimations() {
  // Select all <section> elements
  const sections = document.querySelectorAll("section");

  sections.forEach((section, index) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 }, // Initial state: hidden and slightly below
      {
        opacity: 1,
        y: 0, // Final state: fully visible and in position
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%", // Adjust when the animation starts
          end: "top 20%", // Optional: Trigger end behavior
          toggleActions: "play none none none", // Trigger animation on scroll
          markers: false, // Set to true to debug animation points
          onEnter: () => console.log(`Entered section ${index + 1}`), // Debugging: Log on section enter
          onLeaveBack: () => console.log(`Left section ${index + 1} (going up)`), // Debugging: Log on section leave upward
        },
      }
    );
  });
}

// Re-initialize ScrollTrigger on window resize (handles layout changes on mobile)
function handleResize() {
  ScrollTrigger.refresh(); // Refresh ScrollTrigger dimensions
  console.log("ScrollTrigger refreshed on resize."); // Debugging
}

// Event listeners for load and resize
window.addEventListener("load", () => {
  setupScrollAnimations();
  ScrollTrigger.refresh(); // Refresh dimensions after all assets are loaded
});

window.addEventListener("resize", handleResize); // Recalculate trigger points on resize

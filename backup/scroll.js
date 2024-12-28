// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Detect if the user is on mobile
const isMobile = window.matchMedia("(max-width: 768px)").matches;

// Function to setup ScrollTrigger animations
function setupScrollAnimations() {
  // Select all <section> elements
  const sections = document.querySelectorAll("section");

  sections.forEach((section, index) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 100 }, // Start fully hidden and below
      {
        opacity: 1,
        y: 0, // End fully visible and in position
        duration: isMobile ? 0.6 : 1, // Shorter duration on mobile
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: isMobile ? "top 90%" : "top 85%", // Adjust start dynamically
          end: "top 10%", // Optional: Animation trigger end
          toggleActions: "play none none none", // Trigger animation on scroll
          markers: false, // Set to true to debug animation points
          onEnter: () => console.log(`Entered section ${index + 1}`), // Log section enter
          onEnterBack: () => console.log(`Re-entered section ${index + 1} from above`), // Log re-enter
          scrub: isMobile ? 0.3 : false, // Smooth scroll animation on mobile
        },
      }
    );
  });
}

// Function to handle resize events and refresh ScrollTrigger
function handleResize() {
  ScrollTrigger.refresh(); // Refresh ScrollTrigger dimensions
  console.log("ScrollTrigger refreshed on resize."); // Debugging log
}

// Event listener for page load
window.addEventListener("load", () => {
  setupScrollAnimations();
  ScrollTrigger.refresh(); // Refresh after all assets are loaded
  console.log("Scroll animations initialized."); // Debugging log
});

// Event listener for window resize
window.addEventListener("resize", handleResize);

// Debugging helper to check section visibility
function checkSectionVisibility() {
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    const bounding = section.getBoundingClientRect();
    console.log(
      `Section ${index + 1}: Top ${bounding.top}, Bottom ${bounding.bottom}`
    );
  });
}
window.addEventListener("scroll", checkSectionVisibility); // Log visibility on scroll

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Basic Scroll Animation Setup
gsap.utils.toArray("section").forEach((section, index) => {
  gsap.fromTo(
    section,
    { opacity: 0, y: 50 }, // Start hidden and slightly below
    {
      opacity: 1,
      y: 0, // End fully visible and in position
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%", // Trigger when section reaches 85% viewport height
        toggleActions: "play none none none", // Trigger once
        markers: true, // Enable for debugging
        onEnter: () => console.log(`Entered section ${index + 1}`),
      },
    }
  );
});

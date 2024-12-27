// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Divine Ratio Constants
const PHI = 1.618; // Approximation of the golden ratio
const BASE_DURATION = 1.5; // Base animation duration for divine timing

// Snap to Sections with ScrollTrigger
ScrollTrigger.defaults({
  markers: false, // Enable for debugging if needed
  snap: {
    snapTo: "center", // Snap to the center of each section
    duration: BASE_DURATION / PHI, // Divine ratio-based snapping duration
    ease: "power1.inOut", // Smooth ease for snapping
  },
});

// Intro Section Animations
gsap.fromTo(
  ".headline",
  { opacity: 0, y: 50 }, // Start: Hidden and moved down
  {
    opacity: 1,
    y: 0,
    duration: BASE_DURATION, // Base duration
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".headline",
      start: "top 80%", // Animates when 80% of the viewport is in view
    },
  }
);

gsap.fromTo(
  ".headline span",
  { opacity: 0, y: 20 }, // Individual words animating with divine stagger
  {
    opacity: 1,
    y: 0,
    duration: BASE_DURATION / PHI, // Divine ratio timing
    stagger: BASE_DURATION / PHI / 5, // Staggering for fluidity
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".headline",
      start: "top 80%",
    },
  }
);

gsap.fromTo(
  ".subtext",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: BASE_DURATION * PHI, // Longer duration for smooth divine timing
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".subtext",
      start: "top 75%",
    },
  }
);

// Smooth Pulsing Animation for Scroll Prompt
gsap.to(".scroll-prompt", {
  opacity: 1,
  y: 10,
  repeat: -1,
  yoyo: true,
  duration: BASE_DURATION / PHI, // Divine ratio timing
  ease: "power1.inOut", // Seamless harmonic ease
});

// Story Section Animations
gsap.fromTo(
  "#story .story-title",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: BASE_DURATION * PHI, // Divine duration for elegance
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#story",
      start: "top 80%",
      end: "bottom center", // Animates through the entire section
      scrub: true, // Smooth progress-based animation
    },
  }
);

gsap.fromTo(
  "#story .story-text",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: BASE_DURATION * PHI,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#story",
      start: "top 75%",
      scrub: true,
    },
  }
);

// Dynamic Section Transitions
gsap.utils.toArray("section").forEach((section, index) => {
  const nextSection = section.nextElementSibling;

  // Entering Animation
  gsap.fromTo(
    section,
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      duration: BASE_DURATION,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    }
  );

  // Exiting Animation for the current section
  if (nextSection) {
    gsap.fromTo(
      nextSection,
      { opacity: 0, y: -100 },
      {
        opacity: 1,
        y: 0,
        duration: BASE_DURATION,
        ease: "power2.out",
        scrollTrigger: {
          trigger: nextSection,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );
  }
});

// Add Subtle Shimmer to Headline
const shimmerEffect = document.querySelector(".headline");
let shimmerAngle = 0;

setInterval(() => {
  shimmerAngle += 0.5;
  shimmerEffect.style.backgroundImage = `
    linear-gradient(${shimmerAngle}deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2))
  `;
}, BASE_DURATION * PHI * 200); // Divine timing for shimmer updates

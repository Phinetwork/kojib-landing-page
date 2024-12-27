// scroll.js

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Divine Ratio Constants
const PHI = 1.618; // Approximation of the golden ratio
const BASE_DURATION = 1.5; // Base animation duration

// Animate the tagline on scroll (divine proportion timing)
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
      start: "top 80%", // Start animation when 80% of the viewport is reached
    },
  }
);

// Animate each word in the headline with staggered timing
gsap.fromTo(
  ".headline span",
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: BASE_DURATION / PHI, // Divine ratio timing
    stagger: BASE_DURATION / PHI / 5, // Stagger each word for fluidity
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".headline",
      start: "top 80%",
    },
  }
);

// Animate the supporting text with divine timing
gsap.fromTo(
  ".subtext",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: BASE_DURATION * PHI, // Longer duration for smoothness
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".subtext",
      start: "top 75%",
    },
  }
);

// Smooth scrolling animation for the scroll prompt
gsap.to(".scroll-prompt", {
  opacity: 1,
  y: 10,
  repeat: -1,
  yoyoEase: "power1.inOut", // Smooth harmonic ease
  duration: BASE_DURATION / PHI, // Divine ratio timing for subtle rhythmic motion
  repeatDelay: 0.2, // Small pause to create a seamless loop
});

// Add shimmer effect to the headline
const shimmerEffect = document.querySelector(".headline");
let shimmerAngle = 0;

setInterval(() => {
  shimmerAngle += 0.5; // Gradual angle change for smooth shimmer
  shimmerEffect.style.backgroundImage = `
    linear-gradient(${shimmerAngle}deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2))
  `;
}, BASE_DURATION * PHI * 200); // Divine ratio timing for subtle shimmer updates

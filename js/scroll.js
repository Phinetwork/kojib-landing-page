// Register GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Utility function to refresh ScrollTrigger on resize
function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}
window.addEventListener("resize", refreshScrollTrigger);

// Utility function to set start points dynamically
const getStartPoint = () => (window.innerWidth <= 768 ? "top 90%" : "top 80%");

// Animate Each Section
gsap.utils.toArray("section").forEach((section) => {
  gsap.fromTo(
    section,
    { opacity: 0, y: 50 }, // Start hidden and slightly below
    {
      opacity: 1,
      y: 0,
      duration: 1, // Animation duration
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: getStartPoint(), // Dynamic start based on viewport
        toggleActions: "play none none none", // Play animation on scroll down
        markers: false, // Debugging markers (set true if debugging)
      },
    }
  );
});

// Intro Section Animation
gsap.fromTo(
  ".headline",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".headline",
      start: "top 85%",
      toggleActions: "play none none none",
    },
  }
);

gsap.fromTo(
  ".subtext",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".subtext",
      start: "top 85%",
      toggleActions: "play none none none",
    },
  }
);

// Story Section Animations
gsap.fromTo(
  "#story .story-title",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#story",
      start: getStartPoint(),
      toggleActions: "play none none none",
    },
  }
);

gsap.fromTo(
  "#story .story-text",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#story",
      start: getStartPoint(),
      toggleActions: "play none none none",
    },
  }
);

// Showcase Section Animations
gsap.fromTo(
  "#showcase .showcase-title",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#showcase",
      start: getStartPoint(),
      toggleActions: "play none none none",
    },
  }
);

gsap.fromTo(
  "#showcase .showcase-text",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#showcase",
      start: getStartPoint(),
      toggleActions: "play none none none",
    },
  }
);

gsap.fromTo(
  ".feature-card",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.3, // Stagger animations for feature cards
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#showcase",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  }
);

// Contact Section Animations
gsap.fromTo(
  "#contact .contact-title",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#contact",
      start: getStartPoint(),
      toggleActions: "play none none none",
    },
  }
);

gsap.fromTo(
  "#contact .contact-text",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#contact",
      start: getStartPoint(),
      toggleActions: "play none none none",
    },
  }
);

gsap.fromTo(
  ".contact-button",
  { opacity: 0, scale: 0.8 },
  {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  }
);

// Footer Section Animations
gsap.fromTo(
  "footer",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
      toggleActions: "play none none none",
    },
  }
);

// Refresh ScrollTrigger to ensure all animations are calculated properly
ScrollTrigger.refresh();

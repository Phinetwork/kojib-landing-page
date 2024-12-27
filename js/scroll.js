// scroll.js

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Smoothly fade in the headline on scroll
gsap.fromTo(
  ".headline",
  { opacity: 0, y: 50 }, // Start: Hidden and moved down
  {
    opacity: 1,
    y: 0,
    duration: 1.5, // Smooth fade duration
    ease: "power2.out", // Smooth easing
    scrollTrigger: {
      trigger: ".headline",
      start: "top 80%", // Starts when the headline is near the viewport
    },
  }
);

// Animate each word in the headline
gsap.fromTo(
  ".headline span",
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8, // Duration for individual words
    stagger: 0.2, // Stagger each word
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".headline",
      start: "top 80%", // Animation begins as the headline scrolls into view
    },
  }
);

// Fade in the subtext
gsap.fromTo(
  ".subtext",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".subtext",
      start: "top 75%", // Animates as the subtext scrolls into view
    },
  }
);

// Subtle animation for the scroll prompt
gsap.to(".scroll-prompt", {
  y: 10, // Move up slightly
  opacity: 1,
  repeat: -1, // Repeat animation indefinitely
  yoyo: true, // Animate back and forth
  ease: "power1.inOut", // Smooth easing
  duration: 1.5, // Animation duration
});

// Animate story section on scroll
gsap.fromTo(
  "#story .story-title",
  { opacity: 0, y: 50 }, // Start: Hidden and moved down
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#story",
      start: "top 80%", // Starts when the story section enters the viewport
    },
  }
);

gsap.fromTo(
  "#story .story-text",
  { opacity: 0, y: 50 }, // Start: Hidden and moved down
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#story",
      start: "top 75%", // Animates as the story text scrolls into view
    },
  }
);

// Transition between sections
gsap.utils.toArray("section").forEach((section) => {
  gsap.fromTo(
    section,
    { opacity: 0, y: 100 }, // Start: Hidden and moved down
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%", // Animation starts when section is near the viewport
        end: "bottom top", // Ends as section leaves the viewport
        scrub: true, // Smooth transition linked to scroll
      },
    }
  );
});

// Handle smooth scrolling behavior
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

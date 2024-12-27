// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Intro Section Animation
gsap.fromTo(
  ".headline",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#intro",
      start: "top 50%",
      end: "top 10%",
      scrub: true, // Smoothly animates during scroll
    },
  }
);

gsap.fromTo(
  ".subtext",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#intro",
      start: "top 40%",
      end: "top 10%",
      scrub: true,
    },
  }
);

// Story Section Animation
gsap.fromTo(
  "#story .story-title",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#story",
      start: "top 75%", // Animation starts as the section enters the viewport
      end: "top 30%",
      scrub: true,
    },
  }
);

gsap.fromTo(
  "#story .story-text",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#story",
      start: "top 70%",
      end: "top 20%",
      scrub: true,
    },
  }
);

// Showcase Section Animation
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
      start: "top 80%",
      end: "top 30%",
      scrub: true,
    },
  }
);

gsap.fromTo(
  "#showcase .feature-card",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.3, // Stagger animations for each feature card
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#showcase",
      start: "top 70%",
      end: "top 20%",
      scrub: true,
    },
  }
);

// Contact Section Animation
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
      start: "top 80%",
      end: "top 40%",
      scrub: true,
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
      start: "top 75%",
      end: "top 30%",
      scrub: true,
    },
  }
);

gsap.fromTo(
  "#contact .contact-button",
  { opacity: 0, scale: 0.8 },
  {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 70%",
      end: "top 30%",
      scrub: true,
    },
  }
);

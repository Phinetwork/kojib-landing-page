// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Smooth Scroll Animations for Each Section
gsap.utils.toArray("section").forEach((section, index) => {
    gsap.fromTo(
        section,
        { opacity: 0, y: 50 }, // Start hidden and slightly below
        {
            opacity: 1,
            y: 0,
            duration: 1, // Smooth animation duration
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%", // Start animation when section is 80% in view
                toggleActions: "play none none none", // Trigger animation only on scroll down
            },
        }
    );
});

// Intro Section Specific Animations
gsap.fromTo(
    ".headline",
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".headline",
            start: "top 90%",
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
            trigger: ".subtext",
            start: "top 90%",
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
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#story",
            start: "top 80%",
        },
    }
);

gsap.fromTo(
    "#story .story-text",
    { opacity: 0, y: 50 },
    {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#story",
            start: "top 75%",
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
            start: "top 80%",
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
            start: "top 75%",
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
        stagger: 0.3, // Stagger each feature card
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#showcase",
            start: "top 70%",
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
            start: "top 80%",
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
            start: "top 70%",
        },
    }
);

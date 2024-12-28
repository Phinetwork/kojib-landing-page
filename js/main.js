// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Detect Mobile Devices
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

// Initialize ScrollTrigger Animations
function initScrollAnimations() {
    const sections = document.querySelectorAll("section");

    sections.forEach((section, index) => {
        gsap.fromTo(
            section,
            { opacity: 0, y: 50 }, // Initial state: hidden and slightly below
            {
                opacity: 1,
                y: 0, // Final state: fully visible and in position
                duration: isMobile ? 0.8 : 1.2, // Shorter duration for mobile
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: isMobile ? "top 90%" : "top 85%", // Adjust start point for mobile
                    end: "top 20%", // Optional: Trigger end behavior
                    toggleActions: "play none none none", // Trigger animation on scroll
                    markers: false, // Enable for debugging
                    onEnter: () => console.log(`Entered section ${index + 1}`), // Debugging
                    onLeaveBack: () => console.log(`Left section ${index + 1} (going up)`), // Debugging
                },
            }
        );
    });
}

// Fix ScrollTrigger on Resize
function handleResize() {
    ScrollTrigger.refresh();
    console.log("ScrollTrigger refreshed on resize.");
}

// Ensure Proper Initialization on Load
window.addEventListener("load", () => {
    initScrollAnimations();
    ScrollTrigger.refresh(); // Force recalculation of dimensions
});

// Recalculate on Resize
window.addEventListener("resize", handleResize);

// Mobile-Specific Fixes
function mobileSpecificFixes() {
    if (isMobile) {
        console.log("Applying mobile-specific fixes...");
        // Example: Add padding or tweak layout for mobile
        document.body.style.overscrollBehavior = "none"; // Prevent overscroll bounce
        const canvas = document.querySelector("#particleCanvas");
        if (canvas) {
            canvas.style.pointerEvents = "none"; // Ensure canvas doesn't block interactions
        }
    }
}

// Apply Mobile Fixes
mobileSpecificFixes();

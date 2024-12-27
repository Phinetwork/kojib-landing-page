// main.js

// Initialize Three.js
const canvas = document.getElementById("particleCanvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, // Field of View
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1, // Near Clipping Plane
  1000 // Far Clipping Plane
);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0); // Transparent background

// Add Particles
const particleCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 500; // Random positions in space
}

particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({
  color: 0x00ff99, // Electric green
  size: 2,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
});

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Animate Particles
camera.position.z = 400;
function animate() {
  requestAnimationFrame(animate);

  // Rotation for a dynamic effect
  particleSystem.rotation.x += 0.001;
  particleSystem.rotation.y += 0.001;

  renderer.render(scene, camera);
}
animate();

// Resize Event Listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Interaction with Mouse
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

  // Smooth transition of camera position based on mouse
  gsap.to(camera.position, {
    x: mouseX * 50,
    y: mouseY * 50,
    duration: 0.5,
    ease: "power2.out",
  });
});

// Smooth Scroll Event for Sections
document.querySelectorAll("section").forEach((section) => {
  section.addEventListener("wheel", (event) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? 1 : -1;
    const nextSection =
      delta > 0 ? section.nextElementSibling : section.previousElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Logo Animation on Hover
const logo = document.querySelector(".kojib-logo");
logo.addEventListener("mouseenter", () => {
  gsap.to(logo, {
    scale: 1.1, // Slightly enlarges on hover
    duration: 0.3,
    ease: "power2.out",
  });
});

logo.addEventListener("mouseleave", () => {
  gsap.to(logo, {
    scale: 1, // Resets to normal size
    duration: 0.3,
    ease: "power2.out",
  });
});

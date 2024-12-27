// particles.js

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("particleCanvas") });
renderer.setPixelRatio(window.devicePixelRatio); // Ensure high-quality rendering
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a particle geometry and material
const particleCount = 2000; // Increased for denser effect
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleSpeeds = new Float32Array(particleCount); // Track individual speeds for motion
const particleDepths = new Float32Array(particleCount); // Track depth modulation

for (let i = 0; i < particleCount; i++) {
  // Set positions based on golden ratio spirals
  const phi = (1 + Math.sqrt(5)) / 2; // Phi ratio
  const theta = 2 * Math.PI * i / phi; // Spiral angle
  const radius = Math.sqrt(i) / Math.sqrt(particleCount) * 20; // Spread in a circular area

  const x = radius * Math.cos(theta);
  const y = radius * Math.sin(theta);
  const z = (Math.random() - 0.5) * 10; // Add more depth randomness

  particlePositions[i * 3] = x;
  particlePositions[i * 3 + 1] = y;
  particlePositions[i * 3 + 2] = z;

  // Randomize initial speeds and depth modulation
  particleSpeeds[i] = Math.random() * 0.02 + 0.005; // Slightly faster motion
  particleDepths[i] = Math.random() * 0.05; // Depth oscillation range
}

particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

const particleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.15, // Slightly larger for better visibility
  transparent: true,
  opacity: 0.9,
  map: new THREE.TextureLoader().load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/sprites/spark1.png"),
  blending: THREE.AdditiveBlending, // Create glowing effect
});

// Combine geometry and material into a particle system
const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSystem);

// Set the camera position
camera.position.z = 20;

// Interactivity Variables
let mouse = new THREE.Vector2(0, 0);
const rippleEffect = { radius: 0, strength: 0 };

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update particle positions for dynamic sacred geometry motion
  const positions = particleGeometry.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    const index = i * 3;
    const speed = particleSpeeds[i];
    const depthOscillation = Math.sin(Date.now() * 0.0001 + i) * particleDepths[i]; // Dynamic depth modulation

    positions[index] += Math.sin(positions[index + 1] * 0.3) * speed; // Sway effect
    positions[index + 1] += Math.cos(positions[index] * 0.3) * speed; // Vertical sway
    positions[index + 2] += depthOscillation; // Depth oscillation

    // Water ripple effect on interaction
    const dx = positions[index] - mouse.x * 15;
    const dy = positions[index + 1] - mouse.y * 15;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < rippleEffect.radius) {
      const force = rippleEffect.strength / distance;
      positions[index] += dx * force * 0.1; // Adjust based on interaction pressure
      positions[index + 1] += dy * force * 0.1;
      positions[index + 2] += force * 0.2; // Depth ripple
    }
  }

  rippleEffect.radius *= 0.9; // Gradually reduce ripple size
  rippleEffect.strength *= 0.8; // Gradually reduce ripple intensity

  particleGeometry.attributes.position.needsUpdate = true; // Inform Three.js of changes

  renderer.render(scene, camera);
}
animate();

// Event Listeners for Interactivity
function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Trigger ripple effect with intensity based on press duration
  rippleEffect.radius = 5; // Ripple spread size
  rippleEffect.strength = 2; // Ripple intensity
}

// Handle window resizing
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Attach Event Listeners
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mousedown", onMouseDown);

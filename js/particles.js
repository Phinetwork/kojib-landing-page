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
const particleCount = 2000;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleSpeeds = new Float32Array(particleCount);
const particleDepths = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const theta = (2 * Math.PI * i) / phi;
  const radius = (Math.sqrt(i) / Math.sqrt(particleCount)) * 20;

  const x = radius * Math.cos(theta);
  const y = radius * Math.sin(theta);
  const z = (Math.random() - 0.5) * 10;

  particlePositions[i * 3] = x;
  particlePositions[i * 3 + 1] = y;
  particlePositions[i * 3 + 2] = z;

  particleSpeeds[i] = Math.random() * 0.02 + 0.005;
  particleDepths[i] = Math.random() * 0.05;
}

particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

const particleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.15,
  transparent: true,
  opacity: 0.9,
  map: new THREE.TextureLoader().load("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/sprites/spark1.png"),
  blending: THREE.AdditiveBlending,
});

const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSystem);

camera.position.z = 20;

// Interactivity Variables
let mouse = new THREE.Vector2(0, 0);
const rippleEffect = { radius: 0, strength: 0 };

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  const positions = particleGeometry.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    const index = i * 3;
    const speed = particleSpeeds[i];
    const depthOscillation = Math.sin(Date.now() * 0.0001 + i) * particleDepths[i];

    positions[index] += Math.sin(positions[index + 1] * 0.3) * speed;
    positions[index + 1] += Math.cos(positions[index] * 0.3) * speed;
    positions[index + 2] += depthOscillation;

    const dx = positions[index] - mouse.x * 15;
    const dy = positions[index + 1] - mouse.y * 15;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < rippleEffect.radius) {
      const force = rippleEffect.strength / distance;
      positions[index] += dx * force * 0.1;
      positions[index + 1] += dy * force * 0.1;
      positions[index + 2] += force * 0.2;
    }
  }

  rippleEffect.radius *= 0.9;
  rippleEffect.strength *= 0.8;

  particleGeometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}
animate();

// Event Listeners for Interactivity
function updateMousePosition(clientX, clientY) {
  mouse.x = (clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(clientY / window.innerHeight) * 2 + 1;
}

function createRippleEffect() {
  rippleEffect.radius = 5;
  rippleEffect.strength = 2;
}

function onMouseMove(event) {
  updateMousePosition(event.clientX, event.clientY);
}

function onMouseDown(event) {
  updateMousePosition(event.clientX, event.clientY);
  createRippleEffect();
}

function onTouchMove(event) {
  const touch = event.touches[0];
  updateMousePosition(touch.clientX, touch.clientY);
}

function onTouchStart(event) {
  const touch = event.touches[0];
  updateMousePosition(touch.clientX, touch.clientY);
  createRippleEffect();
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
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("touchstart", onTouchStart);

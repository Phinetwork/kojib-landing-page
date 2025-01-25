// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("particleCanvas"),
  alpha: true, // Allow transparent background
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Create particle geometry and material
const particleCount = 3000;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleVelocities = new Float32Array(particleCount);
const particleColors = new Float32Array(particleCount * 3);

const goldenRatio = (1 + Math.sqrt(5)) / 2;
for (let i = 0; i < particleCount; i++) {
  const theta = (2 * Math.PI * i) / goldenRatio;
  const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
  const radius = Math.pow(i / particleCount, 0.5) * 50;

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  particlePositions[i * 3] = x;
  particlePositions[i * 3 + 1] = y;
  particlePositions[i * 3 + 2] = z;

  particleVelocities[i] = Math.random() * 0.02 + 0.01;

  particleColors[i * 3] = Math.random();
  particleColors[i * 3 + 1] = Math.random();
  particleColors[i * 3 + 2] = Math.random();
}

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(particlePositions, 3)
);
particleGeometry.setAttribute(
  "color",
  new THREE.BufferAttribute(particleColors, 3)
);

const particleMaterial = new THREE.PointsMaterial({
  size: 0.2,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
});

const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSystem);

camera.position.z = 80;

// Create a dynamic light effect
const pointLight = new THREE.PointLight(0xffffff, 1.2, 150);
pointLight.position.set(0, 0, 80);
scene.add(pointLight);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  const positions = particleGeometry.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    const index = i * 3;
    const velocity = particleVelocities[i];

    // Add a slight "jitter" effect to the particles
    positions[index] += (Math.random() - 0.5) * velocity;
    positions[index + 1] += (Math.random() - 0.5) * velocity;
    positions[index + 2] += (Math.random() - 0.5) * velocity;

    // Pull particles back if they exceed a certain distance
    const distance = Math.sqrt(
      positions[index] ** 2 +
        positions[index + 1] ** 2 +
        positions[index + 2] ** 2
    );

    if (distance > 50) {
      positions[index] *= 0.9;
      positions[index + 1] *= 0.9;
      positions[index + 2] *= 0.9;
    }
  }

  particleGeometry.attributes.position.needsUpdate = true;

  // Update the light position for a dynamic swirling effect
  pointLight.position.x = Math.sin(Date.now() * 0.001) * 40;
  pointLight.position.y = Math.cos(Date.now() * 0.001) * 40;

  renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

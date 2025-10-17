
// Three.js Scene Setup
let scene, camera, renderer;
let geometry, material, torusKnot;
let particleGeometry, particles;
let mouseX = 0;
let mouseY = 0;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(5);

    // Lights

    const pointLight = new THREE.PointLight(0x8b5cf6, 2);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Main geometric shape (Torus Knot)
    geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    material = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        shininess: 100,
        wireframe: true
    });
    torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Particles
    particleGeometry = new THREE.BufferGeometry();
    const particleCount = 10000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Event Listeners
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    animate();
}

function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate torus knot
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;

    // Rotate particles
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.001;

    // Move scene based on mouse position
    scene.rotation.y += (mouseX - scene.rotation.y) * 0.05;
    scene.rotation.x += (mouseY - scene.rotation.x) * 0.05;

    renderer.render(scene, camera);
}

init();

// Mouse following particles
const particlesCanvas = document.getElementById("particlesCanvas");
const ctx = particlesCanvas.getContext("2d");
particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

const particlesArray = [];
const colors = ["#ffffff", "#9572e5", "#4a12ce", "#0x8b5cf6", "#c5adff", "#d3d3d3"];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = 1.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.05;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].alpha <= 0) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animateParticles);
}

window.addEventListener("mousemove", (event) => {
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle(event.x, event.y));
  }
});

window.addEventListener("resize", () => {
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;
});

animateParticles();

// gsap animation for project cards
// const tl = gsap.timeline({
//   repeat: -1,
//   yoyo: true
// });
// tl.to(".project-card", {
//   x: 50,
//   y: 50,
//   duration: 1,
//   ease: "bounce"
// })
//   .to(".project-card", {
//     x: -50,
//     y: 50,
//     duration: 1,
//     ease: "bounce"
//   })
//   .to(".project-card", {
//     x: 50,
//     y: -50,
//     duration: 1,
//     ease: "bounce"
//   })
//   .to(".project-card", {
//     x: -50,
//     y: -50,
//     duration: 1,
//     ease: "bounce"
//   });

  gsap.to(".animate", {
    y: -10,        // Moves up
    color: "#c024ff", // Changes color to 
    duration: 2, 
    repeat: -1,    // Infinite loop
    yoyo: true,    // Moves back and forth
    ease: "power1.inOut"
});
gsap.to(".uanime", {
  y: -30,        // Moves up
  color: "#c024ff", // Changes color to red
  duration: 2, 
  repeat: -1,    // Infinite loop
  yoyo: true,    // Moves back and forth
  ease: "power1.inOut"
});


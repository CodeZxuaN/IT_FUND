// Slide Navigation
let currentSlide = 1;
const totalSlides = 8; // Updated to 8 slides
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    document.getElementById(`slide${n}`).classList.add('active');
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 1;
    showSlide(currentSlide);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentSlide = currentSlide > 1 ? currentSlide - 1 : totalSlides;
    showSlide(currentSlide);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') document.getElementById('nextBtn').click();
    if (e.key === 'ArrowLeft') document.getElementById('prevBtn').click();
});

// Moving Polygons Background Animation
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Polygon class
class Polygon {
    constructor(x, y, sides, radius, color) {
        this.x = x;
        this.y = y;
        this.sides = sides;
        this.radius = radius;
        this.color = color;
        this.dx = (Math.random() - 0.5) * 0.5; // Slow random movement
        this.dy = (Math.random() - 0.5) * 0.5;
    }

    draw() {
        ctx.beginPath();
        for (let i = 0; i < this.sides; i++) {
            const angle = (i / this.sides) * Math.PI * 2;
            const x = this.x + Math.cos(angle) * this.radius;
            const y = this.y + Math.sin(angle) * this.radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off borders
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) this.dx *= -1;
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) this.dy *= -1;
    }
}

// Create polygons
const polygons = [];
for (let i = 0; i < 10; i++) {
    const sides = Math.floor(Math.random() * 5) + 3; // 3-7 sides
    const radius = Math.random() * 50 + 20;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.5)`; // Blue tones
    polygons.push(new Polygon(x, y, sides, radius, color));
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    polygons.forEach(polygon => {
        polygon.update();
        polygon.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
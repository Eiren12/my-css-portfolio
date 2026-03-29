/**
 * Particles Background Animation
 */
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');

let width, height, particles;

// Initialize canvas size
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
}

window.addEventListener('resize', resize);

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5; // Star size
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.glow = Math.random() > 0.8; // Some stars glow more
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges to create continuous infinite space
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (this.glow) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#0ea5e9'; // Cyan glow
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + 0.3})`;
        } else {
            ctx.shadowBlur = 0;
            ctx.fillStyle = `rgba(240, 244, 255, ${this.opacity})`;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.floor((width * height) / 8000); // Responsive particle amount
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    // Subtle background gradient that shifts slowly
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.0)');
    gradient.addColorStop(1, 'rgba(5, 5, 15, 0.2)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw connections between close particles for a "constellation" effect optionally?
    // Let's just do floating dust/stars for clean look
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

resize();
animateParticles();

/**
 * Navigation Bar Scroll Effect
 */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/**
 * Scroll Reveal Animation using Intersection Observer
 */
const revealElements = document.querySelectorAll('.reveal-on-scroll');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

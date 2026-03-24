// Premium Sakura (Cherry Blossom) Particle System - Slow and Smooth
class SakuraParticles {
    constructor(canvasId) {
        const container = document.getElementById(canvasId);
        if (!container) return;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        container.appendChild(this.canvas);
        
        this.particles = [];
        this.particleCount = Math.min(window.innerWidth / 30, 40); 
        
        this.mouseX = -1000;
        this.mouseY = -1000;
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        window.triggerPetalBurst = (x, y) => this.burst(x, y);
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.init();
        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height - this.height, 
                size: Math.random() * 2 + 1.5, // Smaller elegant petals
                speedY: Math.random() * 0.4 + 0.15, // Extremely slow fall
                speedX: Math.random() * 0.3 - 0.15, // Gentle drift
                angle: Math.random() * 360,
                spin: Math.random() * 0.5 - 0.25, // Extremely slow spin
                opacity: Math.random() * 0.3 + 0.1, // Very subtle opacity
                sway: Math.random() * Math.PI * 2,
                swaySpeed: Math.random() * 0.01 + 0.005 // very soft swaying
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            
            if (p.isBurst) {
                p.speedX *= 0.96;
                p.speedY += 0.15;
                if (p.speedY > 2) p.isBurst = false;
            }
            
            p.y += p.speedY;
            p.sway += p.swaySpeed;
            p.x += Math.sin(p.sway) * 0.3 + p.speedX;
            p.angle += p.spin;
            
            const dx = p.x - this.mouseX;
            const dy = p.y - this.mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const force = (120 - dist) / 120;
                p.x += (dx / dist) * force * 1.5;
                p.y += (dy / dist) * force * 1.5;
            }
            
            if (p.y > this.height + 10 && !p.isBurst) {
                p.y = -10;
                p.x = Math.random() * this.width;
            }
            if (p.x > this.width + 10) p.x = -10;
            if (p.x < -10) p.x = this.width + 10;
            
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.angle * Math.PI / 180);
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.quadraticCurveTo(p.size, p.size, p.size * 2, 0);
            this.ctx.quadraticCurveTo(p.size, -p.size, 0, 0);
            
            // Soft sakura pink color mapping
            this.ctx.fillStyle = `rgba(255, 183, 197, ${p.opacity})`; 
            this.ctx.fill();
            this.ctx.restore();
        }
        
        requestAnimationFrame(() => this.animate());
    }

    burst(x, y) {
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: x,
                y: y,
                size: Math.random() * 2 + 1.5,
                speedY: (Math.random() - 0.5) * 15 - 5,
                speedX: (Math.random() - 0.5) * 15,
                angle: Math.random() * 360,
                spin: Math.random() * 5 - 2.5,
                opacity: Math.random() * 0.5 + 0.5,
                sway: 0,
                swaySpeed: 0,
                isBurst: true
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SakuraParticles('particles-js');
});

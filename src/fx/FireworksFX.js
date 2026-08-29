/**
 * ==========================================================================
 * Birthday Storybook Town — 2D Canvas Fireworks FX Engine
 * ==========================================================================
 * High performance, pastel-themed celebratory fireworks bursts.
 */

export class FireworksFX {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.rockets = [];
    this.isActive = false;

    this.colors = [
      '#FFAAA5', '#FF8B94', '#FFEAA7', '#FDCB6E',
      '#A8E6CF', '#55EFC4', '#CDBBFF', '#A29BFE', '#FF7675'
    ];

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    this.isActive = true;
    this.autoLaunchInterval = setInterval(() => {
      if (this.isActive) {
        this.launchRocket(
          window.innerWidth * 0.2 + Math.random() * (window.innerWidth * 0.6),
          window.innerHeight * 0.2 + Math.random() * (window.innerHeight * 0.35)
        );
      }
    }, 450);
  }

  stop() {
    this.isActive = false;
    clearInterval(this.autoLaunchInterval);
  }

  launchRocket(targetX, targetY) {
    const startX = targetX + (Math.random() - 0.5) * 100;
    const startY = window.innerHeight;
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];

    this.rockets.push({
      x: startX,
      y: startY,
      targetX,
      targetY,
      speed: 12 + Math.random() * 4,
      angle: Math.atan2(targetY - startY, targetX - startX),
      color
    });
  }

  explode(x, y, color) {
    const count = 65 + Math.floor(Math.random() * 35);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 7;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1.0,
        decay: 0.012 + Math.random() * 0.018,
        color: Math.random() > 0.3 ? color : '#FFFDF9',
        size: 3 + Math.random() * 3
      });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update & Draw Rockets
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.x += Math.cos(r.angle) * r.speed;
      r.y += Math.sin(r.angle) * r.speed;

      this.ctx.fillStyle = '#FFFDF9';
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
      this.ctx.fill();

      // Check arrival
      const dist = Math.hypot(r.targetX - r.x, r.targetY - r.y);
      if (dist < r.speed || r.y <= r.targetY) {
        this.explode(r.targetX, r.targetY, r.color);
        this.rockets.splice(i, 1);
      }
    }

    // Update & Draw Explosion Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // gravity
      p.vx *= 0.97;
      p.vy *= 0.97;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}

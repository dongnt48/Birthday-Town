/**
 * ==========================================================================
 * Birthday Storybook Town — Sky Lantern Festival (Lễ Hội Thả Đèn Lồng Tự Động)
 * ==========================================================================
 * Seamless, automatic and magical sky lantern finale with glowing paper lanterns,
 * celebratory fireworks bursts, starry night sky, and instant tap interactions.
 */

export class LanternFestival {
  constructor(fireworksFX, audioManager) {
    this.fireworks = fireworksFX;
    this.audio = audioManager;

    this.overlayEl = document.getElementById('lantern-festival-overlay');
    this.canvas = document.getElementById('lantern-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;

    this.backBtn = document.getElementById('btn-back-from-lanterns');
    this.exploreBtn = document.getElementById('btn-explore-after-lanterns');

    this.lanterns = [];
    this.stars = [];
    this.timers = [];
    this.isActive = false;
    this.animationId = null;

    this.init();
  }

  init() {
    if (!this.overlayEl || !this.canvas) return;

    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Tap anywhere on canvas to release a new lantern + gentle firework (silent / no loud fanfare)
    this.canvas.addEventListener('pointerdown', (e) => {
      if (!this.isActive) return;
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Random gentle blessing on tap
      const tapWishes = ['⭐ Ước nguyện thành hiện thực', '✨ Luôn rạng rỡ', '🍀 May mắn', '💖 Hạnh phúc', '🌸 Bình an', ''];
      const randomWish = tapWishes[Math.floor(Math.random() * tapWishes.length)];

      this.spawnLantern(clickX, clickY, randomWish, randomWish !== '');
      if (this.fireworks) {
        this.fireworks.launchRocket(clickX, Math.max(100, clickY - 120));
      }
    });

    // Back / Explore Buttons
    if (this.backBtn) {
      this.backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hide();
      });
    }

    if (this.exploreBtn) {
      this.exploreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hide();
      });
    }

    this.initStars();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initStars();
  }

  initStars() {
    this.stars = [];
    const count = Math.floor((window.innerWidth * window.innerHeight) / 3000);
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight * 0.8),
        radius: 0.6 + Math.random() * 1.8,
        alpha: 0.2 + Math.random() * 0.8,
        twinkleSpeed: 0.02 + Math.random() * 0.04
      });
    }
  }

  show() {
    this.isActive = true;
    this.overlayEl.classList.remove('hidden');

    // Launch continuous celebratory fireworks
    if (this.fireworks) {
      this.fireworks.start();
    }

    // Populate ambient flock of lanterns
    this.lanterns = [];
    this.clearTimers();

    for (let i = 0; i < 24; i++) {
      this.spawnAmbientLantern(true);
    }

    // Well-spaced Hero Lanterns (Each lantern gets its own time and column)
    const blessings = [
      { text: '👑 Happy Birthday Vyan! 🎂✨', delay: 500, xPct: 0.50 },
      { text: '🌸 Tuổi mới ngập tràn niềm vui & hạnh phúc!', delay: 4000, xPct: 0.28 },
      { text: '🍀 Luôn bình an, may mắn & vạn sự như ý!', delay: 7500, xPct: 0.72 },
      { text: '✨ Luôn xinh đẹp, rạng rỡ và tự tin tỏa sáng!', delay: 11000, xPct: 0.42 },
      { text: '🧋 Ăn ngon ngủ ngon, mỗi ngày đều yêu đời!', delay: 14500, xPct: 0.65 },
      { text: '💖 Luôn được yêu thương và nâng niu thật nhiều!', delay: 18000, xPct: 0.24 },
      { text: '🌟 Mọi điều ước của Vyan đều sẽ thành hiện thực!', delay: 21500, xPct: 0.76 }
    ];

    const cy = window.innerHeight * 0.9;

    blessings.forEach(b => {
      const timer = setTimeout(() => {
        if (this.isActive) {
          const posX = Math.max(100, Math.min(window.innerWidth - 100, window.innerWidth * b.xPct));
          this.spawnLantern(posX, cy, b.text, true);
        }
      }, b.delay);
      this.timers.push(timer);
    });

    this.loop();
  }

  clearTimers() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
  }

  hide() {
    this.isActive = false;
    this.clearTimers();
    cancelAnimationFrame(this.animationId);
    this.overlayEl.classList.add('hidden');
  }

  spawnAmbientLantern(initialScatter = false) {
    const size = 18 + Math.random() * 26;
    const x = Math.random() * window.innerWidth;
    const y = initialScatter
      ? Math.random() * window.innerHeight
      : window.innerHeight + Math.random() * 80;

    this.lanterns.push({
      x,
      y,
      size,
      speedY: 0.5 + Math.random() * 0.8,
      swayAngle: Math.random() * Math.PI * 2,
      swaySpeed: 0.015 + Math.random() * 0.02,
      swayAmount: 0.6 + Math.random() * 1.2,
      glowPulse: Math.random() * Math.PI * 2,
      alpha: 0.75 + Math.random() * 0.25,
      text: '',
      isHero: false
    });
  }

  spawnLantern(x, y, text = '', isHero = false) {
    const size = isHero ? 36 : (22 + Math.random() * 18);
    this.lanterns.push({
      x,
      y,
      size,
      speedY: isHero ? 0.7 : (0.6 + Math.random() * 0.8),
      swayAngle: Math.random() * Math.PI * 2,
      swaySpeed: 0.02,
      swayAmount: 1.0,
      glowPulse: 0,
      alpha: 1.0,
      text,
      isHero
    });
  }

  loop() {
    if (!this.isActive) return;
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.loop());
  }

  update() {
    // Continuously spawn ambient lanterns from bottom
    if (this.lanterns.length < 28 && Math.random() < 0.05) {
      this.spawnAmbientLantern(false);
    }

    for (let i = this.lanterns.length - 1; i >= 0; i--) {
      const l = this.lanterns[i];
      l.y -= l.speedY;
      l.swayAngle += l.swaySpeed;
      l.x += Math.sin(l.swayAngle) * l.swayAmount;
      l.glowPulse += 0.05;

      // Recycle when reaching top
      if (l.y < -120) {
        if (!l.isHero) {
          l.y = window.innerHeight + 50;
          l.x = Math.random() * window.innerWidth;
        } else {
          this.lanterns.splice(i, 1);
        }
      }
    }
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. Twilight / Starry Night Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#0B0D1B');
    bgGrad.addColorStop(0.5, '#161A36');
    bgGrad.addColorStop(0.85, '#2D1F38');
    bgGrad.addColorStop(1, '#4A283B');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Crescent Moon
    ctx.save();
    ctx.translate(w * 0.85, h * 0.16);
    ctx.fillStyle = 'rgba(255, 246, 200, 0.9)';
    ctx.shadowColor = 'rgba(255, 234, 167, 0.7)';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0E1124'; // Moon cutout
    ctx.beginPath();
    ctx.arc(10, -6, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Twinkling Stars
    for (const s of this.stars) {
      s.alpha += Math.sin(s.twinkleSpeed * 50) * 0.01;
      const a = Math.max(0.15, Math.min(0.9, s.alpha));
      ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Draw All Lanterns
    for (const l of this.lanterns) {
      this.drawLantern(ctx, l);
    }
  }

  drawLantern(ctx, l) {
    const { x, y, size, alpha, glowPulse, isHero, text } = l;
    const w = size;
    const h = size * 1.35;
    const flicker = 1 + Math.sin(glowPulse) * 0.08;

    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = alpha;

    // Glowing Radial Halo
    const glowRadius = h * (isHero ? 2.5 : 1.8) * flicker;
    const glowGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, glowRadius);
    glowGrad.addColorStop(0, 'rgba(255, 220, 140, 0.7)');
    glowGrad.addColorStop(0.3, 'rgba(255, 140, 70, 0.35)');
    glowGrad.addColorStop(0.7, 'rgba(255, 100, 70, 0.1)');
    glowGrad.addColorStop(1, 'rgba(255, 80, 50, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // Paper Lantern Body (Warm Golden Amber)
    ctx.shadowColor = 'rgba(255, 180, 60, 0.9)';
    ctx.shadowBlur = isHero ? 25 : 15;

    const lanternGrad = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
    lanternGrad.addColorStop(0, '#FFEAA7');
    lanternGrad.addColorStop(0.4, '#FFAAA5');
    lanternGrad.addColorStop(0.85, '#FF7675');
    lanternGrad.addColorStop(1, '#D63031');

    ctx.fillStyle = lanternGrad;
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2, w, h, [w * 0.35, w * 0.35, w * 0.2, w * 0.2]);
    ctx.fill();

    // Bamboo Frame Ribs
    ctx.strokeStyle = 'rgba(120, 50, 30, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.45, h * 0.46, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Candle Flame inside
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(0, h * 0.2, w * 0.15, h * 0.18 * flicker, 0, 0, Math.PI * 2);
    ctx.fill();

    // Red wish tassel / ribbon underneath
    ctx.fillStyle = '#E74C3C';
    ctx.beginPath();
    ctx.moveTo(-w * 0.15, h / 2);
    ctx.lineTo(w * 0.15, h / 2);
    ctx.lineTo(0, h / 2 + h * 0.4);
    ctx.closePath();
    ctx.fill();

    // If hero lantern with wish text, render floating callout tag
    if (isHero && text) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.font = 'bold 14px "Nunito", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const textWidth = ctx.measureText(text).width;
      const tagW = textWidth + 28;
      const tagH = 32;
      const tagY = -h / 2 - 28;

      // Clean die-cut paper tag with warm gold border
      ctx.fillStyle = '#FFFDF9';
      ctx.strokeStyle = '#FDCB6E';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.roundRect(-tagW / 2, tagY - tagH / 2, tagW, tagH, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#8A4B38';
      ctx.fillText(text, 0, tagY + 1);
    }

    ctx.restore();
  }
}

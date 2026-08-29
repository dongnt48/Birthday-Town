/**
 * ==========================================================================
 * Birthday Storybook Town — Ending Ceremony & Secret Message Modal
 * ==========================================================================
 * Handles Cake stage wish hold mechanic, candle blow out, celebration burst,
 * and emotional Secret Message letter.
 */
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayData.js';
import { LanternFestival } from './LanternFestival.js';

export class EndingCeremony {
  constructor(fireworksFX, audioManager) {
    this.fireworks = fireworksFX;
    this.audio = audioManager;
    this.lanternFestival = new LanternFestival(fireworksFX, audioManager);

    this.overlayEl = document.getElementById('ending-overlay');
    this.wishStepEl = document.getElementById('wish-step');
    this.celebrationStepEl = document.getElementById('celebration-step');
    this.holdBtn = document.getElementById('btn-hold-wish');
    this.ringFill = document.getElementById('hold-ring-fill');
    this.candleFlame = document.getElementById('candle-flame');

    this.nameEl = document.getElementById('recipient-celebration-name');
    this.openLanternBtn = document.getElementById('btn-open-lantern-festival');
    this.exploreBtn = document.getElementById('btn-explore-freely');

    this.holdDuration = 1200; // 1.2 seconds hold
    this.holdStartTime = 0;
    this.holdTimer = null;
    this.isHolding = false;
    this.isCompleted = false;

    this.init();
  }

  init() {
    if (!this.overlayEl) return;

    if (this.nameEl) {
      this.nameEl.textContent = `${birthdayConfig.recipientName || 'Bạn'} ✨`;
    }

    // Direct Click/Tap handler (instant & foolproof)
    this.holdBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!this.isCompleted) {
        this.triggerQuickBlow();
      }
    });

    // Hold Button Listeners (Mouse & Touch)
    this.holdBtn.addEventListener('pointerdown', (e) => {
      if (this.isCompleted) return;
      this.startHold();
    });

    window.addEventListener('pointerup', () => {
      if (this.isHolding && !this.isCompleted) {
        this.cancelHold();
      }
    });

    window.addEventListener('pointercancel', () => {
      if (this.isHolding && !this.isCompleted) {
        this.cancelHold();
      }
    });

    // Open Sky Lantern Festival Button
    if (this.openLanternBtn) {
      this.openLanternBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.overlayEl.classList.add('hidden');
        if (this.lanternFestival) {
          this.lanternFestival.show();
        }
      });
    }

    // Continue Exploring Button
    if (this.exploreBtn) {
      this.exploreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.overlayEl.classList.add('hidden');
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.lanternFestival && this.lanternFestival.isActive) {
          this.lanternFestival.hide();
        }
      }
    });
  }

  show() {
    this.isCompleted = false;
    this.isHolding = false;
    if (this.candleFlame) {
      this.candleFlame.style.display = 'block';
      this.candleFlame.style.opacity = '1';
      this.candleFlame.style.transform = 'translateX(-50%) scale(1)';
    }
    if (this.ringFill) {
      this.ringFill.style.strokeDashoffset = 440;
    }
    this.wishStepEl.classList.remove('hidden');
    this.celebrationStepEl.classList.add('hidden');
    this.overlayEl.classList.remove('hidden');
  }

  triggerQuickBlow() {
    this.isHolding = false;
    cancelAnimationFrame(this.holdTimer);
    if (this.ringFill) {
      this.ringFill.style.transition = 'stroke-dashoffset 0.25s ease-out';
      this.ringFill.style.strokeDashoffset = 0;
    }
    setTimeout(() => {
      this.completeHold();
    }, 250);
  }

  startHold() {
    this.isHolding = true;
    this.holdStartTime = performance.now();
    this.holdBtn.classList.add('holding');
    if (this.ringFill) {
      this.ringFill.style.transition = 'stroke-dashoffset 0.05s linear';
    }

    this.updateHoldProgress();
  }

  updateHoldProgress() {
    if (!this.isHolding || this.isCompleted) return;

    const elapsed = performance.now() - this.holdStartTime;
    const progress = Math.min(1, elapsed / this.holdDuration);

    const offset = 440 * (1 - progress);
    if (this.ringFill) {
      this.ringFill.style.strokeDashoffset = offset;
    }

    if (progress >= 1) {
      this.completeHold();
    } else {
      this.holdTimer = requestAnimationFrame(() => this.updateHoldProgress());
    }
  }

  cancelHold() {
    if (!this.isHolding) return;
    this.isHolding = false;
    cancelAnimationFrame(this.holdTimer);
    this.holdBtn.classList.remove('holding');
    if (this.ringFill) {
      this.ringFill.style.strokeDashoffset = 440;
    }
  }

  completeHold() {
    if (this.isCompleted) return;
    this.isCompleted = true;
    this.isHolding = false;
    cancelAnimationFrame(this.holdTimer);
    this.holdBtn.classList.remove('holding');

    if (this.audio) {
      this.audio.playCandleBlow();
    }

    // Extinguish candle flame
    if (this.candleFlame) {
      this.candleFlame.style.transform = 'translateX(-50%) scale(0)';
      this.candleFlame.style.transition = 'transform 0.35s ease-out, opacity 0.35s';
      this.candleFlame.style.opacity = '0';
      setTimeout(() => {
        this.candleFlame.style.display = 'none';
      }, 350);
    }

    // Transition directly to Grand Sky Lantern Festival
    setTimeout(() => {
      this.wishStepEl.classList.add('hidden');
      this.overlayEl.classList.add('hidden');

      if (this.lanternFestival) {
        this.lanternFestival.show();
      }

      this.fireGrandConfetti();
    }, 450);
  }

  fireGrandConfetti() {
    const end = Date.now() + 4 * 1000;
    const colors = ['#FFAAA5', '#FF8B94', '#FFEAA7', '#A8E6CF', '#CDBBFF', '#FF7675'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  isOpen() {
    return (!this.overlayEl.classList.contains('hidden') || (this.lanternFestival && this.lanternFestival.isActive));
  }
}

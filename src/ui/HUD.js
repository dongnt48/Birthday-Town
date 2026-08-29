/**
 * ==========================================================================
 * Birthday Storybook Town — HUD (Heads-Up Display)
 * ==========================================================================
 * Manages Star counter, Objective Quest Hint, and Sound / Home buttons.
 */

export class HUD {
  constructor(options = {}) {
    this.starCountEl = document.getElementById('star-count');
    this.compassTextEl = document.getElementById('compass-text');
    this.soundBtn = document.getElementById('btn-sound');
    this.restartBtn = document.getElementById('btn-restart');

    this.onSoundToggle = options.onSoundToggle || (() => {});
    this.onRestart = options.onRestart || (() => {});
    this.onCakeGoalClick = options.onCakeGoalClick || (() => {});

    this.totalStars = 5;
    this.collectedStars = 0;
    this.isMuted = false;
    this.cakeGoalActive = false;

    this.init();
  }

  init() {
    this.updateStars(0);

    if (this.soundBtn) {
      this.soundBtn.addEventListener('click', () => {
        this.isMuted = !this.isMuted;
        this.soundBtn.innerHTML = `<span class="sound-icon">${this.isMuted ? '🔇' : '🔊'}</span>`;
        this.soundBtn.classList.toggle('muted', this.isMuted);
        this.onSoundToggle(this.isMuted);
      });
    }

    if (this.restartBtn) {
      this.restartBtn.addEventListener('click', () => {
        this.onRestart();
      });
    }

    const compassBadge = document.getElementById('compass-hint');
    if (compassBadge) {
      compassBadge.addEventListener('click', () => {
        if (this.cakeGoalActive) {
          this.onCakeGoalClick();
        }
      });
    }
  }

  updateStars(count) {
    this.collectedStars = count;
    if (this.starCountEl) {
      this.starCountEl.textContent = `${this.collectedStars} / ${this.totalStars}`;
      this.starCountEl.parentElement.classList.add('star-bounce');
      setTimeout(() => {
        this.starCountEl.parentElement.classList.remove('star-bounce');
      }, 600);
    }
  }

  setHint(text) {
    if (this.compassTextEl) {
      this.compassTextEl.textContent = text;
    }
  }

  setCakeGoalActive(active = true) {
    this.cakeGoalActive = active;
    const compassBadge = document.getElementById('compass-hint');
    const starBadge = document.querySelector('.star-counter-badge');

    if (active) {
      if (compassBadge) {
        compassBadge.classList.add('cake-goal-pulsing');
        this.setHint('🎂 Điểm đến: Sân Khấu Bánh Kem (Cuối đường)');
      }
      if (starBadge) {
        starBadge.classList.add('all-stars-collected');
      }
    } else {
      if (compassBadge) compassBadge.classList.remove('cake-goal-pulsing');
      if (starBadge) starBadge.classList.remove('all-stars-collected');
    }

    const prompt = document.getElementById('floating-cake-prompt');
    if (prompt) {
      prompt.remove();
    }
  }
}

/**
 * ==========================================================================
 * Birthday Storybook Town — Gift Box Unboxing Modal
 * ==========================================================================
 * Unwrapping surprises, animated gift bounce, confetti, and sweet wishes.
 */
import confetti from 'canvas-confetti';

export class GiftModal {
  constructor(options = {}) {
    this.modalEl = document.getElementById('gift-modal');
    this.titleEl = document.getElementById('gift-title');
    this.messageEl = document.getElementById('gift-message');
    this.boxAnimEl = document.getElementById('gift-box-anim');
    this.claimBtn = document.getElementById('btn-claim-gift');
    this.closeBtn = document.getElementById('btn-close-gift');

    this.onClose = options.onClose || (() => {});
    this.onClaim = options.onClaim || (() => {});
    this.currentGift = null;

    this.init();
  }

  init() {
    if (!this.modalEl) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hide();
      });
    }

    if (this.claimBtn) {
      this.claimBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.fireConfetti();
        if (this.currentGift) {
          this.onClaim(this.currentGift);
        }
        this.hide();
      });
    }

    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) {
        this.hide();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.hide();
      }
    });
  }

  show(gift) {
    if (!gift || !this.modalEl) return;
    this.currentGift = gift;

    this.titleEl.textContent = gift.title || 'Hộp Quà Bất Ngờ';
    this.messageEl.textContent = gift.message || '';
    this.boxAnimEl.innerHTML = gift.icon || '🎁';

    this.modalEl.classList.remove('hidden');
    this.fireConfetti();
  }

  fireConfetti() {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFAAA5', '#FF8B94', '#FFEAA7', '#A8E6CF', '#CDBBFF']
    });
  }

  hide() {
    if (this.modalEl) {
      this.modalEl.classList.add('hidden');
      this.onClose();
    }
  }

  isOpen() {
    return this.modalEl && !this.modalEl.classList.contains('hidden');
  }
}

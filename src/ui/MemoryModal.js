/**
 * ==========================================================================
 * Birthday Storybook Town — Polaroid Memory Modal Component
 * ==========================================================================
 * Displays personal memories, polaroid photos, and heartfelt notes.
 */

export class MemoryModal {
  constructor(options = {}) {
    this.modalEl = document.getElementById('memory-modal');
    this.titleEl = document.getElementById('memory-title');
    this.captionEl = document.getElementById('memory-caption');
    this.dateEl = document.getElementById('memory-date');
    this.imgEl = document.getElementById('memory-img');
    this.fallbackEl = document.getElementById('memory-img-fallback');
    this.closeBtn = document.getElementById('btn-close-memory');

    this.onClose = options.onClose || (() => {});
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

    // Close when clicking outside card
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

  show(memory) {
    if (!memory || !this.modalEl) return;

    this.titleEl.textContent = memory.title || 'Kỷ niệm đáng nhớ';
    this.captionEl.textContent = memory.caption || '';
    this.dateEl.textContent = memory.date || '';

    if (memory.image && memory.image.trim() !== '') {
      this.imgEl.onload = () => {
        this.imgEl.style.display = 'block';
        this.fallbackEl.style.display = 'none';
      };
      this.imgEl.onerror = () => {
        this.imgEl.style.display = 'none';
        this.fallbackEl.style.display = 'flex';
        this.fallbackEl.innerHTML = `<span class="polaroid-icon">${memory.icon || '📷'}</span>`;
      };
      this.imgEl.src = memory.image;
      this.imgEl.style.objectPosition = memory.objectPosition || 'center top';
      this.imgEl.style.display = 'block';
      this.fallbackEl.style.display = 'none';
    } else {
      this.imgEl.style.display = 'none';
      this.fallbackEl.style.display = 'flex';
      this.fallbackEl.innerHTML = `<span class="polaroid-icon">${memory.icon || '📷'}</span>`;
    }

    this.modalEl.classList.remove('hidden');
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

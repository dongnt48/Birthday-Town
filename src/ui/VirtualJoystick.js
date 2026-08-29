/**
 * ==========================================================================
 * Birthday Storybook Town — Virtual Touch Joystick
 * ==========================================================================
 * Creates a responsive floating touch joystick for mobile phones and tablets.
 */

export class VirtualJoystick {
  constructor(containerElement, onMoveCallback) {
    this.container = containerElement;
    this.onMove = onMoveCallback;

    this.active = false;
    this.touchId = null;
    this.center = { x: 0, y: 0 };
    this.maxRadius = 45;

    this.baseEl = null;
    this.stickEl = null;

    this.init();
  }

  init() {
    if (!this.container) return;

    // Create Base and Stick elements
    this.baseEl = document.createElement('div');
    this.baseEl.className = 'joystick-base';
    this.baseEl.style.display = 'none';

    this.stickEl = document.createElement('div');
    this.stickEl.className = 'joystick-stick';
    this.stickEl.style.display = 'none';

    this.container.appendChild(this.baseEl);
    this.container.appendChild(this.stickEl);

    // Touch Event Listeners
    this.container.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
    window.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    window.addEventListener('touchend', (e) => this.onTouchEnd(e), { passive: false });
    window.addEventListener('touchcancel', (e) => this.onTouchEnd(e), { passive: false });
  }

  onTouchStart(e) {
    if (this.active) return;
    e.preventDefault();

    const touch = e.changedTouches[0];
    this.touchId = touch.identifier;
    this.active = true;

    const rect = this.container.getBoundingClientRect();
    this.center = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };

    // Position Base & Stick at touch origin
    this.baseEl.style.left = `${this.center.x}px`;
    this.baseEl.style.top = `${this.center.y}px`;
    this.baseEl.style.display = 'block';

    this.stickEl.style.left = `${this.center.x}px`;
    this.stickEl.style.top = `${this.center.y}px`;
    this.stickEl.style.display = 'block';
  }

  onTouchMove(e) {
    if (!this.active) return;

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === this.touchId) {
        e.preventDefault();

        const rect = this.container.getBoundingClientRect();
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;

        const deltaX = touchX - this.center.x;
        const deltaY = touchY - this.center.y;
        const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const clampedDist = Math.min(dist, this.maxRadius);
        const angle = Math.atan2(deltaY, deltaX);

        const stickX = this.center.x + Math.cos(angle) * clampedDist;
        const stickY = this.center.y + Math.sin(angle) * clampedDist;

        this.stickEl.style.left = `${stickX}px`;
        this.stickEl.style.top = `${stickY}px`;

        // Normalize output (-1 to 1)
        const normX = clampedDist > 5 ? (Math.cos(angle) * (clampedDist / this.maxRadius)) : 0;
        const normY = clampedDist > 5 ? (Math.sin(angle) * (clampedDist / this.maxRadius)) : 0;

        if (this.onMove) {
          this.onMove(normX, normY);
        }
        break;
      }
    }
  }

  onTouchEnd(e) {
    if (!this.active) return;

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === this.touchId) {
        this.active = false;
        this.touchId = null;

        this.baseEl.style.display = 'none';
        this.stickEl.style.display = 'none';

        if (this.onMove) {
          this.onMove(0, 0);
        }
        break;
      }
    }
  }
}

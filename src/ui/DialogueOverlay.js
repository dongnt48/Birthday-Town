/**
 * ==========================================================================
 * Birthday Storybook Town — Storybook Dialogue Box Component
 * ==========================================================================
 * Handles bottom letter card dialogue display, typewriter effect,
 * character avatars, and conversation sequence queue.
 */

export class DialogueOverlay {
  constructor(onCompleteCallback) {
    this.boxEl = document.getElementById('dialogue-box');
    this.speakerEl = document.getElementById('dialogue-speaker');
    this.textEl = document.getElementById('dialogue-text');
    this.avatarEl = document.getElementById('dialogue-avatar');
    this.nextBtn = document.getElementById('btn-dialogue-next');

    this.onComplete = onCompleteCallback;
    this.queue = [];
    this.currentDialogue = null;

    this.typewriterTimer = null;
    this.fullText = '';
    this.charIndex = 0;
    this.isTyping = false;

    this.init();
  }

  init() {
    if (!this.boxEl) return;

    // Advance dialogue on Next Button click
    this.nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.advance();
    });

    // Advance dialogue on Dialogue Card click
    this.boxEl.addEventListener('click', () => {
      this.advance();
    });

    // Advance dialogue on Space / Enter key
    window.addEventListener('keydown', (e) => {
      if (!this.boxEl.classList.contains('hidden') && (e.code === 'Space' || e.code === 'Enter')) {
        e.preventDefault();
        this.advance();
      }
    });
  }

  show(dialogues, onFinish) {
    if (!Array.isArray(dialogues)) {
      dialogues = [dialogues];
    }
    this.queue = [...dialogues];
    this.onFinishCallback = onFinish;

    this.boxEl.classList.remove('hidden');
    this.next();
  }

  next() {
    if (this.queue.length === 0) {
      this.hide();
      if (this.onFinishCallback) {
        this.onFinishCallback();
        this.onFinishCallback = null;
      }
      return;
    }

    this.currentDialogue = this.queue.shift();
    this.speakerEl.textContent = this.currentDialogue.speaker || 'Mimi';
    this.avatarEl.innerHTML = `<span class="avatar-emoji">${this.currentDialogue.avatar || '👧'}</span>`;

    // Typewriter effect
    this.fullText = this.currentDialogue.text || '';
    this.charIndex = 0;
    this.textEl.textContent = '';
    this.isTyping = true;

    clearInterval(this.typewriterTimer);
    this.typewriterTimer = setInterval(() => {
      if (this.charIndex < this.fullText.length) {
        this.textEl.textContent += this.fullText[this.charIndex];
        this.charIndex++;
      } else {
        this.finishTyping();
      }
    }, 25);
  }

  finishTyping() {
    clearInterval(this.typewriterTimer);
    this.textEl.textContent = this.fullText;
    this.isTyping = false;
  }

  advance() {
    if (this.isTyping) {
      // If still typing, immediately complete text
      this.finishTyping();
    } else {
      // Otherwise proceed to next dialogue in queue
      this.next();
    }
  }

  hide() {
    clearInterval(this.typewriterTimer);
    this.boxEl.classList.add('hidden');
  }

  isOpen() {
    return this.boxEl && !this.boxEl.classList.contains('hidden');
  }
}

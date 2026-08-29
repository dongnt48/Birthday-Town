import { birthdayConfig } from '../config/birthdayData.js';

export class AudioManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = false;
    this.bgmTimer = null;
    this.bgmPlaying = false;
    this.bgmStep = 0;
    this.audioElement = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master volume bus (tuned rich and loud)
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.65, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.audioElement) {
      this.audioElement.muted = muted;
    }
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.65, this.ctx ? this.ctx.currentTime : 0);
    }
    if (this.isMuted) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
  }

  /**
   * Velvety Soft Music Box Tone with acoustic warmth and lowpass filtering
   */
  playMusicBoxNote(freq, duration = 2.4, gainLevel = 0.26, delay = 0) {
    if (this.isMuted) return;
    this.initContext();

    setTimeout(() => {
      if (this.isMuted || !this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      // Filter to soften the high frequencies for a gentle, warm tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.Q.setValueAtTime(0.7, now);

      // 1. Fundamental Pure Sine
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Gentle, rounded attack
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(gainLevel, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(filter);
      osc.start(now);
      osc.stop(now + duration);

      // 2. Gentle soft harmonic (Triangle for warmth)
      const overtone = this.ctx.createOscillator();
      const overGain = this.ctx.createGain();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2.0, now);

      overGain.gain.setValueAtTime(0.0001, now);
      overGain.gain.linearRampToValueAtTime(gainLevel * 0.25, now + 0.03);
      overGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      overtone.connect(overGain);
      overGain.connect(filter);
      filter.connect(this.masterGain);

      overtone.start(now);
      overtone.stop(now + duration * 0.7);
    }, delay * 1000);
  }

  /**
   * Soft, Deep Acoustic Sub-Bass
   */
  playWarmBassNote(freq, duration = 2.6, gainLevel = 0.30, delay = 0) {
    if (this.isMuted) return;
    this.initContext();

    setTimeout(() => {
      if (this.isMuted || !this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Smooth, breathing attack
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(gainLevel, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + duration);
    }, delay * 1000);
  }

  /**
   * Star Collect: Sweet soft crystalline cascade
   */
  playStarChime() {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playMusicBoxNote(freq, 1.8, 0.32, idx * 0.09);
    });
  }

  /**
   * Gift Open: Sweet soft popping tone
   */
  playPop() {
    if (this.isMuted) return;
    this.initContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(329.63, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(659.25, this.ctx.currentTime + 0.14);

    gain.gain.setValueAtTime(0.28, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.18);
  }

  /**
   * Memory Photo Opened: Soft sparkle chime
   */
  playPhotoSnap() {
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      this.playMusicBoxNote(freq, 1.2, 0.25, idx * 0.08);
    });
  }

  /**
   * Candle Extinguish: Soft gentle whoosh
   */
  playCandleBlow() {
    if (this.isMuted) return;
    this.initContext();

    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.55);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
  }

  /**
   * Celebration Fanfare: Gentle Happy Birthday music box chime
   */
  playCelebrationFanfare() {
    const melody = [
      { f: 392.00, d: 0.32 },
      { f: 392.00, d: 0.32 },
      { f: 440.00, d: 0.48 },
      { f: 392.00, d: 0.48 },
      { f: 523.25, d: 0.48 },
      { f: 493.88, d: 0.95 },

      { f: 392.00, d: 0.32 },
      { f: 392.00, d: 0.32 },
      { f: 440.00, d: 0.48 },
      { f: 392.00, d: 0.48 },
      { f: 587.33, d: 0.48 },
      { f: 523.25, d: 1.1 }
    ];

    let delay = 0;
    melody.forEach(n => {
      this.playMusicBoxNote(n.f, n.d + 0.8, 0.36, delay);
      delay += n.d;
    });
  }

  /**
   * Soothing & Gentle Storybook Lullaby (Calm, dreamy, peaceful)
   */
  startBGM() {
    if (this.bgmPlaying || this.isMuted) return;
    this.bgmPlaying = true;

    // Check if user specified an external MP3 track in config
    if (birthdayConfig && birthdayConfig.bgmUrl) {
      if (!this.audioElement) {
        this.audioElement = new Audio(birthdayConfig.bgmUrl);
        this.audioElement.loop = true;
        this.audioElement.volume = 0.75;
      }
      this.audioElement.play().catch(() => {});
      return;
    }

    this.initContext();

    // 8-measure gentle, breathing lullaby progression (Cmaj9 - Am9 - Fmaj7 - G - Em7 - Dm7 - F/G - C)
    const lullabyMeasures = [
      // Measure 1: Cmaj9 (Peaceful morning sun)
      { bass: 130.81, notes: [392.00, 493.88, 587.33, 659.25, 783.99] }, // C3, [G4, B4, D5, E5, G5]

      // Measure 2: Am9 (Tender memories)
      { bass: 110.00, notes: [329.63, 392.00, 523.25, 659.25, 587.33] }, // A2, [E4, G4, C5, E5, D5]

      // Measure 3: Fmaj7 (Gentle summer breeze)
      { bass: 87.31,  notes: [261.63, 329.63, 440.00, 523.25, 493.88] }, // F2, [C4, E4, A4, C5, B4]

      // Measure 4: Gsus4 -> G (Soothing comfort)
      { bass: 98.00,  notes: [293.66, 392.00, 493.88, 587.33, 523.25] }, // G2, [D4, G4, B4, D5, C5]

      // Measure 5: Em7 (Soft starry sky)
      { bass: 82.41,  notes: [329.63, 392.00, 493.88, 587.33, 659.25] }, // E2, [E4, G4, B4, D5, E5]

      // Measure 6: Dm7 (Warm quiet hug)
      { bass: 73.42,  notes: [293.66, 349.23, 440.00, 523.25, 440.00] }, // D2, [D4, F4, A4, C5, A4]

      // Measure 7: Fmaj7 / G (Dreamy sunset glow)
      { bass: 98.00,  notes: [329.63, 440.00, 523.25, 659.25, 587.33] }, // G2, [E4, A4, C5, E5, D5]

      // Measure 8: Cmaj7 (Peaceful sweet sleep)
      { bass: 130.81, notes: [329.63, 392.00, 493.88, 523.25, 659.25] }  // C3, [E4, G4, B4, C5, E5]
    ];

    const playLullabyMeasure = () => {
      if (!this.bgmPlaying || this.isMuted) return;

      const m = lullabyMeasures[this.bgmStep % lullabyMeasures.length];

      // Soft breathing bass note
      this.playWarmBassNote(m.bass, 3.2, 0.28, 0);

      // Pluck gentle music box notes in a slow, soothing arpeggio
      m.notes.forEach((freq, idx) => {
        this.playMusicBoxNote(freq, 2.6, 0.24, idx * 0.48);
      });

      this.bgmStep++;
    };

    // Play immediate first measure
    playLullabyMeasure();

    // Loop interval: 2900ms per measure (slow, relaxed, and deeply soothing)
    this.bgmTimer = setInterval(() => {
      playLullabyMeasure();
    }, 2900);
  }

  stopBGM() {
    this.bgmPlaying = false;
    clearInterval(this.bgmTimer);
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }
}

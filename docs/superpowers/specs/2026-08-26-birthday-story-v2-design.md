# Birthday Story Website V2 — The Light That Found You
## Technical & Visual Design Specification

- **Date:** 2026-08-26
- **Status:** Approved
- **Target Platform:** Mobile-First Web Experience (iOS Safari, Android Chrome, Desktop)

---

## 1. Executive Summary & Vision

"The Light That Found You" is a continuous cinematic web narrative that abandons standard discrete sections, cartoonish 3D assets, and noisy loops in favor of a single uninterrupted light entity (*The Light*).

The Light begins in absolute darkness, transforms into a birthday constellation, leads through waking memories and dream fragments, gathers wishes into a candle flame, undergoes a silent blackout on candle blow, and detonates into a golden birthday fireworks climax before revealing a secret letter and calm final star.

### Core Visual Philosophy:
- **90% Darkness & Soft Atmosphere / 10% Focused Highlight**: Restraint creates impact.
- **Continuous Single Light Object**: The Light never disappears; it morphs between scenes.
- **Physical Multi-Layer Depth**: Foreground bokeh $\rightarrow$ light leaks $\rightarrow$ hero content $\rightarrow$ mid-depth dust $\rightarrow$ light trail $\rightarrow$ background fog/far stars.
- **Zero Hard-Cuts or Card UI**: Photographic depth, optical focus shifts, and organic particle transitions.

---

## 2. Architecture & Tech Stack

- **Framework:** Next.js 14+ (App Router) with React, TypeScript, Tailwind CSS
- **Motion & Timeline Director:** GSAP + GSAP ScrollTrigger + Custom Easing
- **Visual Effects & Particle Engine:** Three.js (Single Background Fixed Canvas at `z-0`)
- **Audio Architecture:** Web Audio API + HTML5 Audio (Ambient Soundscape + Procedural/Audio SFX + Background Music with seamless loop)
- **Styling & Fonts:** Tailwind CSS, Google Fonts (Playfair Display / Cormorant Garamond, Inter / Plus Jakarta Sans)

---

## 3. Detailed Scene Architecture (15 Seamless Scenes)

### Scene 00: Darkness (Initial Silence)
- **Visuals:** Dark screen, soft film grain, vignette, 2–4 drifting star dust specs.
- **Content:** Faint text: *"There is something waiting for you."*
- **Animation:** A distant tiny light flickers, disappears, and re-emerges closer with subtle rhythmic pulse.

### Scene 01: A Light Appears & User Touch
- **Visuals:** Warm glowing core with soft bloom and micro-tail.
- **Content:** Prompt: *"Touch the light"*.
- **Interaction:** User tap triggers a light pulse; the light accelerates across the viewport, leaving a luminous wake that transitions into Scene 02.

### Scene 02: The Day You Arrived (Birthday Constellation)
- **Visuals:** The light trail sweeps across the canvas, dropping starry anchor points to draw the birthdate (e.g., `24 • 08 • 2000`).
- **Content:** *"Then one day... you arrived."*
- **Transition:** A primary star within the constellation pulses, detaches, falls downward as the virtual camera tilts, landing directly onto the first memory.

### Scene 03 & 04: The First Memory & Memories Wake Up
- **Visuals:** The fallen star illuminates the edge of the first photo, bringing it into crisp focus with warm light leak.
- **Layout & Depth:** 4–6 staggered memory photos rendered in CSS 3D with dynamic parallax, blur gradients, and foreground bokeh.
- **Transition:** Light ribbons weave through each memory, triggering soft zoom and depth-of-field shifts without standard grid cards.

### Scene 05: Dream Fragments
- **Visuals:** Organic, artful cutouts (Matcha, dried flowers, coffee, books, golden hour) floating in 3D space.
- **Animation:** Fragments drift into an aesthetic composition on scroll, accompanied by brief personal captions, before dissolving back into luminous dust.

### Scene 06 & 07: The Story Path & Emotional Slowdown
- **Visuals:** Light ribbon extends into a gentle cosmic pathway with subtle milestones.
- **Slowdown:** Motion reduces, particle count drops, background deepens to prepare for emotional resonance: *"Some moments stay. Even when everything else moves on."*

### Scene 08 & 09: Wishes to Candle Flame
- **Visuals:** The light trail breaks into shimmering typographic particles forming each heartfelt birthday wish.
- **Transition:** The final wish dissolves downward, its particles coalescing into a single flickering candle flame resting upon a minimalist cake silhouette.

### Scene 10 & 11: Make a Wish, Hold to Blow & Blackout
- **Interaction:** *"Make a wish — Press and hold to blow the candle"*.
- **Holding State:** Circular energy contraction, candle flame quivers and extinguishes as screen dims.
- **Blackout:** 1 beat of pure silence and total darkness.

### Scene 12 & 13: Birthday Explosion & Golden Fireworks
- **Visuals:** A residual spark detonates into multi-stage golden fireworks, soft confetti, bloom bursts, and lens flare.
- **Typography:** Staggered cinematic reveal: **HAPPY** $\rightarrow$ **BIRTHDAY** $\rightarrow$ **[NAME]**.
- **Aftermath:** Sparkling golden embers gently drift downward in a calm ambient glow.

### Scene 14 & 15: Secret Ending & Final Farewell
- **Visuals:** Lingering particles converge into a glowing envelope: *"One more thing..."*
- **Interaction:** Tap opens the handwritten letter / personal message modal.
- **Closing:** The final light shrinks into a peaceful distant star: *"Website này rồi cũng sẽ kết thúc. Nhưng mình hy vọng những điều đẹp đẽ đang chờ bạn thì không."*

---

## 4. Single-Canvas WebGL Engine Design

```
+-------------------------------------------------------------+
|                     DOM Layer (z-10)                        |
|  - Typography & Captions                                    |
|  - 3D CSS Parallax Photos & Dream Fragments                |
|  - Interactive Touch & Press-and-Hold Triggers              |
|  - Secret Letter Modal & Audio Toggle                       |
+-------------------------------------------------------------+
|                 Three.js WebGL Canvas (z-0)                 |
|  +-------------------------------------------------------+  |
|  | - Foreground Bokeh (Layer 1)                         |  |
|  | - The Light & Continuous Ribbon Trail (Layer 2)       |  |
|  | - Constellation Line Segments (Layer 3)               |  |
|  | - Atmospheric Dust & Floating Sparkles (Layer 4)      |  |
|  | - Candle Flame Shader (Layer 5)                       |  |
|  | - Fireworks Particle Burst System (Layer 6)           |  |
|  | - Background Fog & Far Static Stars (Layer 7)         |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

### Adaptive Performance Profile:
- **Low Profile (Mobile low-end / DPR 1.0):** ~600 particles, simplified particle shaders, disabled heavy blur filters.
- **Standard Profile (iPhone / Android modern / DPR 1.5):** ~1,200 particles, full light ribbon spline interpolation, soft bloom.
- **High Profile (Desktop / Retina / DPR 2.0):** ~2,500 particles, extra volumetric dust layers and spark trails.

---

## 5. Centralized Data Architecture (`src/data/story.ts`)

All content, dates, memories, fragments, and secret messages are configured in a single decoupled configuration file:

```typescript
export interface StoryConfig {
  recipient: {
    name: string;
    nickname?: string;
    birthDate: {
      day: number;
      month: number;
      year: number;
    };
  };
  intro: {
    mysteriousPrompt: string;
    touchPrompt: string;
    arrivedMessage: string;
  };
  memories: Array<{
    id: string;
    image: string;
    dateText?: string;
    title: string;
    caption: string;
  }>;
  fragments: Array<{
    id: string;
    type: 'matcha' | 'flower' | 'coffee' | 'music' | 'sunset';
    title: string;
    caption: string;
    image: string;
  }>;
  storyPath: Array<{
    id: string;
    chapter: string;
    quote: string;
  }>;
  wishes: string[];
  candle: {
    instruction: string;
    buttonText: string;
  };
  secretEnding: {
    triggerText: string;
    letterTitle: string;
    letterContent: string[];
    closing: string;
    secretPhoto?: string;
  };
}
```

---

## 6. Verification & Quality Acceptance Criteria

1. **Continuous Narrative Flow:** No jarring flash, blank screen reset, or disconnected section changes.
2. **Mobile Touch Responsiveness:** Smooth 60 FPS scrolling on mobile browsers with native gesture feel.
3. **Press & Hold Interaction:** Reliable touch-down detection on mobile with progressive visual feedback and cancellation on early release.
4. **Cinematic Aesthetic:** High visual fidelity with restrained glow (10%), dark atmosphere (90%), and warm editorial typography.
5. **Decoupled Data:** Editing `src/data/story.ts` instantly updates all names, dates, photos, and messages.

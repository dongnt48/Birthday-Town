# Birthday Story Website V2 — The Light That Found You Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first, high-end cinematic birthday story website based on "The Light That Found You", featuring a continuous single light entity transitioning across 15 scenes with Three.js WebGL particles, GSAP ScrollTrigger, and Web Audio.

**Architecture:** A single fixed WebGL canvas running in the background manages all particle systems (The Light, dust, constellation, flame, fireworks), while a layered DOM/CSS 3D perspective system manages typography, memory photos, dream fragments, and touch interactions. GSAP ScrollTrigger coordinates continuous timeline progress and camera depth.

**Tech Stack:** Next.js 14+ (App Router), React 18+, TypeScript, Tailwind CSS, Three.js, GSAP & ScrollTrigger, Canvas Confetti, Web Audio API, Lucide React.

## Global Constraints
- Target platform: Mobile-first (iOS Safari, Android Chrome) and Desktop responsive.
- Color balance: 90% soft darkness / 10% focused luminous highlights.
- Zero hard cuts: The Light is continuous throughout all 15 scenes.
- Decoupled content: All personal details, dates, captions, and wishes stored in `src/data/story.ts`.

---

### Task 1: Project Scaffolding & Core Dependencies Setup

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `next.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`

**Interfaces:**
- Produces: Working Next.js App Router environment with Tailwind CSS and configured typography fonts.

- [ ] **Step 1: Initialize Next.js project with dependencies**
Install Next.js, React, React-DOM, TypeScript, Tailwind CSS, GSAP, Three.js, @types/three, lucide-react, canvas-confetti, @types/canvas-confetti.

- [ ] **Step 2: Configure Tailwind CSS tokens & fonts**
Configure deep space dark palette (`#050608`, `#0a0c10`, `#12151c`), celestial golds (`#f7df94`, `#e2b855`, `#fff4d2`), soft starlight glow utilities, and typography.

- [ ] **Step 3: Setup root layout & global styles**
Add Google Fonts (`Playfair Display`, `Plus Jakarta Sans`), base film grain styling, custom scrollbar styling, and touch-action constraints.

- [ ] **Step 4: Verify build & dev server starts**
Run `npm run build` or start server to confirm zero compilation errors.

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: scaffold next.js project with tailwind and core dependencies"`

---

### Task 2: Centralized Story Data & Media Asset Preparation

**Files:**
- Create: `src/data/story.ts`
- Create: `src/types/story.ts`
- Create: `public/photos/*`, `public/cutouts/*`, `public/textures/*`

**Interfaces:**
- Produces: `storyData: StoryConfig` exported from `src/data/story.ts`.

- [ ] **Step 1: Define TypeScript interfaces for story configuration**
Create `StoryConfig`, `MemoryItem`, `FragmentItem`, `StoryMilestone`, `RecipientInfo` in `src/types/story.ts`.

- [ ] **Step 2: Create default sample story data in `src/data/story.ts`**
Populate complete, poetic Vietnamese sample data for recipient ("Ngọc Hân", 24/08/2000), 5 memory milestones, 3 dream fragments (Matcha, dried bouquet, coffee & book), heartfelt wishes, candle instructions, and secret handwritten letter.

- [ ] **Step 3: Generate and place aesthetic placeholder textures & cutouts**
Prepare crisp SVG/Canvas procedural assets or high-end imagery in `public/` for memories, matcha, flowers, candle base, and film grain.

- [ ] **Step 4: Commit**
`git add src/data/ src/types/ public/ && git commit -m "feat: add centralized story configuration and media assets"`

---

### Task 3: WebGL Single-Canvas Engine (`ExperienceCanvas`)

**Files:**
- Create: `src/components/three/ExperienceCanvas.tsx`
- Create: `src/components/three/systems/FarStars.ts`
- Create: `src/components/three/systems/AtmosphericDust.ts`
- Create: `src/components/three/systems/TheLightEntity.ts`
- Create: `src/components/three/systems/ConstellationMesh.ts`
- Create: `src/components/three/systems/CandleFlameShader.ts`
- Create: `src/components/three/systems/FireworksEngine.ts`

**Interfaces:**
- Consumes: Scroll progress (`0.0` to `1.0`), active scene index, user interaction triggers.
- Produces: Fixed background canvas rendering adaptive 60 FPS visual effects synchronized to scroll.

- [ ] **Step 1: Build base WebGL Scene manager and resize/DPR controller**
Create `ExperienceCanvas.tsx` with requestAnimationFrame render loop, adaptive DPR (1.0 on mobile to 2.0 on desktop), and clean teardown.

- [ ] **Step 2: Implement FarStars and AtmosphericDust background layers**
Points geometry with smooth alpha fading, gentle drift, and parallax depth response to camera position.

- [ ] **Step 3: Implement TheLightEntity and LightRibbon curve system**
Dynamic glowing particle with Catmull-Rom spline trailing ribbon that smoothly morphs its position $(x, y, z)$ and intensity based on normalized scroll progress.

- [ ] **Step 4: Implement ConstellationMesh & CandleFlameShader**
Constellation star drawing for birthdate digits and a procedural flickering shader flame for the candle.

- [ ] **Step 5: Implement FireworksEngine particle burst**
Multi-stage particle explosion with golden hues, drag physics, gravity, and sparkling lingering embers.

- [ ] **Step 6: Verify WebGL canvas performance and resizing**
Ensure canvas resizes cleanly without memory leaks or WebGL context loss.

- [ ] **Step 7: Commit**
`git add src/components/three/ && git commit -m "feat: build single-canvas three.js particle and lighting engine"`

---

### Task 4: Web Audio & Soundscape Engine

**Files:**
- Create: `src/lib/soundEngine.ts`
- Create: `src/components/ui/AudioToggle.tsx`

**Interfaces:**
- Produces: `SoundEngine` singleton with methods: `init()`, `playBGM()`, `toggleMute()`, `playLightSpark()`, `playWhoosh()`, `playCandleBlow()`, `playFireworks()`, `playLetterOpen()`.

- [ ] **Step 1: Build Web Audio API procedural synthesizer & sound manager**
Synthesize smooth sine/saw ambient chimes, wind whooshes, spark crackles, and low rumble for explosion so audio works standalone without needing heavy external audio files.

- [ ] **Step 2: Build floating Audio Control UI**
Minimalist audio toggle button with smooth soundwave animation in the corner, honoring user interaction policy (starts on first tap).

- [ ] **Step 3: Commit**
`git add src/lib/soundEngine.ts src/components/ui/AudioToggle.tsx && git commit -m "feat: implement web audio engine and floating toggle"`

---

### Task 5: 15-Scene Story Flow & GSAP Scroll Director

**Files:**
- Create: `src/components/story/StoryDirector.tsx`
- Create: `src/components/story/scenes/Scene00Darkness.tsx`
- Create: `src/components/story/scenes/Scene01LightAppears.tsx`
- Create: `src/components/story/scenes/Scene02Constellation.tsx`
- Create: `src/components/story/scenes/Scene03Memories.tsx`
- Create: `src/components/story/scenes/Scene05Fragments.tsx`
- Create: `src/components/story/scenes/Scene06StoryPath.tsx`
- Create: `src/components/story/scenes/Scene08Wishes.tsx`
- Create: `src/components/story/scenes/Scene10Candle.tsx`
- Create: `src/components/story/scenes/Scene12Explosion.tsx`
- Create: `src/components/story/scenes/Scene14SecretEnding.tsx`

**Interfaces:**
- Consumes: `storyData` from `src/data/story.ts`, `SoundEngine`.
- Produces: Full interactive narrative scroll experience connecting all 15 scenes without interruption.

- [ ] **Step 1: Implement Scene 00 & 01 (Darkness & Touch Interaction)**
Subtle pulsing light, *"Touch the light"* prompt, tap event triggering light acceleration and sound.

- [ ] **Step 2: Implement Scene 02 (Birthday Constellation)**
Light trail draws `24 • 08 • 2000`, star detaches and falls downward into memory realm.

- [ ] **Step 3: Implement Scene 03 & 04 (Memories Wake Up)**
Multi-layered 3D photo positioning with staggered Z-indices, dynamic blur/focus transitions, and bokeh highlights.

- [ ] **Step 4: Implement Scene 05 (Dream Fragments)**
Matcha, floral bouquet, and lifestyle fragments assembling on scroll with editorial captions.

- [ ] **Step 5: Implement Scene 06 & 07 (Story Path & Emotional Slowdown)**
Luminous path with milestone quotes, gradual deceleration into peaceful darkness.

- [ ] **Step 6: Implement Scene 08 & 09 (Wishes to Candle Flame)**
Luminous typographic particle dissolve transitioning into the cake and candle.

- [ ] **Step 7: Implement Scene 10 & 11 (Make a Wish, Press & Hold, Blackout)**
Touch-down press & hold circle gauge, flame extinction, followed by 1 beat of pure silence and total blackout.

- [ ] **Step 8: Implement Scene 12 & 13 (Fireworks Explosion & Golden Embers)**
Climax explosion, staggered text reveal (**HAPPY BIRTHDAY [NAME]**), falling golden confetti embers.

- [ ] **Step 9: Implement Scene 14 & 15 (Secret Ending & Final Farewell)**
Glowing envelope trigger, opening handwritten letter modal with heartfelt signoff and peaceful fading star.

- [ ] **Step 10: Commit**
`git add src/components/story/ && git commit -m "feat: assemble 15-scene cinematic story timeline with gsap scroll director"`

---

### Task 6: Visual Polish, Mobile Optimization & Verification

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add subtle film grain overlay and optical vignette**
High-performance CSS noise overlay with `pointer-events-none` to eliminate sterile CGI look.

- [ ] **Step 2: Test on mobile viewport dimensions**
Test 375px (iPhone SE), 390px (iPhone 14/15), and 412px (Android) for touch interactions, text wrapping, and smooth framerates.

- [ ] **Step 3: Verify build and production bundle**
Run `npm run build` and ensure zero errors or SSR hydration mismatches.

- [ ] **Step 4: Commit**
`git add . && git commit -m "chore: polish mobile ergonomics, visual styling, and complete build verification"`

# Birthday Storybook Town Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai mini-game thiệp sinh nhật tương tác 2.5D "Birthday Storybook Town" phong cách sách nổi cắt giấy (Paper Pop-up Diorama) dựa trên `docs.md` và hình ảnh tham khảo.

**Architecture:** Sử dụng Three.js để dựng sân khấu sách nổi 2.5D Isometric với các đối tượng billboard cắt giấy (die-cut paper stickers) có viền trắng và bóng đổ. Kết hợp hệ thống UI HTML5/CSS3 mô phỏng thiệp viết tay, polaroid kỷ niệm, hộp quà và hiệu ứng pháo hoa Canvas + Web Audio API sinh nhật ấm áp.

**Tech Stack:** HTML5, CSS3, JavaScript (ES Modules), Vite, Three.js, Canvas Confetti, Web Audio API.

## Global Constraints
- Phong cách đồ họa: 2.5D Hand-drawn Crayon / Paper Cutout Storybook Diorama với tone màu pastel ấm áp (Kem `#FFF8F0`, Hồng đào `#FFAAA5`, Vàng nhạt `#FFEAA7`, Tím oải hương `#CDBBFF`, Xanh mint `#A8E6CF`).
- Hỗ trợ hoàn hảo cả Mobile Touch (Tap-to-move, Virtual Joystick) và Desktop (Phím WASD / Mũi tên / Click chuột).
- Dữ liệu tách biệt hoàn toàn trong `src/config/birthdayData.js` để người dùng dễ dàng cá nhân hóa tên, ảnh kỷ niệm, quà tặng và bức thư bí mật.
- Âm thanh và nhạc nền dịu nhẹ (lofi / music box / gentle chimes) với nút toggle âm thanh tiện lợi.

---

### Task 1: Project Scaffolding & Setup

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/styles/main.css`
- Create: `src/main.js`

**Interfaces:**
- Produces: Base Vite dev environment with Three.js and Canvas Confetti dependencies ready.

- [ ] **Step 1: Create package.json with dependencies**
- [ ] **Step 2: Create vite.config.js and index.html with viewport, fonts (Nunito/Patrick Hand/Comfortaa), and container elements**
- [ ] **Step 3: Create base reset & storybook main.css styles**
- [ ] **Step 4: Install dependencies using npm install**
- [ ] **Step 5: Verify dev server runs successfully**
- [ ] **Step 6: Commit changes**

---

### Task 2: Editable Birthday Data Configuration

**Files:**
- Create: `src/config/birthdayData.js`

**Interfaces:**
- Produces: `birthdayConfig` containing `recipientName`, `character`, `zones`, `memories`, `gifts`, `quotes`, and `secretMessage`.

- [ ] **Step 1: Create `src/config/birthdayData.js` with structured sample data, warm Vietnamese wishes, memory placeholders, gift surprises, and final secret letter**
- [ ] **Step 2: Export helper functions to query story state and assets**
- [ ] **Step 3: Commit changes**

---

### Task 3: Paper Cutout & Crayon Asset Generation

**Files:**
- Create: `src/utils/TextureGenerator.js`
- Create: `public/assets/sprites/...` (Hand-drawn paper cutout assets for cottage house, wooden bridge, windmill, memory tree, flower bushes, gift boxes, stone lanterns, road signs, birthday castle, giant 3-tier cake, chibi character frames, star tokens)

**Interfaces:**
- Produces: Dynamic high-res paper canvas textures and die-cut cutout sprites with subtle paper fiber and white cutout borders.

- [ ] **Step 1: Implement `TextureGenerator.js` to create crayon paper backgrounds, water stream textures, and die-cut sprite canvases**
- [ ] **Step 2: Build hand-drawn cutout sprite assets for all 6 zones and character idle/walk frames**
- [ ] **Step 3: Verify sprite rendering with white outlines and drop shadows**
- [ ] **Step 4: Commit changes**

---

### Task 4: Three.js 2.5D Diorama Engine & Pop-up Stage

**Files:**
- Create: `src/game/DioramaEngine.js`
- Create: `src/game/PopUpStage.js`

**Interfaces:**
- Consumes: `TextureGenerator.js`
- Produces: `DioramaEngine` (Three.js Scene, Orthographic/Isometric Camera at 38° tilt, Warm Directional Light with soft shadows, Render loop) and `PopUpStage` (Wooden book base, pastel green grass field, winding crayon path, curved river with animated ripple).

- [ ] **Step 1: Build `DioramaEngine.js` with resize handler, smooth camera following, and optimized render loop**
- [ ] **Step 2: Build `PopUpStage.js` with pop-up book frame, textured terrain planes, and winding river/bridge geometry**
- [ ] **Step 3: Verify 2.5D stage displays with warm ambient lighting and soft paper shadows**
- [ ] **Step 4: Commit changes**

---

### Task 5: 2.5D World Landmarks & Paper Billboard Objects

**Files:**
- Create: `src/game/WorldObjects.js`
- Create: `src/game/PaperBillboard.js`

**Interfaces:**
- Consumes: `birthdayData.js`, `TextureGenerator.js`, `DioramaEngine.js`
- Produces: 6 distinct landmark zones with interactive paper cutout billboards, rotating windmill blades, floating ribbons, and twinkling wish stars.

- [ ] **Step 1: Implement `PaperBillboard.js` to render 2D cutout textures in 3D space facing camera with gentle wind bobbing**
- [ ] **Step 2: Construct the 6 key zones in `WorldObjects.js` (Zone 1 Starting House, Zone 2 Wish Bridge, Zone 3 Memory Garden, Zone 4 Gift Plaza, Zone 5 Light Path, Zone 6 Birthday Castle & Cake)**
- [ ] **Step 3: Add subtle micro-animations (spinning windmill, floating star dust, bobbing gift boxes)**
- [ ] **Step 4: Verify all 6 zones are positioned cleanly along the path**
- [ ] **Step 5: Commit changes**

---

### Task 6: Player Controller & Multi-Input Navigation

**Files:**
- Create: `src/game/PlayerCharacter.js`
- Create: `src/game/NavigationSystem.js`
- Create: `src/ui/VirtualJoystick.js`

**Interfaces:**
- Consumes: `DioramaEngine.js`, `WorldObjects.js`
- Produces: Smooth player navigation supporting Tap-to-move with visual ripple cursor, WASD/Arrow keys on Desktop, and Virtual Touch Joystick on Mobile.

- [ ] **Step 1: Implement `PlayerCharacter.js` with chibi paper cutout sprite, walking squish/bob animation, and footstep sparkle dust**
- [ ] **Step 2: Implement `NavigationSystem.js` for raycast ground clicking and smooth target interpolation**
- [ ] **Step 3: Implement `VirtualJoystick.js` for floating mobile touch drag**
- [ ] **Step 4: Test movement and camera tracking on both touch and keyboard inputs**
- [ ] **Step 5: Commit changes**

---

### Task 7: Interaction System & Storybook Dialogue Overlay

**Files:**
- Create: `src/game/TriggerSystem.js`
- Create: `src/ui/DialogueOverlay.js`
- Create: `src/ui/HUD.js`
- Create: `src/styles/storybook-ui.css`

**Interfaces:**
- Consumes: `birthdayData.js`, `PlayerCharacter.js`
- Produces: Proximity trigger detection, greeting card dialogue box at bottom with typewriter effect, star counter HUD, audio toggle, and quest navigation hint.

- [ ] **Step 1: Implement `TriggerSystem.js` to detect when player approaches landmarks, stars, gifts, or memory spots**
- [ ] **Step 2: Implement `DialogueOverlay.js` with storybook parchment card styling, avatar portrait, typewriter animation, and Next/Close actions**
- [ ] **Step 3: Implement `HUD.js` showing collected Wish Stars, compass hint pointing to next objective, and settings**
- [ ] **Step 4: Verify dialogue triggers seamlessly upon arriving at Starting House and Wish Bridge**
- [ ] **Step 5: Commit changes**

---

### Task 8: Memory Garden Polaroid Gallery & Gift Unboxing Modals

**Files:**
- Create: `src/ui/MemoryModal.js`
- Create: `src/ui/GiftModal.js`

**Interfaces:**
- Consumes: `birthdayData.js`
- Produces: Polaroid photo popup with washi tape, warm captions, and Gift unboxing animation with pop effects and surprise cards.

- [ ] **Step 1: Build `MemoryModal.js` with polaroid photo card, gentle rotation tilt, date stamp, and emotional caption**
- [ ] **Step 2: Build `GiftModal.js` with 3D bouncing gift box, unwrap lid animation, burst of sparkles, and birthday wish badge**
- [ ] **Step 3: Verify opening and closing modal overlays without disrupting game state**
- [ ] **Step 4: Commit changes**

---

### Task 9: Grand Birthday Finale, Fireworks FX & Secret Message

**Files:**
- Create: `src/ui/EndingCeremony.js`
- Create: `src/fx/FireworksFX.js`
- Create: `src/fx/ConfettiFX.js`
- Create: `src/styles/ending.css`

**Interfaces:**
- Consumes: `birthdayData.js`
- Produces: Interactive "Press & Hold to Make a Wish" mechanic on Cake Stage, candle flame blow-out sequence, screen dimming, full-screen fireworks + confetti celebration, "HAPPY BIRTHDAY [Name]" card, and interactive "Secret Message" letter.

- [ ] **Step 1: Build `EndingCeremony.js` with 3-second hold button / touch detector and glowing progress ring**
- [ ] **Step 2: Implement `FireworksFX.js` and `ConfettiFX.js` for dazzling celebratory bursts**
- [ ] **Step 3: Build the Happy Birthday banner and expandable Secret Message envelope modal**
- [ ] **Step 4: Test complete ending sequence from wish holding to secret letter reveal**
- [ ] **Step 5: Commit changes**

---

### Task 10: Web Audio Sound Synthesizer & BGM Manager

**Files:**
- Create: `src/audio/AudioManager.js`

**Interfaces:**
- Produces: Procedural music box / lofi background chords, chimes for star collection, pops for gifts, whoosh for candle extinguish, and triumphant fanfare for fireworks.

- [ ] **Step 1: Implement `AudioManager.js` using Web Audio API (gentle sine/marimba synth melodies and pleasant SFX)**
- [ ] **Step 2: Hook audio triggers into player movement, star pickups, dialogue progression, gift opening, and ending ceremony**
- [ ] **Step 3: Connect mute/unmute control to HUD**
- [ ] **Step 4: Verify audio playback on user interaction without auto-play policy errors**
- [ ] **Step 5: Commit changes**

---

### Task 11: End-to-End Integration, Mobile Optimization & Final Polish

**Files:**
- Modify: `src/main.js`
- Modify: `src/styles/main.css`
- Modify: `src/styles/storybook-ui.css`

**Interfaces:**
- Integrates all subsystems into a cohesive, fluid, and responsive 60fps web experience.

- [ ] **Step 1: Test complete story flow from Starting House to Wish Bridge, Memory Garden, Gift Plaza, Light Path, and Cake Stage**
- [ ] **Step 2: Verify touch controls, layout, and UI scaling on mobile viewports (iPhone & Android resolutions)**
- [ ] **Step 3: Add welcome tutorial overlay ("Chạm hoặc dùng phím để di chuyển") and completion recap**
- [ ] **Step 4: Build production bundle (`npm run build`) and test preview**
- [ ] **Step 5: Commit final milestone**

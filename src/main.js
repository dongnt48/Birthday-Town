/**
 * ==========================================================================
 * Birthday Storybook Town — Main Application Entry Point
 * ==========================================================================
 * Connects 2.5D Diorama Engine, Character Navigation, Story Overlay,
 * Modals, Fireworks, and Audio Engine into a seamless interactive journey.
 */
import { DioramaEngine } from './game/DioramaEngine.js';
import { PopUpStage } from './game/PopUpStage.js';
import { WorldObjects } from './game/WorldObjects.js';
import { PlayerCharacter } from './game/PlayerCharacter.js';
import { NavigationSystem } from './game/NavigationSystem.js';
import { TriggerSystem } from './game/TriggerSystem.js';

import { DialogueOverlay } from './ui/DialogueOverlay.js';
import { MemoryModal } from './ui/MemoryModal.js';
import { GiftModal } from './ui/GiftModal.js';
import { EndingCeremony } from './ui/EndingCeremony.js';
import { HUD } from './ui/HUD.js';
import { VirtualJoystick } from './ui/VirtualJoystick.js';

import { FireworksFX } from './fx/FireworksFX.js';
import { AudioManager } from './audio/AudioManager.js';
import { birthdayConfig } from './config/birthdayData.js';

class BirthdayTownApp {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.fxCanvas = document.getElementById('fx-canvas');
    this.joystickZone = document.getElementById('joystick-zone');
    this.welcomeModal = document.getElementById('welcome-modal');
    this.startGameBtn = document.getElementById('btn-start-game');

    this.engine = null;
    this.stage = null;
    this.world = null;
    this.player = null;
    this.nav = null;
    this.triggers = null;

    this.dialogue = null;
    this.memoryModal = null;
    this.giftModal = null;
    this.endingCeremony = null;
    this.hud = null;
    this.joystick = null;

    this.fireworks = null;
    this.audio = null;

    this.starsCollected = 0;
    this.totalStars = 5;

    this.init();
  }

  init() {
    // 1. Initialize FX & Audio
    this.fireworks = new FireworksFX(this.fxCanvas);
    this.audio = new AudioManager();

    // 2. Initialize Three.js Diorama Engine & Stage
    this.engine = new DioramaEngine(this.container);
    this.stage = new PopUpStage(this.engine.scene);
    this.world = new WorldObjects(this.engine.scene);
    this.player = new PlayerCharacter(this.engine.scene);
    this.nav = new NavigationSystem(this.player, this.engine, this.stage, this.world);

    // 3. Initialize UI Components
    this.dialogue = new DialogueOverlay();
    this.memoryModal = new MemoryModal({
      onClose: () => {
        if (this.triggers) this.triggers.setCooldown(400);
      }
    });
    this.giftModal = new GiftModal({
      onClose: () => {
        if (this.triggers) this.triggers.setCooldown(400);
      },
      onClaim: (gift) => {
        if (this.triggers) this.triggers.setCooldown(400);
      }
    });
    this.endingCeremony = new EndingCeremony(this.fireworks, this.audio);

    this.hud = new HUD({
      onSoundToggle: (muted) => this.audio.setMuted(muted),
      onRestart: () => this.restartGame(),
      onCakeGoalClick: () => {
        // Auto-guide player toward cake stage
        if (this.nav) {
          this.nav.targetPosition = new THREE.Vector3(0, 0, -51);
          this.nav.isAutoMoving = true;
        }
      }
    });

    // 4. Initialize Touch Joystick for Mobile
    this.joystick = new VirtualJoystick(this.joystickZone, (x, y) => {
      this.nav.setJoystickVector(x, y);
    });

    // 5. Initialize Trigger & Interaction System
    this.triggers = new TriggerSystem(this.player, this.world, {
      isModalActive: () => this.isAnyModalOpen(),
      onZoneEntered: (zone) => this.handleZoneEntered(zone),
      onStarCollected: (idx, name) => this.handleStarCollected(idx, name),
      onMemoryTriggered: (mem) => this.handleMemoryTriggered(mem),
      onGiftTriggered: (gift) => this.handleGiftTriggered(gift),
      onQuoteTriggered: (quote) => this.handleQuoteTriggered(quote),
      onPetTriggered: (pet) => this.handlePetTriggered(pet),
      onCakeCeremonyTriggered: () => this.handleCakeCeremony()
    });

    // 6. Hook Main Game Loop
    this.engine.onAnimate((delta, elapsedTime) => {
      this.update(delta, elapsedTime);
    });

    // 7. Welcome Screen Listener
    this.setupWelcomeScreen();
  }

  setupWelcomeScreen() {
    if (this.startGameBtn) {
      this.startGameBtn.addEventListener('click', () => {
        this.welcomeModal.classList.add('hidden');
        this.audio.startBGM();

        // Trigger Opening Dialogue at Starting House
        const houseZone = birthdayConfig.zones[0];
        if (houseZone) {
          setTimeout(() => {
            this.handleZoneEntered(houseZone);
          }, 300);
        }
      });
    }
  }

  isAnyModalOpen() {
    return (
      this.dialogue.isOpen() ||
      this.memoryModal.isOpen() ||
      this.giftModal.isOpen() ||
      this.endingCeremony.isOpen() ||
      !this.welcomeModal.classList.contains('hidden')
    );
  }

  handleZoneEntered(zone) {
    if (zone.dialogues && zone.dialogues.length > 0) {
      this.dialogue.show(zone.dialogues, () => {
        if (zone.nextHint) {
          this.hud.setHint(zone.nextHint);
        }
      });
    }
  }

  handleStarCollected(starIndex, starName) {
    this.starsCollected++;
    this.hud.updateStars(this.starsCollected);
    this.audio.playStarChime();

    // Check if this completes all 5 stars
    if (this.starsCollected >= this.totalStars) {
      this.hud.setCakeGoalActive(true);
      if (this.world && this.world.activateCakeBeacon) {
        this.world.activateCakeBeacon();
      }

      this.dialogue.show({
        speaker: "Ngôi Sao Điều Ước ✨",
        text: `🎉 HOÀN THÀNH 5/5 NGÔI SAO ĐIỀU ƯỚC! ⭐\n\n🎂 Ngọn nến trên chiếc Bánh Kem Khổng Lồ ở cuối con đường (Lâu đài) đã được thắp sáng rực rỡ!\n👉 Hãy tiến thẳng về phía Sân Khấu Bánh Kem để bắt đầu Buổi Lễ Thổi Nến & Mở Hộp Quà Sinh Nhật nhé! 🕯️🎁`,
        avatar: "🎂"
      });
    } else {
      this.dialogue.show({
        speaker: "Ngôi Sao Điều Ước",
        text: `Bạn vừa nhặt được "${starName}"! (${this.starsCollected}/${this.totalStars})`,
        avatar: "⭐"
      });
    }
  }

  handleMemoryTriggered(memory) {
    this.audio.playPhotoSnap();
    this.memoryModal.show(memory);
  }

  handleGiftTriggered(gift) {
    this.audio.playPop();
    this.giftModal.show(gift);
  }

  handleQuoteTriggered(quoteText) {
    this.dialogue.show({
      speaker: "Thông Điệp Yêu Thương",
      text: quoteText,
      avatar: "🌸"
    });
  }

  handlePetTriggered(petData) {
    this.audio.playPop();
    this.dialogue.show({
      speaker: petData.name || "Người Bạn Nhỏ",
      text: petData.text,
      avatar: petData.avatar || "🌸"
    });
  }

  handleCakeCeremony() {
    if (this.starsCollected < this.totalStars) {
      this.dialogue.show({
        speaker: "Sân Khấu Bánh Kem",
        text: `Bạn mới thu thập được ${this.starsCollected}/${this.totalStars} ⭐ Ngôi Sao Điều Ước.\nHãy dạo bước khám phá các khu vườn và nhặt đủ 5 ngôi sao thì ngọn nến sinh nhật mới có thể thắp sáng nhé! ✨`,
        avatar: "🎂"
      });
      return;
    }
    if (this.hud && this.hud.hideFloatingCakePrompt) {
      this.hud.hideFloatingCakePrompt();
    }
    this.endingCeremony.show();
  }

  restartGame() {
    this.player.teleport(0, 0, 29.5);
    this.hud.setHint("Bắt đầu lại hành trình 🌸");
  }

  update(delta, elapsedTime) {
    // 1. Update Player Movement & Bounds
    if (!this.isAnyModalOpen()) {
      this.nav.update(delta);
    } else {
      this.player.isMoving = false;
      this.player.updateTexture();
    }

    this.player.update(delta, elapsedTime);

    // 2. Camera follow player
    this.engine.updateCameraFollow(this.player.position, delta);

    // 3. Stage & World animations
    this.stage.update(delta, elapsedTime);
    this.world.update(delta, elapsedTime);

    // 4. Trigger proximity checks
    this.triggers.update();
  }
}

// Launch application on DOM Content Loaded
window.addEventListener('DOMContentLoaded', () => {
  window.app = new BirthdayTownApp();
});

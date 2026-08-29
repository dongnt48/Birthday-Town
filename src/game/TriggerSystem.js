/**
 * ==========================================================================
 * Birthday Storybook Town — Proximity Trigger & Event Coordinator
 * ==========================================================================
 * Detects player proximity to landmarks, stars, gifts, and memories.
 */
import * as THREE from 'three';
import { birthdayConfig } from '../config/birthdayData.js';

export class TriggerSystem {
  constructor(player, worldObjects, options = {}) {
    this.player = player;
    this.worldObjects = worldObjects;

    this.onStarCollected = options.onStarCollected || (() => {});
    this.onMemoryTriggered = options.onMemoryTriggered || (() => {});
    this.onGiftTriggered = options.onGiftTriggered || (() => {});
    this.onZoneEntered = options.onZoneEntered || (() => {});
    this.onQuoteTriggered = options.onQuoteTriggered || (() => {});
    this.onPetTriggered = options.onPetTriggered || (() => {});
    this.onCakeCeremonyTriggered = options.onCakeCeremonyTriggered || (() => {});
    this.isModalActive = options.isModalActive || (() => false);

    this.triggeredZones = new Set();
    this.insideObjects = new Set();
    this.activeTriggerCooldown = false;
  }

  update() {
    const playerPos = this.player.position;

    // Remove objects that player has walked away from
    for (const id of this.insideObjects) {
      const obj = this.worldObjects.interactiveObjects.find(o => o.id === id);
      if (obj) {
        const dist = Math.hypot(playerPos.x - obj.position.x, playerPos.z - obj.position.z);
        if (dist > obj.radius * 1.3) {
          this.insideObjects.delete(id);
        }
      } else {
        this.insideObjects.delete(id);
      }
    }

    // Modal open -> don't trigger anything
    if (this.isModalActive()) {
      return;
    }

    for (const obj of this.worldObjects.interactiveObjects) {
      if (obj.collected) continue;
      if (this.insideObjects.has(obj.id)) continue;

      // Allow stars to collect without blocking on activeTriggerCooldown
      if (obj.type !== 'star' && this.activeTriggerCooldown) continue;

      const dist = Math.hypot(playerPos.x - obj.position.x, playerPos.z - obj.position.z);

      if (dist <= obj.radius) {
        this.insideObjects.add(obj.id);
        this.handleTrigger(obj);
        break; // Only trigger one interaction per frame
      }
    }
  }

  handleTrigger(obj) {
    this.setCooldown(600);

    switch (obj.type) {
      case 'zone': {
        if (!this.triggeredZones.has(obj.id)) {
          this.triggeredZones.add(obj.id);
          const zoneData = birthdayConfig.zones.find(z => z.id === obj.data.zoneId);
          if (zoneData) {
            this.onZoneEntered(zoneData);
          }
        }
        break;
      }

      case 'star': {
        obj.collected = true;
        // Animate star popping/flying away
        if (obj.data.starMesh) {
          const meshGroup = obj.data.starMesh.group;
          meshGroup.visible = false;
        }
        this.onStarCollected(obj.data.starIndex, obj.data.name);
        break;
      }

      case 'memory': {
        this.onMemoryTriggered(obj.data.memory, obj);
        break;
      }

      case 'gift': {
        this.onGiftTriggered(obj.data.gift, obj);
        break;
      }

      case 'quote': {
        this.onQuoteTriggered(obj.data.quoteText, obj);
        break;
      }

      case 'pet': {
        this.onPetTriggered(obj.data, obj);
        break;
      }

      case 'cake': {
        this.onCakeCeremonyTriggered();
        break;
      }
    }
  }

  setCooldown(ms = 600) {
    this.activeTriggerCooldown = true;
    setTimeout(() => {
      this.activeTriggerCooldown = false;
    }, ms);
  }
}

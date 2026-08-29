/**
 * ==========================================================================
 * Birthday Storybook Town — Player Character (Chibi Paper Cutout)
 * ==========================================================================
 * Manages player 2.5D sprite mesh, walking bob/squish animation,
 * shadow, and facing direction.
 */
import * as THREE from 'three';
import { TextureGenerator } from '../utils/TextureGenerator.js';
import { birthdayConfig } from '../config/birthdayData.js';

export class PlayerCharacter {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    
    this.speed = birthdayConfig.character.speed || 6.5;
    this.position = new THREE.Vector3(0, 0, 29.5); // In front of house door (front yard)
    this.velocity = new THREE.Vector3();
    this.targetPosition = null;

    this.isMoving = false;
    this.facingRight = true;
    this.walkCycle = 0;

    this.texIdleRight = null;
    this.texIdleLeft = null;
    this.texWalkRight = null;
    this.texWalkLeft = null;

    this.mesh = null;
    this.footstepTimer = 0;
    this.blossoms = [];

    this.initSprite();
  }

  initSprite() {
    // Generate Character Sprite Textures (Idle & Walk frames for both directions)
    this.texIdleRight = TextureGenerator.createChibiSprite(false, true);
    this.texIdleLeft = TextureGenerator.createChibiSprite(false, false);
    this.texWalkRight = TextureGenerator.createChibiSprite(true, true);
    this.texWalkLeft = TextureGenerator.createChibiSprite(true, false);

    // 1. Chibi Plane Geometry (Pivot at feet)
    const charWidth = 3.6;
    const charHeight = 4.2;
    const charGeo = new THREE.PlaneGeometry(charWidth, charHeight);
    charGeo.translate(0, charHeight / 2, 0);

    const charMat = new THREE.MeshStandardMaterial({
      map: this.texIdleRight,
      transparent: true,
      alphaTest: 0.05,
      side: THREE.DoubleSide,
      roughness: 0.85
    });

    this.mesh = new THREE.Mesh(charGeo, charMat);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false;
    this.mesh.rotation.x = -0.12; // Slight tilt
    this.group.add(this.mesh);

    this.group.position.copy(this.position);
    this.scene.add(this.group);
  }

  setFacing(right) {
    if (this.facingRight !== right) {
      this.facingRight = right;
      this.updateTexture();
    }
  }

  updateTexture() {
    if (this.isMoving) {
      this.mesh.material.map = this.facingRight ? this.texWalkRight : this.texWalkLeft;
    } else {
      this.mesh.material.map = this.facingRight ? this.texIdleRight : this.texIdleLeft;
    }
    this.mesh.material.needsUpdate = true;
  }

  update(delta, elapsedTime) {
    if (this.isMoving) {
      this.walkCycle += delta * 12;

      // Cute squash & stretch walking bobbing
      const bob = Math.abs(Math.sin(this.walkCycle)) * 0.35;
      const squash = 1 + Math.sin(this.walkCycle * 2) * 0.06;
      const stretch = 1 - Math.sin(this.walkCycle * 2) * 0.04;

      this.mesh.position.y = bob;
      this.mesh.scale.set(stretch, squash, 1);

      // Wobble rotation
      this.mesh.rotation.z = Math.sin(this.walkCycle) * 0.08;

      // Spawn Footstep Flower Blossoms
      this.footstepTimer += delta;
      if (this.footstepTimer > 0.16) {
        this.footstepTimer = 0;
        this.spawnFootstepBlossom();
      }
    } else {
      // Gentle idle breathing
      const breathe = Math.sin(elapsedTime * 3) * 0.04;
      this.mesh.position.y = breathe;
      this.mesh.scale.set(1 - breathe * 0.5, 1 + breathe, 1);
      this.mesh.rotation.z = 0;
    }

    // Animate and fade footstep blossoms
    for (let i = this.blossoms.length - 1; i >= 0; i--) {
      const b = this.blossoms[i];
      b.life -= delta;
      if (b.life <= 0) {
        this.scene.remove(b.mesh);
        b.mesh.geometry.dispose();
        b.mesh.material.dispose();
        this.blossoms.splice(i, 1);
      } else {
        const ratio = b.life / b.maxLife;
        const scale = Math.min(1.0, (1 - ratio) * 4) * Math.max(0.01, ratio * 1.1);
        b.mesh.scale.set(scale, scale, scale);
        b.mesh.material.opacity = ratio;
      }
    }

    this.group.position.copy(this.position);
  }

  spawnFootstepBlossom() {
    const geo = new THREE.PlaneGeometry(1.2, 1.2);
    const tex = TextureGenerator.createFlowerDecalTexture();
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
      opacity: 0.95
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.z = Math.random() * Math.PI * 2;
    mesh.position.set(
      this.position.x + (Math.random() - 0.5) * 0.5,
      0.045,
      this.position.z + (Math.random() - 0.5) * 0.5
    );
    mesh.renderOrder = 1;
    this.scene.add(mesh);

    this.blossoms.push({
      mesh,
      life: 0.9,
      maxLife: 0.9
    });
  }

  teleport(x, y, z) {
    this.position.set(x, y, z);
    this.group.position.copy(this.position);
    this.targetPosition = null;
    this.isMoving = false;
  }
}

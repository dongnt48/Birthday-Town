/**
 * ==========================================================================
 * Birthday Storybook Town — Navigation & Multi-Input Controller
 * ==========================================================================
 * Coordinates Keyboard, Click/Tap-to-move, and Mobile Touch inputs.
 */
import * as THREE from 'three';

export class NavigationSystem {
  constructor(player, engine, popUpStage, worldObjects = null) {
    this.player = player;
    this.engine = engine;
    this.popUpStage = popUpStage;
    this.worldObjects = worldObjects;

    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    this.joystickVector = new THREE.Vector2(0, 0);
    this.clickTarget = null;
    this.clickMarkerEl = document.getElementById('click-marker');

    // World Bounds
    this.bounds = {
      minX: -40,
      maxX: 40,
      minZ: -70,
      maxZ: 38
    };

    this.initInputs();
  }

  setWorldObjects(worldObjects) {
    this.worldObjects = worldObjects;
  }

  initInputs() {
    // 1. Keyboard Listeners
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('keyup', (e) => this.onKeyUp(e));

    // 2. Mouse / Touch Click-to-Move on 3D Ground Plane
    const canvas = this.engine.renderer.domElement;

    canvas.addEventListener('pointerdown', (e) => {
      // If clicking with left mouse button or single touch
      if (e.button === 0 || e.pointerType === 'touch') {
        this.handlePointerClick(e.clientX, e.clientY);
      }
    });
  }

  onKeyDown(e) {
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.keys.up = true;
        this.clickTarget = null; // Keyboard overrides click target
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.keys.down = true;
        this.clickTarget = null;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.keys.left = true;
        this.clickTarget = null;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.keys.right = true;
        this.clickTarget = null;
        break;
    }
  }

  onKeyUp(e) {
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.keys.up = false;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.keys.down = false;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.keys.left = false;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.keys.right = false;
        break;
    }
  }

  setJoystickVector(x, y) {
    this.joystickVector.set(x, y);
    if (this.joystickVector.lengthSq() > 0.05) {
      this.clickTarget = null;
    }
  }

  handlePointerClick(screenX, screenY) {
    if (!this.popUpStage.groundMesh) return;

    const hitPoint = this.engine.raycastGround(screenX, screenY, this.popUpStage.groundMesh);
    if (hitPoint) {
      // Clamp to bounds
      const targetX = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, hitPoint.x));
      const targetZ = Math.max(this.bounds.minZ, Math.min(this.bounds.maxZ, hitPoint.z));

      this.clickTarget = new THREE.Vector3(targetX, 0, targetZ);

      // Show Visual Click Ripple Marker
      if (this.clickMarkerEl) {
        this.clickMarkerEl.style.left = `${screenX}px`;
        this.clickMarkerEl.style.top = `${screenY}px`;
        this.clickMarkerEl.style.display = 'flex';
      }
    }
  }

  update(delta) {
    const moveDir = new THREE.Vector3(0, 0, 0);

    // 1. Keyboard Input
    if (this.keys.up) moveDir.z -= 1;
    if (this.keys.down) moveDir.z += 1;
    if (this.keys.left) moveDir.x -= 1;
    if (this.keys.right) moveDir.x += 1;

    // 2. Joystick Input
    if (this.joystickVector.lengthSq() > 0.05) {
      moveDir.x += this.joystickVector.x;
      moveDir.z += this.joystickVector.y;
    }

    // 3. Apply Continuous Directional Movement
    if (moveDir.lengthSq() > 0.01) {
      moveDir.normalize();

      this.player.isMoving = true;
      if (Math.abs(moveDir.x) > 0.1) {
        this.player.setFacing(moveDir.x > 0);
      }

      this.player.position.x += moveDir.x * this.player.speed * delta;
      this.player.position.z += moveDir.z * this.player.speed * delta;

      // Hide click marker if moving via keys/stick
      if (this.clickMarkerEl) {
        this.clickMarkerEl.style.display = 'none';
      }
    } 
    // 4. Click-to-Move Target Seeking
    else if (this.clickTarget) {
      const dist = this.player.position.distanceTo(this.clickTarget);

      if (dist > 0.4) {
        this.player.isMoving = true;
        const targetDir = new THREE.Vector3().subVectors(this.clickTarget, this.player.position).normalize();

        if (Math.abs(targetDir.x) > 0.1) {
          this.player.setFacing(targetDir.x > 0);
        }

        const step = Math.min(dist, this.player.speed * delta);
        this.player.position.addScaledVector(targetDir, step);
      } else {
        // Arrived at destination
        this.clickTarget = null;
        this.player.isMoving = false;
        if (this.clickMarkerEl) {
          this.clickMarkerEl.style.display = 'none';
        }
      }
    } else {
      this.player.isMoving = false;
    }

    // Clamping Player Position to World Bounds & Solid Obstacles
    this.resolveCollisions(this.player.position);
    this.player.position.x = Math.max(this.bounds.minX, Math.min(this.bounds.maxX, this.player.position.x));
    this.player.position.z = Math.max(this.bounds.minZ, Math.min(this.bounds.maxZ, this.player.position.z));

    this.player.updateTexture();
  }

  /**
   * Prevents player from walking through solid buildings and large trees
   */
  resolveCollisions(pos) {
    if (!this.worldObjects || typeof this.worldObjects.getColliders !== 'function') return;
    const colliders = this.worldObjects.getColliders();
    const pRadius = 0.9;

    for (const c of colliders) {
      if (c.type === 'circle') {
        const dx = pos.x - c.x;
        const dz = pos.z - c.z;
        const dist = Math.hypot(dx, dz);
        const minDist = c.radius + pRadius;
        if (dist < minDist && dist > 0.0001) {
          const overlap = minDist - dist;
          pos.x += (dx / dist) * overlap;
          pos.z += (dz / dist) * overlap;
        }
      } else if (c.type === 'box') {
        const closestX = Math.max(c.minX, Math.min(c.maxX, pos.x));
        const closestZ = Math.max(c.minZ, Math.min(c.maxZ, pos.z));
        const dx = pos.x - closestX;
        const dz = pos.z - closestZ;
        const dist = Math.hypot(dx, dz);

        if (dist < pRadius) {
          if (dist > 0.0001) {
            const overlap = pRadius - dist;
            pos.x += (dx / dist) * overlap;
            pos.z += (dz / dist) * overlap;
          } else {
            const leftDist = Math.abs(pos.x - c.minX);
            const rightDist = Math.abs(c.maxX - pos.x);
            const topDist = Math.abs(pos.z - c.minZ);
            const bottomDist = Math.abs(c.maxZ - pos.z);
            const minEdge = Math.min(leftDist, rightDist, topDist, bottomDist);
            if (minEdge === leftDist) pos.x = c.minX - pRadius;
            else if (minEdge === rightDist) pos.x = c.maxX + pRadius;
            else if (minEdge === topDist) pos.z = c.minZ - pRadius;
            else pos.z = c.maxZ + pRadius;
          }
        }
      }
    }
  }
}

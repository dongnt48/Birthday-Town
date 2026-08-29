/**
 * ==========================================================================
 * Birthday Storybook Town — 2.5D Paper Billboard Component
 * ==========================================================================
 * Renders an upright paper cutout sprite with casting shadow,
 * natural paper thickness, bottom pivot, and gentle wind sway.
 */
import * as THREE from 'three';

export class PaperBillboard {
  constructor(texture, width, height, options = {}) {
    this.texture = texture;
    this.width = width;
    this.height = height;
    this.options = {
      castShadow: true,
      receiveShadow: true,
      swayIntensity: 0.03,
      swaySpeed: 1.5,
      swayPhase: Math.random() * Math.PI * 2,
      isFloating: false,
      floatHeight: 1.0,
      ...options
    };

    this.group = new THREE.Group();
    this.mesh = null;
    this.baseY = 0;

    this.createMesh();
  }

  createMesh() {
    // 1. Upright Cutout Plane (Pivot at bottom)
    const geometry = new THREE.PlaneGeometry(this.width, this.height);
    // Shift geometry so origin (0, 0, 0) is at bottom-center
    geometry.translate(0, this.height / 2, 0);

    const material = new THREE.MeshStandardMaterial({
      map: this.texture,
      transparent: true,
      alphaTest: 0.05,
      side: THREE.DoubleSide,
      roughness: 0.85,
      metalness: 0.05
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = this.options.castShadow;
    this.mesh.receiveShadow = this.options.receiveShadow;
    
    // Tilt slightly backwards (~8 degrees) to catch light perfectly in isometric view
    this.mesh.rotation.x = -0.12;

    this.group.add(this.mesh);
  }

  setPosition(x, y, z) {
    this.baseY = y;
    this.group.position.set(x, y, z);
    return this;
  }

  setRotationY(angle) {
    this.mesh.rotation.y = angle;
    return this;
  }

  setScale(scale) {
    this.group.scale.set(scale, scale, scale);
    return this;
  }

  update(delta, elapsedTime) {
    // Wind swaying micro-animation
    if (this.options.swayIntensity > 0) {
      const sway = Math.sin(elapsedTime * this.options.swaySpeed + this.options.swayPhase) * this.options.swayIntensity;
      this.mesh.rotation.z = sway;
      this.mesh.rotation.y = sway * 0.4;
    }

    // Floating bobbing (for stars, balloons, gifts)
    if (this.options.isFloating) {
      const floatOffset = Math.sin(elapsedTime * 2.5 + this.options.swayPhase) * 0.35;
      this.mesh.position.y = floatOffset;
    }
  }
}

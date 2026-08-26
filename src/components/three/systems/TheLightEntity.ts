import * as THREE from 'three';
import { TrailRibbonSystem } from './TrailRibbonSystem';
import { ProceduralTextures } from '../utils/ProceduralTextures';

/**
 * The Light — The Singular Narrative Protagonist & Emitter Driver
 * Moves smoothly through 3D space, leaving a luminous ribbon trail and emitting micro-dust.
 */
export class TheLightEntity {
  public group: THREE.Group;
  private coreSprite: THREE.Sprite;
  private coreMaterial: THREE.SpriteMaterial;
  private auraSprite: THREE.Sprite;
  private auraMaterial: THREE.SpriteMaterial;
  public trail: TrailRibbonSystem;

  public position: THREE.Vector3 = new THREE.Vector3(0, 0, -4);
  public targetPosition: THREE.Vector3 = new THREE.Vector3(0, 0, -4);
  public intensity = 1.0;
  public targetIntensity = 1.0;
  public scale = 1.0;
  public targetScale = 1.0;
  public targetColor: THREE.Color = new THREE.Color('#fff9f5');
  public currentColor: THREE.Color = new THREE.Color('#fff9f5');

  constructor() {
    this.group = new THREE.Group();

    // 1. Trail Ribbon
    this.trail = new TrailRibbonSystem();
    this.group.add(this.trail.mesh);

    // 2. High-intensity Core Sprite
    this.coreMaterial = new THREE.SpriteMaterial({
      map: ProceduralTextures.getSoftCircle(),
      color: new THREE.Color('#ffffff'),
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.95,
      depthWrite: false,
    });
    this.coreSprite = new THREE.Sprite(this.coreMaterial);
    this.coreSprite.scale.set(0.7, 0.7, 1);
    this.group.add(this.coreSprite);

    // 3. Diffuse Outer Glow Aura
    this.auraMaterial = new THREE.SpriteMaterial({
      map: ProceduralTextures.getGlowMist(),
      color: new THREE.Color('#f7d58a'),
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.65,
      depthWrite: false,
    });
    this.auraSprite = new THREE.Sprite(this.auraMaterial);
    this.auraSprite.scale.set(2.4, 2.4, 1);
    this.group.add(this.auraSprite);
  }

  public setTarget(
    x: number,
    y: number,
    z: number,
    intensity = 1.0,
    scale = 1.0,
    colorHex = '#f7d58a'
  ) {
    this.targetPosition.set(x, y, z);
    this.targetIntensity = intensity;
    this.targetScale = scale;
    this.targetColor.set(colorHex);
  }

  public update(time: number, delta: number) {
    // Smooth spatial interpolation
    this.position.lerp(this.targetPosition, 0.075);
    this.intensity += (this.targetIntensity - this.intensity) * 0.08;
    this.scale += (this.targetScale - this.scale) * 0.08;
    this.currentColor.lerp(this.targetColor, 0.06);

    // Organic micro breathing
    const breath = 1.0 + Math.sin(time * 3.5) * 0.12;
    const effScale = this.scale * breath * Math.max(0.01, this.intensity);

    this.coreSprite.position.copy(this.position);
    this.coreSprite.scale.set(0.7 * effScale, 0.7 * effScale, 1);
    this.coreMaterial.opacity = Math.min(1.0, this.intensity * 0.95);

    this.auraSprite.position.copy(this.position);
    this.auraSprite.scale.set(2.6 * effScale, 2.6 * effScale, 1);
    this.auraMaterial.color.copy(this.currentColor);
    this.auraMaterial.opacity = Math.min(1.0, this.intensity * 0.6);

    // Update Ribbon Trail
    this.trail.update(this.position, Math.min(1.0, this.intensity * 1.2));
  }

  public dispose() {
    this.coreMaterial.dispose();
    this.auraMaterial.dispose();
    this.trail.dispose();
  }
}

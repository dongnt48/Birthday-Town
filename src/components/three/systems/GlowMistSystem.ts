import * as THREE from 'three';
import { ProceduralTextures } from '../utils/ProceduralTextures';

export interface EmberParticle {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  color: THREE.Color;
  turbPhase: number;
}

/**
 * Layer 5.5: Diffuse Glow Cloud / Mist Layer + Warm Rising Embers
 * Provides soft romantic haze behind emotional scenes and floating embers for candle & fireworks.
 */
export class GlowMistSystem {
  public group: THREE.Group;
  
  // 1. Diffuse Glow Sprite
  private glowSprite: THREE.Sprite;
  private glowMaterial: THREE.SpriteMaterial;

  // 2. Embers Particle System
  private emberPoints: THREE.Points;
  private emberGeometry: THREE.BufferGeometry;
  private emberMaterial: THREE.ShaderMaterial;
  private maxEmbers = 180;
  private embers: EmberParticle[] = [];

  private emberPositions: Float32Array;
  private emberSizes: Float32Array;
  private emberColors: Float32Array;
  private emberAlphas: Float32Array;

  constructor() {
    this.group = new THREE.Group();

    // 1. Glow Sprite (for diffuse back-lighting)
    this.glowMaterial = new THREE.SpriteMaterial({
      map: ProceduralTextures.getGlowMist(),
      color: new THREE.Color('#f7d58a'),
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.35,
      depthWrite: false,
    });
    this.glowSprite = new THREE.Sprite(this.glowMaterial);
    this.glowSprite.scale.set(10, 10, 1);
    this.group.add(this.glowSprite);

    // 2. Embers System
    this.emberGeometry = new THREE.BufferGeometry();
    this.emberPositions = new Float32Array(this.maxEmbers * 3);
    this.emberSizes = new Float32Array(this.maxEmbers);
    this.emberColors = new Float32Array(this.maxEmbers * 3);
    this.emberAlphas = new Float32Array(this.maxEmbers);

    for (let i = 0; i < this.maxEmbers; i++) {
      this.emberPositions[i * 3 + 1] = -999;
      this.emberAlphas[i] = 0;
      this.emberSizes[i] = 0;
    }

    this.emberGeometry.setAttribute('position', new THREE.BufferAttribute(this.emberPositions, 3));
    this.emberGeometry.setAttribute('aSize', new THREE.BufferAttribute(this.emberSizes, 1));
    this.emberGeometry.setAttribute('aColor', new THREE.BufferAttribute(this.emberColors, 3));
    this.emberGeometry.setAttribute('aAlpha', new THREE.BufferAttribute(this.emberAlphas, 1));

    this.emberMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: ProceduralTextures.getSoftCircle() },
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float aSize;
        attribute vec3 aColor;
        attribute float aAlpha;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (160.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          if (tex.a < 0.01 || vAlpha < 0.01) discard;
          gl_FragColor = vec4(vColor, tex.a * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.emberPoints = new THREE.Points(this.emberGeometry, this.emberMaterial);
    this.group.add(this.emberPoints);
  }

  public setGlowTarget(pos: THREE.Vector3, scale = 8, color = '#f7d58a', opacity = 0.35) {
    this.glowSprite.position.lerp(pos, 0.08);
    this.glowSprite.scale.set(scale, scale, 1);
    this.glowMaterial.color.set(color);
    this.glowMaterial.opacity = opacity;
  }

  public emitEmber(origin: THREE.Vector3, count = 1, isWarm = true) {
    const palette = isWarm
      ? ['#ffd580', '#fba94b', '#f8b4b4', '#fff9f5']
      : ['#c9b6ff', '#a9d8ff', '#f6b7d8', '#ffffff'];

    for (let i = 0; i < count; i++) {
      if (this.embers.length >= this.maxEmbers) {
        this.embers.shift();
      }

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.6,
        0.8 + Math.random() * 1.4, // Upward buoyancy
        (Math.random() - 0.5) * 0.6
      );

      const colorHex = palette[Math.floor(Math.random() * palette.length)];

      this.embers.push({
        pos: origin.clone().add(new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.4
        )),
        vel,
        life: 0,
        maxLife: 1.5 + Math.random() * 1.5,
        size: 3.5 + Math.random() * 6.5,
        color: new THREE.Color(colorHex),
        turbPhase: Math.random() * Math.PI * 2,
      });
    }
  }

  public update(time: number, delta: number) {
    this.emberMaterial.uniforms.uTime.value = time;

    // Pulse diffuse glow softly
    const pulse = 1.0 + Math.sin(time * 2.0) * 0.08;
    this.glowSprite.scale.multiplyScalar(pulse);

    // Update active embers
    for (let i = this.embers.length - 1; i >= 0; i--) {
      const e = this.embers[i];
      e.life += delta;

      if (e.life >= e.maxLife) {
        this.embers.splice(i, 1);
        continue;
      }

      // Physics: gentle turbulence & float
      e.pos.x += Math.sin(time * 3.0 + e.turbPhase) * 0.02;
      e.pos.addScaledVector(e.vel, delta);
      e.vel.y *= 0.98;

      const progress = e.life / e.maxLife;
      const alpha = Math.sin(progress * Math.PI) * (1.0 - progress * 0.4);

      const idx = i;
      this.emberPositions[idx * 3] = e.pos.x;
      this.emberPositions[idx * 3 + 1] = e.pos.y;
      this.emberPositions[idx * 3 + 2] = e.pos.z;

      this.emberSizes[idx] = e.size * (1.0 - progress * 0.5);
      this.emberAlphas[idx] = alpha;

      this.emberColors[idx * 3] = e.color.r;
      this.emberColors[idx * 3 + 1] = e.color.g;
      this.emberColors[idx * 3 + 2] = e.color.b;
    }

    // Clear unused
    for (let i = this.embers.length; i < this.maxEmbers; i++) {
      this.emberAlphas[i] = 0;
      this.emberPositions[i * 3 + 1] = -999;
    }

    (this.emberGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.emberGeometry.attributes.aSize as THREE.BufferAttribute).needsUpdate = true;
    (this.emberGeometry.attributes.aColor as THREE.BufferAttribute).needsUpdate = true;
    (this.emberGeometry.attributes.aAlpha as THREE.BufferAttribute).needsUpdate = true;
  }

  public dispose() {
    this.glowMaterial.dispose();
    this.emberGeometry.dispose();
    this.emberMaterial.dispose();
  }
}

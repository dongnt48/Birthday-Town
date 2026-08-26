import * as THREE from 'three';
import { ProceduralTextures } from '../utils/ProceduralTextures';

export interface SparkleParticle {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  color: THREE.Color;
  twinklePhase: number;
}

/**
 * Layer 5.2: Sparkle Layer
 * Sharp 4-point twinkling stars with short lifecycles, triggered on interaction & focal beats.
 */
export class SparkleSystem {
  public points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private maxCount: number;
  private particles: SparkleParticle[] = [];

  private posArray: Float32Array;
  private sizeArray: Float32Array;
  private colorArray: Float32Array;
  private alphaArray: Float32Array;

  constructor(maxCount = 300) {
    this.maxCount = maxCount;
    this.geometry = new THREE.BufferGeometry();

    this.posArray = new Float32Array(maxCount * 3);
    this.sizeArray = new Float32Array(maxCount);
    this.colorArray = new Float32Array(maxCount * 3);
    this.alphaArray = new Float32Array(maxCount);

    // Initialize with far/hidden positions
    for (let i = 0; i < maxCount; i++) {
      this.posArray[i * 3] = 0;
      this.posArray[i * 3 + 1] = -999;
      this.posArray[i * 3 + 2] = 0;
      this.sizeArray[i] = 0;
      this.alphaArray[i] = 0;
      this.colorArray[i * 3] = 1;
      this.colorArray[i * 3 + 1] = 0.95;
      this.colorArray[i * 3 + 2] = 0.85;
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.posArray, 3));
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizeArray, 1));
    this.geometry.setAttribute('aColor', new THREE.BufferAttribute(this.colorArray, 3));
    this.geometry.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphaArray, 1));

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: ProceduralTextures.getSparkleStar() },
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
          gl_PointSize = aSize * (220.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
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

    this.points = new THREE.Points(this.geometry, this.material);
  }

  /**
   * Emit sparkles at a specific coordinate (e.g. photo edge or light hit)
   */
  public emitBurst(
    origin: THREE.Vector3,
    count = 15,
    colors = ['#ffffff', '#f7d58a', '#f6b7d8']
  ) {
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= this.maxCount) {
        this.particles.shift(); // Recycle oldest
      }

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 1.8,
        (Math.random() - 0.5) * 1.8 + 0.3,
        (Math.random() - 0.5) * 1.2
      );

      const hex = colors[Math.floor(Math.random() * colors.length)];
      const color = new THREE.Color(hex);

      this.particles.push({
        pos: origin.clone().add(new THREE.Vector3(
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.4
        )),
        vel,
        life: 0,
        maxLife: 0.8 + Math.random() * 1.2,
        size: 8.0 + Math.random() * 14.0,
        color,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  public update(time: number, delta: number) {
    this.material.uniforms.uTime.value = time;

    // Natural ambient sparkle spawning near center
    if (Math.random() < 0.08 && this.particles.length < this.maxCount - 10) {
      this.emitBurst(
        new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, -5 + (Math.random() - 0.5) * 4),
        1
      );
    }

    // Update active particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life += delta;

      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
        continue;
      }

      // Physics: drag + slight upward float
      p.pos.addScaledVector(p.vel, delta);
      p.vel.multiplyScalar(0.96);
      p.vel.y += 0.15 * delta;

      // Twinkle lifecycle: sharp pulse up -> sinusoidal shimmer -> fade
      const progress = p.life / p.maxLife;
      const sinCurve = Math.sin(progress * Math.PI);
      const twinkle = 0.7 + 0.3 * Math.sin(time * 12.0 + p.twinklePhase);
      const alpha = Math.pow(sinCurve, 1.2) * twinkle;

      const idx = i;
      this.posArray[idx * 3] = p.pos.x;
      this.posArray[idx * 3 + 1] = p.pos.y;
      this.posArray[idx * 3 + 2] = p.pos.z;

      this.sizeArray[idx] = p.size * (0.8 + 0.4 * twinkle);
      this.alphaArray[idx] = alpha;

      this.colorArray[idx * 3] = p.color.r;
      this.colorArray[idx * 3 + 1] = p.color.g;
      this.colorArray[idx * 3 + 2] = p.color.b;
    }

    // Zero out unused slots
    for (let i = this.particles.length; i < this.maxCount; i++) {
      this.alphaArray[i] = 0;
      this.posArray[i * 3 + 1] = -999;
    }

    (this.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.geometry.attributes.aSize as THREE.BufferAttribute).needsUpdate = true;
    (this.geometry.attributes.aAlpha as THREE.BufferAttribute).needsUpdate = true;
    (this.geometry.attributes.aColor as THREE.BufferAttribute).needsUpdate = true;
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

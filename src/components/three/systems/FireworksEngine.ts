import * as THREE from 'three';

interface FireworkParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color: THREE.Color;
  size: number;
  life: number;
  maxLife: number;
  active: boolean;
}

export class FireworksEngine {
  public points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private particles: FireworkParticle[] = [];
  private maxParticles = 1200;

  private positions: Float32Array;
  private colors: Float32Array;
  private alphas: Float32Array;
  private sizes: Float32Array;

  constructor() {
    this.positions = new Float32Array(this.maxParticles * 3);
    this.colors = new Float32Array(this.maxParticles * 3);
    this.alphas = new Float32Array(this.maxParticles);
    this.sizes = new Float32Array(this.maxParticles);

    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: 0,
        y: 0,
        z: -100,
        vx: 0,
        vy: 0,
        vz: 0,
        color: new THREE.Color('#f5d77f'),
        size: 3.0,
        life: 0,
        maxLife: 1,
        active: false,
      });
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('aColor', new THREE.BufferAttribute(this.colors, 3));
    this.geometry.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1));
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1));

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute vec3 aColor;
        attribute float aAlpha;
        attribute float aSize;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (160.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          float strength = 1.0 - smoothstep(0.0, 0.5, dist);
          strength = pow(strength, 1.6);
          gl_FragColor = vec4(vColor, strength * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.points = new THREE.Points(this.geometry, this.material);
  }

  public burst(originX = 0, originY = 2, originZ = -8, burstCount = 180, palette = ['#f5d77f', '#ffd580', '#fba94b', '#ffffff']) {
    let spawned = 0;
    const colors = palette.map(c => new THREE.Color(c));

    for (let i = 0; i < this.maxParticles && spawned < burstCount; i++) {
      const p = this.particles[i];
      if (!p.active) {
        p.active = true;
        p.x = originX;
        p.y = originY;
        p.z = originZ;

        // Spherical velocity burst
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const speed = 4.0 + Math.random() * 8.0;

        p.vx = speed * Math.sin(phi) * Math.cos(theta);
        p.vy = speed * Math.sin(phi) * Math.sin(theta);
        p.vz = speed * Math.cos(phi) * 0.5;

        p.color = colors[Math.floor(Math.random() * colors.length)];
        p.size = 2.0 + Math.random() * 4.0;
        p.maxLife = 1.2 + Math.random() * 1.5;
        p.life = p.maxLife;

        spawned++;
      }
    }
  }

  public update(delta: number) {
    const gravity = -3.5;
    const drag = 0.95;

    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.particles[i];
      if (p.active) {
        p.life -= delta;
        if (p.life <= 0) {
          p.active = false;
          this.alphas[i] = 0;
          continue;
        }

        // Apply physics
        p.vy += gravity * delta;
        p.vx *= drag;
        p.vy *= drag;
        p.vz *= drag;

        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.z += p.vz * delta;

        this.positions[i * 3] = p.x;
        this.positions[i * 3 + 1] = p.y;
        this.positions[i * 3 + 2] = p.z;

        this.colors[i * 3] = p.color.r;
        this.colors[i * 3 + 1] = p.color.g;
        this.colors[i * 3 + 2] = p.color.b;

        const normalizedLife = p.life / p.maxLife;
        this.alphas[i] = Math.pow(normalizedLife, 1.2);
        this.sizes[i] = p.size * (0.4 + 0.6 * normalizedLife);
      } else {
        this.alphas[i] = 0;
      }
    }

    (this.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.geometry.attributes.aColor as THREE.BufferAttribute).needsUpdate = true;
    (this.geometry.attributes.aAlpha as THREE.BufferAttribute).needsUpdate = true;
    (this.geometry.attributes.aSize as THREE.BufferAttribute).needsUpdate = true;
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

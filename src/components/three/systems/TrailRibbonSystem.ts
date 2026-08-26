import * as THREE from 'three';

/**
 * Layer 5.4: Luminous Trail / Streak Ribbon System
 * Creates silky, luminous motion trails trailing The Light protagonist.
 */
export class TrailRibbonSystem {
  public mesh: THREE.Mesh;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private maxPoints = 80;
  private points: THREE.Vector3[] = [];
  private positions: Float32Array;
  private uvs: Float32Array;
  private alphas: Float32Array;
  private ribbonWidth = 0.45;

  constructor() {
    this.geometry = new THREE.BufferGeometry();
    
    // Each segment has 2 vertices (top and bottom of the ribbon)
    const vertexCount = this.maxPoints * 2;
    this.positions = new Float32Array(vertexCount * 3);
    this.uvs = new Float32Array(vertexCount * 2);
    this.alphas = new Float32Array(vertexCount);

    const indices: number[] = [];
    for (let i = 0; i < this.maxPoints - 1; i++) {
      const p1 = i * 2;
      const p2 = i * 2 + 1;
      const p3 = (i + 1) * 2;
      const p4 = (i + 1) * 2 + 1;

      // Two triangles per quad
      indices.push(p1, p2, p3);
      indices.push(p2, p4, p3);
    }

    // Initialize points at origin
    for (let i = 0; i < this.maxPoints; i++) {
      this.points.push(new THREE.Vector3(0, 0, -5));
      const u = i / (this.maxPoints - 1);
      
      this.uvs[i * 4] = u;
      this.uvs[i * 4 + 1] = 0;
      this.uvs[i * 4 + 2] = u;
      this.uvs[i * 4 + 3] = 1;

      const alpha = Math.pow(1.0 - u, 1.8);
      this.alphas[i * 2] = alpha;
      this.alphas[i * 2 + 1] = alpha;
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('uv', new THREE.BufferAttribute(this.uvs, 2));
    this.geometry.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1));
    this.geometry.setIndex(indices);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uColor1: { value: new THREE.Color('#fff9f5') }, // Core Soft White
        uColor2: { value: new THREE.Color('#f7d58a') }, // Champagne Gold
        uColor3: { value: new THREE.Color('#c9b6ff') }, // Lavender tail
        uIntensity: { value: 1.0 },
      },
      vertexShader: `
        attribute float aAlpha;
        varying vec2 vUv;
        varying float vAlpha;

        void main() {
          vUv = uv;
          vAlpha = aAlpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uIntensity;

        varying vec2 vUv;
        varying float vAlpha;

        void main() {
          // Soft radial cross-section: center is intense, edges fade
          float crossAlpha = 1.0 - abs(vUv.y - 0.5) * 2.0;
          crossAlpha = pow(crossAlpha, 1.5);

          // Color gradient from head to tail
          vec3 col = mix(uColor1, uColor2, smoothstep(0.0, 0.4, vUv.x));
          col = mix(col, uColor3, smoothstep(0.4, 1.0, vUv.x));

          float finalAlpha = vAlpha * crossAlpha * uIntensity;
          if (finalAlpha < 0.01) discard;

          gl_FragColor = vec4(col, finalAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  public update(headPosition: THREE.Vector3, intensity = 1.0) {
    this.material.uniforms.uIntensity.value = intensity;

    // Shift points forward
    this.points.unshift(headPosition.clone());
    if (this.points.length > this.maxPoints) {
      this.points.pop();
    }

    const posAttr = this.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    const up = new THREE.Vector3(0, 1, 0);
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    for (let i = 0; i < this.points.length; i++) {
      const current = this.points[i];
      const next = i < this.points.length - 1 ? this.points[i + 1] : current;

      forward.subVectors(current, next).normalize();
      if (forward.lengthSq() < 0.001) {
        forward.set(1, 0, 0);
      }

      right.crossVectors(forward, up).normalize();
      if (right.lengthSq() < 0.001) {
        right.set(0, 0, 1);
      }

      // Width tapers toward tail
      const taper = Math.pow(1.0 - i / this.maxPoints, 0.75);
      const w = this.ribbonWidth * taper;

      const p1 = current.clone().addScaledVector(right, w);
      const p2 = current.clone().addScaledVector(right, -w);

      const idx = i * 2;
      array[idx * 3] = p1.x;
      array[idx * 3 + 1] = p1.y;
      array[idx * 3 + 2] = p1.z;

      array[(idx + 1) * 3] = p2.x;
      array[(idx + 1) * 3 + 1] = p2.y;
      array[(idx + 1) * 3 + 2] = p2.z;
    }

    posAttr.needsUpdate = true;
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

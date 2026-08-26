import * as THREE from 'three';

export class TheLightEntity {
  public group: THREE.Group;
  private core: THREE.Mesh;
  private halo: THREE.Mesh;
  private trailLine: THREE.Line;
  private trailGeometry: THREE.BufferGeometry;
  private trailPositions: Float32Array;
  private trailCount = 60;
  private history: THREE.Vector3[] = [];

  public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public targetPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public intensity = 1.0;
  public targetIntensity = 1.0;
  public scale = 1.0;

  constructor() {
    this.group = new THREE.Group();

    // 1. Core Sphere
    const coreGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ffffff'),
      transparent: true,
      opacity: 0.95,
    });
    this.core = new THREE.Mesh(coreGeo, coreMat);
    this.group.add(this.core);

    // 2. Halo Glow Layer
    const haloGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const haloMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color('#f5d77f') },
        uIntensity: { value: 1.0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uIntensity;
        varying vec3 vNormal;

        void main() {
          float glow = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          gl_FragColor = vec4(uColor, glow * 0.7 * uIntensity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
    });
    this.halo = new THREE.Mesh(haloGeo, haloMat);
    this.group.add(this.halo);

    // 3. Trailing Ribbon / Line
    this.trailPositions = new Float32Array(this.trailCount * 3);
    for (let i = 0; i < this.trailCount; i++) {
      this.history.push(new THREE.Vector3(0, 0, 0));
      this.trailPositions[i * 3] = 0;
      this.trailPositions[i * 3 + 1] = 0;
      this.trailPositions[i * 3 + 2] = 0;
    }

    this.trailGeometry = new THREE.BufferGeometry();
    this.trailGeometry.setAttribute('position', new THREE.BufferAttribute(this.trailPositions, 3));

    const trailColors = new Float32Array(this.trailCount * 4);
    for (let i = 0; i < this.trailCount; i++) {
      const alpha = Math.pow(1.0 - i / this.trailCount, 1.5) * 0.8;
      trailColors[i * 4] = 0.96; // r
      trailColors[i * 4 + 1] = 0.84; // g
      trailColors[i * 4 + 2] = 0.50; // b
      trailColors[i * 4 + 3] = alpha; // a
    }
    this.trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 4));

    const trailMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      linewidth: 3,
      depthWrite: false,
    });

    this.trailLine = new THREE.Line(this.trailGeometry, trailMaterial);
    this.group.add(this.trailLine);
  }

  public setTarget(x: number, y: number, z: number, intensity = 1.0, scale = 1.0) {
    this.targetPosition.set(x, y, z);
    this.targetIntensity = intensity;
    this.scale = scale;
  }

  public update(time: number, delta: number) {
    // Smooth lerp to target position
    this.position.lerp(this.targetPosition, 0.08);
    this.intensity += (this.targetIntensity - this.intensity) * 0.08;

    // Organic micro pulsation
    const pulse = 1.0 + Math.sin(time * 3.5) * 0.12;
    const currentScale = this.scale * pulse * Math.max(0.01, this.intensity);

    this.core.position.copy(this.position);
    this.core.scale.set(currentScale, currentScale, currentScale);

    this.halo.position.copy(this.position);
    this.halo.scale.set(currentScale * 1.8, currentScale * 1.8, currentScale * 1.8);
    (this.halo.material as THREE.ShaderMaterial).uniforms.uIntensity.value = this.intensity;

    // Update trail history
    this.history.unshift(this.position.clone());
    if (this.history.length > this.trailCount) {
      this.history.pop();
    }

    const posAttr = this.trailGeometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    for (let i = 0; i < this.history.length; i++) {
      const p = this.history[i];
      array[i * 3] = p.x;
      array[i * 3 + 1] = p.y;
      array[i * 3 + 2] = p.z;
    }
    posAttr.needsUpdate = true;
  }

  public dispose() {
    this.core.geometry.dispose();
    (this.core.material as THREE.Material).dispose();
    this.halo.geometry.dispose();
    (this.halo.material as THREE.Material).dispose();
    this.trailGeometry.dispose();
    (this.trailLine.material as THREE.Material).dispose();
  }
}

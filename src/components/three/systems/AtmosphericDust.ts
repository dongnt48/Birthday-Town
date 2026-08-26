import * as THREE from 'three';

export class AtmosphericDust {
  public points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private count: number;

  constructor(count = 600) {
    this.count = count;
    this.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const gold = new THREE.Color('#f5d77f');
    const rose = new THREE.Color('#f8b4b4');
    const blue = new THREE.Color('#89c4f4');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      speeds[i * 3] = (Math.random() - 0.5) * 0.05;
      speeds[i * 3 + 1] = 0.02 + Math.random() * 0.08;
      speeds[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

      sizes[i] = 1.5 + Math.random() * 3.5;

      const rand = Math.random();
      const col = rand > 0.6 ? gold : rand > 0.3 ? rose : blue;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 3));
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    this.geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader: `
        attribute vec3 aSpeed;
        attribute float aSize;
        attribute vec3 aColor;
        uniform float uTime;
        uniform float uProgress;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = aColor;
          vec3 pos = position;

          // Gentle drifting motion
          pos.x += sin(uTime * 0.3 + pos.y * 0.1) * 1.2;
          pos.y += cos(uTime * 0.2 + pos.x * 0.1) * 1.5;
          pos.z += sin(uTime * 0.4 + pos.z * 0.1) * 0.8;

          // Parallax shift based on scroll progress
          pos.y += uProgress * 20.0;

          // Wrap around space boundaries
          if (pos.y > 30.0) pos.y -= 60.0;
          if (pos.y < -30.0) pos.y += 60.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (120.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

          // Soft fading near camera boundaries
          float depthFactor = smoothstep(5.0, 35.0, -mvPosition.z);
          vAlpha = depthFactor * 0.6;
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
          strength = pow(strength, 1.5);
          gl_FragColor = vec4(vColor, strength * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.points = new THREE.Points(this.geometry, this.material);
  }

  public update(time: number, progress: number) {
    this.material.uniforms.uTime.value = time;
    this.material.uniforms.uProgress.value = progress;
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

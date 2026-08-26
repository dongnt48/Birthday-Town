import * as THREE from 'three';
import { ProceduralTextures } from '../utils/ProceduralTextures';

/**
 * Layer 5.3: Foreground Cinematic Bokeh Layer
 * Large optical out-of-focus discs floating close to camera, producing depth-of-field wipes.
 */
export class BokehSystem {
  public points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private count: number;

  constructor(count = 28) {
    this.count = count;
    this.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const opacities = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    // Warm champagne, rose, lavender, celestial light
    const palette = [
      new THREE.Color('#f7d58a'),
      new THREE.Color('#f6b7d8'),
      new THREE.Color('#c9b6ff'),
      new THREE.Color('#ffd580'),
      new THREE.Color('#e0c3fc'),
    ];

    for (let i = 0; i < count; i++) {
      // Near camera foreground plane (z from 1.5 to 3.8)
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = 1.2 + Math.random() * 2.6;

      speeds[i * 3] = (Math.random() - 0.5) * 0.15;
      speeds[i * 3 + 1] = 0.05 + Math.random() * 0.12;
      speeds[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

      // Large aperture discs
      sizes[i] = 45.0 + Math.random() * 85.0;
      opacities[i] = 0.12 + Math.random() * 0.25;

      const col = palette[i % palette.length];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 3));
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    this.geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));
    this.geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uTexture: { value: ProceduralTextures.getBokehDisc() },
      },
      vertexShader: `
        attribute vec3 aSpeed;
        attribute float aSize;
        attribute float aOpacity;
        attribute vec3 aColor;

        uniform float uTime;
        uniform float uProgress;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = aColor;
          vec3 pos = position;

          // Slow organic floating
          pos.x += sin(uTime * 0.2 + pos.y * 0.2) * 1.8;
          pos.y += cos(uTime * 0.15 + pos.x * 0.15) * 2.0;

          // Strong foreground parallax from scroll
          pos.y += uProgress * 40.0;

          // Wrap boundaries
          if (pos.y > 15.0) pos.y -= 30.0;
          if (pos.y < -15.0) pos.y += 30.0;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (180.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;

          vAlpha = aOpacity;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec4 tex = texture2D(uTexture, gl_PointCoord);
          if (tex.a < 0.01) discard;
          gl_FragColor = vec4(vColor, tex.a * vAlpha);
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

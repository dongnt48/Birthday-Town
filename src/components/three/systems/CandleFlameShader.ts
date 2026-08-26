import * as THREE from 'three';

export class CandleFlameShader {
  public mesh: THREE.Mesh;
  private material: THREE.ShaderMaterial;
  private geometry: THREE.PlaneGeometry;
  public intensity = 0.0;
  public targetIntensity = 0.0;

  constructor() {
    this.geometry = new THREE.PlaneGeometry(1.2, 2.0);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 0.0 },
        uWaver: { value: 0.0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uWaver;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 pos = position;
          // Organic flame wavering at the tip
          float bend = sin(uTime * 8.0) * 0.15 * uv.y + uWaver * uv.y * 0.4;
          pos.x += bend;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uIntensity;
        varying vec2 vUv;

        void main() {
          vec2 center = vUv - vec2(0.5, 0.2);
          // Teardrop shape approximation
          float r = length(vec2(center.x * (1.0 + center.y * 1.5), center.y * 1.2));
          float alpha = 1.0 - smoothstep(0.1, 0.45, r);

          // Color gradient: white core -> gold middle -> warm amber/orange edge
          vec3 coreCol = vec3(1.0, 0.98, 0.9);
          vec3 midCol = vec3(0.98, 0.75, 0.2);
          vec3 edgeCol = vec3(0.9, 0.25, 0.05);

          vec3 color = mix(coreCol, midCol, smoothstep(0.0, 0.2, r));
          color = mix(color, edgeCol, smoothstep(0.2, 0.45, r));

          gl_FragColor = vec4(color, alpha * uIntensity * 0.9);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0, -5);
  }

  public setIntensity(val: number) {
    this.targetIntensity = val;
  }

  public update(time: number, waver = 0.0) {
    this.intensity += (this.targetIntensity - this.intensity) * 0.1;
    this.material.uniforms.uTime.value = time;
    this.material.uniforms.uIntensity.value = this.intensity;
    this.material.uniforms.uWaver.value = waver;
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

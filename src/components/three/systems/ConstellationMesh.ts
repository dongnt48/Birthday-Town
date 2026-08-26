import * as THREE from 'three';

export class ConstellationMesh {
  public group: THREE.Group;
  private lineSegments: THREE.LineSegments;
  private starPoints: THREE.Points;
  private lineMaterial: THREE.LineBasicMaterial;
  private starMaterial: THREE.ShaderMaterial;
  public opacity = 0.0;
  public targetOpacity = 0.0;

  constructor() {
    this.group = new THREE.Group();

    // Key star points forming constellation pattern (representing 24 • 08 • 2000)
    const starCoords: [number, number, number][] = [
      [-6, 3, -10],
      [-4, 4, -10],
      [-3, 2, -10],
      [-5, 0, -10],
      [-3, -1, -10], // "2"
      [-2, 3, -10],
      [-2, 1, -10],
      [-1, 1, -10],
      [-1, 4, -10],
      [-1, -1, -10], // "4"
      [0, 1, -10], // dot "•"
      [1, 3, -10],
      [2.5, 4, -10],
      [4, 3, -10],
      [4, 0, -10],
      [2.5, -1, -10],
      [1, 0, -10], // "0"
      [5, 3.5, -10],
      [6.5, 3.5, -10],
      [5, 1.5, -10],
      [6.5, 1.5, -10],
      [5, -1, -10],
      [6.5, -1, -10], // "8"
    ];

    const starPositions = new Float32Array(starCoords.length * 3);
    for (let i = 0; i < starCoords.length; i++) {
      starPositions[i * 3] = starCoords[i][0];
      starPositions[i * 3 + 1] = starCoords[i][1];
      starPositions[i * 3 + 2] = starCoords[i][2];
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    this.starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.0 },
        uColor: { value: new THREE.Color('#f5d77f') },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uOpacity;
        varying float vAlpha;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 12.0 * (15.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = uOpacity;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          float strength = 1.0 - smoothstep(0.0, 0.5, dist);
          strength = pow(strength, 1.4);
          gl_FragColor = vec4(uColor, strength * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.starPoints = new THREE.Points(starGeo, this.starMaterial);
    this.group.add(this.starPoints);

    // Connecting line segments
    const lineIndices = [
      0, 1, 1, 2, 2, 3, 3, 4, // 2
      5, 6, 6, 7, 7, 8, 7, 9, // 4
      11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 11, // 0
      17, 18, 18, 20, 20, 19, 19, 17, 19, 21, 21, 22, 22, 20, // 8
    ];

    const linePositions = new Float32Array(lineIndices.length * 3);
    for (let i = 0; i < lineIndices.length; i++) {
      const idx = lineIndices[i];
      linePositions[i * 3] = starCoords[idx][0];
      linePositions[i * 3 + 1] = starCoords[idx][1];
      linePositions[i * 3 + 2] = starCoords[idx][2];
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    this.lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#f5d77f'),
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5,
    });

    this.lineSegments = new THREE.LineSegments(lineGeo, this.lineMaterial);
    this.group.add(this.lineSegments);
  }

  public setVisible(target: number) {
    this.targetOpacity = target;
  }

  public update(time: number) {
    this.opacity += (this.targetOpacity - this.opacity) * 0.08;
    this.starMaterial.uniforms.uTime.value = time;
    this.starMaterial.uniforms.uOpacity.value = this.opacity;
    this.lineMaterial.opacity = this.opacity * 0.45;
  }

  public dispose() {
    this.starPoints.geometry.dispose();
    this.starMaterial.dispose();
    this.lineSegments.geometry.dispose();
    this.lineMaterial.dispose();
  }
}

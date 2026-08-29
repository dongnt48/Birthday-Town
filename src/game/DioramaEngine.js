/**
 * ==========================================================================
 * Birthday Storybook Town — 2.5D Diorama Three.js Engine
 * ==========================================================================
 * Handles Scene, Camera, Lighting, Shadows, and Render Loop.
 */
import * as THREE from 'three';

export class DioramaEngine {
  constructor(containerElement) {
    this.container = containerElement;
    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.dirLight = null;
    this.ambientLight = null;

    this.cameraTarget = new THREE.Vector3(0, 0, 0);
    this.cameraOffset = new THREE.Vector3(0, 36, 42); // Isometric 38-40 degree tilt
    this.currentCameraPos = new THREE.Vector3().copy(this.cameraOffset);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.animationCallbacks = [];
    this.clock = new THREE.Clock();
    this.isPaused = false;

    this.init();
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#FFF6E9');
    this.scene.fog = new THREE.FogExp2('#FFF6E9', 0.0025);

    // 2. Camera: Isometric Perspective
    const aspect = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera(34, aspect, 0.1, 500);
    this.camera.position.copy(this.cameraOffset);
    this.camera.lookAt(this.cameraTarget);

    // 3. Renderer with antialiasing and sRGB
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting (Warm Storybook Sunlight & Ambient Glow)
    this.setupLights();

    // 5. Window Resize Listener
    window.addEventListener('resize', this.onWindowResize.bind(this));

    // 6. Start Loop
    this.animate();
  }

  setupLights() {
    // Soft Warm Ambient Light
    this.ambientLight = new THREE.AmbientLight('#FFF3E0', 0.85);
    this.scene.add(this.ambientLight);

    // Hemisphere Light (Pastel Sky / Grass Bounce)
    const hemiLight = new THREE.HemisphereLight('#FFF9F3', '#A8E6CF', 0.4);
    hemiLight.position.set(0, 50, 0);
    this.scene.add(hemiLight);

    // Warm Directional Sunlight with Soft Paper Shadows
    this.dirLight = new THREE.DirectionalLight('#FFF5E4', 1.05);
    this.dirLight.position.set(30, 60, 40);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 10;
    this.dirLight.shadow.camera.far = 160;

    const shadowDist = 45;
    this.dirLight.shadow.camera.left = -shadowDist;
    this.dirLight.shadow.camera.right = shadowDist;
    this.dirLight.shadow.camera.top = shadowDist;
    this.dirLight.shadow.camera.bottom = -shadowDist;
    this.dirLight.shadow.bias = -0.0005;
    this.dirLight.shadow.radius = 3;

    this.scene.add(this.dirLight);
  }

  onWindowResize() {
    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;

    if (this.camera) {
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
    }

    if (this.renderer) {
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }

  /**
   * Register a per-frame animation hook
   */
  onAnimate(callback) {
    this.animationCallbacks.push(callback);
  }

  /**
   * Smoothly follow player position
   */
  updateCameraFollow(targetPos, delta) {
    // Smoothly lerp camera target
    this.cameraTarget.lerp(targetPos, 4.0 * delta);

    // Calculate desired camera position
    const desiredPos = new THREE.Vector3().copy(this.cameraTarget).add(this.cameraOffset);
    
    // Zoom slightly on mobile screens
    if (window.innerWidth < 600) {
      desiredPos.y -= 4;
      desiredPos.z -= 6;
    }

    this.currentCameraPos.lerp(desiredPos, 3.5 * delta);
    this.camera.position.copy(this.currentCameraPos);
    this.camera.lookAt(this.cameraTarget.x, this.cameraTarget.y + 1.2, this.cameraTarget.z);

    // Move directional light with player for crisp local shadows
    if (this.dirLight) {
      this.dirLight.position.set(
        this.cameraTarget.x + 30,
        this.cameraTarget.y + 60,
        this.cameraTarget.z + 40
      );
      this.dirLight.target.position.copy(this.cameraTarget);
      this.dirLight.target.updateMatrixWorld();
    }
  }

  /**
   * Raycast to find intersection on ground plane (for click-to-move)
   */
  raycastGround(screenX, screenY, groundMesh) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((screenX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((screenY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(groundMesh);

    if (intersects && intersects.length > 0) {
      return intersects[0].point;
    }
    return null;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsedTime = this.clock.getElapsedTime();

    if (!this.isPaused) {
      for (const cb of this.animationCallbacks) {
        cb(delta, elapsedTime);
      }
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

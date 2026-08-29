/**
 * ==========================================================================
 * Birthday Storybook Town — 2.5D Pop-up Book Stage & Terrain
 * ==========================================================================
 * Constructs the storybook base, pastel grass plane, curved river, and winding path.
 */
import * as THREE from 'three';
import { TextureGenerator } from '../utils/TextureGenerator.js';

export class PopUpStage {
  constructor(scene) {
    this.scene = scene;
    this.groundMesh = null;
    this.waterMesh = null;
    this.riverMaterial = null;

    this.initStage();
  }

  initStage() {
    // 1. Pop-Up Book Cardboard Base (Open Storybook Cover)
    this.createBookCover();

    // 2. Pastel Grass Ground Plane with Shadows
    this.createGrassField();

    // 3. Multi-Zone Distinct Terrain Biomes (disabled)
    // this.createZoneGroundPlates();

    // 4. Curved Storybook River & Floating Lilies
    this.createRiverStream();

    // 5. Winding Crayon Dirt Path
    this.createWindingPath();
  }

  createBookCover() {
    // Open Hardcover Book Base
    const bookGeo = new THREE.BoxGeometry(100, 2.0, 140);
    const bookMat = new THREE.MeshStandardMaterial({
      color: 0x8D5B4C, // Warm book leather / wood
      roughness: 0.85,
      metalness: 0.05
    });
    const bookBase = new THREE.Mesh(bookGeo, bookMat);
    bookBase.position.set(0, -1.2, -18);
    bookBase.receiveShadow = true;
    this.scene.add(bookBase);

    // Book Paper Page Rim (Laminated gilded cream edge, sits safely below ground surface)
    const pageRimGeo = new THREE.BoxGeometry(96, 0.8, 136);
    const pageRimMat = new THREE.MeshStandardMaterial({
      color: 0xFDF8EE,
      roughness: 0.9
    });
    const pageRim = new THREE.Mesh(pageRimGeo, pageRimMat);
    pageRim.position.set(0, -0.5, -18);
    pageRim.receiveShadow = true;
    this.scene.add(pageRim);
  }

  createGrassField() {
    // Grass Texture with subtle repeat
    const grassTex = TextureGenerator.createGrassTexture();
    grassTex.wrapS = THREE.RepeatWrapping;
    grassTex.wrapT = THREE.RepeatWrapping;
    grassTex.repeat.set(5, 5);

    const grassGeo = new THREE.PlaneGeometry(92, 132);
    const grassMat = new THREE.MeshStandardMaterial({
      map: grassTex,
      roughness: 0.9,
      metalness: 0.0,
      color: 0xFFFFFF
    });

    this.groundMesh = new THREE.Mesh(grassGeo, grassMat);
    this.groundMesh.rotation.x = -Math.PI / 2;
    this.groundMesh.position.set(0, 0.01, -18);
    this.groundMesh.receiveShadow = true;
    this.scene.add(this.groundMesh);

    // Paper Cutout Border around ground (White storybook trim)
    const borderMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const borderGeos = [
      new THREE.BoxGeometry(92.4, 0.2, 1.0), // Top
      new THREE.BoxGeometry(92.4, 0.2, 1.0), // Bottom
      new THREE.BoxGeometry(1.0, 0.2, 132.4), // Left
      new THREE.BoxGeometry(1.0, 0.2, 132.4)  // Right
    ];

    const b1 = new THREE.Mesh(borderGeos[0], borderMat);
    b1.position.set(0, 0.09, -84);
    const b2 = new THREE.Mesh(borderGeos[1], borderMat);
    b2.position.set(0, 0.09, 48);
    const b3 = new THREE.Mesh(borderGeos[2], borderMat);
    b3.position.set(-46, 0.09, -18);
    const b4 = new THREE.Mesh(borderGeos[3], borderMat);
    b4.position.set(46, 0.09, -18);

    this.scene.add(b1, b2, b3, b4);
  }

  /**
   * Constructs distinct 2.5D themed terrain plates for all 6 storybook zones.
   * Zones are arranged linearly along the Z axis from north (+Z) to south (-Z)
   * with clear gaps between them for connecting walkways.
   *
   * Layout (center Z of each zone):
   *   Zone 1: House Yard      → z: 27   (28×18)  range: 18 → 36
   *   Zone 2: Bridge           → z: 8    (river, no plate)
   *   Zone 3: Memory Garden   → z: -6   (24×16)  range: -14 → 2
   *   Zone 4: Gift Plaza      → z: -26  (20×14)  range: -33 → -19
   *   Zone 5: Light Path      → z: -44  (16×10)  range: -49 → -39
   *   Zone 6: Cake Stage      → z: -58  (r=9)    range: -67 → -49
   */
  // createZoneGroundPlates() {
  //   // 1. Zone 1: Starting House Cobblestone Yard (z: 27)
  //   const houseYardTex = TextureGenerator.createCobblestoneTexture();
  //   houseYardTex.wrapS = THREE.RepeatWrapping;
  //   houseYardTex.wrapT = THREE.RepeatWrapping;
  //   houseYardTex.repeat.set(2.2, 2.2);

  //   const houseYardGeo = new THREE.PlaneGeometry(28, 18);
  //   const houseYardMat = new THREE.MeshStandardMaterial({
  //     map: houseYardTex,
  //     roughness: 0.85,
  //     color: 0xFFFFFF
  //   });
  //   const houseYardMesh = new THREE.Mesh(houseYardGeo, houseYardMat);
  //   houseYardMesh.rotation.x = -Math.PI / 2;
  //   houseYardMesh.position.set(0, 0.03, 27);
  //   houseYardMesh.receiveShadow = true;
  //   this.scene.add(houseYardMesh);

  //   // 2. Zone 3: Memory Garden Blossom Lawn (z: -6)
  //   const gardenTex = TextureGenerator.createBlossomGardenTexture();
  //   gardenTex.wrapS = THREE.RepeatWrapping;
  //   gardenTex.wrapT = THREE.RepeatWrapping;
  //   gardenTex.repeat.set(1.5, 1.5);

  //   const gardenGeo = new THREE.PlaneGeometry(24, 16);
  //   const gardenMat = new THREE.MeshStandardMaterial({
  //     map: gardenTex,
  //     roughness: 0.85,
  //     color: 0xFFFFFF
  //   });
  //   const gardenMesh = new THREE.Mesh(gardenGeo, gardenMat);
  //   gardenMesh.rotation.x = -Math.PI / 2;
  //   gardenMesh.position.set(-16, 0.03, -6);
  //   gardenMesh.receiveShadow = true;
  //   this.scene.add(gardenMesh);

  //   // Picnic Blanket Decal in Garden
  //   const picnicTex = TextureGenerator.createPicnicMatSprite();
  //   const picnicGeo = new THREE.PlaneGeometry(6.5, 6.5);
  //   const picnicMat = new THREE.MeshStandardMaterial({
  //     map: picnicTex,
  //     transparent: true,
  //     alphaTest: 0.05
  //   });
  //   const picnicMesh = new THREE.Mesh(picnicGeo, picnicMat);
  //   picnicMesh.rotation.x = -Math.PI / 2;
  //   picnicMesh.rotation.z = 0.15;
  //   picnicMesh.position.set(-12, 0.045, -8);
  //   picnicMesh.receiveShadow = true;
  //   this.scene.add(picnicMesh);

  //   // 3. Zone 4: Gift Plaza Checkered Mosaic Pavement (z: -26)
  //   const plazaTex = TextureGenerator.createPastelTilesTexture();
  //   plazaTex.wrapS = THREE.RepeatWrapping;
  //   plazaTex.wrapT = THREE.RepeatWrapping;
  //   plazaTex.repeat.set(2, 2);

  //   const plazaGeo = new THREE.PlaneGeometry(20, 14);
  //   const plazaMat = new THREE.MeshStandardMaterial({
  //     map: plazaTex,
  //     roughness: 0.85,
  //     color: 0xFFFFFF
  //   });
  //   const plazaMesh = new THREE.Mesh(plazaGeo, plazaMat);
  //   plazaMesh.rotation.x = -Math.PI / 2;
  //   plazaMesh.position.set(14, 0.03, -26);
  //   plazaMesh.receiveShadow = true;
  //   this.scene.add(plazaMesh);

  //   // 4. Zone 5: Light Path Starlight Runway (z: -44)
  //   const lightPathTex = TextureGenerator.createStarDustTexture();
  //   const lightPathGeo = new THREE.PlaneGeometry(16, 10);
  //   const lightPathMat = new THREE.MeshStandardMaterial({
  //     map: lightPathTex,
  //     roughness: 0.8,
  //     color: 0xFFFFFF
  //   });
  //   const lightPathMesh = new THREE.Mesh(lightPathGeo, lightPathMat);
  //   lightPathMesh.rotation.x = -Math.PI / 2;
  //   lightPathMesh.position.set(0, 0.03, -44);
  //   lightPathMesh.receiveShadow = true;
  //   this.scene.add(lightPathMesh);

  //   // 5. Zone 6: Cake Stage Royal Birthday Dais Carpet (z: -58)
  //   const daisTex = TextureGenerator.createRoyalStageCarpetTexture();
  //   const daisGeo = new THREE.CircleGeometry(9, 48);
  //   const daisMat = new THREE.MeshStandardMaterial({
  //     map: daisTex,
  //     roughness: 0.8,
  //     transparent: true,
  //     alphaTest: 0.05
  //   });
  //   const daisMesh = new THREE.Mesh(daisGeo, daisMat);
  //   daisMesh.rotation.x = -Math.PI / 2;
  //   daisMesh.position.set(0, 0.035, -58);
  //   daisMesh.receiveShadow = true;
  //   this.scene.add(daisMesh);
  // }

  createRiverStream() {
    // A soft pastel sky-blue river flowing horizontally across z = 8
    const riverGeo = new THREE.PlaneGeometry(91.8, 8.5, 32, 1);

    // Create animated water material
    this.riverMaterial = new THREE.MeshStandardMaterial({
      color: 0x64B5F6, // Rich pastel sky blue
      roughness: 0.25,
      metalness: 0.1,
      transparent: true,
      opacity: 0.96
    });

    this.waterMesh = new THREE.Mesh(riverGeo, this.riverMaterial);
    this.waterMesh.rotation.x = -Math.PI / 2;
    this.waterMesh.position.set(0, 0.04, 8);
    this.waterMesh.receiveShadow = true;
    this.scene.add(this.waterMesh);

    // River banks (Cutout paper curves)
    const bankMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const bankGeo = new THREE.PlaneGeometry(91.8, 0.6);

    const bankTop = new THREE.Mesh(bankGeo, bankMat);
    bankTop.rotation.x = -Math.PI / 2;
    bankTop.position.set(0, 0.045, 3.7);

    const bankBottom = new THREE.Mesh(bankGeo, bankMat);
    bankBottom.rotation.x = -Math.PI / 2;
    bankBottom.position.set(0, 0.045, 12.3);

    this.scene.add(bankTop, bankBottom);

    // Floating Water Lilies across the river
    const lilyTex = TextureGenerator.createWaterLilySprite();
    const lilyMat = new THREE.MeshStandardMaterial({
      map: lilyTex,
      transparent: true,
      alphaTest: 0.05
    });

    const lilyPositions = [
      { x: -14, z: 6.5, scale: 3.2, rot: 0.4 },
      { x: -28, z: 9.2, scale: 2.8, rot: 1.2 },
      { x: 12, z: 9.5, scale: 3.4, rot: -0.8 },
      { x: 26, z: 6.8, scale: 3.0, rot: 2.1 }
    ];

    lilyPositions.forEach(pos => {
      const lilyGeo = new THREE.PlaneGeometry(pos.scale, pos.scale);
      const lilyMesh = new THREE.Mesh(lilyGeo, lilyMat);
      lilyMesh.rotation.x = -Math.PI / 2;
      lilyMesh.rotation.z = pos.rot;
      lilyMesh.position.set(pos.x, 0.055, pos.z);
      this.scene.add(lilyMesh);
    });
  }

  /**
   * Creates connecting walkway paths between all zones.
   * Each path segment is a visible ribbon on the ground.
   */
  createWindingPath() {
    const pathTex = TextureGenerator.createPathTexture();
    pathTex.wrapS = THREE.RepeatWrapping;
    pathTex.wrapT = THREE.RepeatWrapping;

    const pathMat = new THREE.MeshStandardMaterial({
      map: pathTex,
      roughness: 0.9,
      metalness: 0.0,
      color: 0xFFFFFF
    });

    // Define path segments connecting each zone pair
    const pathSegments = [
      // Path 1: House (z:27) → Bridge (z:8) — straight down
      {
        points: [
          new THREE.Vector3(0, 0.042, 18),
          new THREE.Vector3(1, 0.042, 15),
          new THREE.Vector3(0, 0.042, 12.5)
        ],
        width: 3.5,
        repeats: 4
      },
      // Path 2: Bridge (z:8) → Memory Garden (z:-6, x:-16) — curve left
      {
        points: [
          new THREE.Vector3(0, 0.042, 3.5),
          new THREE.Vector3(-4, 0.042, 0),
          new THREE.Vector3(-10, 0.042, -2),
          new THREE.Vector3(-16, 0.042, 0)
        ],
        width: 3.2,
        repeats: 6
      },
      // Path 3: Memory Garden (z:-6, x:-16) → Thông Điệp (z:-37.5, x:-16) — straight down on left
      {
        points: [
          new THREE.Vector3(-16, 0.042, -12),
          new THREE.Vector3(-17, 0.042, -22),
          new THREE.Vector3(-16, 0.042, -32)
        ],
        width: 3.2,
        repeats: 7
      },
      // Path 4: Thông Điệp (z:-37.5, x:-16) → Gift Plaza (z:-26, x:14) — walkway crossing diagonally
      {
        points: [
          new THREE.Vector3(-12, 0.042, -37),
          new THREE.Vector3(-4, 0.042, -33),
          new THREE.Vector3(4, 0.042, -29),
          new THREE.Vector3(10, 0.042, -26)
        ],
        width: 3.2,
        repeats: 8
      },
      // Path 5: Gift Plaza (z:-26, x:14) → Cake Stage (z:-56, x:0) — curve down-left
      {
        points: [
          new THREE.Vector3(14, 0.042, -32),
          new THREE.Vector3(12, 0.042, -40),
          new THREE.Vector3(6, 0.042, -48),
          new THREE.Vector3(0, 0.042, -52)
        ],
        width: 3.2,
        repeats: 7
      },
      // Path 6: Thông Điệp (z:-37.5, x:-16) → Cake Stage (z:-56, x:0) — curve down-right
      {
        points: [
          new THREE.Vector3(-16, 0.042, -43),
          new THREE.Vector3(-11, 0.042, -47),
          new THREE.Vector3(-5, 0.042, -50),
          new THREE.Vector3(0, 0.042, -52)
        ],
        width: 3.2,
        repeats: 5
      }
    ];

    pathSegments.forEach(seg => {
      this.buildPathRibbon(seg.points, seg.width, seg.repeats, pathMat);
    });
  }

  /**
   * Builds a single curved ribbon path mesh from a set of control points
   */
  buildPathRibbon(controlPoints, pathWidth, texRepeats, material) {
    const curve = new THREE.CatmullRomCurve3(controlPoints);
    const divisions = 40;
    const sampledPoints = curve.getPoints(divisions);

    const vertices = [];
    const uvs = [];
    const indices = [];

    for (let i = 0; i <= divisions; i++) {
      const p = sampledPoints[i];
      let tangent;
      if (i === 0) {
        tangent = new THREE.Vector3().subVectors(sampledPoints[1], sampledPoints[0]).normalize();
      } else if (i === divisions) {
        tangent = new THREE.Vector3().subVectors(sampledPoints[divisions], sampledPoints[divisions - 1]).normalize();
      } else {
        tangent = new THREE.Vector3().subVectors(sampledPoints[i + 1], sampledPoints[i - 1]).normalize();
      }

      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      const left = new THREE.Vector3().copy(p).addScaledVector(normal, pathWidth / 2);
      const right = new THREE.Vector3().copy(p).addScaledVector(normal, -pathWidth / 2);

      vertices.push(left.x, left.y, left.z);
      vertices.push(right.x, right.y, right.z);

      const v = i / divisions;
      uvs.push(0, v);
      uvs.push(1, v);

      if (i < divisions) {
        const base = i * 2;
        indices.push(base, base + 1, base + 2);
        indices.push(base + 1, base + 3, base + 2);
      }
    }

    const pathGeo = new THREE.BufferGeometry();
    pathGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    pathGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    pathGeo.setIndex(indices);
    pathGeo.computeVertexNormals();

    // Clone material with custom repeat for this segment
    const segMat = material.clone();
    segMat.map = material.map.clone();
    segMat.map.repeat.set(1, texRepeats);
    segMat.map.needsUpdate = true;

    const pathMesh = new THREE.Mesh(pathGeo, segMat);
    pathMesh.receiveShadow = true;
    this.scene.add(pathMesh);
  }

  update(delta, elapsedTime) {
    // Subtle water ripple color fluctuation
    if (this.riverMaterial) {
      const hueShift = Math.sin(elapsedTime * 1.5) * 0.05;
      this.riverMaterial.color.setHSL(0.58 + hueShift, 0.65, 0.68);
    }
  }
}

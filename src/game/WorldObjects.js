/**
 * ==========================================================================
 * Birthday Storybook Town — 2.5D World Objects & Landmark Spawner
 * ==========================================================================
 * Positions all paper cutout landmarks, props, collectable stars,
 * memory photo frames, gift boxes, and castle across the 6 zones.
 */
import * as THREE from 'three';
import { PaperBillboard } from './PaperBillboard.js';
import { TextureGenerator } from '../utils/TextureGenerator.js';
import { birthdayConfig } from '../config/birthdayData.js';

export class WorldObjects {
  constructor(scene) {
    this.scene = scene;
    this.billboards = [];
    this.interactiveObjects = [];
    this.windmills = [];
    this.butterflies = [];
    this.cakeObject = null;

    this.initWorld();
  }

  initWorld() {
    this.buildZone1StartingHouse();
    this.buildZone2WishBridge();
    this.buildZone3MemoryGarden();
    this.buildZone4GiftPlaza();
    this.buildZone5LightPath();
    this.buildZone6BirthdayCastle();
    this.buildSurroundingDecor();
    this.buildCuteFaunaAndProps();
  }

  /**
   * Helper to register an interactive trigger object
   */
  addInteractive(type, id, position, data = {}) {
    let defaultRadius = 3.5;
    if (type === 'star') defaultRadius = 4.8;
    else if (type === 'memory' || type === 'gift' || type === 'quote') defaultRadius = 4.2;

    this.interactiveObjects.push({
      type, // 'star', 'memory', 'gift', 'zone', 'cake', 'quote'
      id,
      position: new THREE.Vector3(position.x, position.y, position.z),
      radius: data.radius || defaultRadius,
      data,
      collected: false
    });
  }

  /**
   * Returns solid collision obstacles for large physical landmarks & trees
   */
  getColliders() {
    return [
      // 1. Starting House
      { type: 'box', minX: -6.5, maxX: 6.5, minZ: 23.5, maxZ: 26.8 },
      // House yard trees
      { type: 'circle', x: -10, z: 28, radius: 1.5 },
      { type: 'circle', x: 10, z: 27, radius: 1.5 },

      // 2. Windmills
      { type: 'circle', x: 18, z: 6, radius: 1.8 },
      { type: 'circle', x: -24, z: 8.5, radius: 1.6 },
      { type: 'circle', x: 28, z: -12, radius: 1.5 },
      { type: 'circle', x: -30, z: -42, radius: 1.5 },

      // 3. Memory Tree (Trunk only)
      { type: 'circle', x: -16, z: -6, radius: 1.5 },
      { type: 'circle', x: -26, z: -8, radius: 1.5 },

      // 4. Gift Plaza Decor Tree
      { type: 'circle', x: 24, z: -28, radius: 1.5 },

      // 5. Giant 3-Tier Birthday Cake & Castle
      { type: 'circle', x: 0, z: -56, radius: 3.5 },
      { type: 'box', minX: -12, maxX: 12, minZ: -68, maxZ: -63 },

      // 6. Surrounding boundary decor trees
      { type: 'circle', x: -35, z: 20, radius: 2.0 },
      { type: 'circle', x: 35, z: 22, radius: 2.0 },
      { type: 'circle', x: -38, z: 2, radius: 2.0 },
      { type: 'circle', x: 36, z: -2, radius: 2.0 },
      { type: 'circle', x: -34, z: -30, radius: 2.0 },
      { type: 'circle', x: 35, z: -40, radius: 2.0 },
      { type: 'circle', x: -25, z: -60, radius: 2.0 },
      { type: 'circle', x: 25, z: -60, radius: 2.0 }
    ];
  }

  /**
   * Zone 1: Starting House (x: 0, z: 24)
   */
  buildZone1StartingHouse() {
    // 1. House Sprite
    const houseTex = TextureGenerator.createHouseSprite();
    const house = new PaperBillboard(houseTex, 14, 14, { swayIntensity: 0.01 });
    house.setPosition(0, 0, 26);
    this.scene.add(house.group);
    this.billboards.push(house);

    // 2. Trees around house
    const treeTex1 = TextureGenerator.createTreeSprite(1); // Peach
    const tree1 = new PaperBillboard(treeTex1, 8, 12);
    tree1.setPosition(-10, 0, 28);
    this.scene.add(tree1.group);
    this.billboards.push(tree1);

    const treeTex2 = TextureGenerator.createTreeSprite(0); // Mint
    const tree2 = new PaperBillboard(treeTex2, 7.5, 11);
    tree2.setPosition(10, 0, 27);
    this.scene.add(tree2.group);
    this.billboards.push(tree2);

    // 3. Welcome Sign standing right next to the character in front of the house
    const signTex = TextureGenerator.createRoadSignSprite("START");
    const sign = new PaperBillboard(signTex, 3.8, 3.8);
    sign.setPosition(2.8, 0, 29.5);
    this.scene.add(sign.group);
    this.billboards.push(sign);

    // Zone trigger for intro dialogue
    this.addInteractive('zone', 'zone-house', { x: 0, y: 0, z: 29.5 }, {
      zoneId: 'house',
      radius: 4.5
    });
  }

  /**
   * Helper to spawn an animated 2.5D windmill
   */
  addWindmill(x, z, scale = 1.0, roofColor = '#FDCB6E', towerColor = '#FFFDF9', bladeColors = ['#FF7675', '#FFEAA7', '#55EFC4', '#CDBBFF'], speed = 1.2) {
    const width = 6 * scale;
    const height = 12 * scale;
    const wmBodyTex = TextureGenerator.createWindmillBodySprite(roofColor, towerColor);
    const wmBody = new PaperBillboard(wmBodyTex, width, height, { swayIntensity: 0.003 });
    wmBody.setPosition(x, 0, z);
    this.scene.add(wmBody.group);
    this.billboards.push(wmBody);

    const bladesSize = 8 * scale;
    const wmBladesTex = TextureGenerator.createWindmillBladesSprite(bladeColors);
    const bladesGeo = new THREE.PlaneGeometry(bladesSize, bladesSize);
    const bladesMat = new THREE.MeshStandardMaterial({
      map: wmBladesTex,
      transparent: true,
      alphaTest: 0.05,
      side: THREE.DoubleSide
    });
    const bladesMesh = new THREE.Mesh(bladesGeo, bladesMat);
    const hubY = 9.2 * scale;
    const hubZ = z + 0.35;
    bladesMesh.position.set(x, hubY, hubZ);
    this.scene.add(bladesMesh);

    this.windmills.push({
      body: wmBody,
      blades: bladesMesh,
      speed: speed
    });
  }

  /**
   * Zone 2: Wish Bridge & Animated Windmills
   */
  buildZone2WishBridge() {
    // 1. Wooden Bridge Cutout
    const bridgeTex = TextureGenerator.createWishBridgeSprite();
    const bridge = new PaperBillboard(bridgeTex, 10, 6.5, { swayIntensity: 0.005 });
    bridge.setPosition(0, 0, 8);
    this.scene.add(bridge.group);
    this.billboards.push(bridge);

    // 2. Wish Star #1 over the Bridge
    const starTex = TextureGenerator.createWishStarSprite();
    const star1 = new PaperBillboard(starTex, 3.2, 3.2, { isFloating: true, swaySpeed: 2.5 });
    star1.setPosition(0, 1.2, 8);
    this.scene.add(star1.group);
    this.billboards.push(star1);

    this.addInteractive('star', 'star-1', { x: 0, y: 0, z: 8 }, {
      starIndex: 1,
      starMesh: star1,
      name: "Ngôi Sao Khởi Hành"
    });

    // 3. Four Unique Pastel Windmills across the town
    // Windmill 1: Main Golden Windmill by Right Riverbank (x: 18, z: 6)
    this.addWindmill(18, 6, 1.0, '#FDCB6E', '#FFFDF9', ['#FF7675', '#FFEAA7', '#55EFC4', '#CDBBFF'], 1.2);

    // Windmill 2: Lavender Windmill by Left Riverbank (x: -24, z: 8.5)
    this.addWindmill(-24, 8.5, 0.95, '#CDBBFF', '#F7EFFC', ['#CDBBFF', '#FFB6B9', '#FFEAA7', '#A8E6CF'], 0.95);

    // Windmill 3: Peach Blossom Windmill on Eastern Meadow (x: 28, z: -12)
    this.addWindmill(28, -12, 0.8, '#FFAAA5', '#FFF8EE', ['#FFAAA5', '#FF7675', '#FFEAA7', '#FFFDF9'], 1.35);

    // Windmill 4: Mint Breeze Windmill on Western Starlight Hill (x: -30, z: -42)
    this.addWindmill(-30, -42, 0.85, '#55EFC4', '#E8F8F5', ['#55EFC4', '#81ECEC', '#FFEAA7', '#FFAAA5'], 1.1);
  }

  /**
   * Zone 3: Memory Garden (x: -16, z: -6)
   */
  buildZone3MemoryGarden() {
    // 1. Photo Tree in the center
    const memTreeTex = TextureGenerator.createMemoryTreeSprite();
    const memTree = new PaperBillboard(memTreeTex, 12, 13.5, { swayIntensity: 0.02 });
    memTree.setPosition(-16, 0, -6);
    this.scene.add(memTree.group);
    this.billboards.push(memTree);

    // 2. Sign Post "OUR MEMORIES"
    const signTex = TextureGenerator.createRoadSignSprite("MEMORIES");
    const sign = new PaperBillboard(signTex, 4, 4);
    sign.setPosition(-9, 0, -3);
    this.scene.add(sign.group);
    this.billboards.push(sign);

    // 3. Wish Star #2 in Memory Garden (in open lawn in front of tree)
    const starTex = TextureGenerator.createWishStarSprite();
    const star2 = new PaperBillboard(starTex, 3.2, 3.2, { isFloating: true, swaySpeed: 2.2 });
    star2.setPosition(-16, 1.2, -1.5);
    this.scene.add(star2.group);
    this.billboards.push(star2);

    this.addInteractive('star', 'star-2', { x: -16, y: 0, z: -1.5 }, {
      starIndex: 2,
      starMesh: star2,
      name: "Ngôi Sao Ký Ức"
    });

    // 4. Memory Polaroid Pickups (4 items)
    const memPositions = [
      { x: -12, z: -3, id: 0 },
      { x: -20, z: -4, id: 1 },
      { x: -13, z: -9, id: 2 },
      { x: -19, z: -10, id: 3 }
    ];

    memPositions.forEach(pos => {
      const memoryData = birthdayConfig.memories[pos.id];
      if (memoryData) {
        const photoFrameTex = TextureGenerator.createRoadSignSprite("📸 " + (pos.id + 1));
        const photoFrame = new PaperBillboard(photoFrameTex, 2.5, 2.5, { isFloating: true });
        photoFrame.setPosition(pos.x, 0.4, pos.z);
        this.scene.add(photoFrame.group);
        this.billboards.push(photoFrame);

        this.addInteractive('memory', `mem-${pos.id}`, { x: pos.x, y: 0, z: pos.z }, {
          memory: memoryData,
          mesh: photoFrame
        });
      }
    });

    // Surrounding pastel blossom trees
    const treeTex = TextureGenerator.createTreeSprite(1);
    const treeL = new PaperBillboard(treeTex, 7, 10.5);
    treeL.setPosition(-26, 0, -8);
    this.scene.add(treeL.group);
    this.billboards.push(treeL);
  }

  /**
   * Zone 4: Gift Plaza (x: 14, z: -26)
   */
  buildZone4GiftPlaza() {
    // 1. Sign Post "GIFTS"
    const signTex = TextureGenerator.createRoadSignSprite("GIFT PLAZA");
    const sign = new PaperBillboard(signTex, 4.5, 4.5);
    sign.setPosition(9, 0, -22);
    this.scene.add(sign.group);
    this.billboards.push(sign);

    // 2. Wish Star #3 in Plaza
    const starTex = TextureGenerator.createWishStarSprite();
    const star3 = new PaperBillboard(starTex, 3.2, 3.2, { isFloating: true, swaySpeed: 2.8 });
    star3.setPosition(14, 1.2, -26);
    this.scene.add(star3.group);
    this.billboards.push(star3);

    this.addInteractive('star', 'star-3', { x: 14, y: 0, z: -26 }, {
      starIndex: 3,
      starMesh: star3,
      name: "Ngôi Sao Quà Tặng"
    });

    // 3. 3 Gift Boxes to unwrap
    const giftConfigs = [
      { x: 11, z: -24, color: '#FFAAA5', ribbon: '#FFEAA7', id: 0 },
      { x: 17, z: -25, color: '#CDBBFF', ribbon: '#FFFDF9', id: 1 },
      { x: 14, z: -30, color: '#FFEAA7', ribbon: '#FF7675', id: 2 }
    ];

    giftConfigs.forEach(gc => {
      const giftData = birthdayConfig.gifts[gc.id];
      const gTex = TextureGenerator.createGiftBoxSprite(gc.color, gc.ribbon);
      const giftBox = new PaperBillboard(gTex, 3.2, 3.2, { isFloating: true });
      giftBox.setPosition(gc.x, 0.4, gc.z);
      this.scene.add(giftBox.group);
      this.billboards.push(giftBox);

      this.addInteractive('gift', `gift-${gc.id}`, { x: gc.x, y: 0, z: gc.z }, {
        gift: giftData,
        mesh: giftBox
      });
    });

    // Decorative Yellow Tree
    const treeTex = TextureGenerator.createTreeSprite(2);
    const tree = new PaperBillboard(treeTex, 8, 11);
    tree.setPosition(24, 0, -28);
    this.scene.add(tree.group);
    this.billboards.push(tree);
  }

  /**
   * Zone 5: Light Path / Thông Điệp (x: -16, z: -37.5)
   */
  buildZone5LightPath() {
    // 1. Glowing Road Signs / Quote lanterns in the message area
    const quotes = birthdayConfig.quotes;
    const pathNodes = [
      { x: -20, z: -34, text: "✨ DREAM" },
      { x: -13, z: -37, text: "🌸 SHINE" },
      { x: -19, z: -41, text: "❤️ SMILE" }
    ];

    pathNodes.forEach((node, i) => {
      const signTex = TextureGenerator.createRoadSignSprite(node.text);
      const sign = new PaperBillboard(signTex, 3.5, 3.5);
      sign.setPosition(node.x, 0, node.z);
      this.scene.add(sign.group);
      this.billboards.push(sign);

      this.addInteractive('quote', `quote-${i}`, { x: node.x, y: 0, z: node.z }, {
        quoteText: quotes[i % quotes.length]
      });
    });

    // 2. Wish Star #4 in Light Path / Thông Điệp Area
    const starTex = TextureGenerator.createWishStarSprite();
    const star4 = new PaperBillboard(starTex, 3.2, 3.2, { isFloating: true, swaySpeed: 2.3 });
    star4.setPosition(-16, 1.2, -37.5);
    this.scene.add(star4.group);
    this.billboards.push(star4);

    this.addInteractive('star', 'star-4', { x: -16, y: 0, z: -37.5 }, {
      starIndex: 4,
      starMesh: star4,
      name: "Ngôi Sao Ánh Sáng"
    });
  }

  /**
   * Zone 6: Birthday Castle & Giant Cake Stage (x: 0, z: -56 to -65)
   */
  buildZone6BirthdayCastle() {
    // 1. Fairytale Castle Backdrop (x: 0, z: -65)
    const castleTex = TextureGenerator.createCastleSprite();
    const castle = new PaperBillboard(castleTex, 24, 19, { swayIntensity: 0.003 });
    castle.setPosition(0, 0, -65);
    this.scene.add(castle.group);
    this.billboards.push(castle);

    // 2. Giant 3-Tier Birthday Cake in front of Castle (x: 0, z: -56)
    const cakeTex = TextureGenerator.createGiantCakeSprite();
    this.cakeObject = new PaperBillboard(cakeTex, 11, 11, { swayIntensity: 0.015 });
    this.cakeObject.setPosition(0, 0, -56);
    this.scene.add(this.cakeObject.group);
    this.billboards.push(this.cakeObject);

    // 3. Wish Star #5 over Cake (in front of cake stage)
    const starTex = TextureGenerator.createWishStarSprite();
    const star5 = new PaperBillboard(starTex, 3.6, 3.6, { isFloating: true, swaySpeed: 3.0 });
    star5.setPosition(0, 1.4, -51);
    this.scene.add(star5.group);
    this.billboards.push(star5);

    this.addInteractive('star', 'star-5', { x: 0, y: 0, z: -51 }, {
      starIndex: 5,
      starMesh: star5,
      name: "Ngôi Sao Sinh Nhật"
    });

    // 4. Cake Stage Interactive Trigger
    this.addInteractive('cake', 'cake-stage', { x: 0, y: 0, z: -55 }, {
      radius: 4.2,
      name: "Sân Khấu Bánh Kem Khổng Lồ"
    });

    // 5. Floating Destination Beacon above Cake Stage (x: 0, y: 11.5, z: -55)
    const beaconTex = TextureGenerator.createCakeBeaconSprite();
    this.cakeBeacon = new PaperBillboard(beaconTex, 9.0, 4.0, { isFloating: true, floatHeight: 0.6, swaySpeed: 3.5 });
    this.cakeBeacon.setPosition(0, 11.5, -55);
    this.cakeBeacon.group.visible = false; // Appears when 5/5 stars collected!
    this.scene.add(this.cakeBeacon.group);
    this.billboards.push(this.cakeBeacon);
  }

  activateCakeBeacon() {
    if (this.cakeBeacon) {
      this.cakeBeacon.group.visible = true;
    }
  }

  /**
   * Decorative Trees, Bushes & Mountains on the edges
   */
  buildSurroundingDecor() {
    const decorTrees = [
      { x: -35, z: 20, v: 0, s: 8 },
      { x: 35, z: 22, v: 2, s: 9 },
      { x: -38, z: 2, v: 1, s: 8.5 },
      { x: 36, z: -2, v: 3, s: 8 },
      { x: -34, z: -30, v: 0, s: 9 },
      { x: 35, z: -40, v: 1, s: 8.5 },
      { x: -25, z: -60, v: 2, s: 10 },
      { x: 25, z: -60, v: 3, s: 10 }
    ];

    decorTrees.forEach(dt => {
      const tex = TextureGenerator.createTreeSprite(dt.v);
      const tree = new PaperBillboard(tex, dt.s, dt.s * 1.4);
      tree.setPosition(dt.x, 0, dt.z);
      this.scene.add(tree.group);
      this.billboards.push(tree);
    });
  }

  /**
   * Cute Storybook Animals, Hot Air Balloons, Lamps & Forest Details
   */
  buildCuteFaunaAndProps() {
    // 1. Pastel Storybook Rainbow Arch (over castle in sky)
    const rainbowTex = TextureGenerator.createRainbowArchSprite();
    const rainbow = new PaperBillboard(rainbowTex, 44, 25, { swayIntensity: 0.001 });
    rainbow.setPosition(0, 16, -68);
    this.scene.add(rainbow.group);
    this.billboards.push(rainbow);

    // 2. Floral Storybook Arches with Bunting Flags
    const archTex = TextureGenerator.createFloralArchSprite();
    const arch1 = new PaperBillboard(archTex, 8.0, 7.2, { swayIntensity: 0.004 });
    arch1.setPosition(0, 0, 13);
    this.scene.add(arch1.group);
    this.billboards.push(arch1);

    const arch2 = new PaperBillboard(archTex, 8.0, 7.2, { swayIntensity: 0.004 });
    arch2.setPosition(0, 0, -50);
    this.scene.add(arch2.group);
    this.billboards.push(arch2);

    // 3. Cute Birthday Corgi / Shiba Puppy (Front Yard)
    const corgiTex = TextureGenerator.createPuppyCorgiSprite();
    const corgi = new PaperBillboard(corgiTex, 3.2, 3.8, { isFloating: true, floatHeight: 0.25, swaySpeed: 3.5 });
    corgi.setPosition(-4.5, 0, 28.5);
    this.scene.add(corgi.group);
    this.billboards.push(corgi);

    this.addInteractive('pet', 'pet-corgi', { x: -4.5, y: 0, z: 28.5 }, {
      name: "Cún Corgi Sinh Nhật",
      text: "Gâu gâu! 🐶 Chúc mừng sinh nhật bạn! Chúc bạn tuổi mới lúc nào cũng rực rỡ, may mắn và ngập tràn niềm vui nha! 🎂✨",
      avatar: "🐶"
    });

    // 4. Cute Teddy Bear with Heart Balloon (Meadow Hill)
    const teddyTex = TextureGenerator.createTeddyBearSprite();
    const teddy = new PaperBillboard(teddyTex, 3.4, 4.5, { isFloating: true, floatHeight: 0.25, swaySpeed: 2.0 });
    teddy.setPosition(20, 0, -8);
    this.scene.add(teddy.group);
    this.billboards.push(teddy);

    this.addInteractive('pet', 'pet-teddy', { x: 20, y: 0, z: -8 }, {
      name: "Gấu Bông Teddy",
      text: "Ôm bạn một cái thật ấm áp! 🐻 Dù năm nay bạn bao nhiêu tuổi, bạn vẫn luôn là điều tuyệt vời và đáng yêu nhất! 🎈💖",
      avatar: "🐻"
    });

    // 5. Cute Squirrel with Acorn (Memory Garden Tree)
    const squirrelTex = TextureGenerator.createSquirrelSprite();
    const squirrel = new PaperBillboard(squirrelTex, 2.4, 2.4, { isFloating: true, floatHeight: 0.15, swaySpeed: 4.0 });
    squirrel.setPosition(-18.5, 0, -8);
    this.scene.add(squirrel.group);
    this.billboards.push(squirrel);

    this.addInteractive('pet', 'pet-squirrel', { x: -18.5, y: 0, z: -8 }, {
      name: "Chú Sóc Nhỏ",
      text: "Chít chít! 🐿️ Chú sóc tặng bạn một hạt dẻ may mắn, chúc bạn luôn vui tươi yêu đời! 🌰✨",
      avatar: "🐿️"
    });

    // 6. Vintage Ice Cream & Sweets Cart (Gift Plaza)
    const cartTex = TextureGenerator.createIceCreamCartSprite();
    const cart = new PaperBillboard(cartTex, 5.2, 5.2, { swayIntensity: 0.005 });
    cart.setPosition(19, 0, -21);
    this.scene.add(cart.group);
    this.billboards.push(cart);

    this.addInteractive('pet', 'prop-cart', { x: 19, y: 0, z: -21 }, {
      name: "Xe Kem Sinh Nhật",
      text: "🍦 Ding-dong! Xe kem phục vụ miễn phí cho bạn một ly kem dâu ngọt ngào nhất hôm nay! 🍉🍓",
      avatar: "🍦"
    });

    // 7. Fairy Mailbox with Love Letter (Starting House)
    const mailboxTex = TextureGenerator.createFairyMailboxSprite();
    const mailbox = new PaperBillboard(mailboxTex, 2.6, 3.5, { swayIntensity: 0.01 });
    mailbox.setPosition(4.5, 0, 24);
    this.scene.add(mailbox.group);
    this.billboards.push(mailbox);

    this.addInteractive('pet', 'prop-mailbox', { x: 4.5, y: 0, z: 24 }, {
      name: "Hòm Thư Cổ Tích",
      text: "💌 Lá thư nhắn gửi: \"Chúc cho những ước mơ dịu dàng nhất của bạn đều sẽ trở thành hiện thực!\" ✨",
      avatar: "💌"
    });

    // 8. Cute Hopping Bunnies
    const bunnyTex = TextureGenerator.createBunnySprite();
    const bunny1 = new PaperBillboard(bunnyTex, 2.8, 3.4, { isFloating: true, floatHeight: 0.25, swaySpeed: 3.2 });
    bunny1.setPosition(-21, 0, -1);
    this.scene.add(bunny1.group);
    this.billboards.push(bunny1);

    this.addInteractive('pet', 'pet-bunny', { x: -21, y: 0, z: -1 }, {
      name: "Thỏ Trắng Chibi",
      text: "Cạp cạp... 🐰 Bé thỏ chúc bạn tuổi mới ngọt ngào như củ cà rốt và luôn tươi cười nhé! 🥕✨",
      avatar: "🐰"
    });

    const bunny2 = new PaperBillboard(bunnyTex, 2.6, 3.2, { isFloating: true, floatHeight: 0.2, swaySpeed: 2.8 });
    bunny2.setPosition(11, 0, -19);
    this.scene.add(bunny2.group);
    this.billboards.push(bunny2);

    // 9. Sleeping Calico Kittens
    const kittyTex = TextureGenerator.createKittySprite();
    const kitty1 = new PaperBillboard(kittyTex, 2.8, 2.5, { swayIntensity: 0.005 });
    kitty1.setPosition(4.8, 0, 28);
    this.scene.add(kitty1.group);
    this.billboards.push(kitty1);

    this.addInteractive('pet', 'pet-kitty-1', { x: 4.8, y: 0, z: 28 }, {
      name: "Bé Mèo Ngủ Say",
      text: "Meo meo... 🐱 Mèo con đang mơ thấy bạn thổi nến sinh nhật và ước những điều thật đẹp! 🌸",
      avatar: "🐱"
    });

    const kitty2 = new PaperBillboard(kittyTex, 2.5, 2.2, { swayIntensity: 0.005 });
    kitty2.setPosition(-10.5, 0, -8.5);
    this.scene.add(kitty2.group);
    this.billboards.push(kitty2);

    this.addInteractive('pet', 'pet-kitty-2', { x: -10.5, y: 0, z: -8.5 }, {
      name: "Mèo Con Picnic",
      text: "Purr purr... 🐾 Bé mèo cuộn tròn bên giỏ bánh gửi cho bạn một ngàn sự dễ thương! 💖",
      avatar: "🐾"
    });

    // 10. Swimming Ducklings on River
    const duckTex = TextureGenerator.createDucklingSprite();
    const duckPositions = [
      { x: -8, z: 7.5, s: 2.4 },
      { x: 7, z: 8.5, s: 2.6 },
      { x: 22, z: 7.2, s: 2.3 }
    ];
    duckPositions.forEach(dp => {
      const duck = new PaperBillboard(duckTex, dp.s, dp.s, { isFloating: true, floatHeight: 0.15, swaySpeed: 2.0 });
      duck.setPosition(dp.x, 0.05, dp.z);
      this.scene.add(duck.group);
      this.billboards.push(duck);
    });

    // 11. Whimsical Pastel Hot Air Balloons in Sky
    const balloonTex1 = TextureGenerator.createHotAirBalloonSprite('#FFAAA5', '#FFEAA7');
    const balloon1 = new PaperBillboard(balloonTex1, 6.5, 9.8, { isFloating: true, floatHeight: 1.2, swayIntensity: 0.05, swaySpeed: 1.0 });
    balloon1.setPosition(26, 12, -18);
    this.scene.add(balloon1.group);
    this.billboards.push(balloon1);

    const balloonTex2 = TextureGenerator.createHotAirBalloonSprite('#CDBBFF', '#A8E6CF');
    const balloon2 = new PaperBillboard(balloonTex2, 6.0, 9.0, { isFloating: true, floatHeight: 1.0, swayIntensity: 0.04, swaySpeed: 0.8 });
    balloon2.setPosition(-26, 14, -46);
    this.scene.add(balloon2.group);
    this.billboards.push(balloon2);

    // 12. Fairy Tale Street Lamps
    const lampTex = TextureGenerator.createStreetLampSprite();
    const lampPositions = [
      { x: -3.8, z: 12 },
      { x: 3.8, z: 4 },
      { x: -10, z: -20 },
      { x: 10, z: -32 }
    ];
    lampPositions.forEach(lp => {
      const lamp = new PaperBillboard(lampTex, 2.5, 5.0, { swayIntensity: 0.005 });
      lamp.setPosition(lp.x, 0, lp.z);
      this.scene.add(lamp.group);
      this.billboards.push(lamp);
    });

    // 13. Cute Polka-dot Mushroom Clusters
    const shroomTex = TextureGenerator.createMushroomClusterSprite();
    const shroomPositions = [
      { x: -12, z: 27 },
      { x: 12, z: 26 },
      { x: -22, z: -8 },
      { x: 22, z: -27 }
    ];
    shroomPositions.forEach(sp => {
      const shroom = new PaperBillboard(shroomTex, 2.4, 2.4, { swayIntensity: 0.01 });
      shroom.setPosition(sp.x, 0, sp.z);
      this.scene.add(shroom.group);
      this.billboards.push(shroom);
    });

    // 14. Fluttering Pastel Butterflies
    const bColors = ['#FF7675', '#FFEAA7', '#55EFC4', '#CDBBFF', '#FF9FF3'];
    const bSpawns = [
      { x: -14, y: 2.2, z: -4, color: bColors[0] },
      { x: -18, y: 2.5, z: -8, color: bColors[1] },
      { x: 12, y: 2.3, z: -24, color: bColors[2] },
      { x: 16, y: 2.6, z: -28, color: bColors[3] },
      { x: 0, y: 2.4, z: 10, color: bColors[4] }
    ];
    bSpawns.forEach((bs, i) => {
      const bTex = TextureGenerator.createButterflySprite(bs.color);
      const bMesh = new PaperBillboard(bTex, 1.6, 1.6, { isFloating: true, floatHeight: 0.35, swaySpeed: 4.5 });
      bMesh.setPosition(bs.x, bs.y, bs.z);
      this.scene.add(bMesh.group);
      this.billboards.push(bMesh);
      this.butterflies.push({
        mesh: bMesh,
        baseX: bs.x,
        baseY: bs.y,
        baseZ: bs.z,
        phase: i * 1.3
      });
    });
  }

  update(delta, elapsedTime) {
    // Update all billboard wind swaying & float animations
    for (const b of this.billboards) {
      b.update(delta, elapsedTime);
    }

    // Rotate all Windmill Blades
    for (const wm of this.windmills) {
      if (wm.blades) {
        wm.blades.rotation.z -= delta * wm.speed;
      }
    }

    // Fluttering Butterflies Animation
    for (const bf of this.butterflies) {
      const t = elapsedTime * 1.5 + bf.phase;
      bf.mesh.group.position.x = bf.baseX + Math.sin(t) * 1.5;
      bf.mesh.group.position.z = bf.baseZ + Math.cos(t * 0.8) * 1.2;
      bf.mesh.group.position.y = bf.baseY + Math.sin(t * 2.5) * 0.35;
    }
  }
}

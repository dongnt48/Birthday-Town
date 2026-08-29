/**
 * ==========================================================================
 * Birthday Storybook Town — Procedural Hand-Drawn Crayon Texture Generator
 * ==========================================================================
 * Generates rich, authentic 2.5D paper cutout billboard textures with
 * crayon strokes, paper grain, and clean white die-cut sticker borders.
 */
import * as THREE from 'three';

export class TextureGenerator {
  /**
   * Helper: Add soft paper noise and crayon hatching effect to any 2D canvas context
   */
  static applyCrayonTexture(ctx, width, height, density = 0.08) {
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const len = data.length;

    for (let i = 0; i < len; i += 4) {
      if (data[i + 3] > 10) { // only on colored pixels
        const noise = (Math.random() - 0.5) * 35;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  /**
   * Helper: Create canvas texture from drawing callback
   */
  static createCanvasTexture(width, height, drawFn) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    drawFn(ctx, width, height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }

  /**
   * 1. Ground Grass Texture with Crayon Hatching & Flowers
   */
  static createGrassTexture() {
    return this.createCanvasTexture(512, 512, (ctx, w, h) => {
      // Base soft vibrant pastel mint green
      ctx.fillStyle = '#9FE295';
      ctx.fillRect(0, 0, w, h);

      // Crayon watercolor variations
      const patches = [
        { x: 110, y: 120, r: 85, c: '#B2ECA7' },
        { x: 380, y: 140, r: 100, c: '#86CD7A' },
        { x: 200, y: 360, r: 120, c: '#BAF0AF' },
        { x: 410, y: 400, r: 90, c: '#8ED282' }
      ];
      patches.forEach(p => {
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Little grass tufts & crayon blades
      ctx.strokeStyle = '#4F9434';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      for (let i = 0; i < 180; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 3 + Math.random() * 6, y - 8 - Math.random() * 8);
        ctx.stroke();
      }

      // Little pastel flower dots
      const flowerColors = ['#FFAAA5', '#FF8B94', '#FFEAA7', '#CDBBFF', '#FFFFFF', '#FFD166'];
      for (let i = 0; i < 110; i++) {
        ctx.fillStyle = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        const x = Math.random() * w;
        const y = Math.random() * h;
        ctx.beginPath();
        ctx.arc(x, y, 2.5 + Math.random() * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      this.applyCrayonTexture(ctx, w, h);
    });
  }

  /**
   * 1.1 Crayon Dirt Path Texture with Paper Stitching
   */
  static createPathTexture() {
    return this.createCanvasTexture(256, 512, (ctx, w, h) => {
      // Warm biscuit sand path
      ctx.fillStyle = '#FEE8C8';
      ctx.fillRect(0, 0, w, h);

      // Crayon texture variations
      ctx.fillStyle = '#F8D4A0';
      for (let i = 0; i < 35; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * w, Math.random() * h, 12 + Math.random() * 24, 0, Math.PI * 2);
        ctx.fill();
      }

      // White paper stitched borders
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(10, h);
      ctx.moveTo(w - 10, 0);
      ctx.lineTo(w - 10, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // Small stone pebbles
      ctx.fillStyle = '#E2B176';
      for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * w, Math.random() * h, 2 + Math.random() * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      this.applyCrayonTexture(ctx, w, h);
    });
  }

  /**
   * 2. Starting House Paper Cutout Sprite
   */
  static createHouseSprite() {
    return this.createCanvasTexture(512, 512, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 20);

      // White die-cut outline background
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      // House Body Outline
      ctx.beginPath();
      // Chimney
      ctx.rect(50, -320, 40, 90);
      // Walls
      ctx.rect(-140, -220, 280, 220);
      // Roof Triangle
      ctx.moveTo(-170, -210);
      ctx.lineTo(0, -350);
      ctx.lineTo(170, -210);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Chimney fill
      ctx.fillStyle = '#F6AFA1';
      ctx.fillRect(54, -315, 32, 85);

      // House Walls fill (Warm cream)
      ctx.fillStyle = '#FFFDF9';
      ctx.fillRect(-135, -215, 270, 215);

      // Wall texture lines
      ctx.strokeStyle = '#EAD7C5';
      ctx.lineWidth = 2;
      for (let y = -200; y < 0; y += 30) {
        ctx.beginPath();
        ctx.moveTo(-130, y);
        ctx.lineTo(130, y);
        ctx.stroke();
      }

      // Roof Crayon Red/Peach
      ctx.fillStyle = '#FF7675';
      ctx.beginPath();
      ctx.moveTo(-165, -210);
      ctx.lineTo(0, -345);
      ctx.lineTo(165, -210);
      ctx.closePath();
      ctx.fill();

      // Roof shingles pattern
      ctx.strokeStyle = '#D63031';
      ctx.lineWidth = 3;
      for (let y = -310; y < -210; y += 25) {
        const span = (y - (-345)) * 1.25;
        ctx.beginPath();
        ctx.moveTo(-span, y);
        ctx.lineTo(span, y);
        ctx.stroke();
      }

      // Round Attic Window
      ctx.fillStyle = '#BFE3FF';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, -270, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Door (Mint green)
      ctx.fillStyle = '#55EFC4';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.roundRect(-35, -110, 70, 110, [25, 25, 0, 0]);
      ctx.fill();
      ctx.stroke();

      // Door knob
      ctx.fillStyle = '#FFEAA7';
      ctx.beginPath();
      ctx.arc(20, -55, 6, 0, Math.PI * 2);
      ctx.fill();

      // Windows
      const drawWindow = (wx, wy) => {
        ctx.fillStyle = '#BFE3FF';
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 5;
        ctx.fillRect(wx - 26, wy - 30, 52, 60);
        ctx.strokeRect(wx - 26, wy - 30, 52, 60);

        // Flower box
        ctx.fillStyle = '#FDCB6E';
        ctx.fillRect(wx - 32, wy + 26, 64, 16);
        ctx.fillStyle = '#FF8B94';
        for (let i = -24; i <= 24; i += 12) {
          ctx.beginPath();
          ctx.arc(wx + i, wy + 24, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      };
      drawWindow(-85, -110);
      drawWindow(85, -110);

      // Birthday Bunting Banner under roof
      const bannerColors = ['#FFAAA5', '#FFEAA7', '#A8E6CF', '#CDBBFF', '#FF7675'];
      ctx.strokeStyle = '#8D6E63';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-140, -195);
      ctx.quadraticCurveTo(0, -180, 140, -195);
      ctx.stroke();

      for (let i = 0; i < 9; i++) {
        const t = (i + 0.5) / 9;
        const bx = -130 + t * 260;
        const by = -195 + Math.sin(t * Math.PI) * 12;
        ctx.fillStyle = bannerColors[i % bannerColors.length];
        ctx.beginPath();
        ctx.moveTo(bx - 10, by);
        ctx.lineTo(bx + 10, by);
        ctx.lineTo(bx, by + 18);
        ctx.closePath();
        ctx.fill();
      }

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 3. Windmill Paper Cutout (Base & Blades separate)
   */
  static createWindmillBodySprite(roofColor = '#FDCB6E', towerColor = '#FFFDF9', doorColor = '#E17055') {
    return this.createCanvasTexture(256, 512, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 20);

      // White outline
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(-60, 0);
      ctx.lineTo(-40, -320);
      ctx.lineTo(0, -380);
      ctx.lineTo(40, -320);
      ctx.lineTo(60, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Tower Fill
      ctx.fillStyle = towerColor;
      ctx.beginPath();
      ctx.moveTo(-54, 0);
      ctx.lineTo(-36, -315);
      ctx.lineTo(0, -370);
      ctx.lineTo(36, -315);
      ctx.lineTo(54, 0);
      ctx.closePath();
      ctx.fill();

      // Roof
      ctx.fillStyle = roofColor;
      ctx.beginPath();
      ctx.moveTo(-42, -315);
      ctx.lineTo(0, -375);
      ctx.lineTo(42, -315);
      ctx.closePath();
      ctx.fill();

      // Brick marks
      ctx.strokeStyle = '#EAD7C5';
      ctx.lineWidth = 2;
      for (let y = -280; y < 0; y += 35) {
        const span = 45 - (y / -300) * 15;
        ctx.beginPath();
        ctx.moveTo(-span, y);
        ctx.lineTo(span, y);
        ctx.stroke();
      }

      // Small door
      ctx.fillStyle = doorColor;
      ctx.beginPath();
      ctx.roundRect(-20, -60, 40, 60, [15, 15, 0, 0]);
      ctx.fill();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  static createWindmillBladesSprite(bladeColors = ['#FF7675', '#FFEAA7', '#55EFC4', '#CDBBFF']) {
    return this.createCanvasTexture(256, 256, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h / 2);

      for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 2);

        // Blade Outline
        ctx.strokeStyle = '#FFFFFF';
        ctx.fillStyle = '#FFFFFF';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(16, -20);
        ctx.lineTo(24, -105);
        ctx.lineTo(-24, -105);
        ctx.lineTo(-16, -20);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        // Blade sail fill
        ctx.fillStyle = bladeColors[i % bladeColors.length];
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(12, -22);
        ctx.lineTo(20, -100);
        ctx.lineTo(-20, -100);
        ctx.lineTo(-12, -22);
        ctx.closePath();
        ctx.fill();

        // Grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -100);
        ctx.moveTo(-16, -55);
        ctx.lineTo(16, -55);
        ctx.stroke();

        ctx.restore();
      }

      // Center peg
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#E17055';
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 3.1 Cute Chibi Bunny Sprite
   */
  static createBunnySprite() {
    return this.createCanvasTexture(200, 240, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 15);

      // White outline
      ctx.lineWidth = 12;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      // Body
      ctx.ellipse(0, -50, 48, 42, 0, 0, Math.PI * 2);
      // Head
      ctx.ellipse(0, -115, 42, 36, 0, 0, Math.PI * 2);
      // Left Ear
      ctx.ellipse(-18, -175, 14, 38, -0.15, 0, Math.PI * 2);
      // Right Ear
      ctx.ellipse(18, -175, 14, 38, 0.15, 0, Math.PI * 2);
      // Tail
      ctx.arc(38, -42, 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();

      // Bunny Body Fill (Fluffy cream-white)
      ctx.fillStyle = '#FFFDF9';
      ctx.beginPath();
      ctx.ellipse(0, -50, 44, 38, 0, 0, Math.PI * 2);
      ctx.ellipse(0, -115, 38, 32, 0, 0, Math.PI * 2);
      ctx.arc(36, -42, 12, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.beginPath();
      ctx.ellipse(-18, -175, 11, 35, -0.15, 0, Math.PI * 2);
      ctx.ellipse(18, -175, 11, 35, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Inner Ears (Blush pink)
      ctx.fillStyle = '#FFAAA5';
      ctx.beginPath();
      ctx.ellipse(-18, -175, 6, 26, -0.15, 0, Math.PI * 2);
      ctx.ellipse(18, -175, 6, 26, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Eyes (Kawaii dots)
      ctx.fillStyle = '#5D4037';
      ctx.beginPath();
      ctx.arc(-14, -116, 4, 0, Math.PI * 2);
      ctx.arc(14, -116, 4, 0, Math.PI * 2);
      ctx.fill();

      // Cheeks (Blush)
      ctx.fillStyle = '#FF7675';
      ctx.beginPath();
      ctx.arc(-22, -106, 6, 0, Math.PI * 2);
      ctx.arc(22, -106, 6, 0, Math.PI * 2);
      ctx.fill();

      // Nose & Mouth
      ctx.fillStyle = '#FF8B94';
      ctx.beginPath();
      ctx.arc(0, -110, 3, 0, Math.PI * 2);
      ctx.fill();

      // Tiny carrot in paws
      ctx.fillStyle = '#FF9F43';
      ctx.beginPath();
      ctx.moveTo(-8, -75);
      ctx.lineTo(8, -75);
      ctx.lineTo(0, -50);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#55EFC4';
      ctx.beginPath();
      ctx.arc(0, -78, 5, 0, Math.PI * 2);
      ctx.fill();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 3.2 Cute Sleeping Kitten Sprite
   */
  static createKittySprite() {
    return this.createCanvasTexture(200, 180, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 15);

      // White outline
      ctx.lineWidth = 12;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.ellipse(0, -45, 54, 40, 0, 0, Math.PI * 2);
      // Ears
      ctx.moveTo(-45, -70);
      ctx.lineTo(-30, -105);
      ctx.lineTo(-12, -75);
      ctx.moveTo(12, -75);
      ctx.lineTo(30, -105);
      ctx.lineTo(45, -70);
      ctx.stroke();
      ctx.fill();

      // Body (Warm cream with peach spots)
      ctx.fillStyle = '#FFF8EE';
      ctx.beginPath();
      ctx.ellipse(0, -45, 50, 36, 0, 0, Math.PI * 2);
      ctx.fill();

      // Calico Patch
      ctx.fillStyle = '#FFAAA5';
      ctx.beginPath();
      ctx.arc(20, -50, 24, 0, Math.PI * 2);
      ctx.fill();

      // Ears Fill
      ctx.fillStyle = '#FFF8EE';
      ctx.beginPath();
      ctx.moveTo(-42, -68);
      ctx.lineTo(-28, -100);
      ctx.lineTo(-12, -72);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(12, -72);
      ctx.lineTo(28, -100);
      ctx.lineTo(42, -68);
      ctx.closePath();
      ctx.fill();

      // Inner Ear Pink
      ctx.fillStyle = '#FFB6B9';
      ctx.beginPath();
      ctx.moveTo(-36, -70);
      ctx.lineTo(-28, -92);
      ctx.lineTo(-18, -72);
      ctx.closePath();
      ctx.moveTo(18, -72);
      ctx.lineTo(28, -92);
      ctx.lineTo(36, -70);
      ctx.closePath();
      ctx.fill();

      // Sleeping Eyes (^.^)
      ctx.strokeStyle = '#6D4C41';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(-18, -48, 6, Math.PI, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(18, -48, 6, Math.PI, 0);
      ctx.stroke();

      // Tiny nose & floating heart
      ctx.fillStyle = '#FF7675';
      ctx.beginPath();
      ctx.arc(0, -40, 3, 0, Math.PI * 2);
      ctx.fill();

      // "Zzz" bubble
      ctx.fillStyle = '#CDBBFF';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('z', 38, -80);
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('Z', 48, -95);

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 3.3 Whimsical Pastel Hot Air Balloon
   */
  static createHotAirBalloonSprite(color1 = '#FFAAA5', color2 = '#FFEAA7') {
    return this.createCanvasTexture(256, 384, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 20);

      // White outline
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      // Balloon bulb
      ctx.arc(0, -230, 85, 0.25 * Math.PI, 0.75 * Math.PI, true);
      ctx.lineTo(-28, -135);
      ctx.lineTo(28, -135);
      ctx.closePath();
      // Basket
      ctx.roundRect(-24, -75, 48, 45, 8);
      ctx.stroke();
      ctx.fill();

      // Striped Balloon Bulb
      const stripes = 5;
      const stripeW = 160 / stripes;
      for (let i = 0; i < stripes; i++) {
        ctx.fillStyle = (i % 2 === 0) ? color1 : color2;
        ctx.beginPath();
        ctx.arc(0, -230, 80, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillRect(-80 + i * stripeW, -320, stripeW, 200);
      }
      ctx.restore();

      ctx.save();
      ctx.translate(w / 2, h - 20);

      // Ropes
      ctx.strokeStyle = '#8D6E63';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-22, -135);
      ctx.lineTo(-18, -75);
      ctx.moveTo(22, -135);
      ctx.lineTo(18, -75);
      ctx.moveTo(-8, -135);
      ctx.lineTo(-8, -75);
      ctx.moveTo(8, -135);
      ctx.lineTo(8, -75);
      ctx.stroke();

      // Wicker Basket
      ctx.fillStyle = '#D4A373';
      ctx.beginPath();
      ctx.roundRect(-22, -72, 44, 40, 6);
      ctx.fill();

      // Bunting Garland on balloon
      ctx.strokeStyle = '#FFFDF9';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, -230, 65, 0.3 * Math.PI, 0.7 * Math.PI);
      ctx.stroke();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 3.4 Cute Little Swimming Duckling / Swan
   */
  static createDucklingSprite() {
    return this.createCanvasTexture(180, 180, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 20);

      // White outline
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      // Body
      ctx.ellipse(0, -35, 42, 28, 0, 0, Math.PI * 2);
      // Head
      ctx.arc(22, -68, 22, 0, Math.PI * 2);
      // Tail
      ctx.moveTo(-35, -45);
      ctx.lineTo(-52, -60);
      ctx.lineTo(-30, -30);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Duckling Yellow Body
      ctx.fillStyle = '#FFEAA7';
      ctx.beginPath();
      ctx.ellipse(0, -35, 38, 24, 0, 0, Math.PI * 2);
      ctx.arc(22, -68, 19, 0, Math.PI * 2);
      ctx.fill();

      // Wing
      ctx.fillStyle = '#FDCB6E';
      ctx.beginPath();
      ctx.ellipse(-6, -38, 18, 12, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Orange Beak
      ctx.fillStyle = '#FF7675';
      ctx.beginPath();
      ctx.moveTo(38, -70);
      ctx.lineTo(54, -65);
      ctx.lineTo(38, -60);
      ctx.closePath();
      ctx.fill();

      // Eye
      ctx.fillStyle = '#5D4037';
      ctx.beginPath();
      ctx.arc(28, -72, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Blush
      ctx.fillStyle = '#FFAAA5';
      ctx.beginPath();
      ctx.arc(24, -63, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Water ripple beneath
      ctx.strokeStyle = '#E1F5FE';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, -5, 45, 8, 0, 0, Math.PI * 2);
      ctx.stroke();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 3.5 Cute Paper Cutout Mushroom Cluster
   */
  static createMushroomClusterSprite() {
    return this.createCanvasTexture(180, 180, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 15);

      // White outline
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      // Big Mushroom Cap
      ctx.arc(-10, -65, 42, Math.PI, 0);
      ctx.rect(-22, -65, 24, 65);
      // Small Mushroom Cap
      ctx.arc(32, -45, 26, Math.PI, 0);
      ctx.rect(22, -45, 20, 45);
      ctx.stroke();
      ctx.fill();

      // Stems
      ctx.fillStyle = '#FFF8EE';
      ctx.fillRect(-18, -60, 16, 60);
      ctx.fillRect(25, -42, 14, 42);

      // Big Cap (Pinkish Coral)
      ctx.fillStyle = '#FF7675';
      ctx.beginPath();
      ctx.arc(-10, -65, 38, Math.PI, 0);
      ctx.fill();

      // Small Cap (Soft Lavender)
      ctx.fillStyle = '#CDBBFF';
      ctx.beginPath();
      ctx.arc(32, -45, 23, Math.PI, 0);
      ctx.fill();

      // White Polka Dots on Big Cap
      ctx.fillStyle = '#FFFFFF';
      [[-25, -80, 5], [-5, -92, 6], [10, -78, 5], [-12, -72, 4]].forEach(([dx, dy, dr]) => {
        ctx.beginPath();
        ctx.arc(dx, dy, dr, 0, Math.PI * 2);
        ctx.fill();
      });

      // Dots on Small Cap
      [[25, -58, 3.5], [38, -55, 3.5], [32, -62, 4]].forEach(([dx, dy, dr]) => {
        ctx.beginPath();
        ctx.arc(dx, dy, dr, 0, Math.PI * 2);
        ctx.fill();
      });

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 3.6 Fairy Tale Vintage Street Lamp Post
   */
  static createStreetLampSprite() {
    return this.createCanvasTexture(160, 320, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 15);

      // White outline
      ctx.lineWidth = 12;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      // Base & Pole
      ctx.roundRect(-16, -20, 32, 20, 6);
      ctx.rect(-6, -240, 12, 230);
      // Lantern
      ctx.roundRect(-26, -280, 52, 50, 8);
      // Cap
      ctx.moveTo(-32, -280);
      ctx.lineTo(0, -310);
      ctx.lineTo(32, -280);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Dark Wood / Metal Pole
      ctx.fillStyle = '#6D4C41';
      ctx.fillRect(-4, -240, 8, 230);
      ctx.fillRect(-12, -16, 24, 16);

      // Glowing Lantern Glass
      ctx.fillStyle = '#FFF3B0';
      ctx.beginPath();
      ctx.roundRect(-22, -276, 44, 42, 6);
      ctx.fill();

      // Glow Halo
      ctx.fillStyle = 'rgba(255, 234, 167, 0.6)';
      ctx.beginPath();
      ctx.arc(0, -255, 32, 0, Math.PI * 2);
      ctx.fill();

      // Lantern Cap
      ctx.fillStyle = '#5D4037';
      ctx.beginPath();
      ctx.moveTo(-28, -276);
      ctx.lineTo(0, -305);
      ctx.lineTo(28, -276);
      ctx.closePath();
      ctx.fill();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 4. Hand-Drawn Trees (Pastel Crayon Foliage)
   */
  static createTreeSprite(variant = 0) {
    return this.createCanvasTexture(256, 384, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 15);

      // White cutout outline
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      // Trunk outline
      ctx.beginPath();
      ctx.moveTo(-24, 0);
      ctx.lineTo(-18, -140);
      ctx.lineTo(18, -140);
      ctx.lineTo(24, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Trunk Fill (Warm crayon wood)
      ctx.fillStyle = '#A0522D';
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(-12, -140);
      ctx.lineTo(12, -140);
      ctx.lineTo(18, 0);
      ctx.closePath();
      ctx.fill();

      // Tree Foliage
      const foliageColors = [
        ['#55EFC4', '#00B894'], // Mint
        ['#FFAAA5', '#FF7675'], // Peach blossom
        ['#FFEAA7', '#FDCB6E'], // Golden
        ['#CDBBFF', '#A29BFE']  // Lavender
      ];
      const [lightColor, darkColor] = foliageColors[variant % foliageColors.length];

      // White outline around foliage cloud
      ctx.beginPath();
      const circles = [
        { x: 0, y: -230, r: 65 },
        { x: -50, y: -190, r: 55 },
        { x: 50, y: -190, r: 55 },
        { x: -40, y: -260, r: 45 },
        { x: 40, y: -260, r: 45 },
        { x: 0, y: -300, r: 40 }
      ];

      circles.forEach(c => {
        ctx.arc(c.x, c.y, c.r + 6, 0, Math.PI * 2);
      });
      ctx.stroke();
      ctx.fill();

      // Dark foliage base
      ctx.fillStyle = darkColor;
      circles.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y + 4, c.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Light foliage top highlight
      ctx.fillStyle = lightColor;
      circles.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y - 2, c.r - 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Little fruit or flower accents
      ctx.fillStyle = '#FFFDF9';
      for (let i = 0; i < 12; i++) {
        const rx = (Math.random() - 0.5) * 110;
        const ry = -240 + (Math.random() - 0.5) * 90;
        ctx.beginPath();
        ctx.arc(rx, ry, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 5. Memory Garden Photo Tree Sprite
   */
  static createMemoryTreeSprite() {
    return this.createCanvasTexture(384, 440, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 20);

      // Large tree outline
      ctx.lineWidth = 16;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, -250, 115, 0, Math.PI * 2);
      ctx.rect(-30, -180, 60, 180);
      ctx.stroke();
      ctx.fill();

      // Trunk
      ctx.fillStyle = '#8D6E63';
      ctx.fillRect(-22, -180, 44, 180);

      // Foliage (Soft Romantic Peach & Pink)
      ctx.fillStyle = '#FFB6B9';
      ctx.beginPath();
      ctx.arc(0, -250, 110, 0, Math.PI * 2);
      ctx.fill();

      // Hanging Strings
      ctx.strokeStyle = '#E0A899';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);

      const polaroids = [
        { x: -65, y: -190, rot: -0.15 },
        { x: 0, y: -160, rot: 0.08 },
        { x: 65, y: -195, rot: 0.18 }
      ];

      polaroids.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(p.x, -260);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Draw Mini Hanging Polaroids on the tree
      polaroids.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        // Polaroid Frame
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#FFAAA5';
        ctx.lineWidth = 2;
        ctx.fillRect(-22, -26, 44, 52);
        ctx.strokeRect(-22, -26, 44, 52);

        // Photo Area
        ctx.fillStyle = '#FBE2D5';
        ctx.fillRect(-18, -22, 36, 30);

        // Heart or Star in photo
        ctx.fillStyle = '#FF7675';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('❤️', 0, -7);

        ctx.restore();
      });

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 6. Wish Bridge Paper Cutout Sprite
   */
  static createWishBridgeSprite() {
    return this.createCanvasTexture(384, 256, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 20);

      // White outline
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(-160, 0);
      ctx.quadraticCurveTo(0, -90, 160, 0);
      ctx.lineTo(160, -35);
      ctx.quadraticCurveTo(0, -125, -160, -35);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Bridge Base Plank (Warm Wood)
      ctx.fillStyle = '#D4A373';
      ctx.beginPath();
      ctx.moveTo(-155, 0);
      ctx.quadraticCurveTo(0, -85, 155, 0);
      ctx.lineTo(155, -30);
      ctx.quadraticCurveTo(0, -115, -155, -30);
      ctx.closePath();
      ctx.fill();

      // Planks Separators
      ctx.strokeStyle = '#8D6E63';
      ctx.lineWidth = 3;
      for (let i = -140; i <= 140; i += 22) {
        const t = (i + 140) / 280;
        const by = -Math.sin(t * Math.PI) * 48;
        ctx.beginPath();
        ctx.moveTo(i, by);
        ctx.lineTo(i, by - 30);
        ctx.stroke();
      }

      // Bridge Railing Posts
      ctx.fillStyle = '#FAEDCD';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4;
      [-130, -65, 0, 65, 130].forEach(rx => {
        const t = (rx + 140) / 280;
        const by = -Math.sin(t * Math.PI) * 48 - 30;
        ctx.fillRect(rx - 6, by - 35, 12, 40);
        ctx.strokeRect(rx - 6, by - 35, 12, 40);

        // Star topper on posts
        ctx.fillStyle = '#FFEAA7';
        ctx.beginPath();
        ctx.arc(rx, by - 38, 7, 0, Math.PI * 2);
        ctx.fill();
      });

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 7. Gift Box Paper Cutout Sprite
   */
  static createGiftBoxSprite(color = '#FFAAA5', ribbonColor = '#FFEAA7') {
    return this.createCanvasTexture(256, 256, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 20);

      // White outline
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      // Box body outline
      ctx.beginPath();
      ctx.rect(-60, -110, 120, 110);
      ctx.rect(-68, -135, 136, 30); // Lid
      ctx.stroke();
      ctx.fill();

      // Box Body
      ctx.fillStyle = color;
      ctx.fillRect(-54, -105, 108, 105);

      // Lid
      ctx.fillRect(-62, -130, 124, 25);

      // Vertical Ribbon
      ctx.fillStyle = ribbonColor;
      ctx.fillRect(-12, -130, 24, 130);

      // Horizontal Ribbon
      ctx.fillRect(-54, -65, 108, 20);

      // Bow on Top
      ctx.fillStyle = ribbonColor;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4;

      // Left Loop
      ctx.beginPath();
      ctx.ellipse(-22, -145, 20, 12, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Right Loop
      ctx.beginPath();
      ctx.ellipse(22, -145, 20, 12, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Center Knot
      ctx.beginPath();
      ctx.arc(0, -138, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 8. Wish Star Collectible Token Sprite
   */
  static createWishStarSprite() {
    return this.createCanvasTexture(180, 180, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h / 2);

      const drawStar = (cx, cy, spikes, outerRadius, innerRadius) => {
        let rot = (Math.PI / 2) * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
          x = cx + Math.cos(rot) * outerRadius;
          y = cy + Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;

          x = cx + Math.cos(rot) * innerRadius;
          y = cy + Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
      };

      // White outline
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';
      drawStar(0, 0, 5, 65, 32);
      ctx.stroke();
      ctx.fill();

      // Star Gradient Fill
      const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 60);
      grad.addColorStop(0, '#FFF9E6');
      grad.addColorStop(0.5, '#FFEAA7');
      grad.addColorStop(1, '#FDCB6E');
      ctx.fillStyle = grad;
      drawStar(0, 0, 5, 58, 28);
      ctx.fill();

      // Cute Eyes on Star
      ctx.fillStyle = '#6D4C41';
      ctx.beginPath();
      ctx.arc(-12, -4, 4, 0, Math.PI * 2);
      ctx.arc(12, -4, 4, 0, Math.PI * 2);
      ctx.fill();

      // Cheeks
      ctx.fillStyle = '#FF7675';
      ctx.beginPath();
      ctx.arc(-18, 4, 4, 0, Math.PI * 2);
      ctx.arc(18, 4, 4, 0, Math.PI * 2);
      ctx.fill();

      // Smile
      ctx.strokeStyle = '#6D4C41';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0.2, Math.PI - 0.2);
      ctx.stroke();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 9. Birthday Castle Paper Cutout Sprite
   */
  static createCastleSprite() {
    return this.createCanvasTexture(640, 512, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 20);

      // White Die-cut outline
      ctx.lineWidth = 16;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      // Main Center Wall
      ctx.rect(-160, -260, 320, 260);
      // Left Tower
      ctx.rect(-240, -340, 90, 340);
      // Right Tower
      ctx.rect(150, -340, 90, 340);
      // Center Tower Spire
      ctx.moveTo(-70, -260);
      ctx.lineTo(0, -390);
      ctx.lineTo(70, -260);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Stone Wall Fill (Soft warm pastel purple/parchment)
      ctx.fillStyle = '#FDFBF7';
      ctx.fillRect(-150, -250, 300, 250);

      // Towers Fill
      ctx.fillStyle = '#F7EFFC';
      ctx.fillRect(-230, -330, 75, 330);
      ctx.fillRect(155, -330, 75, 330);

      // Tower Roof Cones (Lavender pastel)
      const drawRoof = (rx, ry, rw, rh, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(rx - rw / 2, ry);
        ctx.lineTo(rx, ry - rh);
        ctx.lineTo(rx + rw / 2, ry);
        ctx.closePath();
        ctx.fill();

        // Flag on spire
        ctx.strokeStyle = '#D4A373';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(rx, ry - rh);
        ctx.lineTo(rx, ry - rh - 28);
        ctx.stroke();

        ctx.fillStyle = '#FF7675';
        ctx.beginPath();
        ctx.moveTo(rx, ry - rh - 28);
        ctx.lineTo(rx + 22, ry - rh - 20);
        ctx.lineTo(rx, ry - rh - 12);
        ctx.closePath();
        ctx.fill();
      };

      drawRoof(-192, -330, 95, 80, '#CDBBFF');
      drawRoof(192, -330, 95, 80, '#CDBBFF');
      drawRoof(0, -250, 130, 110, '#FFAAA5');

      // Castle Arch Gate
      ctx.fillStyle = '#8E7CC3';
      ctx.beginPath();
      ctx.roundRect(-45, -120, 90, 120, [45, 45, 0, 0]);
      ctx.fill();

      // Wooden Door slats
      ctx.strokeStyle = '#D4A373';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, -120);
      ctx.lineTo(0, 0);
      ctx.stroke();

      // Banners & Streamers across Castle
      ctx.strokeStyle = '#FFAAA5';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-150, -220);
      ctx.quadraticCurveTo(0, -195, 150, -220);
      ctx.stroke();

      // "HAPPY BIRTHDAY" Tiny Letter Flags
      const flagColors = ['#FF7675', '#FFEAA7', '#55EFC4', '#CDBBFF', '#FF9FF3', '#FDCB6E'];
      for (let i = 0; i < 9; i++) {
        const t = (i + 0.5) / 9;
        const fx = -130 + t * 260;
        const fy = -220 + Math.sin(t * Math.PI) * 16;
        ctx.fillStyle = flagColors[i % flagColors.length];
        ctx.beginPath();
        ctx.moveTo(fx - 9, fy);
        ctx.lineTo(fx + 9, fy);
        ctx.lineTo(fx, fy + 16);
        ctx.closePath();
        ctx.fill();
      }

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 10. Giant Birthday Cake Paper Cutout Sprite (3-Tier with candles)
   */
  static createGiantCakeSprite() {
    return this.createCanvasTexture(512, 512, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 20);

      // White outline
      ctx.lineWidth = 16;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      // Plate & Tiers Outline
      ctx.beginPath();
      // Plate
      ctx.ellipse(0, 0, 200, 25, 0, 0, Math.PI * 2);
      // Bottom Tier
      ctx.rect(-160, -110, 320, 110);
      // Middle Tier
      ctx.rect(-115, -200, 230, 90);
      // Top Tier
      ctx.rect(-70, -270, 140, 70);
      // Candle
      ctx.rect(-10, -320, 20, 50);
      ctx.stroke();
      ctx.fill();

      // Plate (Golden Porcelain)
      ctx.fillStyle = '#FFEAA7';
      ctx.beginPath();
      ctx.ellipse(0, 0, 190, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tier 1 (Bottom - Strawberry Cream)
      ctx.fillStyle = '#FFAAA5';
      ctx.fillRect(-150, -105, 300, 105);

      // Frosting drips Tier 1
      ctx.fillStyle = '#FFFDF9';
      ctx.beginPath();
      ctx.moveTo(-150, -105);
      for (let x = -150; x <= 150; x += 30) {
        ctx.quadraticCurveTo(x + 15, -75, x + 30, -105);
      }
      ctx.lineTo(150, -105);
      ctx.closePath();
      ctx.fill();

      // Tier 2 (Middle - Vanilla Mint)
      ctx.fillStyle = '#A8E6CF';
      ctx.fillRect(-108, -195, 216, 90);

      // Frosting drips Tier 2
      ctx.fillStyle = '#FFFDF9';
      ctx.beginPath();
      ctx.moveTo(-108, -195);
      for (let x = -108; x <= 108; x += 27) {
        ctx.quadraticCurveTo(x + 13.5, -168, x + 27, -195);
      }
      ctx.lineTo(108, -195);
      ctx.closePath();
      ctx.fill();

      // Tier 3 (Top - Butter Cream)
      ctx.fillStyle = '#FFEAA7';
      ctx.fillRect(-65, -265, 130, 70);

      // Strawberries on top
      [-40, 0, 40].forEach(sx => {
        ctx.fillStyle = '#FF7675';
        ctx.beginPath();
        ctx.arc(sx, -270, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#00B894';
        ctx.beginPath();
        ctx.arc(sx, -282, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Candle
      ctx.fillStyle = '#CDBBFF';
      ctx.fillRect(-8, -315, 16, 45);

      // Candle Spiral Stripe
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-8, -305);
      ctx.lineTo(8, -295);
      ctx.moveTo(-8, -285);
      ctx.lineTo(8, -275);
      ctx.stroke();

      // Candle Flame
      ctx.fillStyle = '#FF9F43';
      ctx.beginPath();
      ctx.moveTo(0, -345);
      ctx.quadraticCurveTo(14, -330, 8, -318);
      ctx.quadraticCurveTo(0, -312, -8, -318);
      ctx.quadraticCurveTo(-14, -330, 0, -345);
      ctx.closePath();
      ctx.fill();

      // Flame Core
      ctx.fillStyle = '#FECA57';
      ctx.beginPath();
      ctx.arc(0, -324, 5, 0, Math.PI * 2);
      ctx.fill();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 11. Chibi Character Paper Cutout Sprite (Walking & Idle animations)
   */
  static createChibiSprite(isWalking = false, facingRight = true) {
    return this.createCanvasTexture(256, 256, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 20);

      if (!facingRight) {
        ctx.scale(-1, 1);
      }

      const legOffset = isWalking ? 14 : 0;

      // White outline
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      // Legs
      ctx.rect(-24 - legOffset, -35, 18, 35);
      ctx.rect(6 + legOffset, -35, 18, 35);
      // Body / Dress
      ctx.moveTo(-35, -30);
      ctx.lineTo(35, -30);
      ctx.lineTo(22, -95);
      ctx.lineTo(-22, -95);
      ctx.closePath();
      // Head
      ctx.arc(0, -145, 52, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();

      // Legs / Shoes
      ctx.fillStyle = '#E17055';
      ctx.fillRect(-20 - legOffset, -32, 14, 32);
      ctx.fillRect(8 + legOffset, -32, 14, 32);

      // Dress (Warm Coral / Peach)
      ctx.fillStyle = '#FFAAA5';
      ctx.beginPath();
      ctx.moveTo(-30, -30);
      ctx.lineTo(30, -30);
      ctx.lineTo(20, -95);
      ctx.lineTo(-20, -95);
      ctx.closePath();
      ctx.fill();

      // Dress White Apron / Scarf
      ctx.fillStyle = '#FFFDF9';
      ctx.beginPath();
      ctx.moveTo(-14, -95);
      ctx.lineTo(14, -95);
      ctx.lineTo(18, -60);
      ctx.lineTo(-18, -60);
      ctx.closePath();
      ctx.fill();

      // Head / Face (Soft Skin Tone)
      ctx.fillStyle = '#FFEAA7';
      ctx.beginPath();
      ctx.arc(0, -145, 46, 0, Math.PI * 2);
      ctx.fill();

      // Hair (Brown Crayon)
      ctx.fillStyle = '#6D4C41';
      ctx.beginPath();
      // Bangs
      ctx.arc(0, -152, 48, Math.PI, 0);
      ctx.lineTo(44, -135);
      ctx.quadraticCurveTo(20, -150, 0, -135);
      ctx.quadraticCurveTo(-20, -150, -44, -135);
      ctx.closePath();
      ctx.fill();

      // Pigtails / Buns
      ctx.beginPath();
      ctx.arc(-42, -165, 16, 0, Math.PI * 2);
      ctx.arc(42, -165, 16, 0, Math.PI * 2);
      ctx.fill();

      // Ribbon in Hair
      ctx.fillStyle = '#FF7675';
      ctx.beginPath();
      ctx.arc(32, -170, 7, 0, Math.PI * 2);
      ctx.arc(44, -170, 7, 0, Math.PI * 2);
      ctx.fill();

      // Eyes (Cute Manga Chibi Dots)
      ctx.fillStyle = '#2D3436';
      ctx.beginPath();
      ctx.ellipse(-14, -142, 5, 8, 0, 0, Math.PI * 2);
      ctx.ellipse(14, -142, 5, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eye highlights
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(-16, -145, 2.5, 0, Math.PI * 2);
      ctx.arc(12, -145, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Blush Cheeks
      ctx.fillStyle = '#FF8B94';
      ctx.beginPath();
      ctx.arc(-22, -132, 6, 0, Math.PI * 2);
      ctx.arc(22, -132, 6, 0, Math.PI * 2);
      ctx.fill();

      // Smile
      ctx.strokeStyle = '#6D4C41';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, -135, 7, 0.2, Math.PI - 0.2);
      ctx.stroke();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 12. Lantern & Road Sign Post Sprite
   */
  static createRoadSignSprite(text = "MEMORIES") {
    return this.createCanvasTexture(256, 256, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 15);

      // White outline
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.rect(-10, -160, 20, 160);
      ctx.rect(-75, -150, 150, 50);
      ctx.stroke();
      ctx.fill();

      // Post (Wood)
      ctx.fillStyle = '#D4A373';
      ctx.fillRect(-6, -155, 12, 155);

      // Sign Board
      ctx.fillStyle = '#FAEDCD';
      ctx.fillRect(-70, -145, 140, 42);

      // Text on Board
      ctx.font = 'bold 15px sans-serif';
      ctx.fillStyle = '#8A4B38';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 0, -124);

      // Mini Star on top
      ctx.fillStyle = '#FFEAA7';
      ctx.beginPath();
      ctx.arc(0, -160, 10, 0, Math.PI * 2);
      ctx.fill();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 13. Zone 1: Cobblestone Courtyard Texture (Starting House)
   */
  static createCobblestoneTexture() {
    return this.createCanvasTexture(512, 512, (ctx, w, h) => {
      // Warm biscuit/parchment ground
      ctx.fillStyle = '#FDF6EC';
      ctx.fillRect(0, 0, w, h);

      // Cobblestone grid
      const cols = 8;
      const rows = 8;
      const cellW = w / cols;
      const cellH = h / rows;
      const stoneColors = ['#F5DEB3', '#EED9C4', '#F7E7CE', '#E8D3BC', '#FAF0E6'];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const offsetX = (r % 2 === 0) ? 0 : cellW / 2;
          const x = (c * cellW + offsetX) % w;
          const y = r * cellH;

          ctx.fillStyle = stoneColors[(r * cols + c) % stoneColors.length];
          ctx.strokeStyle = '#D7C4B7';
          ctx.lineWidth = 3;

          // Draw rounded pebble stone
          ctx.beginPath();
          ctx.roundRect(x + 4, y + 4, cellW - 8, cellH - 8, 12);
          ctx.fill();
          ctx.stroke();
        }
      }

      // Little floral moss in cracks
      for (let i = 0; i < 60; i++) {
        ctx.fillStyle = (i % 2 === 0) ? '#A8E6CF' : '#FFAAA5';
        ctx.beginPath();
        ctx.arc(Math.random() * w, Math.random() * h, 3 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      this.applyCrayonTexture(ctx, w, h);
    });
  }

  /**
   * 14. Zone 3: Blossom Garden Texture (Memory Garden)
   */
  static createBlossomGardenTexture() {
    return this.createCanvasTexture(512, 512, (ctx, w, h) => {
      // Soft blush pink/peach meadow
      ctx.fillStyle = '#FFEBEF';
      ctx.fillRect(0, 0, w, h);

      // Soft watercolor clouds of pink & lilac
      const patches = [
        { x: 120, y: 140, r: 90, c: '#FFD6DF' },
        { x: 380, y: 160, r: 110, c: '#E8D7FF' },
        { x: 220, y: 360, r: 130, c: '#FFE0E9' },
        { x: 420, y: 400, r: 80, c: '#FFD1DC' }
      ];
      patches.forEach(p => {
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Hand-drawn sakura blossom petals
      const petalColors = ['#FF8B94', '#FFAAA5', '#FF6B8B', '#FFFDF9', '#CDBBFF'];
      for (let i = 0; i < 90; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const col = petalColors[i % petalColors.length];

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * Math.PI * 2);

        // 5-petal mini flower
        ctx.fillStyle = col;
        for (let p = 0; p < 5; p++) {
          ctx.beginPath();
          ctx.ellipse(0, 7, 4, 7, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.rotate((Math.PI * 2) / 5);
        }
        // Flower center
        ctx.fillStyle = '#FFEAA7';
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      this.applyCrayonTexture(ctx, w, h);
    });
  }

  /**
   * 15. Zone 4: Festive Checkered Pastel Tiles (Gift Plaza)
   */
  static createPastelTilesTexture() {
    return this.createCanvasTexture(512, 512, (ctx, w, h) => {
      const tileSize = 64;
      const palette = ['#FFF2E0', '#FFE3E3', '#E9F5EC', '#EDE7F6'];

      for (let y = 0; y < h; y += tileSize) {
        for (let x = 0; x < w; x += tileSize) {
          const idx = ((x / tileSize) + (y / tileSize)) % palette.length;
          ctx.fillStyle = palette[idx];
          ctx.fillRect(x, y, tileSize, tileSize);

          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3;
          ctx.strokeRect(x, y, tileSize, tileSize);

          // Inner festive dot / cross
          ctx.fillStyle = '#FFC3A0';
          ctx.beginPath();
          ctx.arc(x + tileSize / 2, y + tileSize / 2, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Party confetti scatter
      const confettiColors = ['#FF7675', '#74B9FF', '#FFEAA7', '#55EFC4', '#A29BFE'];
      for (let i = 0; i < 70; i++) {
        ctx.fillStyle = confettiColors[i % confettiColors.length];
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const rot = Math.random() * Math.PI;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.fillRect(-5, -2.5, 10, 5);
        ctx.restore();
      }

      this.applyCrayonTexture(ctx, w, h);
    });
  }

  /**
   * 16. Zone 5: Stardust Dream Runway (Light Path)
   */
  static createStarDustTexture() {
    return this.createCanvasTexture(512, 512, (ctx, w, h) => {
      // Gentle gradient lavender/night sky
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#E8EAF6');
      grad.addColorStop(0.5, '#D1C4E9');
      grad.addColorStop(1, '#C5CAE9');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Glowing circular nebulas
      for (let i = 0; i < 8; i++) {
        const radGrad = ctx.createRadialGradient(
          Math.random() * w, Math.random() * h, 10,
          Math.random() * w, Math.random() * h, 90
        );
        radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        radGrad.addColorStop(1, 'rgba(255, 234, 167, 0)');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // Constellation lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(60, 80);
      ctx.lineTo(160, 140);
      ctx.lineTo(260, 100);
      ctx.lineTo(380, 220);
      ctx.lineTo(460, 180);
      ctx.stroke();
      ctx.setLineDash([]);

      // Sparkle Golden Stars
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = 3 + Math.random() * 6;

        ctx.fillStyle = (i % 3 === 0) ? '#FFFDF9' : '#FFEAA7';
        ctx.save();
        ctx.translate(x, y);

        // 4-point sparkle star
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.quadraticCurveTo(0, 0, size, 0);
        ctx.quadraticCurveTo(0, 0, 0, size);
        ctx.quadraticCurveTo(0, 0, -size, 0);
        ctx.quadraticCurveTo(0, 0, 0, -size);
        ctx.fill();

        ctx.restore();
      }

      this.applyCrayonTexture(ctx, w, h);
    });
  }

  /**
   * 17. Zone 6: Royal Birthday Dais Carpet (Cake Stage)
   */
  static createRoyalStageCarpetTexture() {
    return this.createCanvasTexture(512, 512, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      // Outer Scalloped Gold Ring
      ctx.fillStyle = '#FFEAA7';
      ctx.beginPath();
      ctx.arc(cx, cy, 240, 0, Math.PI * 2);
      ctx.fill();

      // Scallop border details
      ctx.fillStyle = '#FFAAA5';
      const petals = 24;
      for (let i = 0; i < petals; i++) {
        const angle = (i * Math.PI * 2) / petals;
        const px = cx + Math.cos(angle) * 230;
        const py = cy + Math.sin(angle) * 230;
        ctx.beginPath();
        ctx.arc(px, py, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      // Middle Warm Rose Carpet Ring
      ctx.fillStyle = '#FF8B94';
      ctx.beginPath();
      ctx.arc(cx, cy, 210, 0, Math.PI * 2);
      ctx.fill();

      // Inner Cream Star Dais
      ctx.fillStyle = '#FFFDF9';
      ctx.beginPath();
      ctx.arc(cx, cy, 175, 0, Math.PI * 2);
      ctx.fill();

      // Golden Starburst Rays
      ctx.strokeStyle = '#F9D7C4';
      ctx.lineWidth = 3;
      for (let i = 0; i < 16; i++) {
        const angle = (i * Math.PI * 2) / 16;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * 50, cy + Math.sin(angle) * 50);
        ctx.lineTo(cx + Math.cos(angle) * 165, cy + Math.sin(angle) * 165);
        ctx.stroke();
      }

      // Central Golden Crown / Ribbon Circle
      ctx.fillStyle = '#FFEAA7';
      ctx.beginPath();
      ctx.arc(cx, cy, 65, 0, Math.PI * 2);
      ctx.fill();

      this.applyCrayonTexture(ctx, w, h);
    });
  }

  /**
   * 18. Water Lily Floating Pad Sprite
   */
  static createWaterLilySprite() {
    return this.createCanvasTexture(256, 256, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h / 2);

      // White outline
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      // Green Lily Pad with slit
      ctx.fillStyle = '#81C784';
      ctx.beginPath();
      ctx.arc(0, 0, 90, 0.25 * Math.PI, 1.85 * Math.PI);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Pad Veins
      ctx.strokeStyle = '#66BB6A';
      ctx.lineWidth = 3;
      for (let a = 0.5; a < 1.8; a += 0.3) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a * Math.PI) * 75, Math.sin(a * Math.PI) * 75);
        ctx.stroke();
      }

      // Pink Lotus Flower on top
      ctx.fillStyle = '#FF8B94';
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6;
        ctx.beginPath();
        ctx.ellipse(Math.cos(angle) * 20, Math.sin(angle) * 20, 10, 18, angle, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#FFEAA7';
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 19. Gingham Picnic Mat Cutout
   */
  static createPicnicMatSprite() {
    return this.createCanvasTexture(256, 256, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h / 2);

      // White die-cut outline
      ctx.lineWidth = 12;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(-100, -80, 200, 160, 16);
      ctx.stroke();
      ctx.fill();

      // Red & white gingham checkered pattern
      const size = 20;
      for (let x = -95; x < 95; x += size) {
        for (let y = -75; y < 75; y += size) {
          const even = ((x + 95) / size + (y + 75) / size) % 2 === 0;
          ctx.fillStyle = even ? '#FF8B94' : '#FFFDF9';
          ctx.fillRect(x, y, size, size);
        }
      }

      // Picnic Basket
      ctx.fillStyle = '#D4A373';
      ctx.fillRect(-25, -20, 50, 40);
      ctx.strokeStyle = '#8A4B38';
      ctx.lineWidth = 3;
      ctx.strokeRect(-25, -20, 50, 40);

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 20. Cute Birthday Corgi / Shiba Puppy Sprite
   */
  static createPuppyCorgiSprite() {
    return this.createCanvasTexture(220, 260, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 15);

      // White outline
      ctx.lineWidth = 12;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      // Body
      ctx.ellipse(0, -45, 50, 40, 0, 0, Math.PI * 2);
      // Head
      ctx.arc(0, -110, 45, 0, Math.PI * 2);
      // Left Ear
      ctx.moveTo(-40, -125);
      ctx.lineTo(-30, -170);
      ctx.lineTo(-8, -145);
      // Right Ear
      ctx.moveTo(8, -145);
      ctx.lineTo(30, -170);
      ctx.lineTo(40, -125);
      // Party Hat Cone
      ctx.moveTo(-16, -150);
      ctx.lineTo(0, -210);
      ctx.lineTo(16, -150);
      // Tail
      ctx.arc(42, -45, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();

      // Fur Fill (Warm Golden Ginger)
      ctx.fillStyle = '#F5A623';
      ctx.beginPath();
      ctx.ellipse(0, -45, 46, 36, 0, 0, Math.PI * 2);
      ctx.arc(0, -110, 41, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.beginPath();
      ctx.moveTo(-38, -125);
      ctx.lineTo(-28, -165);
      ctx.lineTo(-10, -145);
      ctx.closePath();
      ctx.moveTo(10, -145);
      ctx.lineTo(28, -165);
      ctx.lineTo(38, -125);
      ctx.closePath();
      ctx.fill();

      // White Chest & Muzzle Patch
      ctx.fillStyle = '#FFFDF9';
      ctx.beginPath();
      ctx.ellipse(0, -95, 26, 22, 0, 0, Math.PI * 2);
      ctx.ellipse(0, -40, 24, 25, 0, 0, Math.PI * 2);
      ctx.arc(40, -45, 10, 0, Math.PI * 2);
      ctx.fill();

      // Party Cone Hat (Striped Pink & Yellow)
      ctx.fillStyle = '#FF7675';
      ctx.beginPath();
      ctx.moveTo(-14, -148);
      ctx.lineTo(0, -205);
      ctx.lineTo(14, -148);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#FFEAA7';
      ctx.beginPath();
      ctx.arc(0, -208, 6, 0, Math.PI * 2);
      ctx.fill();

      // Eyes & Happy Tongue
      ctx.fillStyle = '#4A2E2B';
      ctx.beginPath();
      ctx.arc(-16, -112, 4.5, 0, Math.PI * 2);
      ctx.arc(16, -112, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#2D3436';
      ctx.beginPath();
      ctx.ellipse(0, -104, 5, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tongue
      ctx.fillStyle = '#FF7675';
      ctx.beginPath();
      ctx.arc(0, -95, 6, 0, Math.PI);
      ctx.fill();

      // Rosy Cheeks
      ctx.fillStyle = 'rgba(255, 118, 117, 0.6)';
      ctx.beginPath();
      ctx.arc(-26, -100, 6, 0, Math.PI * 2);
      ctx.arc(26, -100, 6, 0, Math.PI * 2);
      ctx.fill();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 21. Cute Teddy Bear with Heart Balloon
   */
  static createTeddyBearSprite() {
    return this.createCanvasTexture(240, 320, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 15);

      // White outline
      ctx.lineWidth = 12;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      // Body & Head
      ctx.ellipse(0, -50, 48, 42, 0, 0, Math.PI * 2);
      ctx.arc(0, -125, 42, 0, Math.PI * 2);
      // Ears
      ctx.arc(-35, -160, 16, 0, Math.PI * 2);
      ctx.arc(35, -160, 16, 0, Math.PI * 2);
      // Heart Balloon
      ctx.arc(38, -250, 28, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();

      // Teddy Bear Fur (Warm Biscuit Brown)
      ctx.fillStyle = '#C49774';
      ctx.beginPath();
      ctx.ellipse(0, -50, 44, 38, 0, 0, Math.PI * 2);
      ctx.arc(0, -125, 38, 0, Math.PI * 2);
      ctx.arc(-35, -160, 14, 0, Math.PI * 2);
      ctx.arc(35, -160, 14, 0, Math.PI * 2);
      ctx.fill();

      // Inner Ears & Belly
      ctx.fillStyle = '#FCEBD9';
      ctx.beginPath();
      ctx.arc(-35, -160, 8, 0, Math.PI * 2);
      ctx.arc(35, -160, 8, 0, Math.PI * 2);
      ctx.ellipse(0, -48, 26, 22, 0, 0, Math.PI * 2);
      ctx.ellipse(0, -118, 16, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Face
      ctx.fillStyle = '#4A2E2B';
      ctx.beginPath();
      ctx.arc(-14, -130, 3.5, 0, Math.PI * 2);
      ctx.arc(14, -130, 3.5, 0, Math.PI * 2);
      ctx.arc(0, -120, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Heart Balloon (Pastel Pink)
      ctx.fillStyle = '#FF7675';
      ctx.beginPath();
      const bx = 38, by = -250;
      ctx.moveTo(bx, by + 20);
      ctx.bezierCurveTo(bx - 30, by - 15, bx - 25, by - 40, bx, by - 20);
      ctx.bezierCurveTo(bx + 25, by - 40, bx + 30, by - 15, bx, by + 20);
      ctx.fill();

      // String
      ctx.strokeStyle = '#D4A373';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bx, by + 20);
      ctx.quadraticCurveTo(bx - 10, -150, 18, -65);
      ctx.stroke();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 22. Cute Squirrel Sprite with Nut
   */
  static createSquirrelSprite() {
    return this.createCanvasTexture(180, 180, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 15);

      ctx.lineWidth = 10;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      // Giant fluffy tail
      ctx.arc(-25, -75, 42, 0, Math.PI * 2);
      // Body & Head
      ctx.ellipse(15, -45, 26, 32, 0, 0, Math.PI * 2);
      ctx.arc(20, -95, 24, 0, Math.PI * 2);
      // Ears
      ctx.arc(14, -122, 7, 0, Math.PI * 2);
      ctx.arc(28, -122, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();

      // Squirrel Fur (Auburn Orange)
      ctx.fillStyle = '#E67E22';
      ctx.beginPath();
      ctx.arc(-25, -75, 38, 0, Math.PI * 2);
      ctx.ellipse(15, -45, 22, 28, 0, 0, Math.PI * 2);
      ctx.arc(20, -95, 20, 0, Math.PI * 2);
      ctx.arc(14, -122, 5, 0, Math.PI * 2);
      ctx.arc(28, -122, 5, 0, Math.PI * 2);
      ctx.fill();

      // White belly
      ctx.fillStyle = '#FFFDF9';
      ctx.beginPath();
      ctx.ellipse(22, -45, 10, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eye & Cheek
      ctx.fillStyle = '#2D3436';
      ctx.beginPath();
      ctx.arc(26, -98, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FF7675';
      ctx.beginPath();
      ctx.arc(28, -90, 4, 0, Math.PI * 2);
      ctx.fill();

      // Acorn
      ctx.fillStyle = '#8D6E63';
      ctx.beginPath();
      ctx.arc(24, -60, 6, 0, Math.PI * 2);
      ctx.fill();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 23. Pastel Storybook Rainbow Arch Sprite
   */
  static createRainbowArchSprite() {
    return this.createCanvasTexture(640, 360, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 20);

      const colors = ['#FF7675', '#FFAAA5', '#FFEAA7', '#55EFC4', '#81ECEC', '#74B9FF', '#CDBBFF'];
      const outerR = 260;
      const bandWidth = 14;

      // Rainbow Bands
      colors.forEach((c, idx) => {
        const r = outerR - idx * bandWidth;
        ctx.strokeStyle = c;
        ctx.lineWidth = bandWidth + 1;
        ctx.beginPath();
        ctx.arc(0, 0, r, Math.PI, 0);
        ctx.stroke();
      });

      // Fluffy Clouds on both ends
      const drawCloud = (cx, cy) => {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cx - 35, cy, 32, 0, Math.PI * 2);
        ctx.arc(cx, cy - 25, 42, 0, Math.PI * 2);
        ctx.arc(cx + 35, cy, 32, 0, Math.PI * 2);
        ctx.arc(cx, cy + 5, 25, 0, Math.PI * 2);
        ctx.fill();

        // Rosy blush on cloud
        ctx.fillStyle = '#FFAAA5';
        ctx.beginPath();
        ctx.arc(cx - 15, cy - 10, 5, 0, Math.PI * 2);
        ctx.arc(cx + 15, cy - 10, 5, 0, Math.PI * 2);
        ctx.fill();
      };

      drawCloud(-outerR + 40, -10);
      drawCloud(outerR - 40, -10);

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 24. Vintage Pastel Ice Cream & Sweets Cart
   */
  static createIceCreamCartSprite() {
    return this.createCanvasTexture(280, 280, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 15);

      // White outline
      ctx.lineWidth = 12;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      // Cart Body
      ctx.roundRect(-75, -120, 150, 80, 10);
      // Striped Awning
      ctx.roundRect(-85, -210, 170, 45, 8);
      // Wheels
      ctx.arc(-45, -25, 25, 0, Math.PI * 2);
      ctx.arc(45, -25, 25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();

      // Cart Body Fill (Mint pastel)
      ctx.fillStyle = '#A8E6CF';
      ctx.beginPath();
      ctx.roundRect(-70, -115, 140, 72, 8);
      ctx.fill();

      // Awning Stripes (Pink & Cream)
      const aColors = ['#FF8B94', '#FFFDF9'];
      for (let i = 0; i < 7; i++) {
        ctx.fillStyle = aColors[i % 2];
        ctx.beginPath();
        ctx.rect(-80 + i * 23, -205, 23, 40);
        ctx.fill();
      }

      // Poles
      ctx.strokeStyle = '#8D6E63';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-65, -165);
      ctx.lineTo(-65, -115);
      ctx.moveTo(65, -165);
      ctx.lineTo(65, -115);
      ctx.stroke();

      // Wheels
      ctx.fillStyle = '#FFAAA5';
      ctx.beginPath();
      ctx.arc(-45, -25, 22, 0, Math.PI * 2);
      ctx.arc(45, -25, 22, 0, Math.PI * 2);
      ctx.fill();

      // "ICE CREAM" sign text
      ctx.fillStyle = '#FF7675';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🍦 SWEETS', 0, -75);

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 25. Fairy Tale Mailbox with Love Letter
   */
  static createFairyMailboxSprite() {
    return this.createCanvasTexture(180, 240, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 15);

      ctx.lineWidth = 10;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      // Post
      ctx.rect(-8, -120, 16, 120);
      // Box
      ctx.roundRect(-36, -180, 72, 60, [25, 25, 8, 8]);
      ctx.stroke();
      ctx.fill();

      // Post (Wood)
      ctx.fillStyle = '#8D6E63';
      ctx.fillRect(-6, -118, 12, 118);

      // Mailbox (Pastel Rose Pink)
      ctx.fillStyle = '#FFAAA5';
      ctx.beginPath();
      ctx.roundRect(-32, -176, 64, 54, [22, 22, 6, 6]);
      ctx.fill();

      // Heart Letter Peeking Out
      ctx.fillStyle = '#FFFDF9';
      ctx.fillRect(-18, -160, 36, 26);
      ctx.fillStyle = '#FF7675';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💌', 0, -142);

      // Flower at base
      ctx.fillStyle = '#55EFC4';
      ctx.beginPath();
      ctx.arc(-14, -10, 8, 0, Math.PI * 2);
      ctx.arc(14, -10, 8, 0, Math.PI * 2);
      ctx.fill();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 26. Floral Storybook Arch with Bunting Flags
   */
  static createFloralArchSprite() {
    return this.createCanvasTexture(360, 320, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h - 15);

      ctx.lineWidth = 14;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.arc(0, -120, 110, Math.PI, 0);
      ctx.lineTo(110, 0);
      ctx.lineTo(80, 0);
      ctx.lineTo(80, -120);
      ctx.arc(0, -120, 80, 0, Math.PI, true);
      ctx.lineTo(-80, 0);
      ctx.lineTo(-110, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Birch Wood Arch Fill
      ctx.fillStyle = '#FAEDCD';
      ctx.beginPath();
      ctx.arc(0, -120, 105, Math.PI, 0);
      ctx.lineTo(105, 0);
      ctx.lineTo(85, 0);
      ctx.lineTo(85, -120);
      ctx.arc(0, -120, 85, 0, Math.PI, true);
      ctx.lineTo(-85, 0);
      ctx.lineTo(-105, 0);
      ctx.closePath();
      ctx.fill();

      // Roses & Vine Leaves Wrapping the Arch
      const roseColors = ['#FF7675', '#FF9FF3', '#FFAAA5', '#FFEAA7', '#CDBBFF'];
      for (let i = 0; i <= 14; i++) {
        const angle = Math.PI - (i / 14) * Math.PI;
        const rx = Math.cos(angle) * 95;
        const ry = -120 - Math.sin(angle) * 95;

        // Leaf
        ctx.fillStyle = '#55EFC4';
        ctx.beginPath();
        ctx.arc(rx - 8, ry, 6, 0, Math.PI * 2);
        ctx.arc(rx + 8, ry, 6, 0, Math.PI * 2);
        ctx.fill();

        // Rose
        ctx.fillStyle = roseColors[i % roseColors.length];
        ctx.beginPath();
        ctx.arc(rx, ry, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 27. Fluttering Pastel Butterfly Sprite
   */
  static createButterflySprite(color = '#FF8B94') {
    return this.createCanvasTexture(128, 128, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h / 2);

      ctx.lineWidth = 8;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';

      // Wings
      ctx.beginPath();
      // Upper wings
      ctx.ellipse(-26, -18, 24, 16, -0.3, 0, Math.PI * 2);
      ctx.ellipse(26, -18, 24, 16, 0.3, 0, Math.PI * 2);
      // Lower wings
      ctx.ellipse(-18, 16, 16, 12, 0.2, 0, Math.PI * 2);
      ctx.ellipse(18, 16, 16, 12, -0.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();

      // Wing Color Fill
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(-26, -18, 20, 13, -0.3, 0, Math.PI * 2);
      ctx.ellipse(26, -18, 20, 13, 0.3, 0, Math.PI * 2);
      ctx.ellipse(-18, 16, 13, 9, 0.2, 0, Math.PI * 2);
      ctx.ellipse(18, 16, 13, 9, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // Inner Pastel Glow Dots
      ctx.fillStyle = '#FFEAA7';
      ctx.beginPath();
      ctx.arc(-26, -18, 6, 0, Math.PI * 2);
      ctx.arc(26, -18, 6, 0, Math.PI * 2);
      ctx.fill();

      // Butterfly Body
      ctx.fillStyle = '#6D4C41';
      ctx.beginPath();
      ctx.ellipse(0, 0, 4, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }

  /**
   * 28. Footstep Flower Decal Sprite
   */
  static createFlowerDecalTexture() {
    return this.createCanvasTexture(64, 64, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h / 2);

      const colors = ['#FF7675', '#FFAAA5', '#FFEAA7', '#CDBBFF', '#FF9FF3'];
      const c = colors[Math.floor(Math.random() * colors.length)];

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = c;
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5;
        ctx.beginPath();
        ctx.ellipse(Math.cos(a) * 12, Math.sin(a) * 12, 7, 10, a, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#FFEAA7';
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }

  /**
   * 29. Glowing Cake Ceremony Goal Beacon Banner
   */
  static createCakeBeaconSprite() {
    return this.createCanvasTexture(420, 180, (ctx, w, h) => {
      ctx.save();
      ctx.translate(w / 2, h / 2);

      // Outer glowing white/yellow die-cut
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#FFFFFF';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.roundRect(-190, -70, 380, 100, 24);
      // Downward pointer triangle
      ctx.moveTo(-24, 30);
      ctx.lineTo(0, 65);
      ctx.lineTo(24, 30);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      // Inner Golden Peach Badge
      ctx.fillStyle = '#FF7675';
      ctx.beginPath();
      ctx.roundRect(-182, -62, 364, 84, 18);
      ctx.fill();

      // Top title
      ctx.fillStyle = '#FFEAA7';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🎂 ĐIỂM ĐẾN CUỐI CÙNG ✨', 0, -32);

      // Subtitle
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 17px sans-serif';
      ctx.fillText('Tiến lại gần để Mở Quà & Thổi Nến!', 0, -6);

      // Down arrow fill
      ctx.fillStyle = '#FFEAA7';
      ctx.beginPath();
      ctx.moveTo(-16, 26);
      ctx.lineTo(0, 52);
      ctx.lineTo(16, 26);
      ctx.closePath();
      ctx.fill();

      this.applyCrayonTexture(ctx, w, h);
      ctx.restore();
    });
  }
}

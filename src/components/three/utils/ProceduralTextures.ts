import * as THREE from 'three';

/**
 * Generates high-performance procedural textures for Particle Systems
 * without needing external asset loads.
 */
export class ProceduralTextures {
  private static softCircle: THREE.CanvasTexture | null = null;
  private static sparkleStar: THREE.CanvasTexture | null = null;
  private static bokehDisc: THREE.CanvasTexture | null = null;
  private static glowMist: THREE.CanvasTexture | null = null;

  public static getSoftCircle(): THREE.CanvasTexture {
    if (this.softCircle) return this.softCircle;

    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
    gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.08)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    this.softCircle = new THREE.CanvasTexture(canvas);
    this.softCircle.generateMipmaps = true;
    return this.softCircle;
  }

  public static getSparkleStar(): THREE.CanvasTexture {
    if (this.sparkleStar) return this.sparkleStar;

    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const center = size / 2;

    // 1. Soft radial core
    const coreGrad = ctx.createRadialGradient(center, center, 0, center, center, center * 0.4);
    coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    coreGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = coreGrad;
    ctx.fillRect(0, 0, size, size);

    // 2. 4-pointed cross star rays
    ctx.save();
    ctx.translate(center, center);

    const drawRay = () => {
      const rayGrad = ctx.createLinearGradient(0, -center * 0.95, 0, center * 0.95);
      rayGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      rayGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
      rayGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.moveTo(-2, -center * 0.95);
      ctx.lineTo(2, -center * 0.95);
      ctx.lineTo(0.5, center * 0.95);
      ctx.lineTo(-0.5, center * 0.95);
      ctx.closePath();
      ctx.fill();
    };

    drawRay();
    ctx.rotate(Math.PI / 2);
    drawRay();
    ctx.restore();

    this.sparkleStar = new THREE.CanvasTexture(canvas);
    this.sparkleStar.generateMipmaps = true;
    return this.sparkleStar;
  }

  public static getBokehDisc(): THREE.CanvasTexture {
    if (this.bokehDisc) return this.bokehDisc;

    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const center = size / 2;
    const radius = center * 0.88;

    // Optical aperture disc with brightened edge ring and soft internal fill
    const grad = ctx.createRadialGradient(center, center, 0, center, center, radius);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.35)');
    grad.addColorStop(0.85, 'rgba(255, 255, 255, 0.7)');
    grad.addColorStop(0.95, 'rgba(255, 255, 255, 0.9)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fill();

    this.bokehDisc = new THREE.CanvasTexture(canvas);
    this.bokehDisc.generateMipmaps = true;
    return this.bokehDisc;
  }

  public static getGlowMist(): THREE.CanvasTexture {
    if (this.glowMist) return this.glowMist;

    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const center = size / 2;
    const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.35)');
    grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    this.glowMist = new THREE.CanvasTexture(canvas);
    this.glowMist.generateMipmaps = true;
    return this.glowMist;
  }
}

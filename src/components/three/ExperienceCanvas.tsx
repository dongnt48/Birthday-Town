'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { AtmosphericDust } from './systems/AtmosphericDust';
import { SparkleSystem } from './systems/SparkleSystem';
import { BokehSystem } from './systems/BokehSystem';
import { TheLightEntity } from './systems/TheLightEntity';
import { GlowMistSystem } from './systems/GlowMistSystem';
import { ConstellationMesh } from './systems/ConstellationMesh';
import { CandleFlameShader } from './systems/CandleFlameShader';
import { FireworksEngine } from './systems/FireworksEngine';

export interface ExperienceCanvasRef {
  updateScrollProgress: (progress: number, activeScene: number) => void;
  triggerTouchIgnite: () => void;
  triggerSparkleBurst: (x?: number, y?: number, z?: number, count?: number) => void;
  emitCandleEmber: (count?: number) => void;
  setFlameWaver: (waver: number, intensity: number) => void;
  triggerFireworks: (x?: number, y?: number, z?: number) => void;
  setBlackout: (isBlackout: boolean) => void;
}

export const ExperienceCanvas = forwardRef<ExperienceCanvasRef, {}>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const systemsRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    dust: AtmosphericDust;
    sparkles: SparkleSystem;
    bokeh: BokehSystem;
    theLight: TheLightEntity;
    glowMist: GlowMistSystem;
    constellation: ConstellationMesh;
    candleFlame: CandleFlameShader;
    fireworks: FireworksEngine;
    clock: THREE.Clock;
    isBlackout: boolean;
    activeScene: number;
    scrollProgress: number;
    flameWaver: number;
  } | null>(null);

  useImperativeHandle(ref, () => ({
    updateScrollProgress: (progress: number, activeScene: number) => {
      if (!systemsRef.current) return;
      systemsRef.current.scrollProgress = progress;
      systemsRef.current.activeScene = activeScene;

      const { theLight, constellation, candleFlame, glowMist, camera } = systemsRef.current;

      // Choreograph The Light position and lighting atmosphere based on 15 scenes
      if (activeScene <= 1) {
        // Scene 00-01: Darkness & Tiny Light
        theLight.setTarget(0, -0.2, -4, 1.2, 1.0, '#fff9f5');
        constellation.setVisible(0);
        candleFlame.setIntensity(0);
        glowMist.setGlowTarget(new THREE.Vector3(0, -0.2, -4), 7, '#f7d58a', 0.25);
      } else if (activeScene === 2) {
        // Scene 02: Birthday Constellation 24.08.2000
        theLight.setTarget(1.8, 1.2, -7, 1.35, 1.15, '#f7d58a');
        constellation.setVisible(1.0);
        candleFlame.setIntensity(0);
        glowMist.setGlowTarget(new THREE.Vector3(0, 1.0, -8), 12, '#f7d58a', 0.3);
      } else if (activeScene >= 3 && activeScene <= 4) {
        // Scene 03-04: Memories Field (Weaving z-axis flow)
        const osc = Math.sin(progress * Math.PI * 5);
        const oscY = Math.cos(progress * Math.PI * 3) * 0.8;
        theLight.setTarget(osc * 3.2, oscY, -6, 0.95, 0.9, '#f6b7d8');
        constellation.setVisible(0.05);
        candleFlame.setIntensity(0);
        glowMist.setGlowTarget(new THREE.Vector3(osc * 2.5, oscY, -6), 10, '#f6b7d8', 0.28);
      } else if (activeScene === 5) {
        // Scene 05: Dream Fragments (Matcha, Flowers, Book)
        theLight.setTarget(0, 1.1, -5.2, 1.05, 0.95, '#a8c087');
        constellation.setVisible(0);
        candleFlame.setIntensity(0);
        glowMist.setGlowTarget(new THREE.Vector3(0, 1.0, -5.2), 9, '#c9b6ff', 0.25);
      } else if (activeScene >= 6 && activeScene <= 7) {
        // Scene 06-07: Story Trail & Slowdown
        theLight.setTarget(0, -0.8, -6.5, 0.75, 0.8, '#c9b6ff');
        constellation.setVisible(0);
        candleFlame.setIntensity(0);
        glowMist.setGlowTarget(new THREE.Vector3(0, -0.8, -6.5), 11, '#1a1535', 0.2);
      } else if (activeScene >= 8 && activeScene <= 9) {
        // Scene 08-09: Wishes & Wishes to Flame
        theLight.setTarget(0, 0.5, -4.8, 1.1, 1.0, '#fff9f5');
        constellation.setVisible(0);
        candleFlame.setIntensity(activeScene === 9 ? 0.6 : 0.0);
        glowMist.setGlowTarget(new THREE.Vector3(0, 0.5, -5), 10, '#f7d58a', 0.35);
      } else if (activeScene >= 10 && activeScene <= 11) {
        // Scene 10-11: Candle Flame & Blackout
        theLight.setTarget(0, 0.3, -4.2, 0.3, 0.5, '#ffd580');
        constellation.setVisible(0);
        candleFlame.setIntensity(activeScene === 10 ? 1.0 : 0.0);
        glowMist.setGlowTarget(new THREE.Vector3(0, 0.3, -4.5), 8, '#fba94b', 0.4);
      } else if (activeScene >= 12) {
        // Scene 12-15: Supernova Explosion & Secret Ending
        theLight.setTarget(0, 0, -6, 0.85, 0.9, '#f7d58a');
        constellation.setVisible(0);
        candleFlame.setIntensity(0);
        glowMist.setGlowTarget(new THREE.Vector3(0, 0, -6), 14, '#f7d58a', 0.35);
      }

      // Smooth camera subtle depth glide
      camera.position.y = -progress * 3.5;
      camera.position.z = 5.0 + Math.sin(progress * Math.PI) * 1.2;
    },

    triggerTouchIgnite: () => {
      if (!systemsRef.current) return;
      const { theLight, sparkles, fireworks } = systemsRef.current;
      theLight.setTarget(0, 0, -4, 2.2, 1.8, '#ffffff');
      sparkles.emitBurst(new THREE.Vector3(0, 0, -4), 30, ['#ffffff', '#f7d58a', '#ffd580']);
      fireworks.burst(0, 0, -5, 80, ['#ffffff', '#f7d58a', '#f6b7d8']);
    },

    triggerSparkleBurst: (x = 0, y = 0, z = -5, count = 20) => {
      if (!systemsRef.current) return;
      systemsRef.current.sparkles.emitBurst(new THREE.Vector3(x, y, z), count);
    },

    emitCandleEmber: (count = 2) => {
      if (!systemsRef.current) return;
      systemsRef.current.glowMist.emitEmber(new THREE.Vector3(0, 0.3, -4.5), count, true);
    },

    setFlameWaver: (waver: number, intensity: number) => {
      if (!systemsRef.current) return;
      systemsRef.current.flameWaver = waver;
      systemsRef.current.candleFlame.setIntensity(intensity);
    },

    triggerFireworks: (x = 0, y = 1.5, z = -7) => {
      if (!systemsRef.current) return;
      const { fireworks, sparkles } = systemsRef.current;
      fireworks.burst(x, y, z, 260, ['#f7d58a', '#ffd580', '#fba94b', '#f6b7d8', '#c9b6ff', '#ffffff']);
      sparkles.emitBurst(new THREE.Vector3(x, y, z), 40, ['#ffffff', '#f7d58a', '#c9b6ff']);
    },

    setBlackout: (isBlackout: boolean) => {
      if (!systemsRef.current) return;
      systemsRef.current.isBlackout = isBlackout;
      if (isBlackout) {
        systemsRef.current.candleFlame.setIntensity(0);
        systemsRef.current.theLight.setTarget(0, 0, -10, 0, 0);
      }
    },
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#040508', 0.022);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false, // Performance optimization for mobile
      alpha: true,
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.8);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#040508', 1);

    containerRef.current.appendChild(renderer.domElement);

    // 2. Initialize All 5 Particular Systems + Helpers
    const dust = new AtmosphericDust(dpr > 1.2 ? 750 : 450);
    scene.add(dust.points);

    const sparkles = new SparkleSystem(dpr > 1.2 ? 250 : 150);
    scene.add(sparkles.points);

    const bokeh = new BokehSystem(dpr > 1.2 ? 28 : 16);
    scene.add(bokeh.points);

    const theLight = new TheLightEntity();
    scene.add(theLight.group);

    const glowMist = new GlowMistSystem();
    scene.add(glowMist.group);

    const constellation = new ConstellationMesh();
    scene.add(constellation.group);

    const candleFlame = new CandleFlameShader();
    scene.add(candleFlame.mesh);

    const fireworks = new FireworksEngine();
    scene.add(fireworks.points);

    const clock = new THREE.Clock();

    systemsRef.current = {
      renderer,
      scene,
      camera,
      dust,
      sparkles,
      bokeh,
      theLight,
      glowMist,
      constellation,
      candleFlame,
      fireworks,
      clock,
      isBlackout: false,
      activeScene: 0,
      scrollProgress: 0,
      flameWaver: 0,
    };

    // 3. Render Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (systemsRef.current) {
        const { isBlackout, scrollProgress, flameWaver, activeScene } = systemsRef.current;

        if (isBlackout) {
          renderer.setClearColor('#000000', 1);
          renderer.clear();
          return;
        }

        renderer.setClearColor('#040508', 1);

        dust.update(elapsedTime, scrollProgress);
        sparkles.update(elapsedTime, delta);
        bokeh.update(elapsedTime, scrollProgress);
        theLight.update(elapsedTime, delta);
        glowMist.update(elapsedTime, delta);
        constellation.update(elapsedTime);
        candleFlame.update(elapsedTime, flameWaver);
        fireworks.update(delta);

        // Ambient flame ember generation in scene 10
        if (activeScene === 10 && Math.random() < 0.3) {
          glowMist.emitEmber(new THREE.Vector3(0, 0.3, -4.5), 1, true);
        }

        renderer.render(scene, camera);
      }
    };

    animate();

    // 4. Resize Handler
    const handleResize = () => {
      if (!systemsRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      dust.dispose();
      sparkles.dispose();
      bokeh.dispose();
      theLight.dispose();
      glowMist.dispose();
      constellation.dispose();
      candleFlame.dispose();
      fireworks.dispose();
      renderer.dispose();

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      systemsRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 1 }}
    />
  );
});

ExperienceCanvas.displayName = 'ExperienceCanvas';

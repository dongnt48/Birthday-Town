'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { FarStars } from './systems/FarStars';
import { AtmosphericDust } from './systems/AtmosphericDust';
import { TheLightEntity } from './systems/TheLightEntity';
import { ConstellationMesh } from './systems/ConstellationMesh';
import { CandleFlameShader } from './systems/CandleFlameShader';
import { FireworksEngine } from './systems/FireworksEngine';

export interface ExperienceCanvasRef {
  updateScrollProgress: (progress: number, activeScene: number) => void;
  triggerTouchIgnite: () => void;
  setFlameWaver: (amount: number, intensity: number) => void;
  triggerFireworks: (x?: number, y?: number) => void;
  setBlackout: (isBlackout: boolean) => void;
}

export const ExperienceCanvas = forwardRef<ExperienceCanvasRef, {}>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const systemsRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    farStars: FarStars;
    dust: AtmosphericDust;
    theLight: TheLightEntity;
    constellation: ConstellationMesh;
    candleFlame: CandleFlameShader;
    fireworks: FireworksEngine;
    clock: THREE.Clock;
    isBlackout: boolean;
    activeScene: number;
    scrollProgress: number;
  } | null>(null);

  useImperativeHandle(ref, () => ({
    updateScrollProgress: (progress: number, activeScene: number) => {
      if (!systemsRef.current) return;
      systemsRef.current.scrollProgress = progress;
      systemsRef.current.activeScene = activeScene;

      const { theLight, constellation, candleFlame, camera } = systemsRef.current;

      // 1. Position The Light based on scene milestones
      if (activeScene <= 1) {
        // Intro & Touch: Near center
        theLight.setTarget(0, -0.2, -4, 1.2, 1.1);
        constellation.setVisible(0);
        candleFlame.setIntensity(0);
      } else if (activeScene === 2) {
        // Constellation: Sweeping to draw birthdate
        theLight.setTarget(2, 1.5, -8, 1.4, 1.2);
        constellation.setVisible(1.0);
        candleFlame.setIntensity(0);
      } else if (activeScene >= 3 && activeScene <= 4) {
        // Memories: Weaving across left and right
        const osc = Math.sin(progress * Math.PI * 4);
        theLight.setTarget(osc * 3.5, 0.5, -6, 0.9, 0.85);
        constellation.setVisible(0.1);
        candleFlame.setIntensity(0);
      } else if (activeScene === 5) {
        // Dream fragments
        theLight.setTarget(0, 1.2, -5, 1.0, 0.9);
        constellation.setVisible(0);
        candleFlame.setIntensity(0);
      } else if (activeScene >= 6 && activeScene <= 7) {
        // Story Path & Slowdown
        theLight.setTarget(0, -1.0, -7, 0.7, 0.75);
        constellation.setVisible(0);
        candleFlame.setIntensity(0);
      } else if (activeScene >= 8 && activeScene <= 9) {
        // Wishes to Candle
        theLight.setTarget(0, 0.8, -5, 1.1, 1.0);
        constellation.setVisible(0);
        candleFlame.setIntensity(0.5);
      } else if (activeScene >= 10 && activeScene <= 11) {
        // Candle flame active
        theLight.setTarget(0, 0.6, -4.5, 0.3, 0.5);
        constellation.setVisible(0);
        candleFlame.setIntensity(1.0);
      } else if (activeScene >= 12) {
        // After explosion
        theLight.setTarget(0, 0, -6, 0.8, 0.9);
        constellation.setVisible(0);
        candleFlame.setIntensity(0);
      }

      // Smooth camera tilt response
      camera.position.y = -progress * 4.0;
      camera.position.z = 5.0 + Math.sin(progress * Math.PI) * 1.5;
    },

    triggerTouchIgnite: () => {
      if (!systemsRef.current) return;
      const { theLight, fireworks } = systemsRef.current;
      theLight.setTarget(0, 0, -4, 2.0, 1.6);
      fireworks.burst(0, 0, -5, 60, ['#ffffff', '#f5d77f', '#ffd580']);
    },

    setFlameWaver: (amount: number, intensity: number) => {
      if (!systemsRef.current) return;
      systemsRef.current.candleFlame.setIntensity(intensity);
    },

    triggerFireworks: (x = 0, y = 1.5) => {
      if (!systemsRef.current) return;
      const { fireworks } = systemsRef.current;
      fireworks.burst(x, y, -7, 240, ['#f5d77f', '#ffd580', '#fba94b', '#f8b4b4', '#89c4f4', '#ffffff']);
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
    scene.fog = new THREE.FogExp2('#040508', 0.025);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false, // Turned off for performance, post-shaders handle softness
      alpha: true,
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#040508', 1);

    containerRef.current.appendChild(renderer.domElement);

    // 2. Initialize Subsystems
    const farStars = new FarStars(dpr > 1.5 ? 900 : 500);
    scene.add(farStars.points);

    const dust = new AtmosphericDust(dpr > 1.5 ? 600 : 350);
    scene.add(dust.points);

    const theLight = new TheLightEntity();
    scene.add(theLight.group);

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
      farStars,
      dust,
      theLight,
      constellation,
      candleFlame,
      fireworks,
      clock,
      isBlackout: false,
      activeScene: 0,
      scrollProgress: 0,
    };

    // 3. Render Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (systemsRef.current) {
        const { isBlackout, scrollProgress } = systemsRef.current;

        if (isBlackout) {
          renderer.setClearColor('#000000', 1);
          renderer.clear();
          return;
        }

        renderer.setClearColor('#040508', 1);

        farStars.update(elapsedTime);
        dust.update(elapsedTime, scrollProgress);
        theLight.update(elapsedTime, delta);
        constellation.update(elapsedTime);
        candleFlame.update(elapsedTime);
        fireworks.update(delta);

        renderer.render(scene, camera);
      }
    };

    animate();

    // 4. Handle Window Resize
    const handleResize = () => {
      if (!systemsRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      farStars.dispose();
      dust.dispose();
      theLight.dispose();
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

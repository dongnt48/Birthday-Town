'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { StoryConfig } from '@/types/story';
import { ExperienceCanvas, ExperienceCanvasRef } from '../three/ExperienceCanvas';
import { soundEngine } from '@/lib/soundEngine';

import { Scene00Intro } from './scenes/Scene00Darkness';
import { Scene02Constellation } from './scenes/Scene02Constellation';
import { Scene03Memories } from './scenes/Scene03Memories';
import { Scene05Fragments } from './scenes/Scene05Fragments';
import { Scene06StoryPath } from './scenes/Scene06StoryPath';
import { Scene08Wishes } from './scenes/Scene08Wishes';
import { Scene10Candle } from './scenes/Scene10Candle';
import { Scene12Explosion } from './scenes/Scene12Explosion';
import { Scene14SecretEnding } from './scenes/Scene14SecretEnding';

gsap.registerPlugin(ScrollTrigger);

interface StoryDirectorProps {
  story: StoryConfig;
}

export const StoryDirector: React.FC<StoryDirectorProps> = ({ story }) => {
  const canvasRef = useRef<ExperienceCanvasRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlackout, setIsBlackout] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create GSAP ScrollTrigger timeline tracking normalized scroll progress
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;

          // Estimate current active scene index from progress
          let activeScene = 0;
          if (progress < 0.12) activeScene = 1;
          else if (progress < 0.25) activeScene = 2;
          else if (progress < 0.45) activeScene = 3;
          else if (progress < 0.58) activeScene = 5;
          else if (progress < 0.70) activeScene = 6;
          else if (progress < 0.82) activeScene = 8;
          else if (progress < 0.92) activeScene = 10;
          else activeScene = 12;

          canvasRef.current?.updateScrollProgress(progress, activeScene);
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleIgniteLight = () => {
    soundEngine.playLightSpark();
    canvasRef.current?.triggerTouchIgnite();
  };

  const handleFlameWaver = (amount: number, intensity: number) => {
    canvasRef.current?.setFlameWaver(amount, intensity);
  };

  const handleBlowSuccess = () => {
    // 1. Blackout for 1.4 seconds
    setIsBlackout(true);
    canvasRef.current?.setBlackout(true);

    setTimeout(() => {
      setIsBlackout(false);
      canvasRef.current?.setBlackout(false);

      // 2. Birthday Explosion Climax
      soundEngine.playFireworksBurst();
      canvasRef.current?.triggerFireworks(0, 1.5);
      canvasRef.current?.triggerFireworks(-2, 2.5);
      canvasRef.current?.triggerFireworks(2, 2.0);

      // 3. Golden Confetti shower
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f5d77f', '#ffd580', '#fba94b', '#ffffff'],
      });
    }, 1400);
  };

  const handleTriggerExtraFireworks = () => {
    soundEngine.playFireworksBurst();
    const randX = (Math.random() - 0.5) * 4;
    const randY = 1.0 + Math.random() * 2;
    canvasRef.current?.triggerFireworks(randX, randY);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f5d77f', '#f8b4b4', '#89c4f4', '#ffffff'],
    });
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">
      {/* Three.js Fixed Background Canvas */}
      <ExperienceCanvas ref={canvasRef} />

      {/* Blackout Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 pointer-events-none ${
          isBlackout ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Narrative DOM Scene Flow */}
      <main className="relative z-10 flex flex-col items-center">
        {/* Scene 00 & 01: Darkness & Light Appears */}
        <Scene00Intro story={story} onIgniteLight={handleIgniteLight} />

        {/* Scene 02: Birthday Constellation */}
        <Scene02Constellation story={story} />

        {/* Scene 03 & 04: Memories Wake Up */}
        <Scene03Memories story={story} />

        {/* Scene 05: Dream Fragments */}
        <Scene05Fragments story={story} />

        {/* Scene 06 & 07: Story Path & Emotional Slowdown */}
        <Scene06StoryPath story={story} />

        {/* Scene 08 & 09: Wishes */}
        <Scene08Wishes story={story} />

        {/* Scene 10 & 11: Make a Wish & Candle Blow */}
        <Scene10Candle
          story={story}
          onFlameWaver={handleFlameWaver}
          onBlowSuccess={handleBlowSuccess}
          onPlayBlowSound={() => soundEngine.playCandleBlow()}
        />

        {/* Scene 12 & 13: Birthday Climax & Golden Fireworks */}
        <Scene12Explosion
          story={story}
          onTriggerExtraFireworks={handleTriggerExtraFireworks}
        />

        {/* Scene 14 & 15: Secret Ending & Final Farewell */}
        <Scene14SecretEnding
          story={story}
          onOpenLetterSound={() => soundEngine.playWhoosh()}
        />
      </main>
    </div>
  );
};

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { StoryConfig } from '@/types/story';

interface SceneProps {
  story: StoryConfig;
  onFlameWaver: (amount: number, intensity: number) => void;
  onBlowSuccess: () => void;
  onPlayBlowSound: () => void;
}

export const Scene10Candle: React.FC<SceneProps> = ({
  story,
  onFlameWaver,
  onBlowSuccess,
  onPlayBlowSound,
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isBlown, setIsBlown] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const duration = 2000; // 2.0 seconds hold duration

  const triggerBlow = () => {
    setIsHolding(false);
    setIsBlown(true);
    setHoldProgress(100);
    onPlayBlowSound();
    onFlameWaver(0, 0);
    onBlowSuccess();
  };

  const handleStartHold = () => {
    if (isBlown) return;
    setIsHolding(true);
    startTimeRef.current = Date.now();

    const interval = 25;
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setHoldProgress(progress);

      // Flame wavers more as progress increases
      const waver = (progress / 100) * 1.6;
      const intensity = Math.max(0.05, 1.0 - progress / 100);
      onFlameWaver(waver, intensity);

      if (progress >= 100) {
        clearInterval(timerRef.current!);
        triggerBlow();
      }
    }, interval);
  };

  const handleCancelHold = () => {
    if (isBlown) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsHolding(false);
    setHoldProgress(0);
    onFlameWaver(0, 1.0);
  };

  // Quick click fallback (smoothly auto-blows over 1s if user taps quickly)
  const handleClick = () => {
    if (isBlown || isHolding) return;
    handleStartHold();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 sm:px-6 z-10 select-none">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div className="space-y-3">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-celestial-amber">
            Chương Nguyện Ước
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-light tracking-wide">
            Thổi Nến Sinh Nhật
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light max-w-xs mx-auto leading-relaxed">
            {story.candle.instruction}
          </p>
        </div>

        {/* Minimalist Cake & Candle Visual */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src="/cake.svg"
              alt="Birthday Cake"
              fill
              className={`object-contain transition-all duration-700 ${
                isBlown ? 'opacity-30 blur-[1px]' : 'opacity-95'
              }`}
            />
          </div>

          {/* Halo Glow effect behind candle when active */}
          {!isBlown && (
            <div className="absolute top-1/4 w-28 h-28 rounded-full bg-celestial-gold/20 blur-2xl animate-pulse pointer-events-none" />
          )}
        </div>

        {/* Press & Hold Action Button */}
        {!isBlown ? (
          <div className="pt-4 flex flex-col items-center space-y-4">
            <div className="relative inline-flex items-center justify-center">
              {/* Circular SVG Gauge */}
              <svg className="w-24 h-24 -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="rgba(245, 215, 127, 0.15)"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#f5d77f"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * holdProgress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-75"
                />
              </svg>

              {/* Hold Trigger Target */}
              <button
                onClick={handleClick}
                onMouseDown={handleStartHold}
                onMouseUp={handleCancelHold}
                onMouseLeave={handleCancelHold}
                onTouchStart={handleStartHold}
                onTouchEnd={handleCancelHold}
                onTouchCancel={handleCancelHold}
                className={`absolute w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isHolding
                    ? 'bg-celestial-gold text-space-950 scale-95 shadow-celestial-glow-lg'
                    : 'bg-space-900/90 text-celestial-gold border border-celestial-gold/40 hover:border-celestial-gold'
                }`}
              >
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-center leading-tight">
                  {isHolding ? 'Đang thổi...' : 'Nhấn & Giữ'}
                </span>
              </button>
            </div>

            <p className="font-sans text-[11px] text-neutral-400 tracking-wider">
              {story.candle.buttonText}
            </p>
          </div>
        ) : (
          <div className="pt-6 animate-fade-in space-y-2">
            <p className="font-serif italic text-lg text-celestial-gold">
              {story.candle.promptAfterBlow}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

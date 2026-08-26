'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { StoryConfig } from '@/types/story';

interface SceneProps {
  story: StoryConfig;
  onIgniteLight: () => void;
}

export const Scene00Intro: React.FC<SceneProps> = ({ story, onIgniteLight }) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleTouch = () => {
    if (hasInteracted) return;
    setHasInteracted(true);
    onIgniteLight();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 select-none">
      {/* Intro prompt */}
      <div className="max-w-md mx-auto space-y-6 transition-all duration-1000">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-celestial-gold/5 border border-celestial-gold/20 text-celestial-gold/70 text-xs tracking-widest uppercase">
          <Sparkles className="w-3 h-3 text-celestial-gold" />
          <span>Chương Khởi Đầu</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-neutral-200 font-light leading-relaxed tracking-wide">
          {story.intro.mysteriousPrompt}
        </h1>

        <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-xs mx-auto font-light leading-relaxed">
          Hãy giữ một không gian thật yên tĩnh và đeo tai nghe để có trải nghiệm trọn vẹn nhất.
        </p>

        {/* Interactive Touch Target */}
        <div className="pt-12 flex flex-col items-center">
          <button
            onClick={handleTouch}
            className={`group relative flex flex-col items-center justify-center transition-transform active:scale-95 cursor-pointer ${
              hasInteracted ? 'opacity-0 scale-150 pointer-events-none' : 'opacity-100'
            }`}
            style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Luminous Pulsing Rings */}
            <div className="absolute w-24 h-24 rounded-full bg-celestial-gold/10 animate-ping opacity-75" />
            <div className="absolute w-16 h-16 rounded-full bg-celestial-gold/20 animate-pulse" />
            
            {/* Central Touch Orb */}
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-celestial-amber to-celestial-gold-light shadow-celestial-glow flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
              <div className="w-4 h-4 rounded-full bg-white shadow-inner" />
            </div>

            <span className="mt-6 text-xs tracking-widest text-celestial-gold font-sans uppercase animate-bounce">
              {story.intro.touchPrompt}
            </span>
          </button>

          {hasInteracted && (
            <p className="font-serif italic text-sm text-celestial-gold/90 animate-fade-in tracking-wider">
              Tia sáng đã thức giấc... Hãy cuộn xuống để bước vào hành trình.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

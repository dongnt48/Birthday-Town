'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { StoryConfig } from '@/types/story';

interface SceneProps {
  story: StoryConfig;
  onTriggerExtraFireworks: () => void;
}

export const Scene12Explosion: React.FC<SceneProps> = ({
  story,
  onTriggerExtraFireworks,
}) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 px-4 sm:px-6 z-10 select-none text-center">
      <div className="max-w-xl mx-auto space-y-12">
        {/* Decorative Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-celestial-gold/10 border border-celestial-gold/30 text-celestial-gold text-xs tracking-widest uppercase animate-subtle-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Thời Khắc Rạng Rỡ Nhất</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        {/* Staggered Kinetic Typography */}
        <div className="space-y-4">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-[0.18em] font-light text-neutral-100 uppercase">
            HAPPY
          </h1>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-[0.18em] font-light text-shimmer-gold uppercase text-glow-soft">
            BIRTHDAY
          </h1>
          <div className="pt-4">
            <h2 className="font-serif text-3xl sm:text-5xl text-celestial-gold font-normal tracking-wider">
              {story.recipient.name}
            </h2>
          </div>
        </div>

        <p className="font-sans text-sm sm:text-base text-neutral-300 font-light max-w-sm mx-auto leading-relaxed">
          {story.explosion.subtitle}
        </p>

        {/* Interactive Firework Button */}
        <div className="pt-8">
          <button
            onClick={onTriggerExtraFireworks}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full cinematic-glass-gold text-celestial-gold text-xs uppercase tracking-widest font-sans font-semibold hover:scale-105 active:scale-95 transition-all shadow-celestial-glow cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-celestial-gold animate-spin" style={{ animationDuration: '6s' }} />
            <span>Bắn thêm pháo hoa</span>
            <Heart className="w-4 h-4 text-celestial-rose fill-celestial-rose" />
          </button>
        </div>
      </div>
    </section>
  );
};

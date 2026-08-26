'use client';

import React from 'react';
import { StoryConfig } from '@/types/story';

interface SceneProps {
  story: StoryConfig;
}

export const Scene02Constellation: React.FC<SceneProps> = ({ story }) => {
  const { day, month, year } = story.recipient.birthDate;
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 select-none">
      <div className="max-w-lg mx-auto space-y-8">
        <p className="font-serif italic text-base sm:text-lg text-celestial-gold/80 tracking-widest">
          {story.intro.arrivedMessage}
        </p>

        {/* Constellation Star Date Header */}
        <div className="py-6 space-y-3">
          <div className="inline-block relative">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl tracking-[0.25em] font-light text-shimmer-gold">
              {formattedDay} • {formattedMonth} • {year}
            </h2>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-celestial-gold to-transparent" />
          </div>
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 font-sans">
            Ngày những vì sao hội tụ
          </p>
        </div>

        <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto font-light leading-relaxed">
          Một vì sao rơi xuống từ chòm sao sinh mệnh, dẫn lối ta bước vào những miền ký ức ngọt ngào nhất...
        </p>
      </div>
    </section>
  );
};

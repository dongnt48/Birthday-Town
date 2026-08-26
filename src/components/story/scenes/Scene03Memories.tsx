'use client';

import React from 'react';
import Image from 'next/image';
import { StoryConfig, MemoryItem } from '@/types/story';

interface SceneProps {
  story: StoryConfig;
}

export const Scene03Memories: React.FC<SceneProps> = ({ story }) => {
  return (
    <section className="relative w-full py-24 px-4 sm:px-6 z-10 select-none">
      <div className="max-w-4xl mx-auto space-y-28">
        {/* Section Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-celestial-gold/70">
            Chương Ký Ức
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-light tracking-wide">
            Những Khoảnh Khắc Lấp Lánh
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-md mx-auto font-light">
            Mỗi tấm ảnh là một điểm sáng được giữ lại trong không gian thời gian.
          </p>
        </div>

        {/* Memory Stream (Staggered Layout) */}
        <div className="space-y-32">
          {story.memories.map((memory, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={memory.id}
                className={`flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8 md:gap-14 group`}
              >
                {/* Photo Frame with Depth & Soft Glow */}
                <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-2xl overflow-hidden cinematic-glass p-2 transition-transform duration-700 group-hover:scale-[1.02]">
                  {/* Subtle Light Leak Accent */}
                  <div
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: memory.accentColor || '#f5d77f' }}
                  />

                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-space-900/80">
                    <Image
                      src={memory.image}
                      alt={memory.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Caption Details */}
                <div className={`w-full max-w-sm space-y-4 ${isEven ? 'md:text-left' : 'md:text-right'} text-center`}>
                  {memory.dateText && (
                    <span className="inline-block text-xs font-sans tracking-widest uppercase text-celestial-gold/60 border-b border-celestial-gold/20 pb-1">
                      {memory.dateText}
                    </span>
                  )}

                  <h3 className="font-serif text-2xl text-neutral-100 font-light tracking-wide group-hover:text-celestial-gold transition-colors">
                    {memory.title}
                  </h3>

                  <p className="font-sans text-sm text-neutral-300 font-light leading-relaxed">
                    {memory.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

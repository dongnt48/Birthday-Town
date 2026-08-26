'use client';

import React from 'react';
import Image from 'next/image';
import { StoryConfig } from '@/types/story';

interface SceneProps {
  story: StoryConfig;
}

export const Scene05Fragments: React.FC<SceneProps> = ({ story }) => {
  return (
    <section className="relative w-full py-28 px-4 sm:px-6 z-10 select-none">
      <div className="max-w-4xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-celestial-matcha/80">
            Chương Những Mảnh Ghép
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-light tracking-wide">
            Những Điều Bé Nhỏ Thuộc Về Bạn
          </h2>
          <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto font-light">
            Từng sở thích, từng thói quen dịu dàng dệt nên một tâm hồn thật đáng yêu.
          </p>
        </div>

        {/* Fragment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {story.fragments.map((frag) => (
            <div
              key={frag.id}
              className="relative rounded-2xl cinematic-glass p-6 text-center space-y-5 flex flex-col items-center group hover:border-celestial-gold/30 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Floating Cutout Asset */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-700 group-hover:scale-110">
                <Image
                  src={frag.image}
                  alt={frag.title}
                  fill
                  className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl text-neutral-100 font-normal tracking-wide text-shimmer-gold">
                  {frag.title}
                </h3>
                <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                  {frag.caption}
                </p>
              </div>

              {frag.details && (
                <div className="pt-2 border-t border-white/5 w-full">
                  <span className="text-[11px] font-sans italic text-celestial-gold/60">
                    {frag.details}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

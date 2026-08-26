'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { StoryConfig } from '@/types/story';

interface SceneProps {
  story: StoryConfig;
}

export const Scene08Wishes: React.FC<SceneProps> = ({ story }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-28 px-4 sm:px-6 z-10 select-none">
      <div className="max-w-2xl mx-auto text-center space-y-16">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-celestial-gold/5 border border-celestial-gold/20 text-celestial-gold/70 text-xs tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-celestial-gold" />
            <span>Chương Ước Nguyện</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-light tracking-wide">
            Những Lời Chúc Gửi Đến Tương Lai
          </h2>
        </div>

        {/* Wishes List */}
        <div className="space-y-12">
          {story.wishes.map((wish, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl cinematic-glass border border-celestial-gold/10 hover:border-celestial-gold/30 transition-all duration-500 hover:scale-[1.01]"
            >
              <p className="font-serif italic text-lg sm:text-xl text-neutral-200 font-light leading-relaxed text-shimmer-gold">
                &ldquo;{wish}&rdquo;
              </p>
            </div>
          ))}
        </div>

        <p className="font-sans text-xs text-neutral-400 font-light tracking-wider">
          Tất cả những lời nguyện ước đang dần hội tụ thành một đốm lửa ấm áp...
        </p>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { StoryConfig } from '@/types/story';

interface SceneProps {
  story: StoryConfig;
}

export const Scene06StoryPath: React.FC<SceneProps> = ({ story }) => {
  return (
    <section className="relative w-full py-32 px-4 sm:px-6 z-10 select-none">
      <div className="max-w-2xl mx-auto space-y-36">
        {/* Story Path Timeline Nodes */}
        <div className="relative border-l border-celestial-gold/20 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-24">
          {story.storyPath.map((milestone) => (
            <div key={milestone.id} className="relative group">
              {/* Luminous Node Dot */}
              <div className="absolute -left-[41px] sm:-left-[57px] top-1.5 w-4 h-4 rounded-full bg-space-950 border border-celestial-gold flex items-center justify-center group-hover:scale-125 transition-transform shadow-celestial-glow">
                <div className="w-1.5 h-1.5 rounded-full bg-celestial-gold animate-ping" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-sans tracking-[0.25em] uppercase text-celestial-gold/60">
                  {milestone.chapter}
                </span>
                <h3 className="font-serif text-2xl text-neutral-100 font-light tracking-wide">
                  {milestone.title}
                </h3>
                <p className="font-serif italic text-base sm:text-lg text-neutral-300 font-light leading-relaxed pt-1">
                  &ldquo;{milestone.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Emotional Slowdown Pause */}
        <div className="text-center pt-16 space-y-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-celestial-gold/40 to-transparent mx-auto" />
          <p className="font-serif italic text-lg sm:text-xl text-neutral-200 font-light max-w-md mx-auto leading-relaxed">
            &ldquo;Có những khoảnh khắc sẽ ở lại mãi mãi,<br />ngay cả khi mọi thứ xung quanh cứ thế trôi đi.&rdquo;
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-celestial-gold/40 to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState } from 'react';
import { Mail, X, Sparkles, Heart } from 'lucide-react';
import { StoryConfig } from '@/types/story';

interface SceneProps {
  story: StoryConfig;
  onOpenLetterSound: () => void;
}

export const Scene14SecretEnding: React.FC<SceneProps> = ({
  story,
  onOpenLetterSound,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    onOpenLetterSound();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-28 px-4 sm:px-6 z-10 select-none text-center">
      <div className="max-w-md mx-auto space-y-16">
        {/* Secret Letter Envelope Trigger */}
        <div className="space-y-6">
          <p className="font-serif italic text-base sm:text-lg text-celestial-gold/80 tracking-wider">
            {story.secretEnding.triggerText}
          </p>

          <button
            onClick={handleOpen}
            className="group relative inline-flex flex-col items-center justify-center p-8 rounded-3xl cinematic-glass border border-celestial-gold/30 hover:border-celestial-gold transition-all duration-500 hover:scale-105 shadow-celestial-glow cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-celestial-gold/10 flex items-center justify-center border border-celestial-gold/40 group-hover:scale-110 transition-transform">
              <Mail className="w-7 h-7 text-celestial-gold" />
            </div>

            <span className="mt-4 font-sans text-xs tracking-widest text-neutral-200 uppercase font-medium">
              Chạm để mở bức thư tay
            </span>
          </button>
        </div>

        {/* Final Message Farewell */}
        <div className="pt-20 space-y-6 max-w-sm mx-auto">
          <div className="w-8 h-px bg-gradient-to-r from-transparent via-celestial-gold/30 to-transparent mx-auto" />
          
          <div className="space-y-3 font-serif italic text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            {story.finalMessage.lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-xs font-sans text-celestial-gold/60">
            <span>✦</span>
            <span>Happy Birthday</span>
            <span>✦</span>
          </div>
        </div>
      </div>

      {/* Handwritten Letter Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-space-950/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl cinematic-glass-gold p-6 sm:p-10 text-left space-y-6 shadow-2xl border border-celestial-gold/40 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="space-y-2 border-b border-celestial-gold/20 pb-4">
              <div className="inline-flex items-center gap-1.5 text-celestial-gold text-xs font-sans tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Thư gửi ngày sinh nhật</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-normal">
                {story.secretEnding.letterTitle}
              </h3>
            </div>

            {/* Letter Body */}
            <div className="space-y-4 font-serif text-sm sm:text-base text-neutral-200 font-light leading-relaxed">
              {story.secretEnding.letterContent.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Letter Sign-off */}
            <div className="pt-6 border-t border-celestial-gold/20 space-y-2 text-right">
              <p className="font-serif italic text-celestial-gold text-base">
                {story.secretEnding.closing}
              </p>
              <p className="font-sans text-xs text-neutral-400 tracking-wider">
                {story.secretEnding.signature}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

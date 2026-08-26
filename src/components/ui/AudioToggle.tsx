'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundEngine } from '@/lib/soundEngine';

export const AudioToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleToggle = () => {
    if (!hasStarted) {
      soundEngine.startAmbient();
      setHasStarted(true);
    }
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full cinematic-glass hover:border-celestial-gold/40 transition-all duration-300 group"
      aria-label="Toggle Sound"
    >
      <div className="flex items-center gap-1 h-3 px-1">
        <span
          className={`w-0.5 bg-celestial-gold rounded-full transition-all duration-300 ${
            !isMuted && hasStarted ? 'h-3 animate-pulse' : 'h-1 opacity-40'
          }`}
        />
        <span
          className={`w-0.5 bg-celestial-gold rounded-full transition-all duration-300 ${
            !isMuted && hasStarted ? 'h-4 animate-pulse delay-75' : 'h-1.5 opacity-40'
          }`}
        />
        <span
          className={`w-0.5 bg-celestial-gold rounded-full transition-all duration-300 ${
            !isMuted && hasStarted ? 'h-2 animate-pulse delay-150' : 'h-1 opacity-40'
          }`}
        />
      </div>

      <span className="text-xs font-sans tracking-widest text-celestial-gold/80 uppercase">
        {isMuted ? 'Muted' : hasStarted ? 'Ambient' : 'Sound'}
      </span>

      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-celestial-gold group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
};

'use client';

// =============================================================================
// AudioOptInModal — "Enter with Sound / Continue Muted" Gate
// Ensures 100% compliance with browser autoplay restrictions while setting a
// premium storytelling tone on arrival.
// =============================================================================

import { useState, useEffect } from 'react';
import { useAudioStore } from '@/stores/useAudioStore';
import { audioManager } from '@/experience/core/AudioManager';

export function AudioOptInModal() {
  const hasUserDecided = useAudioStore((s) => s.hasUserDecided);
  const optIn = useAudioStore((s) => s.optInSound);
  const optOut = useAudioStore((s) => s.optOutSound);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || hasUserDecided) return null;

  const handleEnterWithSound = async () => {
    optIn();
    await audioManager.init();
    audioManager.playWelcomeChime();
  };

  const handleContinueMuted = () => {
    optOut();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141210]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-8 bg-[#181614] border border-[#C9A84C]/60 shadow-2xl text-center space-y-6">
        {/* Precision Optical Corner Brackets */}
        <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#C9A84C]" />
        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#C9A84C]" />
        <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#C9A84C]" />
        <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#C9A84C]" />

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] font-mono">
              Acoustic Architecture
            </span>
          </div>

          <h2 className="text-2xl font-light text-[#F5F0E6] tracking-tight">
            Island of Memory
          </h2>

          <p className="text-xs text-[#B8AEA0] leading-relaxed max-w-sm mx-auto">
            This realm features procedural ocean swells, subterranean system drones, and an interactive musical stem orchestra.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleEnterWithSound}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#C9A84C] text-[#1A1816] font-medium text-xs tracking-wider uppercase hover:bg-[#C9A84C]/90 transition-colors shadow-lg cursor-pointer"
          >
            Enter With Sound &rarr;
          </button>

          <button
            type="button"
            onClick={handleContinueMuted}
            className="w-full sm:w-auto px-5 py-2.5 border border-[#3A3632] bg-[#141210] text-[#A89E8E] hover:text-[#F5F0E6] hover:border-[#8A7E6E] text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            Explore in Silence
          </button>
        </div>

        <p className="text-[10px] text-[#8A7E6E] font-mono">
          Audio parameters can be toggled at any moment from the top navbar.
        </p>
      </div>
    </div>
  );
}

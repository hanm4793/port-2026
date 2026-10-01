'use client';

// =============================================================================
// HUD — heads-up display over the 3D canvas
// Features:
// - Zone indicator
// - Mode indicator & scroll progress
// - Interactive Sound: ON/OFF toggle with live equalizer bars
// =============================================================================

import { useState, useEffect } from 'react';
import { useExperienceStore } from '@/stores/useExperienceStore';
import { useZoneStore } from '@/stores/useZoneStore';
import { useCameraStore } from '@/stores/useCameraStore';
import { stemAudioEngine } from '@/experience/zones/amphitheatre/StemAudioEngine';

export function HUD() {
  const mode = useExperienceStore((s) => s.mode);
  const status = useExperienceStore((s) => s.status);
  const activeZone = useZoneStore((s) => s.activeZone);
  const zones = useZoneStore((s) => s.zones);
  const scrollProgress = useCameraStore((s) => s.scrollProgress);

  const [audioState, setAudioState] = useState(stemAudioEngine.getState());

  useEffect(() => {
    return stemAudioEngine.subscribe(setAudioState);
  }, []);

  if (status !== 'ready') return null;

  const zoneName = activeZone ? zones[activeZone]?.name : '';
  const isSoundActive = audioState.isRunning && !audioState.isMuted;

  const handleAudioToggle = () => {
    if (!audioState.isRunning) {
      stemAudioEngine.init().then(() => {
        stemAudioEngine.playLyreChime();
      });
    } else {
      stemAudioEngine.toggleMute();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Zone indicator */}
        <div className="pointer-events-auto">
          <p className="text-xs tracking-widest uppercase text-[#A89E8E]">
            {zoneName}
          </p>
        </div>

        {/* Right side: Audio Toggle & Mode indicator */}
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Audio Equalizer & Toggle */}
          <button
            type="button"
            onClick={handleAudioToggle}
            className="flex items-center gap-2 px-2.5 py-1 border border-[#3A3632]/60 bg-[#1A1816]/70 backdrop-blur-sm text-xs text-[#A89E8E] hover:text-[#F5F0E6] hover:border-[#C9A84C]/60 transition-colors"
            title="Toggle procedural audio"
          >
            {/* Equalizer bars */}
            <span className="flex items-end gap-0.5 h-3">
              <span
                className={`w-0.5 bg-[#C9A84C] transition-all duration-300 ${
                  isSoundActive ? 'h-3 animate-pulse' : 'h-1'
                }`}
              />
              <span
                className={`w-0.5 bg-[#6BA3C7] transition-all duration-300 ${
                  isSoundActive ? 'h-2 animate-bounce' : 'h-1'
                }`}
              />
              <span
                className={`w-0.5 bg-[#D4725C] transition-all duration-300 ${
                  isSoundActive ? 'h-2.5 animate-pulse' : 'h-1'
                }`}
              />
            </span>
            <span className="text-[10px] tracking-wider uppercase font-mono">
              Sound: {isSoundActive ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Mode indicator */}
          <div className="text-xs text-[#A89E8E]">
            {mode === 'story' && <span>{Math.round(scrollProgress * 100)}%</span>}
            {mode === 'explore' && <span>Explore</span>}
            {mode === 'detail' && <span>Detail</span>}
          </div>
        </div>
      </div>

      {/* Progress bar (Story Mode only) */}
      {mode === 'story' && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#3A3632]/30">
          <div
            className="h-full bg-[#C9A84C]/50 transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}

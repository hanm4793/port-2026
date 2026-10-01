'use client';

// =============================================================================
// ExploreHUD — Museum-instrument UI overlay for Explore Mode
// Features:
// - Return to Story Mode button
// - Summit Beacon lodestone compass needle
// - Zone transition cinematic announcement toasts
// - Precision optical spatial reticle for hotspots & Memory Seals
// - Memory Seal inspection modal with historical/technical lore
// - Fast travel waypoint controls & mobile touch D-Pad
// =============================================================================

import { useEffect } from 'react';
import { useExperienceStore } from '@/stores/useExperienceStore';
import { useAudioStore } from '@/stores/useAudioStore';
import {
  useExploreStore,
  EXPLORE_WAYPOINTS,
  MEMORY_SEALS,
} from '@/stores/useExploreStore';

export function ExploreHUD() {
  const mode = useExperienceStore((s) => s.mode);
  const setMode = useExperienceStore((s) => s.setMode);

  const discoveredSeals = useExploreStore((s) => s.discoveredSeals);
  const activeSeal = useExploreStore((s) => s.activeSeal);
  const closeSeal = useExploreStore((s) => s.closeSeal);
  const currentZone = useExploreStore((s) => s.currentZone);
  const zoneToast = useExploreStore((s) => s.zoneToast);
  const beaconAngle = useExploreStore((s) => s.beaconAngle);
  const interactPrompt = useExploreStore((s) => s.interactPrompt);
  const teleport = useExploreStore((s) => s.teleportToWaypoint);
  const setKey = useExploreStore((s) => s.setKey);

  // Auto-duck soundscape while inspecting a memory seal
  useEffect(() => {
    if (activeSeal) {
      useAudioStore.getState().setDucked(true);
      return () => {
        useAudioStore.getState().setDucked(false);
      };
    }
  }, [activeSeal]);

  if (mode !== 'explore') return null;

  return (
    <>
      {/* ── Top Bar: Return to Story, Beacon Compass & Seals Tracker ────── */}
      <div className="fixed top-14 left-0 right-0 z-40 px-4 sm:px-6 flex items-center justify-between pointer-events-none">
        {/* Left: Return to Story Mode Button */}
        <button
          type="button"
          onClick={() => setMode('story')}
          className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 bg-[#C9A84C] text-[#1A1816] font-medium text-xs tracking-wider uppercase shadow-xl hover:bg-[#C9A84C]/90 transition-all cursor-pointer"
        >
          <span>&larr;</span>
          <span>Return to Guided Story</span>
        </button>

        {/* Center: Current Zone & Summit Beacon Lodestone Needle */}
        <div className="pointer-events-auto hidden md:flex items-center gap-3 px-3.5 py-1.5 bg-[#1A1816]/85 border border-[#3A3632]/60 backdrop-blur-md">
          {/* Compass Needle to Summit Beacon */}
          <div className="flex items-center gap-1.5 text-[10px] text-[#A89E8E] font-mono">
            <span>Beacon</span>
            <span
              className="inline-block text-[#C9A84C] font-bold text-xs transition-transform duration-300"
              style={{ transform: `rotate(${Math.round(beaconAngle)}deg)` }}
              title="Heading to Summit Beacon"
            >
              ▲
            </span>
          </div>

          <span className="text-[#3A3632]">|</span>

          <span className="text-xs uppercase tracking-wider text-[#F5F0E6] font-mono">
            {currentZone}
          </span>
        </div>

        {/* Right: Discovered Seals Progress */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 bg-[#1A1816]/85 border border-[#3A3632]/60 backdrop-blur-md text-xs text-[#A89E8E]">
          <span className="w-2 h-2 rounded-full bg-[#6BA3C7] animate-pulse" />
          <span className="font-mono text-[11px] tracking-wider text-[#F5F0E6]">
            Memory Seals: {discoveredSeals.length} / {MEMORY_SEALS.length}
          </span>
        </div>
      </div>

      {/* ── Cinematic Zone Entry Toast ──────────────────────────────────── */}
      {zoneToast && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-all duration-500 animate-fadeIn">
          <div className="px-5 py-2 bg-[#141210]/95 border-y border-[#C9A84C]/80 shadow-2xl backdrop-blur-md text-center space-y-0.5">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] block font-mono">
              Territory Accessed
            </span>
            <span className="text-sm font-light uppercase tracking-widest text-[#F5F0E6] block">
              {zoneToast}
            </span>
          </div>
        </div>
      )}

      {/* ── Museum-Grade Optical Reticle / Contextual Interaction Prompt ── */}
      {interactPrompt && (
        <div className="fixed bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
          <div className="relative p-1 bg-[#1A1816]/90 border border-[#C9A84C]/60 shadow-2xl backdrop-blur-md">
            {/* Precision Optical Corner Brackets */}
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#C9A84C]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#C9A84C]" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#C9A84C]" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#C9A84C]" />

            <button
              type="button"
              onClick={interactPrompt.onAction}
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#C9A84C]/10 transition-colors cursor-pointer text-left"
            >
              <span className="font-mono font-bold text-xs px-2 py-0.5 bg-[#C9A84C] text-[#1A1816] rounded-sm">
                E
              </span>
              <div>
                <span className="text-[10px] tracking-wider uppercase text-[#8A7E6E] block font-mono">
                  {interactPrompt.title}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#F5F0E6] font-medium block">
                  {interactPrompt.actionVerb} &rarr;
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ── Bottom Controls Guide & Fast Travel Selector ─────────────────── */}
      <div className="fixed bottom-14 md:bottom-6 left-0 right-0 z-40 px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-none">
        {/* Controls Legend */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-3 px-3 py-1.5 bg-[#1A1816]/80 border border-[#3A3632]/50 backdrop-blur-sm text-[10px] uppercase tracking-wider text-[#8A7E6E] font-mono">
          <span>
            <strong className="text-[#F5F0E6]">WASD / Arrows</strong> Move
          </span>
          <span>•</span>
          <span>
            <strong className="text-[#F5F0E6]">Drag</strong> Orbit View
          </span>
          <span>•</span>
          <span>
            <strong className="text-[#F5F0E6]">Scroll</strong> Zoom
          </span>
        </div>

        {/* Fast Travel Waypoints */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 bg-[#141210]/90 border border-[#3A3632]/60 backdrop-blur-md">
          <span className="text-[10px] tracking-wider uppercase text-[#8A7E6E] px-2 hidden sm:inline">
            Travel:
          </span>
          {EXPLORE_WAYPOINTS.map((wp) => (
            <button
              key={wp.id}
              type="button"
              onClick={() => teleport(wp.id)}
              className="px-2.5 py-1 text-[10px] tracking-wider uppercase border border-[#3A3632]/50 bg-[#1E1B18] text-[#A89E8E] hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-colors cursor-pointer"
            >
              {wp.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Mobile Touch D-Pad ───────────────────────────────────────────── */}
      <div className="fixed bottom-16 left-4 z-40 sm:hidden pointer-events-auto flex flex-col items-center gap-1 bg-[#141210]/80 p-2 border border-[#3A3632]/50 rounded-lg">
        <button
          type="button"
          onTouchStart={() => setKey('forward', true)}
          onTouchEnd={() => setKey('forward', false)}
          className="w-10 h-10 border border-[#3A3632] bg-[#1E1B18] flex items-center justify-center text-sm active:bg-[#C9A84C] active:text-[#1A1816]"
        >
          ▲
        </button>
        <div className="flex gap-1">
          <button
            type="button"
            onTouchStart={() => setKey('left', true)}
            onTouchEnd={() => setKey('left', false)}
            className="w-10 h-10 border border-[#3A3632] bg-[#1E1B18] flex items-center justify-center text-sm active:bg-[#C9A84C] active:text-[#1A1816]"
          >
            ◀
          </button>
          <button
            type="button"
            onTouchStart={() => setKey('backward', true)}
            onTouchEnd={() => setKey('backward', false)}
            className="w-10 h-10 border border-[#3A3632] bg-[#1E1B18] flex items-center justify-center text-sm active:bg-[#C9A84C] active:text-[#1A1816]"
          >
            ▼
          </button>
          <button
            type="button"
            onTouchStart={() => setKey('right', true)}
            onTouchEnd={() => setKey('right', false)}
            className="w-10 h-10 border border-[#3A3632] bg-[#1E1B18] flex items-center justify-center text-sm active:bg-[#C9A84C] active:text-[#1A1816]"
          >
            ▶
          </button>
        </div>
      </div>

      {/* ── Active Memory Seal Modal ─────────────────────────────────────── */}
      {activeSeal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141210]/75 backdrop-blur-sm"
          onClick={closeSeal}
        >
          <div
            className="relative w-full max-w-lg p-6 sm:p-8 bg-[#181614] border border-[#C9A84C]/60 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeSeal}
              className="absolute top-4 right-4 text-[#A89E8E] hover:text-[#F5F0E6] text-xl cursor-pointer"
            >
              &times;
            </button>

            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] block font-mono">
                {activeSeal.zone} / Archaeological Discovery
              </span>
              <h2 className="text-2xl font-light text-[#F5F0E6]">{activeSeal.title}</h2>
              <p className="text-xs text-[#8A7E6E]">{activeSeal.subtitle}</p>
            </div>

            <div className="p-4 bg-[#141210] border-l-2 border-[#C9A84C] text-xs text-[#B8AEA0] leading-relaxed">
              {activeSeal.content}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={closeSeal}
                className="px-5 py-2 text-xs uppercase tracking-wider bg-[#C9A84C] text-[#1A1816] font-medium hover:bg-[#C9A84C]/80 cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

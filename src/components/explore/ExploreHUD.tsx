'use client';

// =============================================================================
// ExploreHUD — UI overlay active exclusively during Explore Mode
// Features:
// - Return to Story Mode button
// - Memory Seals discovered tracker (X / 4)
// - Fast Travel zone selector (Shore, Forum, Dino Sanctuary, Amphitheatre)
// - Keyboard / Touch controls helper
// - Memory Seal Inspection Modal
// - On-screen touch D-Pad for mobile devices
// =============================================================================

import { useExperienceStore } from '@/stores/useExperienceStore';
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
  const nearSealId = useExploreStore((s) => s.nearSealId);
  const teleport = useExploreStore((s) => s.teleportToWaypoint);
  const setKey = useExploreStore((s) => s.setKey);
  const openSeal = useExploreStore((s) => s.openSeal);

  if (mode !== 'explore') return null;

  const nearbySeal = nearSealId ? MEMORY_SEALS.find((s) => s.id === nearSealId) : null;

  return (
    <>
      {/* ── Top Bar: Return to Story & Seals Tracker ─────────────────────── */}
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

        {/* Right: Discovered Seals Progress */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 bg-[#1A1816]/85 border border-[#3A3632]/60 backdrop-blur-md text-xs text-[#A89E8E]">
          <span className="w-2 h-2 rounded-full bg-[#6BA3C7] animate-pulse" />
          <span className="font-mono text-[11px] tracking-wider text-[#F5F0E6]">
            Memory Seals: {discoveredSeals.length} / {MEMORY_SEALS.length}
          </span>
        </div>
      </div>

      {/* ── Nearby Seal Prompt ([E] or Click to Inspect) ────────────────── */}
      {nearbySeal && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-40 pointer-events-auto animate-bounce">
          <button
            type="button"
            onClick={() => openSeal(nearbySeal)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1816]/90 border border-[#C9A84C] text-xs uppercase tracking-wider text-[#C9A84C] shadow-2xl backdrop-blur-md cursor-pointer hover:bg-[#C9A84C] hover:text-[#1A1816] transition-colors"
          >
            <span className="font-mono font-bold px-1.5 py-0.5 bg-[#C9A84C]/20 border border-[#C9A84C]">
              E
            </span>
            <span>Inspect {nearbySeal.title}</span>
          </button>
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
            <strong className="text-[#F5F0E6]">Drag</strong> Rotate View
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

      {/* ── On-Screen Touch D-Pad for Mobile Devices ─────────────────────── */}
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141210]/70 backdrop-blur-sm"
          onClick={closeSeal}
        >
          <div
            className="relative w-full max-w-lg p-6 sm:p-8 bg-[#181614] border border-[#C9A84C]/60 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeSeal}
              className="absolute top-4 right-4 text-[#A89E8E] hover:text-[#F5F0E6] text-xl"
            >
              &times;
            </button>

            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] block">
                {activeSeal.zone} / Discovery
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
                className="px-5 py-2 text-xs uppercase tracking-wider bg-[#C9A84C] text-[#1A1816] font-medium hover:bg-[#C9A84C]/80"
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

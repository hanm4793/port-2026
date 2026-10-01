'use client';

// =============================================================================
// HUD — heads-up display over the 3D canvas
// Features:
// - Zone indicator (top-left, below navbar)
// - Mode indicator & scroll progress (top-right, below navbar)
// =============================================================================

import { useExperienceStore } from '@/stores/useExperienceStore';
import { useZoneStore } from '@/stores/useZoneStore';
import { useCameraStore } from '@/stores/useCameraStore';

export function HUD() {
  const mode = useExperienceStore((s) => s.mode);
  const status = useExperienceStore((s) => s.status);
  const activeZone = useZoneStore((s) => s.activeZone);
  const zones = useZoneStore((s) => s.zones);
  const scrollProgress = useCameraStore((s) => s.scrollProgress);

  if (status !== 'ready') return null;

  const zoneName = activeZone ? zones[activeZone]?.name : '';

  return (
    <div className="fixed top-14 left-0 right-0 z-40 pointer-events-none">
      <div className="flex items-center justify-between px-6 py-2">
        {/* Zone indicator */}
        <div className="pointer-events-auto bg-[#1A1816]/70 backdrop-blur-sm px-3 py-1 border border-[#3A3632]/50">
          <p className="text-[10px] tracking-widest uppercase text-[#C9A84C] font-mono">
            {zoneName || 'Island Realm'}
          </p>
        </div>

        {/* Right side: Mode indicator & Progress */}
        <div className="flex items-center gap-3 pointer-events-auto bg-[#1A1816]/70 backdrop-blur-sm px-3 py-1 border border-[#3A3632]/50 text-[10px] text-[#A89E8E] font-mono">
          {mode === 'story' && <span>Scroll: {Math.round(scrollProgress * 100)}%</span>}
          {mode === 'explore' && <span className="text-[#6BA3C7]">Mode: Free Explore</span>}
          {mode === 'detail' && <span className="text-[#C9A84C]">Mode: Detail View</span>}
        </div>
      </div>

      {/* Progress bar (Story Mode only) */}
      {mode === 'story' && (
        <div className="absolute top-full left-0 right-0 h-0.5 bg-[#3A3632]/40">
          <div
            className="h-full bg-[#C9A84C] transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}

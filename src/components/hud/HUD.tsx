'use client';

// =============================================================================
// HUD — heads-up display over the 3D canvas
// =============================================================================

import { useExperienceStore } from '@/stores/useExperienceStore';
import { useZoneStore } from '@/stores/useZoneStore';
import { useCameraStore } from '@/stores/useCameraStore';

/**
 * Minimal HUD overlay showing zone name, scroll progress, and mode toggle.
 */
export function HUD() {
  const mode = useExperienceStore((s) => s.mode);
  const status = useExperienceStore((s) => s.status);
  const activeZone = useZoneStore((s) => s.activeZone);
  const zones = useZoneStore((s) => s.zones);
  const scrollProgress = useCameraStore((s) => s.scrollProgress);

  if (status !== 'ready') return null;

  const zoneName = activeZone ? zones[activeZone]?.name : '';

  return (
    <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Zone indicator */}
        <div className="pointer-events-auto">
          <p className="text-xs tracking-widest uppercase text-[#A89E8E]">
            {zoneName}
          </p>
        </div>

        {/* Mode indicator */}
        <div className="pointer-events-auto text-xs text-[#A89E8E]">
          {mode === 'story' && (
            <span>{Math.round(scrollProgress * 100)}%</span>
          )}
          {mode === 'explore' && <span>Explore</span>}
          {mode === 'detail' && <span>Detail</span>}
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

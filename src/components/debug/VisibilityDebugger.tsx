'use client';

// =============================================================================
// VisibilityDebugger — Development-only diagnostic panel (Task F)
// Displays real-time camera position, per-zone visibility tiers (Far/Mid/Near),
// active collision & interaction hotspots, and live WebGL draw stats.
// Stripped / returns null in production builds.
// =============================================================================

import { useState, useEffect } from 'react';
import { useCameraStore } from '@/stores/useCameraStore';
import { useExperienceStore } from '@/stores/useExperienceStore';
import { useExploreStore } from '@/stores/useExploreStore';
import { useQualityStore } from '@/stores/useQualityStore';
import {
  ZONE_VISIBILITY_DESCRIPTORS,
  getZoneTier,
  type MasterZoneId,
} from '@/experience/world/ZoneVisibilityDescriptors';
import { getChapterAtProgress } from '@/experience/story/StoryConfig';

export function VisibilityDebugger() {
  // Only active in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <VisibilityDebuggerInner />;
}

function VisibilityDebuggerInner() {
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState({ calls: 0, triangles: 0, geometries: 0, textures: 0 });

  const mode = useExperienceStore((s) => s.mode);
  const scrollProgress = useCameraStore((s) => s.scrollProgress);
  const cameraPos = useCameraStore((s) => s.position);
  const playerPos = useExploreStore((s) => s.playerPosition);
  const currentZone = useExploreStore((s) => s.currentZone);
  const nearSealId = useExploreStore((s) => s.nearSealId);
  const interactPrompt = useExploreStore((s) => s.interactPrompt);
  const tier = useQualityStore((s) => s.tier);

  // Toggle with ` (backtick)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`') {
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Poll WebGL info at 4Hz
  useEffect(() => {
    if (!open) return;
    const timer = setInterval(() => {
      const win = window as unknown as {
        __THREE_GL__?: {
          info?: {
            render: { calls: number; triangles: number };
            memory: { geometries: number; textures: number };
          };
        };
      };
      const gl = win.__THREE_GL__;
      if (gl?.info) {
        setStats({
          calls: gl.info.render.calls,
          triangles: gl.info.render.triangles,
          geometries: gl.info.memory.geometries,
          textures: gl.info.memory.textures,
        });
      }
    }, 250);
    return () => clearInterval(timer);
  }, [open]);

  const { chapter } = getChapterAtProgress(scrollProgress);
  const refPos = mode === 'story' ? cameraPos : playerPos;

  const zoneIds: MasterZoneId[] = ['shore', 'forum', 'agora', 'sanctuary', 'amphitheatre', 'beacon'];

  return (
    <aside aria-label="Visibility Debugger" className="fixed bottom-3 right-3 z-50 pointer-events-auto font-mono text-[10px]">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-2 py-1 bg-[#141210]/90 border border-[#3A3632] text-[#C9A84C] hover:border-[#C9A84C] backdrop-blur-sm cursor-pointer shadow-lg"
          title="Press ` to toggle Visibility Debugger"
        >
          [VIS DEBUG]
        </button>
      ) : (
        <div className="w-80 p-3 bg-[#110F0E]/95 border border-[#C9A84C]/80 shadow-2xl backdrop-blur-md text-[#A89E8E] space-y-2">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#3A3632] pb-1 text-[#F5F0E6]">
            <span className="text-[#C9A84C] font-bold">VISIBILITY DEBUGGER</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[#A89E8E] hover:text-[#F5F0E6] text-xs cursor-pointer"
            >
              [X]
            </button>
          </div>

          {/* Context Telemetry */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[#F5F0E6]">
            <div>Mode: <span className="text-[#C9A84C]">{mode}</span></div>
            <div>Tier: <span className="text-[#6BA3C7]">{tier}</span></div>
            <div>Scroll: {(scrollProgress * 100).toFixed(1)}%</div>
            <div>Chapter: {chapter.id}</div>
            <div className="col-span-2 truncate">
              Pos: [{refPos[0].toFixed(1)}, {refPos[1].toFixed(1)}, {refPos[2].toFixed(1)}]
            </div>
            <div className="col-span-2 truncate">Zone: {currentZone}</div>
          </div>

          {/* WebGL Performance Telemetry */}
          <div className="border-t border-[#3A3632] pt-1">
            <div className="text-[#C9A84C] font-semibold mb-0.5">RENDER TELEMETRY</div>
            <div className="grid grid-cols-2 gap-x-2 text-[#F5F0E6]">
              <div>Calls: <span className="font-bold text-[#D4725C]">{stats.calls}</span></div>
              <div>Tris: <span className="font-bold">{stats.triangles.toLocaleString()}</span></div>
              <div>Geom: {stats.geometries}</div>
              <div>Tex: {stats.textures}</div>
            </div>
          </div>

          {/* Per-Zone Visibility Tiers */}
          <div className="border-t border-[#3A3632] pt-1">
            <div className="text-[#C9A84C] font-semibold mb-0.5">ZONE VISIBILITY TIERS</div>
            <div className="space-y-0.5">
              {zoneIds.map((id) => {
                const desc = ZONE_VISIBILITY_DESCRIPTORS[id];
                const dz = Math.abs(refPos[2] - desc.center[2]);
                const status = getZoneTier(id, dz, tier, mode, chapter.id);

                let badgeColor = 'text-[#8A7E6E]';
                if (status === 'near') badgeColor = 'text-[#68C5AC] font-bold';
                else if (status === 'mid') badgeColor = 'text-[#6BA3C7]';
                else if (status === 'far') badgeColor = 'text-[#C9A84C]';

                return (
                  <div key={id} className="flex items-center justify-between">
                    <span className="capitalize">{id}:</span>
                    <span className={badgeColor}>[{status.toUpperCase()}] ({dz.toFixed(0)}m)</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interaction Status */}
          <div className="border-t border-[#3A3632] pt-1 text-[#8A7E6E]">
            <div>Prompt: <span className="text-[#F5F0E6]">{interactPrompt?.actionVerb || 'None'}</span></div>
            <div>Seal: <span className="text-[#F5F0E6]">{nearSealId || 'None'}</span></div>
          </div>
        </div>
      )}
    </aside>
  );
}

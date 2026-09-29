'use client';

// =============================================================================
// Loading Screen — shown while 3D experience loads
// =============================================================================

import { useExperienceStore } from '@/stores/useExperienceStore';

export function LoadingScreen() {
  const { status, loadProgress } = useExperienceStore();

  if (status === 'ready') return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1A1816]">
      <h1 className="text-2xl font-light tracking-wider text-[#F5F0E6] mb-8">
        Island of Memory
      </h1>

      {/* Progress bar */}
      <div className="w-48 h-0.5 bg-[#3A3632] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#C9A84C] transition-all duration-300 ease-out"
          style={{ width: `${Math.round(loadProgress * 100)}%` }}
        />
      </div>

      <p className="mt-4 text-sm text-[#A89E8E]">
        {status === 'error' ? 'Failed to load experience' : 'Loading...'}
      </p>
    </div>
  );
}

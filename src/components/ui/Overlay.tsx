'use client';

// =============================================================================
// Overlay — modal container for 2D content over 3D
// =============================================================================

import { useCallback, useEffect } from 'react';
import { useOverlayStore } from '@/stores/useOverlayStore';
import { useExperienceStore } from '@/stores/useExperienceStore';
import { motion, AnimatePresence } from 'framer-motion';
import { OVERLAY_FADE_DURATION } from '@/lib/constants';

interface OverlayProps {
  children: React.ReactNode;
}

/**
 * Modal overlay container rendered on top of the 3D canvas.
 * Handles close on ESC, click outside, and close button.
 */
export function Overlay({ children }: OverlayProps) {
  const activeOverlay = useOverlayStore((s) => s.activeOverlay);
  const closeOverlay = useOverlayStore((s) => s.closeOverlay);
  const closeDetail = useExperienceStore((s) => s.closeDetail);

  const handleClose = useCallback(() => {
    closeOverlay();
    closeDetail();
  }, [closeOverlay, closeDetail]);

  // ESC to close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeOverlay) {
        handleClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeOverlay, handleClose]);

  return (
    <AnimatePresence>
      {activeOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: OVERLAY_FADE_DURATION }}
          className="fixed inset-0 z-40 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#1A1816]/80 backdrop-blur-sm" />

          {/* Content panel */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: OVERLAY_FADE_DURATION, delay: 0.05 }}
            className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-y-auto mx-4
                       bg-[#1A1816] border border-[#3A3632]/40 rounded-lg p-8"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-[#A89E8E] hover:text-[#F5F0E6]
                         transition-colors text-xl leading-none"
              aria-label="Close"
            >
              &times;
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

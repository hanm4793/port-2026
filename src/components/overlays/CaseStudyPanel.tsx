'use client';

// =============================================================================
// CaseStudyPanel — slide-in panel for project details
// =============================================================================
//
// Design decisions:
// 1. Slides in from the RIGHT side (not centered modal)
//    → keeps 3D scene partially visible on the left
//    → user maintains spatial context
// 2. Max-width 480px on desktop, full-width on mobile
// 3. Contains: title, category, challenge, approach, solution, results, CTA
// 4. Close: ESC, click backdrop, close button
// 5. On open: experience enters "detail" mode (camera pulls back)
// 6. On close: returns to previous mode

import { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOverlayStore } from '@/stores/useOverlayStore';
import { useExperienceStore } from '@/stores/useExperienceStore';
import { projects } from '@/data/projects';
import type { Project } from '@/types/content';

export function CaseStudyPanel() {
  const activeOverlay = useOverlayStore((s) => s.activeOverlay);
  const overlayData = useOverlayStore((s) => s.overlayData);
  const closeOverlay = useOverlayStore((s) => s.closeOverlay);
  const closeDetail = useExperienceStore((s) => s.closeDetail);

  const isOpen = activeOverlay === 'project';
  const projectSlug = overlayData?.slug as string | undefined;
  const project = projectSlug
    ? projects.find((p) => p.slug === projectSlug)
    : null;

  const handleClose = useCallback(() => {
    closeOverlay();
    closeDetail();
  }, [closeOverlay, closeDetail]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#1A1816]/50 backdrop-blur-[2px]"
            onClick={handleClose}
          />

          {/* Slide-in panel from right */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md
                       bg-[#1A1816] border-l border-[#3A3632]/40
                       overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center
                         text-[#A89E8E] hover:text-[#F5F0E6] transition-colors text-lg"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Content */}
            {project ? (
              <CaseStudyContent project={project} onClose={handleClose} />
            ) : (
              <div className="p-8 pt-16 text-center text-[#A89E8E]">
                <p>Project not found.</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Case study content ─────────────────────────────────────────────────

function CaseStudyContent({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="p-6 pt-14 pb-20">
      {/* Category badge */}
      <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-3">
        {project.category}
      </span>

      {/* Title */}
      <h2 className="text-2xl font-light tracking-tight mb-2 text-[#F5F0E6]">
        {project.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-[#B8AEA0] leading-relaxed mb-6">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="mb-6">
        <h3 className="text-xs tracking-wider uppercase text-[#A89E8E] mb-2">
          Technology
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] tracking-wider uppercase
                         border border-[#3A3632]/60 text-[#A89E8E]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Case study sections (placeholder — real content from owner) */}
      <CaseStudySection
        title="The Challenge"
        body="Understanding the client's needs and defining the core problem to solve."
      />
      <CaseStudySection
        title="The Approach"
        body="Analyzing requirements, choosing the right architecture, and planning the build."
      />
      <CaseStudySection
        title="The Solution"
        body="Building the system with clean architecture, tested components, and production-ready deployment."
      />
      <CaseStudySection
        title="The Results"
        body="Measurable outcomes and client satisfaction. Specific metrics will be added with real project data."
      />

      {/* Divider */}
      <div className="h-px bg-[#3A3632]/40 my-6" />

      {/* CTA */}
      <div className="text-center">
        <p className="text-xs text-[#A89E8E] mb-3">Have a similar challenge?</p>
        <a
          href={`/contact?project=${project.slug}`}
          className="inline-block px-5 py-2 text-xs tracking-wider uppercase
                     bg-[#C9A84C] text-[#1A1816] hover:bg-[#C9A84C]/80
                     transition-colors"
        >
          Discuss This Type of Project
        </a>
      </div>

      {/* Full case study link */}
      {project.url && (
        <div className="mt-4 text-center">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#A89E8E] hover:text-[#C9A84C] transition-colors underline"
          >
            View live project &rarr;
          </a>
        </div>
      )}
    </div>
  );
}

function CaseStudySection({ title, body }: { title: string; body: string }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs tracking-wider uppercase text-[#C9A84C] mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-[#B8AEA0] leading-relaxed">{body}</p>
    </div>
  );
}

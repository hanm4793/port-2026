'use client';

// =============================================================================
// CaseStudyPanel — contextual slide-in drawer for project details
// Renders rich case-study data with challenge, decisions, results, and CTA.
// =============================================================================

import { useCallback, useEffect } from 'react';
import Link from 'next/link';
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#1A1816]/60 backdrop-blur-[3px]"
            onClick={handleClose}
          />

          {/* Slide-in panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg
                       bg-[#181614] border-l border-[#3A3632]/50
                       overflow-y-auto shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center
                         border border-[#3A3632]/50 bg-[#1E1B18] text-[#A89E8E] hover:text-[#F5F0E6]
                         hover:border-[#C9A84C]/60 transition-colors text-lg"
              aria-label="Close Case Study"
            >
              &times;
            </button>

            {/* Content */}
            {project ? (
              <CaseStudyDetail project={project} />
            ) : (
              <div className="p-8 pt-20 text-center text-[#A89E8E]">
                <p>Project documentation not found.</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CaseStudyDetail({ project }: { project: Project }) {
  const cs = project.caseStudy;

  return (
    <div className="p-6 md:p-8 pt-16 pb-24 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]">
            {project.category}
          </span>
          <span className="text-[#3A3632]">/</span>
          <span className="text-[10px] tracking-wider uppercase text-[#8A7E6E]">
            {project.year}
          </span>
          {project.client && (
            <>
              <span className="text-[#3A3632]">/</span>
              <span className="text-[10px] tracking-wider uppercase text-[#8A7E6E] truncate max-w-[180px]">
                {project.client}
              </span>
            </>
          )}
        </div>

        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-[#F5F0E6] mb-3">
          {project.title}
        </h2>

        <p className="text-sm text-[#C4A777] leading-relaxed mb-4">
          {project.tagline}
        </p>

        <p className="text-xs text-[#B8AEA0] leading-relaxed">
          {project.summary}
        </p>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="text-[11px] tracking-wider uppercase text-[#F5F0E6] mb-2.5">
          Engineered With
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] tracking-wider uppercase border border-[#3A3632]/70 text-[#A89E8E] bg-[#141210]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Results Banner (if available) */}
      {cs?.results && cs.results.length > 0 && (
        <div className="grid grid-cols-2 gap-3 p-4 bg-[#141210] border border-[#3A3632]/50">
          {cs.results.slice(0, 2).map((res, i) => (
            <div key={i}>
              <span className="text-[10px] uppercase tracking-wider text-[#8A7E6E] block mb-0.5">
                {res.metric}
              </span>
              <span className="text-lg font-light text-[#C9A84C] block">{res.value}</span>
              {res.context && (
                <span className="text-[10px] text-[#A89E8E] block">{res.context}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Case Study Sections */}
      {cs && (
        <div className="space-y-6 pt-2 border-t border-[#3A3632]/30">
          <div>
            <h4 className="text-xs tracking-wider uppercase text-[#C9A84C] mb-2">
              The Challenge
            </h4>
            <p className="text-xs leading-relaxed text-[#B8AEA0]">{cs.challenge}</p>
          </div>

          <div>
            <h4 className="text-xs tracking-wider uppercase text-[#C9A84C] mb-2">
              The Architectural Approach
            </h4>
            <p className="text-xs leading-relaxed text-[#B8AEA0] mb-3">{cs.approach}</p>

            {cs.decisions && cs.decisions.length > 0 && (
              <div className="space-y-2 pl-3 border-l border-[#C9A84C]/30">
                {cs.decisions.map((dec, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="text-[#F5F0E6] font-medium block">{dec.title}</span>
                    <span className="text-[#8A7E6E]">{dec.reasoning}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xs tracking-wider uppercase text-[#C9A84C] mb-2">
              The Delivered Solution
            </h4>
            <p className="text-xs leading-relaxed text-[#B8AEA0]">{cs.solution}</p>
          </div>

          {cs.testimonial && (
            <blockquote className="p-4 bg-[#1E1B18] border-l-2 border-[#C9A84C] text-xs text-[#B8AEA0] italic leading-relaxed">
              &ldquo;{cs.testimonial.quote}&rdquo;
              <cite className="block not-italic text-[10px] text-[#8A7E6E] mt-2">
                — {cs.testimonial.author}, {cs.testimonial.role} ({cs.testimonial.company})
              </cite>
            </blockquote>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-6 border-t border-[#3A3632]/40 space-y-3">
        <Link
          href={`/contact?project=${project.slug}`}
          className="block w-full py-3 text-center text-xs tracking-wider uppercase bg-[#C9A84C] text-[#1A1816] font-medium hover:bg-[#C9A84C]/80 transition-colors"
        >
          Discuss Similar System
        </Link>

        <Link
          href={`/projects/${project.slug}`}
          className="block w-full py-2.5 text-center text-xs tracking-wider uppercase border border-[#3A3632] text-[#A89E8E] hover:text-[#F5F0E6] hover:border-[#8A7E6E] transition-colors"
        >
          Full Case Study Page &rarr;
        </Link>
      </div>
    </div>
  );
}

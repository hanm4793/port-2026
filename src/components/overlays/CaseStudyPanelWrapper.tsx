'use client';

// Client boundary for CaseStudyPanel (page.tsx is a server component)

import { CaseStudyPanel } from './CaseStudyPanel';

export function CaseStudyPanelWrapper() {
  return <CaseStudyPanel />;
}

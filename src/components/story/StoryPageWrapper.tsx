'use client';

// =============================================================================
// StoryPageWrapper — client boundary for Story Mode
// =============================================================================
//
// This exists because page.tsx is a server component.
// It wraps the StoryPage (which uses hooks) in a client boundary.

import { StoryPage } from './StoryPage';

export function StoryPageWrapper() {
  return <StoryPage />;
}

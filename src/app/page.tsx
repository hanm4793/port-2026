import { ExperienceLoader } from '@/experience/ExperienceLoader';
import { StoryPageWrapper } from '@/components/story/StoryPageWrapper';
import { HUD } from '@/components/hud/HUD';
import { CaseStudyPanelWrapper } from '@/components/overlays/CaseStudyPanelWrapper';
import { NavigationMenu } from '@/components/ui/NavigationMenu';

/**
 * Landing page — SSG HTML with scroll-driven 3D experience.
 */
export default function HomePage() {
  return (
    <>
      {/* Story Mode chapters + scroll orchestration */}
      <StoryPageWrapper />

      {/* 3D Experience — fixed canvas behind scroll content */}
      <ExperienceLoader />

      {/* HUD overlay */}
      <HUD />

      {/* Case study slide-in panel */}
      <CaseStudyPanelWrapper />

      {/* Accessible DOM navigation menu */}
      <NavigationMenu />
    </>
  );
}

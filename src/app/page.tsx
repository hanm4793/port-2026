import { ExperienceLoader } from '@/experience/ExperienceLoader';
import { StoryPageWrapper } from '@/components/story/StoryPageWrapper';
import { HUD } from '@/components/hud/HUD';
import { ExploreHUD } from '@/components/explore/ExploreHUD';
import { CaseStudyPanelWrapper } from '@/components/overlays/CaseStudyPanelWrapper';
import { NavigationMenu } from '@/components/ui/NavigationMenu';
import { AudioOptInModal } from '@/components/audio/AudioOptInModal';

/**
 * Landing page — SSG HTML with dual-mode (Story / Explore) 3D experience.
 */
export default function HomePage() {
  return (
    <>
      {/* Audio Opt-In Gate (Enter with Sound / Continue Muted) */}
      <AudioOptInModal />

      {/* Story Mode chapters + scroll orchestration */}
      <StoryPageWrapper />

      {/* 3D Experience — fixed canvas behind scroll content */}
      <ExperienceLoader />

      {/* HUD overlay (Story Mode) */}
      <HUD />

      {/* Explore Mode HUD (Controls, Seals tracker, Waypoint Teleport, Modal) */}
      <ExploreHUD />

      {/* Case study slide-in panel */}
      <CaseStudyPanelWrapper />

      {/* Accessible DOM navigation menu with Audio Toggle */}
      <NavigationMenu />
    </>
  );
}

import { ExperienceLoader } from '@/experience/ExperienceLoader';
import { StoryPageWrapper } from '@/components/story/StoryPageWrapper';
import { HUD } from '@/components/hud/HUD';
import { Overlay } from '@/components/ui/Overlay';

/**
 * Landing page — SSG HTML with scroll-driven 3D experience.
 *
 * StoryPageWrapper is a client component that initializes GSAP ScrollTrigger + Lenis.
 * The semantic HTML chapters inside it are always in the DOM for SEO.
 * The 3D canvas (ExperienceLoader) is fixed behind the scroll content.
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

      {/* Content overlays */}
      <Overlay>
        <div className="text-center py-12">
          <h2 className="text-xl font-light mb-4 text-[#F5F0E6]">
            Content Coming Soon
          </h2>
          <p className="text-sm text-[#A89E8E]">
            Project details and case studies will appear here.
          </p>
        </div>
      </Overlay>
    </>
  );
}

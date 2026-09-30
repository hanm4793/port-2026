import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';

export const metadata: Metadata = {
  title: 'Selected Work & Case Studies | Han — Builder of Worlds',
  description:
    'Engineering case studies, enterprise CRM architectures, AI filmmaking series, and music scoring.',
};

export default function ProjectsPage() {
  // Exclude legacy alias duplicates from the public index
  const uniqueProjects = projects.filter(
    (p) => !p.slug.startsWith('placeholder-')
  );

  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C9A84C] block">
          Portfolio Archive
        </span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-[#F5F0E6]">
          Selected Implementations & Works
        </h1>
        <p className="text-base text-[#B8AEA0] leading-relaxed">
          Detailed case studies across systems engineering, AI-directed filmmaking, and creative technology. Every system is built to solve verifiable problems.
        </p>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* In-Experience Prompt */}
      <section className="p-8 md:p-12 bg-[#1B1916] border border-[#3A3632]/60 text-center space-y-4">
        <span className="text-xs tracking-[0.2em] uppercase text-[#C9A84C] block">
          Spatial Dimension
        </span>
        <h2 className="text-2xl font-light text-[#F5F0E6]">
          Experience these works inside the 3D Island of Memory
        </h2>
        <p className="text-sm text-[#B8AEA0] max-w-xl mx-auto leading-relaxed">
          Navigate the Forum of Systems, the Atelier, and the Dino Sanctuary directly within the realtime GPU world.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block px-8 py-3 text-xs tracking-wider uppercase border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1A1816] transition-colors"
          >
            Launch 3D World &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}

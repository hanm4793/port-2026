import Link from 'next/link';
import type { Project } from '@/types/content';

interface ProjectCardProps {
  project: Project;
  onOpenDrawer?: (slug: string) => void;
}

export function ProjectCard({ project, onOpenDrawer }: ProjectCardProps) {
  const topResult = project.caseStudy?.results?.[0];

  return (
    <article className="group relative flex flex-col justify-between p-6 md:p-8 bg-[#1E1B18] border border-[#3A3632]/50 hover:border-[#C9A84C]/60 transition-all duration-300">
      <div>
        {/* Category & Year */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]">
            {project.category} / {project.year}
          </span>
          {project.client && (
            <span className="text-[10px] text-[#8A7E6E] tracking-wider uppercase">
              {project.client}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-light tracking-tight text-[#F5F0E6] group-hover:text-[#C9A84C] transition-colors mb-2">
          {project.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-[#B8AEA0] leading-relaxed mb-6">
          {project.summary}
        </p>

        {/* Metric Highlight (if available) */}
        {topResult && (
          <div className="mb-6 p-3 bg-[#141210] border border-[#3A3632]/40 flex items-baseline justify-between">
            <span className="text-xs text-[#8A7E6E]">{topResult.metric}</span>
            <div className="text-right">
              <span className="text-base font-light text-[#C9A84C]">{topResult.value}</span>
              {topResult.context && (
                <span className="block text-[10px] text-[#A89E8E]">{topResult.context}</span>
              )}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] tracking-wider uppercase border border-[#3A3632]/60 text-[#8A7E6E]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex items-center justify-between pt-4 border-t border-[#3A3632]/30 mt-4">
        {onOpenDrawer ? (
          <button
            type="button"
            onClick={() => onOpenDrawer(project.slug)}
            className="text-xs text-[#F5F0E6] hover:text-[#C9A84C] transition-colors tracking-wider uppercase flex items-center gap-1.5 cursor-pointer"
          >
            <span>Preview Drawer</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        ) : (
          <Link
            href={`/projects/${project.slug}`}
            className="text-xs text-[#F5F0E6] hover:text-[#C9A84C] transition-colors tracking-wider uppercase flex items-center gap-1.5"
          >
            <span>Read Case Study</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        )}

        <Link
          href={`/projects/${project.slug}`}
          className="text-xs text-[#A89E8E] hover:text-[#C9A84C] tracking-wider uppercase"
        >
          Full Page
        </Link>
      </div>
    </article>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/data/projects';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Case Study | Han`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const cs = project.caseStudy;

  return (
    <article className="space-y-16 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#8A7E6E] uppercase tracking-wider">
        <Link href="/projects" className="hover:text-[#F5F0E6] transition-colors">
          Work
        </Link>
        <span>/</span>
        <span className="text-[#C9A84C]">{project.category}</span>
        <span>/</span>
        <span className="text-[#F5F0E6] truncate">{project.title}</span>
      </div>

      {/* Header */}
      <header className="space-y-4 border-b border-[#3A3632]/40 pb-8">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] px-2.5 py-1 bg-[#1E1B18] border border-[#3A3632]/60">
            {project.category}
          </span>
          <span className="text-[#8A7E6E]">Year: {project.year}</span>
          {project.duration && (
            <span className="text-[#8A7E6E]">Duration: {project.duration}</span>
          )}
          {project.client && (
            <span className="text-[#8A7E6E]">Client: {project.client}</span>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-[#F5F0E6]">
          {project.title}
        </h1>

        <p className="text-xl text-[#C4A777] font-light leading-relaxed">
          {project.tagline}
        </p>

        <p className="text-sm text-[#B8AEA0] leading-relaxed pt-2">
          {project.summary}
        </p>
      </header>

      {/* Results Callout */}
      {cs?.results && cs.results.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-[#1A1816] border border-[#C9A84C]/40">
          {cs.results.map((res, i) => (
            <div key={i} className="p-3">
              <span className="text-[10px] uppercase tracking-wider text-[#8A7E6E] block mb-1">
                {res.metric}
              </span>
              <span className="text-2xl font-light text-[#C9A84C] block">{res.value}</span>
              {res.context && (
                <span className="text-xs text-[#A89E8E] block mt-1">{res.context}</span>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Core Case Study Narrative */}
      {cs && (
        <div className="space-y-12">
          {/* Challenge */}
          <section className="space-y-3">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#C9A84C]">
              01 / The Challenge
            </h2>
            <p className="text-base text-[#F5F0E6] leading-relaxed font-light">
              {cs.challenge}
            </p>
          </section>

          {/* Approach & Decisions */}
          <section className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#C9A84C]">
                02 / Architectural Approach
              </h2>
              <p className="text-base text-[#F5F0E6] leading-relaxed font-light">
                {cs.approach}
              </p>
            </div>

            {cs.decisions && cs.decisions.length > 0 && (
              <div className="space-y-3 p-6 bg-[#171513] border border-[#3A3632]/50">
                <h3 className="text-xs tracking-wider uppercase text-[#A89E8E] mb-2">
                  Key Technical Decisions
                </h3>
                <div className="space-y-4">
                  {cs.decisions.map((dec, idx) => (
                    <div key={idx} className="space-y-1">
                      <span className="text-sm font-medium text-[#F5F0E6] block">
                        {dec.title}
                      </span>
                      <p className="text-xs text-[#B8AEA0] leading-relaxed">{dec.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Solution */}
          <section className="space-y-3">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#C9A84C]">
              03 / The Delivered Solution
            </h2>
            <p className="text-base text-[#F5F0E6] leading-relaxed font-light">
              {cs.solution}
            </p>
          </section>

          {/* Testimonial */}
          {cs.testimonial && (
            <blockquote className="p-8 bg-[#1B1916] border-l-2 border-[#C9A84C] space-y-3 my-8">
              <p className="text-sm md:text-base text-[#F5F0E6] italic leading-relaxed font-light">
                &ldquo;{cs.testimonial.quote}&rdquo;
              </p>
              <footer className="text-xs text-[#8A7E6E]">
                <strong className="text-[#C9A84C] font-normal">{cs.testimonial.author}</strong> —{' '}
                {cs.testimonial.role}, {cs.testimonial.company}
              </footer>
            </blockquote>
          )}

          {/* Reflection */}
          {cs.reflection && (
            <section className="space-y-2 pt-4 border-t border-[#3A3632]/30">
              <h2 className="text-xs uppercase tracking-wider text-[#8A7E6E]">Retrospective</h2>
              <p className="text-xs text-[#8A7E6E] leading-relaxed">{cs.reflection}</p>
            </section>
          )}
        </div>
      )}

      {/* Tech Stack Breakdown */}
      <section className="p-6 bg-[#161412] border border-[#3A3632]/50 space-y-3">
        <h2 className="text-xs uppercase tracking-wider text-[#A89E8E]">Production Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs border border-[#3A3632] bg-[#100E0D] text-[#B8AEA0]"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Contextual CTA */}
      <footer className="p-8 md:p-12 bg-[#1B1916] border border-[#C9A84C]/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] block">
            Next Steps
          </span>
          <h2 className="text-xl font-light text-[#F5F0E6]">
            Facing a similar challenge?
          </h2>
          <p className="text-xs text-[#8A7E6E]">
            We can discuss architectural feasibility and timeline within 24 hours.
          </p>
        </div>

        <Link
          href={`/contact?project=${project.slug}`}
          className="px-8 py-3 text-xs tracking-wider uppercase bg-[#C9A84C] text-[#1A1816] font-medium hover:bg-[#C9A84C]/80 transition-colors shrink-0"
        >
          Discuss This Archetype &rarr;
        </Link>
      </footer>
    </article>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} | Han — Services`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  // Find related projects mapped to this service
  const related = projects.filter(
    (p) => service.relatedProjects.includes(p.slug) || p.services.includes(service.slug)
  );

  return (
    <div className="space-y-16">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#8A7E6E] uppercase tracking-wider">
        <Link href="/services" className="hover:text-[#F5F0E6] transition-colors">
          Services
        </Link>
        <span>/</span>
        <span className="text-[#C9A84C]">{service.group}</span>
        <span>/</span>
        <span className="text-[#F5F0E6]">{service.shortTitle}</span>
      </div>

      {/* Hero Header */}
      <header className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A84C] block">
          Domain Specialization
        </span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-[#F5F0E6]">
          {service.title}
        </h1>
        <p className="text-lg text-[#C4A777] font-light leading-relaxed">
          {service.tagline}
        </p>
        <p className="text-sm text-[#B8AEA0] leading-relaxed pt-2">
          {service.description}
        </p>
      </header>

      {/* Deliverables & Metric */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-[#1A1816] border border-[#3A3632]/50">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xs tracking-wider uppercase text-[#C9A84C]">
            Target Deliverables & Output
          </h2>
          <ul className="space-y-2.5">
            {service.deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-[#B8AEA0] leading-relaxed">
                <span className="text-[#C9A84C] mt-0.5">▪</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between p-6 bg-[#141210] border border-[#3A3632]/40">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8A7E6E] block mb-2">
              Performance Benchmark
            </span>
            <span className="text-sm font-light text-[#F5F0E6] leading-relaxed block">
              {service.metricHighlight || 'Engineered for sub-second execution'}
            </span>
          </div>

          <div className="pt-6">
            <Link
              href={`/contact?service=${service.slug}`}
              className="block w-full py-2.5 text-center text-xs tracking-wider uppercase bg-[#C9A84C] text-[#1A1816] font-medium hover:bg-[#C9A84C]/80 transition-colors"
            >
              Commission Scope
            </Link>
          </div>
        </div>
      </section>

      {/* Process Methodology */}
      <section className="space-y-6">
        <h2 className="text-xl font-light text-[#F5F0E6] border-b border-[#3A3632]/40 pb-3">
          Delivery Methodology
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {service.process.map((step, idx) => (
            <div key={idx} className="p-5 bg-[#171513] border border-[#3A3632]/40 space-y-2">
              <span className="text-[10px] tracking-wider text-[#C9A84C] block">
                0{idx + 1} / {step.duration || 'Phase'}
              </span>
              <h3 className="text-sm font-medium text-[#F5F0E6]">{step.title}</h3>
              <p className="text-xs text-[#8A7E6E] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Tools */}
      <section className="space-y-4">
        <h2 className="text-xs uppercase tracking-wider text-[#8A7E6E]">
          Primary Production Tooling
        </h2>
        <div className="flex flex-wrap gap-2">
          {service.tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1 text-xs border border-[#3A3632] bg-[#141210] text-[#B8AEA0]"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* Proof Artifacts / Case Studies */}
      {related.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-[#3A3632]/40">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#C9A84C] block mb-1">
              Verifiable Proof
            </span>
            <h2 className="text-2xl font-light text-[#F5F0E6]">Related Implementations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Footer */}
      <section className="p-8 bg-[#1B1916] border border-[#3A3632] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-light text-[#F5F0E6] mb-1">
            Need {service.title.toLowerCase()} for your organization?
          </h3>
          <p className="text-xs text-[#8A7E6E]">
            Submit a brief with your initial parameters to review timeline and architecture.
          </p>
        </div>

        <Link
          href={`/contact?service=${service.slug}`}
          className="px-6 py-2.5 text-xs tracking-wider uppercase bg-[#C9A84C] text-[#1A1816] font-medium hover:bg-[#C9A84C]/80 transition-colors shrink-0"
        >
          Scope This Engagement
        </Link>
      </section>
    </div>
  );
}

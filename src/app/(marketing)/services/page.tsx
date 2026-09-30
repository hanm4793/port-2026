import type { Metadata } from 'next';
import Link from 'next/link';
import { services, SERVICE_GROUPS } from '@/data/services';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SITE_COPY } from '@/data/copy';

export const metadata: Metadata = {
  title: 'Services & Disciplines | Han — Builder of Worlds',
  description:
    'Full-stack web engineering, custom CRM platforms, automated pipelines, AI filmmaking, and sonic identity.',
};

export default function ServicesPage() {
  const groups = ['build', 'grow', 'create'] as const;

  return (
    <div className="space-y-16">
      {/* Page Header */}
      <section className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C9A84C] block">
          {SITE_COPY.servicesOverview.eyebrow}
        </span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-[#F5F0E6]">
          {SITE_COPY.servicesOverview.title}
        </h1>
        <p className="text-base text-[#B8AEA0] leading-relaxed">
          {SITE_COPY.servicesOverview.subtitle}
        </p>
      </section>

      {/* Service Clusters */}
      <div className="space-y-20">
        {groups.map((groupKey) => {
          const groupMeta = SERVICE_GROUPS[groupKey];
          const groupServices = services.filter((s) => s.group === groupKey);

          return (
            <section key={groupKey} id={groupKey} className="space-y-8">
              <div className="border-b border-[#3A3632]/50 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-2">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-1">
                    Cluster / {groupMeta.label}
                  </span>
                  <h2 className="text-2xl font-light text-[#F5F0E6]">{groupMeta.headline}</h2>
                </div>
                <p className="text-xs text-[#8A7E6E] max-w-md">{groupMeta.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupServices.map((svc) => (
                  <ServiceCard key={svc.slug} service={svc} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Global Conversion Banner */}
      <section className="p-8 md:p-12 bg-[#1B1916] border border-[#C9A84C]/40 text-center space-y-4">
        <span className="text-xs tracking-[0.2em] uppercase text-[#C9A84C] block">
          Custom Engagement
        </span>
        <h2 className="text-2xl md:text-3xl font-light text-[#F5F0E6]">
          Have a project spanning multiple disciplines?
        </h2>
        <p className="text-sm text-[#B8AEA0] max-w-xl mx-auto leading-relaxed">
          Most client breakthroughs occur at the intersection of systems engineering and creative narrative.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-block px-8 py-3 text-xs tracking-wider uppercase bg-[#C9A84C] text-[#1A1816] font-medium hover:bg-[#C9A84C]/80 transition-colors"
          >
            Submit Project Brief &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}

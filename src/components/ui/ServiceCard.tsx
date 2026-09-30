import Link from 'next/link';
import type { Service } from '@/types/content';

interface ServiceCardProps {
  service: Service;
  compact?: boolean;
}

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  return (
    <article className="group relative flex flex-col justify-between p-6 md:p-8 bg-[#1E1B18] border border-[#3A3632]/50 hover:border-[#C9A84C]/60 transition-all duration-300">
      <div>
        {/* Header: Group & Title */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]">
            {service.group.toUpperCase()} / {service.shortTitle}
          </span>
          {service.metricHighlight && (
            <span className="text-[10px] text-[#A89E8E] bg-[#141210] px-2 py-0.5 border border-[#3A3632]/40">
              {service.metricHighlight}
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-light tracking-tight text-[#F5F0E6] group-hover:text-[#C9A84C] transition-colors mb-2">
          {service.title}
        </h3>

        <p className="text-sm text-[#B8AEA0] leading-relaxed mb-6">
          {service.tagline}
        </p>

        {!compact && (
          <>
            <p className="text-xs text-[#8A7E6E] leading-relaxed mb-6">
              {service.description}
            </p>

            {/* Deliverables */}
            <div className="mb-6">
              <h4 className="text-[11px] tracking-wider uppercase text-[#F5F0E6] mb-3">
                Key Deliverables
              </h4>
              <ul className="space-y-1.5">
                {service.deliverables.slice(0, 4).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#A89E8E]">
                    <span className="text-[#C9A84C] mt-0.5">▪</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {service.tools.slice(0, 5).map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 text-[10px] tracking-wider uppercase border border-[#3A3632]/60 text-[#8A7E6E]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#3A3632]/30 mt-4">
        <Link
          href={`/services/${service.slug}`}
          className="text-xs text-[#F5F0E6] hover:text-[#C9A84C] transition-colors tracking-wider uppercase flex items-center gap-1.5"
        >
          <span>View Scope</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>

        <Link
          href={`/contact?service=${service.slug}`}
          className="px-3 py-1.5 text-[11px] tracking-wider uppercase border border-[#C9A84C]/80 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1A1816] transition-colors"
        >
          Engage
        </Link>
      </div>
    </article>
  );
}

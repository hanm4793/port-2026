import { Suspense } from 'react';
import type { Metadata } from 'next';
import { BriefBuilder } from '@/components/forms/BriefBuilder';
import { SITE_COPY } from '@/data/copy';

export const metadata: Metadata = {
  title: 'Project Inquiries & Brief Builder | Han — Builder of Worlds',
  description:
    'Commission full-stack systems engineering, custom CRM development, or creative AI direction.',
};

export default function ContactPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C9A84C] block">
          {SITE_COPY.contact.eyebrow}
        </span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-[#F5F0E6]">
          {SITE_COPY.contact.title}
        </h1>
        <p className="text-sm md:text-base text-[#B8AEA0] leading-relaxed">
          {SITE_COPY.contact.subhead}
        </p>
      </header>

      {/* Brief Builder Form with Suspense for useSearchParams */}
      <Suspense
        fallback={
          <div className="p-12 text-center text-xs text-[#8A7E6E] bg-[#1E1B18] border border-[#3A3632]/40">
            Initializing project scoping engine...
          </div>
        }
      >
        <BriefBuilder />
      </Suspense>

      {/* Fallback Direct Contact Channel */}
      <div className="pt-6 border-t border-[#3A3632]/40 text-center space-y-2 text-xs text-[#8A7E6E]">
        <p>
          {SITE_COPY.contact.directEmailLabel}{' '}
          <a
            href={`mailto:${SITE_COPY.contact.email}`}
            className="text-[#C9A84C] hover:underline font-mono"
          >
            {SITE_COPY.contact.email}
          </a>
        </p>
        <p>{SITE_COPY.contact.responseTime}</p>
        <p className="text-[11px] text-[#5A5248]">{SITE_COPY.contact.location}</p>
      </div>
    </div>
  );
}

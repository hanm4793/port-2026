import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_COPY } from '@/data/copy';

export const metadata: Metadata = {
  title: 'About | Han — Systems, Story & Sound',
  description:
    'Full-stack developer, AI filmmaker, musician, and creative technologist. The philosophy behind Island of Memory.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 max-w-4xl mx-auto">
      {/* Header */}
      <header className="space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C9A84C] block">
          Creative Philosophy
        </span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight text-[#F5F0E6]">
          One Discipline Informs Another
        </h1>
        <p className="text-lg text-[#C4A777] font-light leading-relaxed">
          Systems engineering requires artistic intuition. Cinematic storytelling requires architectural precision.
        </p>
      </header>

      {/* Main Bio Narrative */}
      <section className="space-y-6 text-base text-[#B8AEA0] font-light leading-relaxed">
        <p>
          I am a software engineer, filmmaker, composer, and creative technologist. Rather than dividing these practices into disconnected hobbies, I treat them as a single continuous craft of world-building.
        </p>
        <p>
          In software, I architect full-stack applications, bespoke CRMs, and resilient automation pipelines. My focus is always on engineering discipline: predictable state, sub-second latency, and software that creates measurable commercial velocity for client teams.
        </p>
        <p>
          In narrative media, I direct original speculative fiction and 3D animated films, most notably an ongoing primeval dinosaur universe. Here, generative AI is used with strict directorial intent—steered through 3D pre-visualization in Blender and scored with original orchestral and analog compositions.
        </p>
      </section>

      {/* 4 Pillars Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#3A3632]/40">
        <div className="p-6 bg-[#181614] border border-[#3A3632]/40 space-y-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] block">
            {SITE_COPY.systems.eyebrow}
          </span>
          <h2 className="text-xl font-light text-[#F5F0E6]">{SITE_COPY.systems.title}</h2>
          <p className="text-xs text-[#8A7E6E] leading-relaxed">{SITE_COPY.systems.statement}</p>
        </div>

        <div className="p-6 bg-[#181614] border border-[#3A3632]/40 space-y-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] block">
            {SITE_COPY.aiWorld.eyebrow}
          </span>
          <h2 className="text-xl font-light text-[#F5F0E6]">{SITE_COPY.aiWorld.title}</h2>
          <p className="text-xs text-[#8A7E6E] leading-relaxed">{SITE_COPY.aiWorld.statement}</p>
        </div>

        <div className="p-6 bg-[#181614] border border-[#3A3632]/40 space-y-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] block">
            {SITE_COPY.music.eyebrow}
          </span>
          <h2 className="text-xl font-light text-[#F5F0E6]">{SITE_COPY.music.title}</h2>
          <p className="text-xs text-[#8A7E6E] leading-relaxed">{SITE_COPY.music.statement}</p>
        </div>

        <div className="p-6 bg-[#181614] border border-[#3A3632]/40 space-y-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] block">
            {SITE_COPY.travel.eyebrow}
          </span>
          <h2 className="text-xl font-light text-[#F5F0E6]">{SITE_COPY.travel.title}</h2>
          <p className="text-xs text-[#8A7E6E] leading-relaxed">{SITE_COPY.travel.statement}</p>
        </div>
      </section>

      {/* Engagement Invitation */}
      <section className="p-8 md:p-12 bg-[#1B1916] border border-[#C9A84C]/40 text-center space-y-4">
        <span className="text-xs tracking-[0.2em] uppercase text-[#C9A84C] block">
          Collaboration
        </span>
        <h2 className="text-2xl font-light text-[#F5F0E6]">Ready to initiate a project?</h2>
        <p className="text-sm text-[#B8AEA0] max-w-lg mx-auto leading-relaxed">
          I partner directly with founders, executive teams, and creative directors worldwide.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-block px-8 py-3 text-xs tracking-wider uppercase bg-[#C9A84C] text-[#1A1816] font-medium hover:bg-[#C9A84C]/80 transition-colors"
          >
            Submit a Project Brief &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}

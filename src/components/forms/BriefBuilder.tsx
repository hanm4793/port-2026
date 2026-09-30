'use client';

// =============================================================================
// BriefBuilder — 3-Step Interactive Project Scoping Form
// Implements progressive disclosure, URL pre-fill, real validation, and honeypot.
// =============================================================================

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SITE_COPY } from '@/data/copy';
import { services } from '@/data/services';
import type { ContactBrief } from '@/types/content';

export function BriefBuilder() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service');
  const initialProject = searchParams.get('project');

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<ContactBrief>({
    name: '',
    email: '',
    company: '',
    referralSource: '',
    services: initialService ? [initialService] : [],
    description: initialProject ? `Inquiring regarding project archetype: ${initialProject}. ` : '',
    timeline: '1-3months',
    budget: '15k-40k',
    preferredLanguage: 'en',
    honeypot: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle URL parameter changes
  useEffect(() => {
    if (initialService && !formData.services.includes(initialService)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, initialService],
      }));
    }
  }, [initialService, formData.services]);

  const toggleService = (slug: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(slug);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== slug)
          : [...prev.services, slug],
      };
    });
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Please provide your name.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const validateStep2 = () => {
    if (formData.services.length === 0) {
      setErrorMessage('Please select at least one relevant service discipline.');
      return false;
    }
    if (formData.description.trim().length < 20) {
      setErrorMessage('Please provide at least 20 characters describing your project goals.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) return;

    setSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to transmit brief');
      }

      setSubmitStatus('success');
    } catch (err: unknown) {
      setSubmitStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : SITE_COPY.briefBuilder.actions.errorMessage
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="p-8 md:p-12 bg-[#1E1B18] border border-[#C9A84C]/60 text-center max-w-xl mx-auto">
        <span className="text-xs tracking-[0.2em] uppercase text-[#C9A84C] block mb-2">
          Transmission Verified
        </span>
        <h2 className="text-2xl md:text-3xl font-light text-[#F5F0E6] mb-4">
          {SITE_COPY.briefBuilder.actions.successTitle}
        </h2>
        <p className="text-sm text-[#B8AEA0] leading-relaxed mb-6">
          {SITE_COPY.briefBuilder.actions.successMessage}
        </p>
        <div className="pt-6 border-t border-[#3A3632]/50 text-xs text-[#8A7E6E]">
          <span>Direct inquiry reference: </span>
          <span className="font-mono text-[#F5F0E6]">{formData.email}</span>
        </div>
      </div>
    );
  }

  const copy = SITE_COPY.briefBuilder;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 md:p-10 bg-[#1E1B18] border border-[#3A3632]/50 max-w-2xl mx-auto shadow-2xl relative"
    >
      {/* Honeypot for bot suppression */}
      <input
        type="text"
        name="company_title_check"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Progress Track */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#3A3632]/40">
        {[1, 2, 3].map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => {
              if (s === 1) setStep(1);
              if (s === 2 && validateStep1()) setStep(2);
            }}
            className={`flex items-center gap-2 text-xs tracking-wider uppercase transition-colors ${
              step === s
                ? 'text-[#C9A84C]'
                : step > s
                ? 'text-[#F5F0E6]'
                : 'text-[#8A7E6E]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === s
                  ? 'bg-[#C9A84C] text-[#1A1816] font-bold'
                  : step > s
                  ? 'bg-[#3A3632] text-[#F5F0E6]'
                  : 'border border-[#3A3632] text-[#8A7E6E]'
              }`}
            >
              {s}
            </span>
            <span className="hidden sm:inline">
              {s === 1 ? 'Identity' : s === 2 ? 'Scope' : 'Parameters'}
            </span>
          </button>
        ))}
      </div>

      {/* Error Notice */}
      {errorMessage && (
        <div className="mb-6 p-3 bg-red-950/40 border border-red-800/60 text-xs text-red-200">
          {errorMessage}
        </div>
      )}

      {/* ── STEP 1: IDENTITY ──────────────────────────────────────────────── */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-1">
              {copy.step1.stepLabel}
            </span>
            <h3 className="text-xl font-light text-[#F5F0E6] mb-1">{copy.step1.title}</h3>
            <p className="text-xs text-[#8A7E6E]">{copy.step1.description}</p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#A89E8E] mb-2">
              {copy.step1.nameLabel}
            </label>
            <input
              type="text"
              required
              placeholder={copy.step1.namePlaceholder}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#141210] border border-[#3A3632]/70 px-4 py-2.5 text-sm text-[#F5F0E6] focus:border-[#C9A84C] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#A89E8E] mb-2">
              {copy.step1.emailLabel}
            </label>
            <input
              type="email"
              required
              placeholder={copy.step1.emailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#141210] border border-[#3A3632]/70 px-4 py-2.5 text-sm text-[#F5F0E6] focus:border-[#C9A84C] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#A89E8E] mb-2">
              {copy.step1.companyLabel}
            </label>
            <input
              type="text"
              placeholder={copy.step1.companyPlaceholder}
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full bg-[#141210] border border-[#3A3632]/70 px-4 py-2.5 text-sm text-[#F5F0E6] focus:border-[#C9A84C] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#A89E8E] mb-2">
              {copy.step1.sourceLabel}
            </label>
            <select
              value={formData.referralSource}
              onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
              className="w-full bg-[#141210] border border-[#3A3632]/70 px-4 py-2.5 text-sm text-[#F5F0E6] focus:border-[#C9A84C] focus:outline-none transition-colors"
            >
              <option value="">Select an option...</option>
              {copy.step1.sourceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ── STEP 2: SCOPE ─────────────────────────────────────────────────── */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-1">
              {copy.step2.stepLabel}
            </span>
            <h3 className="text-xl font-light text-[#F5F0E6] mb-1">{copy.step2.title}</h3>
            <p className="text-xs text-[#8A7E6E]">{copy.step2.description}</p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#A89E8E] mb-3">
              {copy.step2.servicesLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {services.map((svc) => {
                const checked = formData.services.includes(svc.slug);
                return (
                  <button
                    type="button"
                    key={svc.slug}
                    onClick={() => toggleService(svc.slug)}
                    className={`flex items-center gap-2.5 p-3 text-left border text-xs transition-all ${
                      checked
                        ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#F5F0E6]'
                        : 'border-[#3A3632]/60 bg-[#141210] text-[#A89E8E] hover:border-[#3A3632]'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 border flex items-center justify-center text-[10px] ${
                        checked ? 'border-[#C9A84C] bg-[#C9A84C] text-[#1A1816]' : 'border-[#8A7E6E]'
                      }`}
                    >
                      {checked && '✓'}
                    </span>
                    <span className="truncate">{svc.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label className="block text-xs uppercase tracking-wider text-[#A89E8E]">
                {copy.step2.detailsLabel}
              </label>
              <span className="text-[10px] text-[#8A7E6E]">
                {formData.description.length} chars (min 20)
              </span>
            </div>
            <textarea
              required
              rows={5}
              placeholder={copy.step2.detailsPlaceholder}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#141210] border border-[#3A3632]/70 px-4 py-2.5 text-sm text-[#F5F0E6] focus:border-[#C9A84C] focus:outline-none transition-colors resize-none leading-relaxed"
            />
            <p className="text-[11px] text-[#8A7E6E] mt-1.5">{copy.step2.detailsHelper}</p>
          </div>
        </div>
      )}

      {/* ── STEP 3: PARAMETERS ────────────────────────────────────────────── */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-1">
              {copy.step3.stepLabel}
            </span>
            <h3 className="text-xl font-light text-[#F5F0E6] mb-1">{copy.step3.title}</h3>
            <p className="text-xs text-[#8A7E6E]">{copy.step3.description}</p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#A89E8E] mb-2">
              {copy.step3.timelineLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {copy.step3.timelineOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setFormData({ ...formData, timeline: opt.value })}
                  className={`p-3 text-left border text-xs transition-all ${
                    formData.timeline === opt.value
                      ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#F5F0E6]'
                      : 'border-[#3A3632]/60 bg-[#141210] text-[#A89E8E]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#A89E8E] mb-2">
              {copy.step3.budgetLabel}
            </label>
            <div className="space-y-2">
              {copy.step3.budgetOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setFormData({ ...formData, budget: opt.value })}
                  className={`w-full p-2.5 text-left border text-xs transition-all ${
                    formData.budget === opt.value
                      ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#F5F0E6]'
                      : 'border-[#3A3632]/60 bg-[#141210] text-[#A89E8E]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#A89E8E] mb-2">
              {copy.step3.languageLabel}
            </label>
            <div className="flex gap-3">
              {copy.step3.languageOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() =>
                    setFormData({ ...formData, preferredLanguage: opt.value as 'en' | 'vi' })
                  }
                  className={`px-4 py-2 border text-xs transition-all ${
                    formData.preferredLanguage === opt.value
                      ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#F5F0E6]'
                      : 'border-[#3A3632]/60 bg-[#141210] text-[#A89E8E]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-8 border-t border-[#3A3632]/40 mt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => (s - 1) as 1 | 2)}
            className="px-4 py-2 text-xs uppercase tracking-wider border border-[#3A3632] text-[#A89E8E] hover:text-[#F5F0E6] transition-colors"
          >
            &larr; {copy.actions.back}
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 text-xs uppercase tracking-wider bg-[#C9A84C] text-[#1A1816] font-medium hover:bg-[#C9A84C]/80 transition-colors"
          >
            {copy.actions.next} &rarr;
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 text-xs uppercase tracking-wider bg-[#C9A84C] text-[#1A1816] font-medium hover:bg-[#C9A84C]/80 transition-colors disabled:opacity-50"
          >
            {submitting ? copy.actions.submitting : copy.actions.submit}
          </button>
        )}
      </div>
    </form>
  );
}

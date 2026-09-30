// =============================================================================
// Content types — projects, services, case studies, brief-builder
// =============================================================================

import type { ZoneId } from './experience';

export type ServiceGroupKey = 'build' | 'grow' | 'create';

export interface ProcessStep {
  title: string;
  description: string;
  duration?: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  zone: ZoneId;
  group: ServiceGroupKey;
  deliverables: string[];
  process: ProcessStep[];
  tools: string[];
  relatedProjects: string[]; // Slugs of matching projects
  metricHighlight?: string;
}

export interface Decision {
  title: string;
  reasoning: string;
}

export interface TechDetail {
  title: string;
  description: string;
}

export interface Result {
  metric: string;
  value: string;
  context?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface CaseStudy {
  challenge: string;
  approach: string;
  decisions: Decision[];
  solution: string;
  architecture?: string;
  techDetails?: TechDetail[];
  results: Result[];
  testimonial?: Testimonial;
  reflection?: string;
}

export type ProjectCategory =
  | 'web'
  | 'app'
  | 'crm'
  | 'automation'
  | 'campaign'
  | 'film'
  | 'music'
  | 'creative'
  | 'photography';

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  category: ProjectCategory;
  services: string[]; // Matching Service slugs
  zone: ZoneId;
  techStack: string[];
  thumbnail: string;
  heroImage?: string;
  gallery?: string[];
  url?: string;
  year: number;
  duration?: string;
  client?: string;
  featured: boolean;
  caseStudy?: CaseStudy;
}

export type OverlayId =
  | 'project'
  | 'about'
  | 'service'
  | 'gallery'
  | 'music'
  | 'film'
  | 'contact'
  | 'welcome';

export interface OverlayPayload {
  id: OverlayId;
  data?: Record<string, unknown>;
}

export interface ContactBrief {
  name: string;
  email: string;
  company?: string;
  referralSource?: string;
  services: string[];
  description: string;
  timeline?: string;
  budget?: string;
  preferredLanguage?: 'en' | 'vi';
  honeypot?: string;
}

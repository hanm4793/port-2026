// =============================================================================
// Content types — projects, services, overlays
// =============================================================================

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: 'web' | 'app' | 'crm' | 'film' | 'music' | 'photography' | 'creative';
  techStack: string[];
  thumbnail: string; // Path to image
  url?: string; // External link
  featured: boolean;
  zone: string; // Which zone displays this project
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
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

// =============================================================================
// Placeholder project data — will be replaced with real content
// =============================================================================

import type { Project } from '@/types/content';

export const projects: Project[] = [
  {
    slug: 'placeholder-web-app',
    title: 'Enterprise Web Application',
    description: 'A full-stack web application with real-time data processing and dashboard.',
    category: 'web',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    thumbnail: '/images/placeholder.webp',
    featured: true,
    zone: 'forum',
  },
  {
    slug: 'placeholder-crm',
    title: 'Custom CRM System',
    description: 'Bespoke CRM built for a mid-size enterprise with automated workflows.',
    category: 'crm',
    techStack: ['React', 'Node.js', 'MongoDB', 'AWS'],
    thumbnail: '/images/placeholder.webp',
    featured: true,
    zone: 'forum',
  },
  {
    slug: 'placeholder-film',
    title: 'Dinosaur Universe — Episode 1',
    description: 'AI-generated 3D animated short film in an original dinosaur universe.',
    category: 'film',
    techStack: ['Blender', 'AI Generation', 'After Effects', 'DaVinci Resolve'],
    thumbnail: '/images/placeholder.webp',
    featured: true,
    zone: 'sanctuary',
  },
  {
    slug: 'placeholder-music',
    title: 'Original Album Release',
    description: 'AI-assisted music production — original compositions across genres.',
    category: 'music',
    techStack: ['AI Music', 'Production', 'Mixing', 'Mastering'],
    thumbnail: '/images/placeholder.webp',
    featured: false,
    zone: 'amphitheatre',
  },
];

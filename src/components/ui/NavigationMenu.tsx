'use client';

// =============================================================================
// Navigation Menu — fallback nav for accessibility
// =============================================================================

import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Fallback navigation accessible without 3D interaction.
 * Always rendered in the DOM for accessibility + SEO.
 */
export function NavigationMenu() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1816]/95 backdrop-blur-sm
                 border-t border-[#3A3632]/30 md:top-0 md:bottom-auto md:border-b md:border-t-0"
      aria-label="Main navigation"
    >
      <ul className="flex items-center justify-center gap-6 px-4 py-3">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-xs tracking-wider uppercase text-[#A89E8E]
                         hover:text-[#C9A84C] transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

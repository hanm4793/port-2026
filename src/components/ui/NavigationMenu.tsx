'use client';

// =============================================================================
// Navigation Menu — main persistent navbar
// Includes direct links + live audio control button with animated equalizer bars
// =============================================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { stemAudioEngine } from '@/experience/zones/amphitheatre/StemAudioEngine';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Brief' },
];

export function NavigationMenu() {
  const [audioState, setAudioState] = useState(stemAudioEngine.getState());

  useEffect(() => {
    return stemAudioEngine.subscribe(setAudioState);
  }, []);

  const isSoundActive = audioState.isRunning && !audioState.isMuted;

  const handleAudioToggle = () => {
    if (!audioState.isRunning) {
      stemAudioEngine.init().then(() => {
        stemAudioEngine.playLyreChime();
      });
    } else {
      stemAudioEngine.toggleMute();
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1816]/95 backdrop-blur-md
                 border-t border-[#3A3632]/40 md:top-0 md:bottom-auto md:border-b md:border-t-0 shadow-lg"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
        {/* Left: Brand / Title */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#F5F0E6] hover:text-[#C9A84C] transition-colors"
        >
          <span className="w-2 h-2 bg-[#C9A84C] rounded-full" />
          <span className="font-light">Island of Memory</span>
        </Link>

        {/* Center: Nav links */}
        <ul className="flex items-center gap-5 sm:gap-7">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[11px] sm:text-xs tracking-wider uppercase text-[#A89E8E]
                           hover:text-[#F5F0E6] transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Sound Equalizer & Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAudioToggle}
            className="flex items-center gap-2 px-3 py-1 border border-[#3A3632] bg-[#141210] hover:border-[#C9A84C] transition-colors text-xs cursor-pointer group"
            title={isSoundActive ? 'Click to Mute Sound' : 'Click to Enable Procedural Audio'}
          >
            {/* Animated Equalizer Bars */}
            <span className="flex items-end gap-0.5 h-3">
              <span
                className={`w-0.5 bg-[#C9A84C] transition-all duration-300 ${
                  isSoundActive ? 'h-3 animate-pulse' : 'h-1'
                }`}
              />
              <span
                className={`w-0.5 bg-[#6BA3C7] transition-all duration-300 ${
                  isSoundActive ? 'h-2 animate-bounce' : 'h-1'
                }`}
              />
              <span
                className={`w-0.5 bg-[#D4725C] transition-all duration-300 ${
                  isSoundActive ? 'h-2.5 animate-pulse' : 'h-1'
                }`}
              />
            </span>
            <span className="text-[10px] tracking-wider uppercase font-mono text-[#F5F0E6] group-hover:text-[#C9A84C]">
              Audio: {isSoundActive ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

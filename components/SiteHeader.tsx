'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-lmBg border-b border-lmBorder">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Name - Left side */}
        <Link href="/" className="text-lg font-semibold text-lmInk hover:opacity-70 transition-opacity">
          Lillian Hahn Shining
        </Link>

        {/* Navigation - Right side (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-sm font-medium text-lmInk hover:opacity-70 transition-opacity">
            About
          </Link>
          <Link href="/#classes" className="text-sm font-medium text-lmInk hover:opacity-70 transition-opacity">
            Classes
          </Link>
          <Link href="/#contact" className="text-sm font-medium text-lmInk hover:opacity-70 transition-opacity">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-lmInk hover:opacity-70 transition-opacity"
          aria-label="Menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-lmBorder bg-lmBg">
          <nav className="px-6 py-4 space-y-4">
            <Link 
              href="/about" 
              className="block text-sm font-medium text-lmInk hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/#classes" 
              className="block text-sm font-medium text-lmInk hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Classes
            </Link>
            <Link 
              href="/#contact" 
              className="block text-sm font-medium text-lmInk hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { Locale, locales, localeNames } from '@/lib/i18n/translations';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/charts', label: t.nav.charts },
    { href: '/pricing', label: t.nav.pricing },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-space-900/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-star-400/20 blur-lg rounded-full group-hover:bg-star-400/30 transition-colors" />
              <Sparkles className="relative h-6 w-6 text-star-400" />
            </div>
            <span className="text-xl font-semibold text-white">
              Astro<span className="text-star-400">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-star-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase">{locale}</span>
              </button>
              
              {isLangOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLangOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-40 bg-space-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setLocale(loc);
                          setIsLangOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                          locale === loc
                            ? 'bg-star-400/10 text-star-400'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {localeNames[loc]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Auth Buttons */}
            <Link
              href="/auth/login"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {t.nav.login}
            </Link>
            <Link
              href="/chart/new"
              className="px-4 py-2 text-sm font-medium text-space-900 bg-star-400 hover:bg-star-300 rounded-lg transition-colors"
            >
              {t.nav.getStarted}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/5 py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-white/40 mb-2">Language / Bahasa</p>
                <div className="flex gap-2">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setLocale(loc);
                        setIsMenuOpen(false);
                      }}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        locale === loc
                          ? 'bg-star-400/10 text-star-400 border border-star-400/20'
                          : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 flex flex-col gap-2">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-2.5 text-center text-white/70 hover:text-white border border-white/10 rounded-lg transition-colors"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/chart/new"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-2.5 text-center font-medium text-space-900 bg-star-400 hover:bg-star-300 rounded-lg transition-colors"
                >
                  {t.nav.getStarted}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

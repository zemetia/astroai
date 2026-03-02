'use client';

import Link from 'next/link';
import { Sparkles, Github, Twitter, Mail } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

export function Footer() {
  const { t, locale } = useI18n();

  const links = {
    product: [
      { label: 'Natal Chart', href: '/chart/new' },
      { label: 'Readings', href: '/readings' },
      { label: 'Pricing', href: '/pricing' },
    ],
    resources: [
      { label: 'About Astrology', href: '/about' },
      { label: 'Documentation', href: '/docs' },
      { label: 'API', href: '/api' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
    ],
  };

  return (
    <footer className="border-t border-white/5 bg-space-900/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-star-400" />
              <span className="text-lg font-semibold text-white">
                Astro<span className="text-star-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              {locale === 'id' 
                ? 'Bukan ramalan. Ini tentang purpose.'
                : 'Not fortune telling. It\'s about purpose.'
              }
            </p>
            <div className="flex gap-3 mt-4">
              <a 
                href="https://github.com/zemetia/astroai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="mailto:hello@astroai.app" 
                className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-medium text-white mb-4">
              {locale === 'id' ? 'Produk' : 'Product'}
            </h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-4">
              {locale === 'id' ? 'Sumber' : 'Resources'}
            </h4>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-4">
              {locale === 'id' ? 'Perusahaan' : 'Company'}
            </h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            {t.footer.madeWith} • © {new Date().getFullYear()} AstroAI
          </p>
          <p className="text-xs text-white/30 italic">
            "{t.footer.tagline}"
          </p>
        </div>
      </div>
    </footer>
  );
}

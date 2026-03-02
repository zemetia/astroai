'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Locale, Translations, defaultLocale, getTranslations } from './translations';

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale = defaultLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [t, setT] = useState<Translations>(getTranslations(initialLocale));

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setT(getTranslations(newLocale));
    // Store preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('astroai-locale', newLocale);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    const newLocale = locale === 'en' ? 'id' : 'en';
    setLocale(newLocale);
  }, [locale, setLocale]);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

'use client';

import { Sparkles, Star, Target, Brain, Globe, Users } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function AboutPage() {
  const { t, locale } = useI18n();

  const content = {
    en: {
      title: 'About AstroAI',
      subtitle: 'Astrology meets data science',
      intro: `AstroAI is a modern astrology platform that combines ancient wisdom with cutting-edge technology. 
              Unlike traditional horoscopes based only on birth months, we use complete natal charts with 
              geodetic and mundane astrology for up to 95% accuracy.`,
      philosophy: {
        title: 'Our Philosophy',
        text: `We believe astrology is not about predicting the future, but understanding patterns and purpose. 
               Your natal chart is a blueprint — a map of your potential, not a prison of fate.`,
      },
      approach: {
        title: 'Data-Driven Approach',
        text: `Like a data analyst needs complete data for valid insights, we combine:
               • Precise planetary positions (Swiss Ephemeris, 0.001" accuracy)
               • Geodetic astrology (birth location energy)
               • Mundane astrology (cultural context)
               • Personal context (background, experiences)`,
      },
      creator: {
        title: 'Built by a Polymath',
        text: `AstroAI was created by someone who has spent years studying mathematics, physics, 
               psychology, computer science, music, design, and philosophy — bringing a unique 
               multidisciplinary perspective to astrology.`,
      },
    },
    id: {
      title: 'Tentang AstroAI',
      subtitle: 'Astrologi bertemu data science',
      intro: `AstroAI adalah platform astrologi modern yang menggabungkan kebijaksanaan kuno dengan teknologi mutakhir. 
              Berbeda dengan horoskop tradisional yang hanya berdasarkan bulan lahir, kami menggunakan kartu natal lengkap dengan 
              astrologi geodetik dan mundane untuk akurasi hingga 95%.`,
      philosophy: {
        title: 'Filosofi Kami',
        text: `Kami percaya astrologi bukan tentang meramal masa depan, tapi memahami pola dan purpose. 
               Chart natalmu adalah blueprint — peta potensimu, bukan penjara takdir.`,
      },
      approach: {
        title: 'Pendekatan Berbasis Data',
        text: `Seperti data analyst membutuhkan data lengkap untuk insight yang valid, kami menggabungkan:
               • Posisi planet presisi (Swiss Ephemeris, akurasi 0.001")
               • Astrologi geodetik (energi lokasi lahir)
               • Astrologi mundane (konteks budaya)
               • Konteks personal (latar belakang, pengalaman)`,
      },
      creator: {
        title: 'Dibuat oleh Polymath',
        text: `AstroAI dibuat oleh seseorang yang telah menghabiskan bertahun-tahun mempelajari matematika, fisika, 
               psikologi, computer science, musik, desain, dan filsafat — membawa perspektif multidisiplin yang unik 
               ke dalam astrologi.`,
      },
    },
  };

  const c = content[locale];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-star-400/10 rounded-2xl mb-6">
            <Sparkles className="h-8 w-8 text-star-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{c.title}</h1>
          <p className="text-xl text-white/50">{c.subtitle}</p>
        </div>

        {/* Intro */}
        <div className="glass-card rounded-2xl p-8 mb-8">
          <p className="text-lg text-white/70 leading-relaxed whitespace-pre-line">
            {c.intro}
          </p>
        </div>

        {/* Sections */}
        <div className="grid gap-8">
          {/* Philosophy */}
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-nebula-purple/20 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-nebula-purple" />
              </div>
              <h2 className="text-xl font-semibold text-white">{c.philosophy.title}</h2>
            </div>
            <p className="text-white/60 leading-relaxed whitespace-pre-line">
              {c.philosophy.text}
            </p>
          </div>

          {/* Approach */}
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-nebula-cyan/20 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-nebula-cyan" />
              </div>
              <h2 className="text-xl font-semibold text-white">{c.approach.title}</h2>
            </div>
            <p className="text-white/60 leading-relaxed whitespace-pre-line">
              {c.approach.text}
            </p>
          </div>

          {/* Creator */}
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-star-400/20 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-star-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">{c.creator.title}</h2>
            </div>
            <p className="text-white/60 leading-relaxed whitespace-pre-line">
              {c.creator.text}
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl font-light text-star-300 italic">
            "{locale === 'id' 
              ? 'Bintang-bintang membimbing, tidak memaksa.'
              : 'The stars incline, they do not compel.'
            }"
          </blockquote>
        </div>
      </div>
    </div>
  );
}

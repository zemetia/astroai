'use client';

import Link from 'next/link';
import { Sparkles, Star, MapPin, Brain, ChevronRight, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Comparison Section */}
      <ComparisonSection />
      
      {/* Blueprint Section */}
      <BlueprintSection />
      
      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nebula-purple/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-nebula-blue/20 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-star-400/10 border border-star-400/20 mb-8">
            <Sparkles className="h-4 w-4 text-star-400" />
            <span className="text-sm text-star-300">{t.hero.badge}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t.hero.title.split(' ').map((word, i) => 
              word.toLowerCase() === 'cosmic' || word.toLowerCase() === 'blueprint' || 
              word.toLowerCase() === 'kosmis' || word.toLowerCase() === 'blueprintmu' ? (
                <span key={i} className="text-star">{word} </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chart/new"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-space-900 bg-star-400 hover:bg-star-300 rounded-xl transition-all star-glow-subtle"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white border border-white/20 hover:bg-white/5 rounded-xl transition-colors"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { t } = useI18n();

  const stats = [
    { value: '10K+', label: t.hero.statsCharts },
    { value: '95%', label: t.hero.statsAccuracy },
    { value: '5K+', label: t.hero.statsUsers },
  ];

  return (
    <section className="py-12 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-star-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { t } = useI18n();

  const features = [
    {
      icon: Star,
      title: t.features.natalChart.title,
      description: t.features.natalChart.description,
      color: 'text-star-400',
      bgColor: 'bg-star-400/10',
    },
    {
      icon: Brain,
      title: t.features.aiReading.title,
      description: t.features.aiReading.description,
      color: 'text-nebula-purple',
      bgColor: 'bg-nebula-purple/10',
    },
    {
      icon: MapPin,
      title: t.features.geodetic.title,
      description: t.features.geodetic.description,
      color: 'text-nebula-cyan',
      bgColor: 'bg-nebula-cyan/10',
    },
    {
      icon: Sparkles,
      title: t.features.relocation.title,
      description: t.features.relocation.description,
      color: 'text-nebula-pink',
      bgColor: 'bg-nebula-pink/10',
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.features.title}
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl glass-card hover:border-star-400/30 transition-colors"
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const { t } = useI18n();

  return (
    <section className="py-24 bg-gradient-to-b from-transparent via-space-800/30 to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.comparison.title}
          </h2>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Traditional */}
          <div className="p-6 rounded-2xl bg-space-800/50 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                <span className="text-lg">📅</span>
              </div>
              <h3 className="text-lg font-semibold text-white/70">
                {t.comparison.traditional.label}
              </h3>
            </div>
            <ul className="space-y-3">
              {t.comparison.traditional.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-white/30 mt-0.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* AstroAI */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-star-400/10 to-nebula-purple/10 border border-star-400/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-star-400/20 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-star-400" />
              </div>
              <h3 className="text-lg font-semibold text-star-300">
                {t.comparison.astroai.label}
              </h3>
            </div>
            <ul className="space-y-3">
              {t.comparison.astroai.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="text-star-400 mt-0.5">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlueprintSection() {
  const { t } = useI18n();

  const items = [
    {
      icon: '✋',
      title: t.blueprint.reject.title,
      description: t.blueprint.reject.description,
    },
    {
      icon: '⚡',
      title: t.blueprint.accelerate.title,
      description: t.blueprint.accelerate.description,
    },
    {
      icon: '🛤️',
      title: t.blueprint.follow.title,
      description: t.blueprint.follow.description,
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.blueprint.title}
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {t.blueprint.subtitle}
          </p>
        </div>

        {/* Blueprint Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl glass-card text-center group hover:border-star-400/20 transition-colors"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { t } = useI18n();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-nebula-purple/20 via-transparent to-nebula-blue/20" />
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Discover Your Blueprint?
        </h2>
        <p className="text-lg text-white/50 mb-8 max-w-2xl mx-auto">
          Create your natal chart in minutes. No credit card required.
        </p>
        <Link
          href="/chart/new"
          className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-space-900 bg-star-400 hover:bg-star-300 rounded-xl transition-all star-glow"
        >
          {t.hero.ctaPrimary}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

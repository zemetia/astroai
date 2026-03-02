'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Target,
  Sparkles,
  Lightbulb,
  Compass,
  Star,
  RefreshCw,
  Download,
  Share2
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

// Mock analysis result
const mockAnalysis = {
  bigPurpose: 'Menjadi jembatan penghubung antara teknologi dan kemanusiaan',
  coreMission: 'Menggunakan kekuatan komunikasi (Mercury di 10th house) untuk membawa pemahaman spiritual (Pisces Sun) ke dalam praktik bisnis yang nyata',
  keyStrengths: [
    'Kemampuan melihat pola besar (Jupiter vision)',
    'Empati tinggi (Moon di water sign)',
    'Komunikasi yang menginspirasi (Mercury strong)',
    'Adaptabilitas tinggi (Mutable sign emphasis)',
  ],
  challenges: [
    'Cenderung terlalu idealis',
    'Susah mengatakan tidak',
    'Terlalu memikirkan perasaan orang lain',
  ],
  lifePath: 'Tahun 2026-2028 adalah periode transformative dengan Saturn return. Fokus pada pembangunan fondasi karir yang autentik.',
  northNode: 'North Node di Leo menunjukkan kebutuhan untuk mengekspresikan kreativitas dan kepemimpinan yang autentik',
  midheaven: 'Midheaven di Capricorn menunjukkan tujuan karir menuju posisi otoritas dan tanggung jawab besar',
};

export default function BigPurposeAnalysisPage() {
  const { id } = useParams();
  const { locale } = useI18n();
  const isIndonesian = locale === 'id';
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(true);

  const handleRegenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-space-900">
      {/* Header */}
      <header className="border-b border-white/5 bg-space-800/50 backdrop-blur-xl sticky top-16 z-40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/dashboard/person/${id}`}
              className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">
                {isIndonesian ? 'Analisis Tujuan Hidup' : 'Life Purpose Analysis'}
              </h1>
              <p className="text-sm text-white/50">
                Budi Santoso • Pisces Sun • Scorpio Moon
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-space-700 text-white rounded-lg hover:bg-space-600 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">
                  {isIndonesian ? 'Generate Ulang' : 'Regenerate'}
                </span>
              </button>
              <button className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Download className="h-5 w-5" />
              </button>
              <button className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-star-400/10 flex items-center justify-center mb-6 animate-pulse">
              <Sparkles className="h-8 w-8 text-star-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              {isIndonesian ? 'Menganalisis Chart...' : 'Analyzing Chart...'}
            </h2>
            <p className="text-white/50 text-center max-w-md">
              {isIndonesian 
                ? 'AI sedang membaca pola-pola astrologi untuk menemukan tujuan hidup yang tersembunyi'
                : 'AI is reading astrological patterns to discover the hidden life purpose'}
            </p>
          </div>
        ) : showResult ? (
          <div className="space-y-6">
            {/* Big Purpose Card */}
            <div className="p-6 bg-gradient-to-br from-star-400/10 via-star-400/5 to-transparent border border-star-400/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-star-400/20 flex items-center justify-center">
                  <Target className="h-5 w-5 text-star-400" />
                </div>
                <h2 className="text-lg font-semibold text-star-400">
                  {isIndonesian ? 'Tujuan Hidup Utama' : 'Primary Life Purpose'}
                </h2>
              </div>
              <p className="text-2xl font-light text-white leading-relaxed">
                "{mockAnalysis.bigPurpose}"
              </p>
            </div>

            {/* Core Mission */}
            <div className="p-6 bg-space-800 border border-white/5 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-nebula-cyan/10 flex items-center justify-center">
                  <Compass className="h-5 w-5 text-nebula-cyan" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {isIndonesian ? 'Misi Inti' : 'Core Mission'}
                </h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                {mockAnalysis.coreMission}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Key Strengths */}
              <div className="p-6 bg-space-800 border border-white/5 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {isIndonesian ? 'Kekuatan Utama' : 'Key Strengths'}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {mockAnalysis.keyStrengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                      <span className="text-white/70">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div className="p-6 bg-space-800 border border-white/5 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-400/10 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {isIndonesian ? 'Tantangan' : 'Challenges'}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {mockAnalysis.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <span className="text-white/70">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Life Path */}
            <div className="p-6 bg-space-800 border border-white/5 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-nebula-purple/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-nebula-purple" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {isIndonesian ? 'Jalan Hidup & Timing' : 'Life Path & Timing'}
                </h3>
              </div>
              <p className="text-white/70 leading-relaxed mb-4">
                {mockAnalysis.lifePath}
              </p>
              <div className="p-4 bg-space-900/50 rounded-xl">
                <p className="text-sm text-white/50 mb-1">North Node</p>
                <p className="text-white">{mockAnalysis.northNode}</p>
              </div>
            </div>

            {/* Career Direction */}
            <div className="p-6 bg-space-800 border border-white/5 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-400/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {isIndonesian ? 'Arah Karir' : 'Career Direction'}
                </h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                {mockAnalysis.midheaven}
              </p>
            </div>

            {/* Action Items */}
            <div className="p-6 bg-gradient-to-br from-star-400/5 to-transparent border border-star-400/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">
                {isIndonesian ? 'Langkah Selanjutnya' : 'Next Steps'}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link
                  href={`/dashboard/person/${id}/career`}
                  className="p-4 bg-space-800 hover:bg-space-700 border border-white/5 rounded-xl transition-colors"
                >
                  <p className="font-medium text-white mb-1">
                    {isIndonesian ? 'Analisis Karir Detail' : 'Detailed Career Analysis'}
                  </p>
                  <p className="text-sm text-white/50">
                    {isIndonesian ? 'Pekerjaan yang cocok' : 'Suitable jobs'}
                  </p>
                </Link>
                <Link
                  href={`/dashboard/person/${id}/timeline`}
                  className="p-4 bg-space-800 hover:bg-space-700 border border-white/5 rounded-xl transition-colors"
                >
                  <p className="font-medium text-white mb-1">
                    {isIndonesian ? 'Prediksi Timeline' : 'Timeline Predictions'}
                  </p>
                  <p className="text-sm text-white/50">
                    {isIndonesian ? 'Kapan timing terbaik' : 'When is the best timing'}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

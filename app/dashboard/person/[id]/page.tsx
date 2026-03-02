'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  User,
  Target,
  Brain,
  Moon,
  Briefcase,
  Heart,
  MapPin,
  Calendar,
  Sparkles,
  ChevronRight,
  FileText,
  BarChart3,
  Settings
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

// Menu items untuk workspace
const getMenuItems = (isIndonesian: boolean) => [
  {
    id: 'overview',
    label: isIndonesian ? 'Ringkasan' : 'Overview',
    description: isIndonesian ? 'Data dasar dan chart natal' : 'Basic data & natal chart',
    icon: User,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    id: 'big-purpose',
    label: isIndonesian ? 'Tujuan Hidup' : 'Life Purpose',
    description: isIndonesian ? 'Analisis tujuan besar hidup' : 'Big purpose analysis',
    icon: Target,
    color: 'text-star-400',
    bgColor: 'bg-star-400/10',
  },
  {
    id: 'character',
    label: isIndonesian ? 'Analisis Karakter' : 'Character Analysis',
    description: isIndonesian ? 'Kepribadian & sifat dasar' : 'Personality & core traits',
    icon: Brain,
    color: 'text-nebula-cyan',
    bgColor: 'bg-nebula-cyan/10',
  },
  {
    id: 'shadow',
    label: isIndonesian ? 'Analisis Shadow' : 'Shadow Analysis',
    description: isIndonesian ? 'Sisi gelap & potensi tersembunyi' : 'Dark side & hidden potential',
    icon: Moon,
    color: 'text-nebula-purple',
    bgColor: 'bg-nebula-purple/10',
  },
  {
    id: 'career',
    label: isIndonesian ? 'Analisis Karir' : 'Career Analysis',
    description: isIndonesian ? 'Pekerjaan & jalur sukses' : 'Jobs & success paths',
    icon: Briefcase,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
  {
    id: 'relationship',
    label: isIndonesian ? 'Kompatibilitas' : 'Compatibility',
    description: isIndonesian ? 'Hubungan & pasangan' : 'Relationships & partners',
    icon: Heart,
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
  },
  {
    id: 'relocation',
    label: isIndonesian ? 'Analisis Relokasi' : 'Relocation Analysis',
    description: isIndonesian ? 'Lokasi terbaik untuk tinggal' : 'Best places to live',
    icon: MapPin,
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
  },
  {
    id: 'timeline',
    label: isIndonesian ? 'Prediksi Tahunan' : 'Yearly Predictions',
    description: isIndonesian ? 'Transit & prediksi 12 bulan' : 'Transits & 12-month forecast',
    icon: Calendar,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10',
  },
];

// Mock person data
const mockPerson = {
  id: '1',
  name: 'Budi Santoso',
  birthDate: '1995-03-15',
  birthTime: '08:30',
  birthLocation: 'Jakarta, Indonesia',
  currentLocation: 'Surabaya, Indonesia',
  sunSign: 'Pisces',
  moonSign: 'Scorpio',
  risingSign: 'Leo',
};

export default function PersonWorkspacePage() {
  const { id } = useParams();
  const { locale } = useI18n();
  const isIndonesian = locale === 'id';
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = getMenuItems(isIndonesian);

  return (
    <div className="min-h-screen bg-space-900">
      {/* Header */}
      <header className="border-b border-white/5 bg-space-800/50 backdrop-blur-xl sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          {/* Back & Title */}
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/dashboard"
              className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{mockPerson.name}</h1>
              <p className="text-sm text-white/50">
                {mockPerson.sunSign} ☉ • {mockPerson.moonSign} ☽ • {mockPerson.risingSign} ↑
              </p>
            </div>
            <button className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-3 bg-space-700/50 rounded-xl">
              <p className="text-xs text-white/40 mb-1">{isIndonesian ? 'Lahir' : 'Born'}</p>
              <p className="text-sm text-white font-medium">{mockPerson.birthDate}</p>
            </div>
            <div className="p-3 bg-space-700/50 rounded-xl">
              <p className="text-xs text-white/40 mb-1">{isIndonesian ? 'Waktu' : 'Time'}</p>
              <p className="text-sm text-white font-medium">{mockPerson.birthTime}</p>
            </div>
            <div className="p-3 bg-space-700/50 rounded-xl">
              <p className="text-xs text-white/40 mb-1">{isIndonesian ? 'Lokasi Lahir' : 'Birth Place'}</p>
              <p className="text-sm text-white font-medium truncate">{mockPerson.birthLocation}</p>
            </div>
            <div className="p-3 bg-space-700/50 rounded-xl">
              <p className="text-xs text-white/40 mb-1">{isIndonesian ? 'Lokasi Sekarang' : 'Current'}</p>
              <p className="text-sm text-white font-medium truncate">{mockPerson.currentLocation}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Link
              href={`/dashboard/person/${id}/big-purpose`}
              className="flex items-center gap-2 px-4 py-2 bg-star-400 text-space-900 rounded-lg font-medium hover:bg-star-300 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              {isIndonesian ? 'Analisis Tujuan' : 'Analyze Purpose'}
            </Link>
            <Link
              href={`/dashboard/person/${id}/career`}
              className="flex items-center gap-2 px-4 py-2 bg-space-700 text-white rounded-lg hover:bg-space-600 transition-colors"
            >
              <Briefcase className="h-4 w-4" />
              {isIndonesian ? 'Analisis Karir' : 'Analyze Career'}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={`/dashboard/person/${id}/${item.id}`}
                className="group p-5 bg-space-800 border border-white/5 rounded-2xl hover:border-white/10 hover:bg-space-800/80 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/20 group-hover:text-white/40 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-semibold text-white mb-1 group-hover:text-star-400 transition-colors">
                  {item.label}
                </h3>
                <p className="text-sm text-white/40">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Recent Analyses */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {isIndonesian ? 'Analisis Terbaru' : 'Recent Analyses'}
            </h2>
            <Link
              href={`/dashboard/person/${id}/history`}
              className="text-sm text-star-400 hover:text-star-300 transition-colors"
            >
              {isIndonesian ? 'Lihat Semua' : 'View All'} →
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { type: 'big-purpose', title: isIndonesian ? 'Tujuan Hidup Analysis' : 'Life Purpose Analysis', date: '2026-03-01', status: 'completed' },
              { type: 'career', title: isIndonesian ? 'Karir & Pekerjaan' : 'Career & Jobs', date: '2026-02-28', status: 'completed' },
              { type: 'relocation', title: isIndonesian ? 'Relokasi ke Surabaya' : 'Relocation to Surabaya', date: '2026-02-25', status: 'completed' },
            ].map((analysis, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-space-800 border border-white/5 rounded-xl hover:border-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-space-700 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white/40" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{analysis.title}</h4>
                  <p className="text-sm text-white/40">
                    {new Date(analysis.date).toLocaleDateString(isIndonesian ? 'id-ID' : 'en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-400/10 text-green-400 text-xs rounded-full">
                  {isIndonesian ? 'Selesai' : 'Completed'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Overview */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white mb-6">
            {isIndonesian ? 'Statistik' : 'Statistics'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: isIndonesian ? 'Total Analisis' : 'Total Analyses', value: '12', icon: BarChart3 },
              { label: isIndonesian ? 'Prediksi Tepat' : 'Accurate Predictions', value: '8', icon: Sparkles },
              { label: isIndonesian ? 'Relokasi' : 'Relocations', value: '3', icon: MapPin },
              { label: isIndonesian ? 'Hari Sejak Join' : 'Days Since Join', value: '45', icon: Calendar },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="p-4 bg-space-800 border border-white/5 rounded-xl">
                  <Icon className="h-5 w-5 text-white/30 mb-2" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

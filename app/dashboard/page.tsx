'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Briefcase, 
  Building2, 
  Plus, 
  Search,
  Star,
  MapPin,
  Calendar
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

// Types
interface Person {
  id: string;
  name: string;
  birthDate: string;
  birthLocation: string;
  currentLocation: string;
  avatar?: string;
  tags: string[];
  lastAnalyzed: string;
  analysesCount: number;
}

// Mock data
const mockPeople: Person[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    birthDate: '1995-03-15',
    birthLocation: 'Jakarta, Indonesia',
    currentLocation: 'Surabaya, Indonesia',
    tags: ['Career Focus', 'Relocation'],
    lastAnalyzed: '2026-03-01',
    analysesCount: 5,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    birthDate: '1992-08-22',
    birthLocation: 'Singapore',
    currentLocation: 'Singapore',
    tags: ['Relationship', 'Business'],
    lastAnalyzed: '2026-02-28',
    analysesCount: 3,
  },
];

export default function DashboardPage() {
  const { locale } = useI18n();
  const isIndonesian = locale === 'id';
  const [activeTab, setActiveTab] = useState<'people' | 'companies'>('people');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPeople = mockPeople.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-space-900">
      {/* Header */}
      <header className="border-b border-white/5 bg-space-800/50 backdrop-blur-xl sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {isIndonesian ? 'Dashboard' : 'Dashboard'}
              </h1>
              <p className="text-sm text-white/50">
                {isIndonesian 
                  ? 'Kelola analisis dan prediksi' 
                  : 'Manage analyses and predictions'}
              </p>
            </div>
            <Link
              href="/dashboard/person/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-star-400 text-space-900 rounded-lg font-medium hover:bg-star-300 transition-colors"
            >
              <Plus className="h-4 w-4" />
              {isIndonesian ? 'Tambah Orang' : 'Add Person'}
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-6">
            <button
              onClick={() => setActiveTab('people')}
              className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'people'
                  ? 'border-star-400 text-star-400'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <Users className="h-4 w-4" />
              {isIndonesian ? 'Orang' : 'People'}
              <span className="ml-1 px-2 py-0.5 bg-space-700 rounded-full text-xs">
                {mockPeople.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'companies'
                  ? 'border-star-400 text-star-400'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <Building2 className="h-4 w-4" />
              {isIndonesian ? 'Perusahaan' : 'Companies'}
              <span className="ml-1 px-2 py-0.5 bg-space-700 rounded-full text-xs">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isIndonesian ? 'Cari nama...' : 'Search by name...'}
            className="w-full pl-11 pr-4 py-3 bg-space-800 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-star-400/50 focus:outline-none"
          />
        </div>

        {/* People Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPeople.map((person) => (
            <Link
              key={person.id}
              href={`/dashboard/person/${person.id}`}
              className="group p-5 bg-space-800 border border-white/5 rounded-2xl hover:border-star-400/30 hover:bg-space-800/80 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-star-400/20 to-nebula-purple/20 flex items-center justify-center text-lg font-bold text-star-400 border border-star-400/20">
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-star-400 transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-xs text-white/50">
                      {new Date(person.birthDate).toLocaleDateString(isIndonesian ? 'id-ID' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-white/30">
                  <Star className="h-3 w-3" />
                  {person.analysesCount}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <MapPin className="h-3.5 w-3.5 text-white/30" />
                  <span className="truncate">{person.currentLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Calendar className="h-3.5 w-3.5 text-white/30" />
                  <span>
                    {isIndonesian ? 'Analisis terakhir: ' : 'Last analyzed: '}
                    {new Date(person.lastAnalyzed).toLocaleDateString(isIndonesian ? 'id-ID' : 'en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {person.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-space-700 text-white/60 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}

          {/* Add New Card */}
          <Link
            href="/dashboard/person/new"
            className="p-5 border-2 border-dashed border-white/10 rounded-2xl hover:border-star-400/30 hover:bg-star-400/5 transition-all flex flex-col items-center justify-center gap-3 min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-full bg-space-800 flex items-center justify-center">
              <Plus className="h-6 w-6 text-white/30" />
            </div>
            <span className="text-white/50 font-medium">
              {isIndonesian ? 'Tambah Orang Baru' : 'Add New Person'}
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}

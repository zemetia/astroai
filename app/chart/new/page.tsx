'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, MapPin, Calendar, Clock, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { RelocationHistoryForm, ResidenceEntry } from '@/components/RelocationHistoryForm';

const houseSystems = [
  { value: 'P', label: 'Placidus' },
  { value: 'K', label: 'Koch' },
  { value: 'E', label: 'Equal' },
  { value: 'W', label: 'Whole Sign' },
  { value: 'C', label: 'Campanus' },
  { value: 'R', label: 'Regiomontanus' },
  { value: 'O', label: 'Porphyry' },
  { value: 'M', label: 'Morinus' },
];

export default function NewChartPage() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'birth' | 'relocation'>('birth');
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '',
    location: '',
    latitude: '',
    longitude: '',
    timezone: '',
    houseSystem: 'P',
  });
  const [residenceHistory, setResidenceHistory] = useState<ResidenceEntry[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to chart result
    router.push('/chart/result');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-star-400/10 rounded-2xl mb-6">
            <Sparkles className="h-8 w-8 text-star-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.chartForm.title}
          </h1>
          <p className="text-white/50">
            {t.chartForm.subtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 bg-space-800 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('birth')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'birth'
                ? 'bg-star-400 text-space-900'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {locale === 'id' ? 'Data Kelahiran' : 'Birth Data'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('relocation')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'relocation'
                ? 'bg-star-400 text-space-900'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {locale === 'id' ? 'Riwayat Tinggal' : 'Residence History'}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'birth' ? (
            <>
              {/* Birth Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/70">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    {t.chartForm.birthDate}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-4 py-3 bg-space-800 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-star-400/50 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/70">
                    <Clock className="inline h-4 w-4 mr-2" />
                    {t.chartForm.birthTime}
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.birthTime}
                    onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                    className="w-full px-4 py-3 bg-space-800 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-star-400/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">
                  <MapPin className="inline h-4 w-4 mr-2" />
                  {t.chartForm.location}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Jakarta, Indonesia"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 bg-space-800 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-star-400/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/70">
                    {t.chartForm.latitude}
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="-6.2088"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    className="w-full px-4 py-3 bg-space-800 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-star-400/50 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/70">
                    {t.chartForm.longitude}
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="106.8456"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    className="w-full px-4 py-3 bg-space-800 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-star-400/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Timezone & House System */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/70">
                    {t.chartForm.timezone}
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className="w-full px-4 py-3 bg-space-800 border border-white/10 rounded-xl text-white focus:border-star-400/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                  >
                    <option value="">Select timezone...</option>
                    <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                    <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                    <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/70">
                    {t.chartForm.houseSystem}
                  </label>
                  <select
                    value={formData.houseSystem}
                    onChange={(e) => setFormData({ ...formData, houseSystem: e.target.value })}
                    className="w-full px-4 py-3 bg-space-800 border border-white/10 rounded-xl text-white focus:border-star-400/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
                  >
                    {houseSystems.map((system) => (
                      <option key={system.value} value={system.value}>
                        {system.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          ) : (
            <RelocationHistoryForm 
              entries={residenceHistory}
              onChange={setResidenceHistory}
              maxEntries={10}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-4">
            {activeTab === 'relocation' && (
              <button
                type="button"
                onClick={() => setActiveTab('birth')}
                className="flex-1 py-3 px-6 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-colors"
              >
                {locale === 'id' ? 'Kembali' : 'Back'}
              </button>
            )}
            {activeTab === 'birth' ? (
              <button
                type="button"
                onClick={() => setActiveTab('relocation')}
                className="flex-1 py-3 px-6 bg-star-400/20 text-star-400 rounded-xl hover:bg-star-400/30 transition-colors"
              >
                {locale === 'id' ? 'Lanjut: Riwayat Tinggal' : 'Next: Residence History'}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 px-6 bg-star-400 hover:bg-star-300 disabled:opacity-50 disabled:cursor-not-allowed text-space-900 font-medium rounded-xl transition-colors flex items-center justify-center gap-2 star-glow-subtle"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t.chartForm.generating}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    {t.chartForm.calculate}
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

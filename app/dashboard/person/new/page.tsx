'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Loader2,
  Check
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { RelocationHistoryForm, ResidenceEntry } from '@/components/RelocationHistoryForm';

const steps = [
  { id: 'basic', label: 'Data Dasar' },
  { id: 'birth', label: 'Data Kelahiran' },
  { id: 'relocation', label: 'Riwayat Tinggal' },
];

export default function NewPersonPage() {
  const router = useRouter();
  const { locale } = useI18n();
  const isIndonesian = locale === 'id';
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    birthLatitude: '',
    birthLongitude: '',
    currentLocation: '',
    currentLatitude: '',
    currentLongitude: '',
  });
  const [residenceHistory, setResidenceHistory] = useState<ResidenceEntry[]>([]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/dashboard');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== '';
      case 1:
        return formData.birthDate !== '' && formData.birthTime !== '' && formData.birthLocation !== '';
      case 2:
        return true; // Optional
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-space-900">
      {/* Header */}
      <header className="border-b border-white/5 bg-space-800/50 backdrop-blur-xl sticky top-16 z-40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">
                {isIndonesian ? 'Tambah Orang Baru' : 'Add New Person'}
              </h1>
              <p className="text-sm text-white/50">
                {isIndonesian ? 'Langkah' : 'Step'} {currentStep + 1} {isIndonesian ? 'dari' : 'of'} {steps.length}
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    index < currentStep
                      ? 'bg-green-400 text-space-900'
                      : index === currentStep
                      ? 'bg-star-400 text-space-900'
                      : 'bg-space-700 text-white/50'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`ml-2 text-sm hidden sm:block ${
                    index <= currentStep ? 'text-white' : 'text-white/30'
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-white/10 mx-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Form Content */}
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-space-800 border border-white/5 rounded-2xl p-6">
          {/* Step 1: Basic Info */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-star-400/10 flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-star-400" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  {isIndonesian ? 'Informasi Dasar' : 'Basic Information'}
                </h2>
                <p className="text-white/50">
                  {isIndonesian ? 'Masukkan nama dan kontak orang ini' : 'Enter the person\'s name and contact'}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    {isIndonesian ? 'Nama Lengkap' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isIndonesian ? 'Contoh: Budi Santoso' : 'e.g., Budi Santoso'}
                    className="w-full px-4 py-3 bg-space-900 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-star-400/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    {isIndonesian ? 'Email (opsional)' : 'Email (optional)'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={isIndonesian ? 'Contoh: budi@email.com' : 'e.g., budi@email.com'}
                    className="w-full px-4 py-3 bg-space-900 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-star-400/50 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Birth Data */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-nebula-cyan/10 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-nebula-cyan" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  {isIndonesian ? 'Data Kelahiran' : 'Birth Data'}
                </h2>
                <p className="text-white/50">
                  {isIndonesian ? 'Data akurat untuk hasil prediksi terbaik' : 'Accurate data for best prediction results'}
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      {isIndonesian ? 'Tanggal Lahir' : 'Birth Date'} *
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="w-full px-4 py-3 bg-space-900 border border-white/10 rounded-xl text-white focus:border-star-400/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      <Clock className="inline h-4 w-4 mr-1" />
                      {isIndonesian ? 'Waktu Lahir' : 'Birth Time'} *
                    </label>
                    <input
                      type="time"
                      value={formData.birthTime}
                      onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                      className="w-full px-4 py-3 bg-space-900 border border-white/10 rounded-xl text-white focus:border-star-400/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    {isIndonesian ? 'Tempat Lahir' : 'Birth Location'} *
                  </label>
                  <input
                    type="text"
                    value={formData.birthLocation}
                    onChange={(e) => setFormData({ ...formData, birthLocation: e.target.value })}
                    placeholder={isIndonesian ? 'Contoh: Jakarta, Indonesia' : 'e.g., Jakarta, Indonesia'}
                    className="w-full px-4 py-3 bg-space-900 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-star-400/50 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      {isIndonesian ? 'Latitude' : 'Latitude'}
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={formData.birthLatitude}
                      onChange={(e) => setFormData({ ...formData, birthLatitude: e.target.value })}
                      placeholder="-6.2088"
                      className="w-full px-4 py-3 bg-space-900 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-star-400/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      {isIndonesian ? 'Longitude' : 'Longitude'}
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={formData.birthLongitude}
                      onChange={(e) => setFormData({ ...formData, birthLongitude: e.target.value })}
                      placeholder="106.8456"
                      className="w-full px-4 py-3 bg-space-900 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-star-400/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    {isIndonesian ? 'Lokasi Saat Ini' : 'Current Location'}
                  </label>
                  <input
                    type="text"
                    value={formData.currentLocation}
                    onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                    placeholder={isIndonesian ? 'Contoh: Surabaya, Indonesia' : 'e.g., Surabaya, Indonesia'}
                    className="w-full px-4 py-3 bg-space-900 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-star-400/50 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Relocation History */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-orange-400/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-orange-400" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  {isIndonesian ? 'Riwayat Tempat Tinggal' : 'Residence History'}
                </h2>
                <p className="text-white/50">
                  {isIndonesian ? 'Untuk analisis geodetic yang lebih akurat' : 'For more accurate geodetic analysis'}
                </p>
              </div>

              <RelocationHistoryForm
                entries={residenceHistory}
                onChange={setResidenceHistory}
                maxEntries={10}
              />
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 px-6 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-colors"
            >
              {isIndonesian ? 'Kembali' : 'Back'}
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1 py-3 px-6 bg-star-400 text-space-900 rounded-xl font-medium hover:bg-star-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isIndonesian ? 'Lanjut' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-star-400 text-space-900 rounded-xl font-medium hover:bg-star-300 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isIndonesian ? 'Menyimpan...' : 'Saving...'}
                </>
              ) : (
                <>
                  {isIndonesian ? 'Simpan' : 'Save'}
                </>
              )}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

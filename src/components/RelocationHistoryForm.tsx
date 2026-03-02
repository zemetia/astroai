'use client';

import { useState } from 'react';
import { MapPin, Plus, Trash2, Calendar } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

interface ResidenceEntry {
  id: string;
  location: string;
  startAge: number;
  endAge: number | null; // null = sampai sekarang
  isCurrent: boolean;
}

interface RelocationHistoryFormProps {
  entries: ResidenceEntry[];
  onChange: (entries: ResidenceEntry[]) => void;
  maxEntries?: number;
}

export function RelocationHistoryForm({ 
  entries, 
  onChange, 
  maxEntries = 10 
}: RelocationHistoryFormProps) {
  const { locale } = useI18n();
  const isIndonesian = locale === 'id';

  const addEntry = () => {
    if (entries.length >= maxEntries) return;
    
    const newEntry: ResidenceEntry = {
      id: crypto.randomUUID(),
      location: '',
      startAge: entries.length > 0 
        ? (entries[entries.length - 1].endAge || entries[entries.length - 1].startAge + 1)
        : 0,
      endAge: null,
      isCurrent: entries.length === 0,
    };
    
    // If adding new entry, set previous current to not current
    const updatedEntries = entries.map(e => 
      e.isCurrent ? { ...e, isCurrent: false, endAge: newEntry.startAge } : e
    );
    
    onChange([...updatedEntries, newEntry]);
  };

  const updateEntry = (id: string, updates: Partial<ResidenceEntry>) => {
    onChange(entries.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    ));
  };

  const removeEntry = (id: string) => {
    const filtered = entries.filter(e => e.id !== id);
    // If removed current, make the last one current
    if (entries.find(e => e.id === id)?.isCurrent && filtered.length > 0) {
      filtered[filtered.length - 1].isCurrent = true;
      filtered[filtered.length - 1].endAge = null;
    }
    onChange(filtered);
  };

  const setAsCurrent = (id: string) => {
    onChange(entries.map(entry => ({
      ...entry,
      isCurrent: entry.id === id,
      endAge: entry.id === id ? null : entry.endAge,
    })));
  };

  const validateDuration = (entry: ResidenceEntry): boolean => {
    if (!entry.endAge && !entry.isCurrent) return false;
    const end = entry.endAge ?? entry.startAge + 1;
    return (end - entry.startAge) >= 1;
  };

  const totalYears = entries.reduce((sum, entry) => {
    const end = entry.endAge ?? entry.startAge + 1; // Assume at least 1 year if current
    return sum + (end - entry.startAge);
  }, 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-star-400" />
          <h3 className="text-lg font-semibold text-white">
            {isIndonesian ? 'Riwayat Tempat Tinggal' : 'Residence History'}
          </h3>
        </div>
        <span className="text-sm text-white/50">
          {entries.length}/{maxEntries} {isIndonesian ? 'tempat' : 'places'}
        </span>
      </div>

      <p className="text-sm text-white/50">
        {isIndonesian 
          ? 'Masukkan tempat tinggal minimal 1 tahun (urutkan dari terlama ke terbaru)'
          : 'Enter places you lived for at least 1 year (oldest to newest)'
        }
      </p>

      {/* Entries List */}
      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div 
            key={entry.id}
            className={`p-4 rounded-xl border transition-colors ${
              entry.isCurrent 
                ? 'bg-star-400/10 border-star-400/30' 
                : 'bg-space-800 border-white/10'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Number */}
              <div className="w-8 h-8 rounded-full bg-space-700 flex items-center justify-center text-sm font-medium text-white/70 flex-shrink-0">
                {index + 1}
              </div>

              <div className="flex-1 space-y-3">
                {/* Location Input */}
                <div>
                  <label className="block text-xs text-white/50 mb-1">
                    {isIndonesian ? 'Kota/Tempat' : 'City/Location'}
                  </label>
                  <input
                    type="text"
                    value={entry.location}
                    onChange={(e) => updateEntry(entry.id, { location: e.target.value })}
                    placeholder={isIndonesian ? 'Contoh: Jakarta, Indonesia' : 'e.g., Jakarta, Indonesia'}
                    className="w-full px-3 py-2 bg-space-900 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:border-star-400/50 focus:outline-none"
                  />
                </div>

                {/* Age Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/50 mb-1">
                      <Calendar className="inline h-3 w-3 mr-1" />
                      {isIndonesian ? 'Umur Mulai' : 'Age Started'}
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={120}
                      value={entry.startAge}
                      onChange={(e) => updateEntry(entry.id, { startAge: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 bg-space-900 border border-white/10 rounded-lg text-white text-sm focus:border-star-400/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1">
                      <Calendar className="inline h-3 w-3 mr-1" />
                      {isIndonesian ? 'Umur Selesai' : 'Age Ended'}
                    </label>
                    <input
                      type="number"
                      min={entry.startAge + 1}
                      max={120}
                      value={entry.endAge ?? ''}
                      disabled={entry.isCurrent}
                      onChange={(e) => updateEntry(entry.id, { endAge: parseInt(e.target.value) || null })}
                      placeholder={entry.isCurrent ? (isIndonesian ? 'Sekarang' : 'Now') : ''}
                      className="w-full px-3 py-2 bg-space-900 border border-white/10 rounded-lg text-white text-sm focus:border-star-400/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Duration Warning */}
                {!validateDuration(entry) && entry.location && (
                  <p className="text-xs text-red-400">
                    ⚠️ {isIndonesian 
                      ? 'Minimal 1 tahun di tempat ini' 
                      : 'At least 1 year required'
                    }
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="current-residence"
                      checked={entry.isCurrent}
                      onChange={() => setAsCurrent(entry.id)}
                      className="w-4 h-4 accent-star-400"
                    />
                    <span className="text-sm text-white/70">
                      {isIndonesian ? 'Tinggal di sini sekarang' : 'Currently living here'}
                    </span>
                  </label>

                  {entries.length > 1 && (
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      title={isIndonesian ? 'Hapus' : 'Remove'}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      {entries.length < maxEntries && (
        <button
          onClick={addEntry}
          className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-white/50 hover:text-white hover:border-star-400/50 hover:bg-star-400/5 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {isIndonesian ? 'Tambah Tempat Tinggal' : 'Add Residence'}
        </button>
      )}

      {/* Summary */}
      {entries.length > 0 && (
        <div className="p-4 bg-space-800/50 rounded-xl border border-white/5">
          <p className="text-sm text-white/70">
            {isIndonesian 
              ? `Total ${entries.length} tempat tinggal selama ~${totalYears} tahun`
              : `Total ${entries.length} residences over ~${totalYears} years`
            }
          </p>
        </div>
      )}
    </div>
  );
}

export type { ResidenceEntry };

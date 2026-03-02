'use client';

import { useState, useEffect } from 'react';
import { PersonalContext, INDONESIAN_ETHNICITIES, RELIGIONS, CULTURAL_VALUES_OPTIONS, createEmptyPersonalContext } from '@/types/personal-context';
import { ChevronDown, ChevronUp, Plus, Trash2, MapPin, Users, BookOpen, Briefcase, Heart, Globe } from 'lucide-react';

interface PersonalContextFormProps {
  chartId: string;
  initialData?: PersonalContext | null;
  onSave: (data: PersonalContext) => void;
  onCancel?: () => void;
}

export default function PersonalContextForm({ chartId, initialData, onSave, onCancel }: PersonalContextFormProps) {
  const [formData, setFormData] = useState<PersonalContext>(initialData || createEmptyPersonalContext());
  const [expandedSections, setExpandedSections] = useState<string[]>(['demographics']);
  const [newRelocation, setNewRelocation] = useState({
    fromCity: '',
    fromCountry: '',
    toCity: '',
    toCountry: '',
    reason: 'other' as const,
    reasonDetail: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, chartId });
  };

  const addRelocation = () => {
    if (!newRelocation.fromCity || !newRelocation.toCity) return;
    
    setFormData(prev => ({
      ...prev,
      relocationHistory: [
        ...prev.relocationHistory,
        {
          ...newRelocation,
          id: Date.now().toString(),
          movedAt: new Date(),
        }
      ]
    }));
    
    setNewRelocation({
      fromCity: '',
      fromCountry: '',
      toCity: '',
      toCountry: '',
      reason: 'other',
      reasonDetail: '',
    });
  };

  const removeRelocation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      relocationHistory: prev.relocationHistory.filter(r => r.id !== id)
    }));
  };

  const toggleCulturalValue = (valueId: string) => {
    setFormData(prev => ({
      ...prev,
      culturalValues: prev.culturalValues.includes(valueId)
        ? prev.culturalValues.filter(v => v !== valueId)
        : [...prev.culturalValues, valueId]
    }));
  };

  const SectionHeader = ({ title, icon: Icon, section }: { title: string, icon: any, section: string }) => (
    <button
      type="button"
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-blue-400" />
        <span className="font-medium text-white">{title}</span>
      </div>
      {expandedSections.includes(section) ? (
        <ChevronUp className="w-5 h-5 text-slate-400" />
      ) : (
        <ChevronDown className="w-5 h-5 text-slate-400" />
      )}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Demographics Section */}
      <div>
        <SectionHeader title="Demographics & Identity" icon={Users} section="demographics" />
        {expandedSections.includes('demographics') && (
          <div className="p-4 bg-slate-800/50 rounded-b-lg space-y-4 mt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Ethnicity (Suku)</label>
                <select
                  value={formData.ethnicity}
                  onChange={(e) => setFormData({ ...formData, ethnicity: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select ethnicity...</option>
                  {INDONESIAN_ETHNICITIES.map(eth => (
                    <option key={eth} value={eth}>{eth}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Specific Detail</label>
                <input
                  type="text"
                  value={formData.ethnicityDetail || ''}
                  onChange={(e) => setFormData({ ...formData, ethnicityDetail: e.target.value })}
                  placeholder="e.g., Batak Toba, Jawa Surabaya"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Religion</label>
                <select
                  value={formData.religion}
                  onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select religion...</option>
                  {RELIGIONS.map(rel => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Practice Level</label>
                <select
                  value={formData.religiousPractice}
                  onChange={(e) => setFormData({ ...formData, religiousPractice: e.target.value as any })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select level...</option>
                  <option value="devout">Devout (Very active)</option>
                  <option value="moderate">Moderate (Regular practice)</option>
                  <option value="cultural">Cultural (Traditions only)</option>
                  <option value="none">None/Not practicing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Nationality</label>
              <input
                type="text"
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                placeholder="e.g., Indonesian, American, etc"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Birth & Family Section */}
      <div>
        <SectionHeader title="Birth & Family Background" icon={BookOpen} section="family" />
        {expandedSections.includes('family') && (
          <div className="p-4 bg-slate-800/50 rounded-b-lg space-y-4 mt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Birth Order</label>
                <select
                  value={formData.birthOrder || ''}
                  onChange={(e) => setFormData({ ...formData, birthOrder: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select...</option>
                  <option value={1}>First born (Anak pertama)</option>
                  <option value={2}>Second born</option>
                  <option value={3}>Third born</option>
                  <option value={4}>Fourth or later</option>
                  <option value={0}>Only child</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Number of Siblings</label>
                <input
                  type="number"
                  value={formData.siblingsCount || ''}
                  onChange={(e) => setFormData({ ...formData, siblingsCount: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Father&apos;s Occupation</label>
                <input
                  type="text"
                  value={formData.fatherOccupation || ''}
                  onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })}
                  placeholder="e.g., Entrepreneur, Civil Servant"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Mother&apos;s Occupation</label>
                <input
                  type="text"
                  value={formData.motherOccupation || ''}
                  onChange={(e) => setFormData({ ...formData, motherOccupation: e.target.value })}
                  placeholder="e.g., Teacher, Housewife"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Family Economic Status</label>
              <select
                value={formData.familyEconomicStatus || ''}
                onChange={(e) => setFormData({ ...formData, familyEconomicStatus: e.target.value as any })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
              >
                <option value="">Select...</option>
                <option value="lower">Lower income</option>
                <option value="middle">Middle class</option>
                <option value="upper_middle">Upper middle class</option>
                <option value="wealthy">Wealthy/Affluent</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Cultural Values Section */}
      <div>
        <SectionHeader title="Cultural Values & Language" icon={Globe} section="cultural" />
        {expandedSections.includes('cultural') && (
          <div className="p-4 bg-slate-800/50 rounded-b-lg space-y-4 mt-1">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Cultural Values (Select all that apply)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {CULTURAL_VALUES_OPTIONS.map((value) => (
                  <button
                    key={value.id}
                    type="button"
                    onClick={() => toggleCulturalValue(value.id)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      formData.culturalValues.includes(value.id)
                        ? 'bg-blue-600/30 border-blue-500 text-white'
                        : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    <div className="font-medium">{value.label}</div>
                    <div className="text-xs text-slate-400">{value.region}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Preferred Language for Reading</label>
              <select
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
                <option value="jv">Javanese (Basa Jawa)</option>
                <option value="su">Sundanese (Basa Sunda)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Location & Relocation Section */}
      <div>
        <SectionHeader title="Location & Relocation History" icon={MapPin} section="location" />
        {expandedSections.includes('location') && (
          <div className="p-4 bg-slate-800/50 rounded-b-lg space-y-4 mt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Current City</label>
                <input
                  type="text"
                  value={formData.currentLocation.city}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    currentLocation: { ...formData.currentLocation, city: e.target.value }
                  })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Current Country</label>
                <input
                  type="text"
                  value={formData.currentLocation.country}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    currentLocation: { ...formData.currentLocation, country: e.target.value }
                  })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>

            {/* Relocation History */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Relocation History</label>
              
              {formData.relocationHistory.length > 0 && (
                <div className="space-y-2 mb-4">
                  {formData.relocationHistory.map((relocation) => (
                    <div key={relocation.id} className="flex items-center justify-between bg-slate-700 rounded-lg p-3">
                      <div>
                        <span className="text-white">{relocation.fromCity}</span>
                        <span className="text-slate-400 mx-2">→</span>
                        <span className="text-white">{relocation.toCity}</span>
                        <span className="text-slate-400 text-sm ml-2">({relocation.reason})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeRelocation(relocation.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-slate-700 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="From City"
                    value={newRelocation.fromCity}
                    onChange={(e) => setNewRelocation({ ...newRelocation, fromCity: e.target.value })}
                    className="bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white text-sm"
                  />
                  <input
                    type="text"
                    placeholder="To City"
                    value={newRelocation.toCity}
                    onChange={(e) => setNewRelocation({ ...newRelocation, toCity: e.target.value })}
                    className="bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
                <select
                  value={newRelocation.reason}
                  onChange={(e) => setNewRelocation({ ...newRelocation, reason: e.target.value as any })}
                  className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="birth">Born there</option>
                  <option value="education">Education</option>
                  <option value="career">Career</option>
                  <option value="family">Family</option>
                  <option value="marriage">Marriage</option>
                  <option value="other">Other</option>
                </select>
                <button
                  type="button"
                  onClick={addRelocation}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  Add Relocation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Life Status Section */}
      <div>
        <SectionHeader title="Life Status & Career" icon={Heart} section="life" />
        {expandedSections.includes('life') && (
          <div className="p-4 bg-slate-800/50 rounded-b-lg space-y-4 mt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Life Stage</label>
                <select
                  value={formData.currentLifeStage}
                  onChange={(e) => setFormData({ ...formData, currentLifeStage: e.target.value as any })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="student">Student</option>
                  <option value="early_career">Early Career</option>
                  <option value="mid_career">Mid Career</option>
                  <option value="senior">Senior/Executive</option>
                  <option value="retirement">Retirement</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Relationship Status</label>
                <select
                  value={formData.relationshipStatus}
                  onChange={(e) => setFormData({ ...formData, relationshipStatus: e.target.value as any })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="single">Single</option>
                  <option value="dating">Dating</option>
                  <option value="engaged">Engaged</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Education Level</label>
                <select
                  value={formData.educationLevel || ''}
                  onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value as any })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select...</option>
                  <option value="high_school">High School</option>
                  <option value="bachelor">Bachelor&apos;s Degree</option>
                  <option value="master">Master&apos;s Degree</option>
                  <option value="phd">PhD/Doctorate</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Field of Study</label>
                <input
                  type="text"
                  value={formData.fieldOfStudy || ''}
                  onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                  placeholder="e.g., Computer Science, Business"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Current Industry</label>
              <input
                type="text"
                value={formData.currentIndustry || ''}
                onChange={(e) => setFormData({ ...formData, currentIndustry: e.target.value })}
                placeholder="e.g., Technology, Finance, Healthcare"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="hasChildren"
                  checked={formData.hasChildren}
                  onChange={(e) => setFormData({ ...formData, hasChildren: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-700"
                />
                <label htmlFor="hasChildren" className="text-slate-300">Has Children</label>
              </div>
              
              {formData.hasChildren && (
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Number of Children</label>
                  <input
                    type="number"
                    value={formData.childrenCount || ''}
                    onChange={(e) => setFormData({ ...formData, childrenCount: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
        >
          Save Personal Context
        </button>
      </div>
    </form>
  );
}

// Personal Context Types for AstroAI
// Extends user profile with demographic, cultural, and relocation data

export interface RelocationHistory {
  id: string;
  fromCity: string;
  fromCountry: string;
  toCity: string;
  toCountry: string;
  movedAt: Date;
  reason: 'birth' | 'education' | 'career' | 'family' | 'marriage' | 'other';
  reasonDetail?: string;
}

export interface PersonalContext {
  // Demographics
  ethnicity?: string;              // Suku/bangsa: Jawa, Sunda, Batak, Chinese, etc
  ethnicityDetail?: string;        // Detail spesifik (misal: Batak Toba, Jawa Surabaya)
  
  religion?: string;               // Agama
  religiousPractice?: 'devout' | 'moderate' | 'cultural' | 'none'; // Level praktik
  
  nationality: string;             // Kewarganegaraan
  
  // Birth & Early Life
  birthLocation: {
    city: string;
    country: string;
    hospital?: string;
  };
  
  birthOrder?: number;             // Anak ke-berapa (1 = first born)
  siblingsCount?: number;          // Jumlah saudara
  
  // Family Background
  fatherOccupation?: string;       // Pekerjaan ayah
  motherOccupation?: string;       // Pekerjaan ibu
  familyEconomicStatus?: 'lower' | 'middle' | 'upper_middle' | 'wealthy';
  
  // Cultural Values (checkbox multi-select)
  culturalValues: string[];        // ["collectivism", "hierarchy", "harmony", "achievement", etc]
  
  // Language
  nativeLanguages: string[];       // Bahasa ibu
  preferredLanguage: string;       // Bahasa untuk reading
  
  // Current Location
  currentLocation: {
    city: string;
    country: string;
    since: Date;                   // Tinggal di sini sejak
  };
  
  // Relocation History
  relocationHistory: RelocationHistory[];
  
  // Life Circumstances
  currentLifeStage: 'student' | 'early_career' | 'mid_career' | 'senior' | 'retirement';
  relationshipStatus: 'single' | 'dating' | 'engaged' | 'married' | 'divorced' | 'widowed';
  hasChildren: boolean;
  childrenCount?: number;
  
  // Career/Education
  educationLevel?: 'high_school' | 'bachelor' | 'master' | 'phd' | 'other';
  fieldOfStudy?: string;
  currentIndustry?: string;
  
  // Additional Context
  healthConsiderations?: string;   // Kondisi kesehatan yang relevan
  significantLifeEvents?: string;  // Event penting (pindah, trauma, achievement)
  
  // Metadata
  updatedAt: Date;
}

// Cultural Database (Indonesian Focus)
export const INDONESIAN_ETHNICITIES = [
  'Jawa',
  'Sunda',
  'Batak',
  'Minangkabau',
  'Betawi',
  'Bugis',
  'Melayu',
  'Aceh',
  'Bali',
  'Makassar',
  'Dayak',
  'Toraja',
  'Asmat',
  'Chinese-Indonesian',
  'Arab-Indonesian',
  'Indian-Indonesian',
  'Mixed/Multiple',
  'Other'
] as const;

export const RELIGIONS = [
  'Islam',
  'Christianity (Protestant)',
  'Christianity (Catholic)',
  'Hinduism',
  'Buddhism',
  'Confucianism',
  'Judaism',
  'Other',
  'None/Atheist',
  'Spiritual but not religious'
] as const;

export const CULTURAL_VALUES_OPTIONS = [
  // Indonesian/Common Asian
  { id: 'collectivism', label: 'Collectivism (Kelompok > Individu)', region: 'Asia' },
  { id: 'hierarchy', label: 'Hierarchy & Respect for Elders', region: 'Asia' },
  { id: 'harmony', label: 'Social Harmony (Rukun)', region: 'Asia' },
  { id: 'saving_face', label: 'Saving Face (Menjaga reputasi)', region: 'Asia' },
  { id: 'extended_family', label: 'Extended Family Focus', region: 'Asia' },
  
  // Western/Individual
  { id: 'individualism', label: 'Individualism & Independence', region: 'West' },
  { id: 'achievement', label: 'Personal Achievement & Success', region: 'Universal' },
  { id: 'direct_communication', label: 'Direct Communication', region: 'West' },
  
  // Religious/Spiritual
  { id: 'spiritual_practice', label: 'Spiritual/Religious Practice', region: 'Universal' },
  { id: 'tradition', label: 'Tradition & Customs', region: 'Universal' },
  
  // Modern
  { id: 'innovation', label: 'Innovation & Progress', region: 'Universal' },
  { id: 'work_life_balance', label: 'Work-Life Balance', region: 'Universal' },
  { id: 'environmental', label: 'Environmental Consciousness', region: 'Modern' },
] as const;

// AI Context Builder
export function buildPersonalContextPrompt(context: PersonalContext): string {
  const parts: string[] = [];
  
  // Demographics
  if (context.ethnicity) {
    parts.push(`Ethnicity: ${context.ethnicity}${context.ethnicityDetail ? ` (${context.ethnicityDetail})` : ''}`);
  }
  
  if (context.religion) {
    parts.push(`Religion: ${context.religion} (Practice level: ${context.religiousPractice || 'not specified'})`);
  }
  
  parts.push(`Nationality: ${context.nationality}`);
  
  // Birth context
  parts.push(`Birth location: ${context.birthLocation.city}, ${context.birthLocation.country}`);
  
  if (context.birthOrder) {
    const birthOrderLabels = ['', 'First born', 'Second born', 'Third born', 'Fourth born', 'Fifth or later'];
    parts.push(`Birth order: ${birthOrderLabels[context.birthOrder] || context.birthOrder + 'th born'}`);
    if (context.siblingsCount !== undefined) {
      parts.push(`Siblings: ${context.siblingsCount}`);
    }
  }
  
  // Family
  if (context.familyEconomicStatus) {
    parts.push(`Family economic background: ${context.familyEconomicStatus.replace('_', ' ')}`);
  }
  
  if (context.fatherOccupation || context.motherOccupation) {
    parts.push(`Parents occupation: Father ${context.fatherOccupation || 'N/A'}, Mother ${context.motherOccupation || 'N/A'}`);
  }
  
  // Cultural values
  if (context.culturalValues.length > 0) {
    parts.push(`Cultural values: ${context.culturalValues.join(', ')}`);
  }
  
  // Relocation
  if (context.relocationHistory.length > 0) {
    const moves = context.relocationHistory.map(r => 
      `${r.fromCity} → ${r.toCity} (${r.reason})`
    ).join('; ');
    parts.push(`Relocation history: ${moves}`);
  }
  
  // Current life
  parts.push(`Current location: ${context.currentLocation.city}, ${context.currentLocation.country}`);
  parts.push(`Life stage: ${context.currentLifeStage.replace('_', ' ')}`);
  parts.push(`Relationship: ${context.relationshipStatus.replace('_', ' ')}`);
  
  if (context.hasChildren && context.childrenCount !== undefined) {
    parts.push(`Children: ${context.childrenCount}`);
  }
  
  // Career
  if (context.educationLevel) {
    parts.push(`Education: ${context.educationLevel.replace('_', ' ')}${context.fieldOfStudy ? ` in ${context.fieldOfStudy}` : ''}`);
  }
  
  if (context.currentIndustry) {
    parts.push(`Industry: ${context.currentIndustry}`);
  }
  
  return parts.join('\n');
}

// Default empty context
export function createEmptyPersonalContext(): PersonalContext {
  return {
    nationality: '',
    birthLocation: {
      city: '',
      country: '',
    },
    culturalValues: [],
    nativeLanguages: [],
    preferredLanguage: 'id',
    currentLocation: {
      city: '',
      country: '',
      since: new Date(),
    },
    relocationHistory: [],
    currentLifeStage: 'early_career',
    relationshipStatus: 'single',
    hasChildren: false,
    updatedAt: new Date(),
  };
}

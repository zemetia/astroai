# AstroAI Platform - Research Dokumen Lengkap

**Platform:** AstroAI - Astrologi AI untuk Personal & Business  
**Research Date:** 2 Maret 2026  
**Researcher:** Dr. Zemetia  
**Version:** 1.0

---

## DAFTAR ISI

1. [Sistem Astrologi](#1-sistem-astrologi)
2. [Tipe Pembacaan](#2-tipe-pembacaan)
3. [Prompt Engineering Framework](#3-prompt-engineering-framework)
4. [Data Structure](#4-data-structure-needs)
5. [Implementation Guide](#5-implementation-guide)

---

## 1. SISTEM ASTROLOGI

### 1.1 Geodetic Astrology System

#### A. House Calculation Systems

| System | Method | Best Use Case |
|--------|--------|---------------|
| **Placidus** | Time-based division | Most popular in Western astrology, accounts for latitude |
| **Koch** | Time-based with celestial equator | Popular in US, good for mid-latitudes |
| **Equal House** | 30° per house from Ascendant | Simple, works at all latitudes |
| **Whole Sign** | Each sign = one house | Traditional/Hellenistic astrology |
| **Campanus** | Prime vertical division | Medieval/traditional techniques |
| **Regiomontanus** | Celestial equator projection | Historical, horary astrology |
| **Porphyry** | Ecliptic trisection | Oldest quadrant system |
| **Morinus** | Celestial equator-based | Used in Uranian astrology |

**Recommended Default:** Placidus (most widely used)

#### B. House Meanings

| House | Domain | Keywords |
|-------|--------|----------|
| 1st | Self, body, appearance | Identity, approach to life |
| 2nd | Resources, values, money | Income, self-worth, possessions |
| 3rd | Communication, siblings, short trips | Mindset, early education |
| 4th | Home, family, roots | Foundation, private life, mother |
| 5th | Creativity, romance, children | Pleasure, self-expression |
| 6th | Health, work, service | Daily routines, wellness |
| 7th | Partnerships, marriage, clients | One-on-one relationships |
| 8th | Transformation, shared resources | Inheritance, intimacy, death |
| 9th | Higher learning, travel, philosophy | Expansion, beliefs, publishing |
| 10th | Career, status, public image | Achievement, father, authority |
| 11th | Groups, friends, hopes | Community, networking |
| 12th | Hidden, unconscious, spirituality | Seclusion, karma, institutions |

---

### 1.2 Mundane Astrology

Mundane astrology studies world events, nations, and cities through astrological charts.

#### A. Types of Mundane Charts

1. **Ingress Charts** - Sun ingress into cardinal signs (Aries, Cancer, Libra, Capricorn)
2. **Lunation Charts** - New Moon and Full Moon charts
3. **Eclipse Charts** - Solar and lunar eclipses (major events, lasting 6+ months)
4. **Conjunction Charts** - Great Conjunctions (Jupiter-Saturn every 20 years)
5. **Founding/National Charts** - Chart of nation/city founding

#### B. Mundane House Meanings

| House | National Meaning | City Meaning |
|-------|-----------------|--------------|
| 1st | Nation's identity, people | City's character |
| 2nd | National economy, banks | Local economy |
| 10th | Government, leader, prestige | Mayor, city reputation |
| 11th | Parliament, legislation, allies | City council, community groups |

#### C. Planets in Mundane Astrology

| Planet | Signification |
|--------|--------------|
| Sun | Leader, government authority |
| Moon | People, masses, public opinion |
| Mercury | Commerce, communication, transport |
| Mars | War, military, conflicts |
| Jupiter | Prosperity, religion, expansion |
| Saturn | Restriction, austerity |

---

### 1.3 Natal Chart Components

#### A. Planets & Luminaries

| Body | Symbol | Cycle | Meaning |
|------|--------|-------|---------|
| Sun | ☉ | 1 year | Core identity, ego, life force |
| Moon | ☽ | 28 days | Emotions, instincts, needs |
| Mercury | ☿ | 88 days | Mind, communication, analysis |
| Venus | ♀ | 225 days | Love, values, aesthetics |
| Mars | ♂ | 687 days | Action, drive, aggression |
| Jupiter | ♃ | 12 years | Growth, luck, expansion |
| Saturn | ♄ | 29 years | Structure, discipline, limits |
| Uranus | ♅ | 84 years | Innovation, rebellion, sudden change |
| Neptune | ♆ | 165 years | Dreams, illusion, spirituality |
| Pluto | ♇ | 248 years | Power, transformation, deep psyche |

#### B. Zodiac Signs

| Sign | Element | Modality | Ruler | Keywords |
|------|---------|----------|-------|----------|
| Aries ♈ | Fire | Cardinal | Mars | Initiative, courage |
| Taurus ♉ | Earth | Fixed | Venus | Stability, sensuality |
| Gemini ♊ | Air | Mutable | Mercury | Curiosity, communication |
| Cancer ♋ | Water | Cardinal | Moon | Nurturing, protective |
| Leo ♌ | Fire | Fixed | Sun | Creativity, leadership |
| Virgo ♍ | Earth | Mutable | Mercury | Analysis, service |
| Libra ♎ | Air | Cardinal | Venus | Harmony, partnership |
| Scorpio ♏ | Water | Fixed | Pluto/Mars | Intensity, transformation |
| Sagittarius ♐ | Fire | Mutable | Jupiter | Expansion, philosophy |
| Capricorn ♑ | Earth | Cardinal | Saturn | Ambition, discipline |
| Aquarius ♒ | Air | Fixed | Uranus/Saturn | Innovation, humanitarian |
| Pisces ♓ | Water | Mutable | Neptune/Jupiter | Compassion, imagination |

#### C. Aspects (Angular Relationships)

| Aspect | Angle | Orb | Nature | Effect |
|--------|-------|-----|--------|--------|
| Conjunction | 0° | 8° | Neutral | Fusion, focus |
| Sextile | 60° | 6° | Harmonious | Opportunity, ease |
| Square | 90° | 8° | Challenging | Tension, growth |
| Trine | 120° | 8° | Harmonious | Flow, talent |
| Opposition | 180° | 8° | Challenging | Awareness, polarity |
| Quincunx | 150° | 3° | Challenging | Adjustment |

#### D. Aspect Patterns

**Grand Trine (△)** - Three planets trine each other. Natural talent, ease, flow. Risk: complacency.

**T-Square (⊥)** - Two planets oppose, both square a third. Drive, tension, motivation.

**Grand Cross (+)** - Four planets in two oppositions, all square each other. Intense pressure, great potential.

**Yod (Finger of Fate)** - Two planets sextile, both quincunx a third. Fated turning points, special mission.

**Stellium** - 3+ planets in same sign or house. Intense focus, concentration of energy.

---

## 2. TIPE PEMBACAAN

### 2.1 Personal Natal Chart Reading

**Core Identity Analysis:**
- Sun Sign: Core essence and life purpose
- Moon Sign: Emotional needs and instincts  
- Ascendant: First impression, approach to new situations
- Sun-Moon-Ascendant Blend: The trinity of personality

**Major Life Themes:**
- Love & Relationships (Venus, 7th house, 5th house)
- Career & Vocation (10th house, MC, Saturn, Jupiter)
- Wealth & Resources (2nd house, Jupiter, Venus)
- Health & Wellness (6th house, Sun, Moon, Mars)
- Spirituality (9th house, 12th house, Neptune)

### 2.2 Business Astrology

**Business-Planet Correspondences:**
| Planet | Business Role |
|--------|---------------|
| Sun | CEO, brand identity, vision |
| Moon | Customer needs, public response |
| Mercury | Marketing, communication, contracts |
| Venus | Product design, client relations, pricing |
| Mars | Competition, sales drive |
| Jupiter | Growth, expansion, luck |
| Saturn | Structure, long-term planning |
| Uranus | Innovation, disruption, technology |

**Timing for Business Decisions:**
- Incorporation: Strong 2nd/10th, Jupiter aspects
- Product Launch: Prominent Sun/Jupiter, avoid Mercury retrograde
- Hiring: Strong 6th house, Venus/Jupiter
- Funding: Strong 8th/2nd, Pluto/Jupiter

### 2.3 Location/Relocation Astrology (Astro-cartography)

**Angular Lines:**
- **ASC Line:** Personal expression
- **MC Line:** Career, public standing
- **DSC Line:** Relationships
- **IC Line:** Home, roots

**Planetary Line Meanings:**
| Planet | Effect |
|--------|--------|
| Sun | Recognition, leadership |
| Moon | Emotional connection |
| Mercury | Communication, learning |
| Venus | Love, beauty, art |
| Mars | Energy, action, conflict |
| Jupiter | Expansion, luck, growth |
| Saturn | Responsibility, challenges |

### 2.4 Event Astrology (Electional)

**Moon Phases:**
| Phase | Best For |
|-------|----------|
| New Moon | New beginnings, planting seeds |
| Waxing Crescent | Building, developing |
| First Quarter | Action, challenges |
| Full Moon | Culmination, completion |
| Last Quarter | Release, letting go |

**Void of Course Moon:** Avoid starting new ventures.

### 2.5 Relationship Analysis

**Synastry (Chart Comparison):**
- Sun-Sun: Core compatibility
- Moon-Moon: Emotional compatibility
- Venus-Mars: Sexual chemistry, attraction
- Mercury-Mercury: Communication ease

**Composite Chart:** Single chart from midpoints of two natal charts. Represents the relationship as a third entity.

---

## 3. PROMPT ENGINEERING FRAMEWORK

### 3.1 Core Principles

1. **Use Correct Astronomical Data** - Precise planet positions, accurate house cusps
2. **Respect Astrological Tradition** - Acknowledge multiple schools
3. **Layer Interpretations** - Sign → House → Aspect → Pattern
4. **Balance Technique with Intuition** - Provide technical basis, avoid fatalistic language

### 3.2 Actionability Requirements

Every interpretation should include:
1. **What it means** (symbolic interpretation)
2. **How it manifests** (practical examples)
3. **What to do** (actionable guidance)
4. **When to expect** (timing indicators)

### 3.3 Personalization Framework

```
PERSONALIZATION VARIABLES:
├── Life Stage (age bracket)
├── Cultural Context (Eastern/Western/Blended)
├── Gender Expression
├── Primary Concern (love/career/health/spirituality)
├── Previous Astrology Knowledge
└── Reading Tone (supportive/direct/mystical/practical)
```

### 3.4 Prompt Templates

#### Personal User Template
```markdown
## Chart Data
- Name: {name}
- Birth Date: {date}
- Birth Time: {time}
- Birth Location: {location}
- Current Age: {age}
- Focus Area: {primary_concern}

## Reading Request
1. Core Identity (Sun, Moon, Ascendant)
2. {Primary_Concern} Analysis
3. Strengths & Challenges
4. Current Transits
5. Actionable Guidance

## Tone
Empathetic, empowering, mix of spiritual and practical.
Avoid fatalistic language ("you will" → "you may").
```

#### Business User Template
```markdown
## Business Chart Data
- Business Name: {business_name}
- Industry: {industry}
- Incorporation Date: {date}
- Current Phase: {startup/growth/mature}

## Reading Request
1. Business Identity & Brand
2. Financial Analysis
3. Operations & Team
4. Partnership & Clients
5. Strategic Timing (12 months)
6. Action Plan

## Tone
Professional, strategic, data-informed, action-oriented.
```

#### Relationship Synastry Template
```markdown
## Person A & B Data
- Names, birth data, relationship type, main concern

## Reading Request
1. Attraction & Connection
2. Communication Dynamics
3. Emotional Connection
4. Conflict & Tension
5. Growth & Purpose
6. Long-term Potential
7. Practical Guidance

## Tone
Compassionate, balanced, non-judgmental, empowering.
```

---

## 4. DATA STRUCTURE NEEDS

### Natal Chart Data Model

```typescript
interface NatalChart {
  id: string;
  userId: string;
  name: string;
  birthDate: Date;
  birthTime: string;
  birthLocation: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  houseSystem: 'placidus' | 'koch' | 'equal' | 'whole';
  planets: PlanetPosition[];
  houses: HouseCusp[];
  aspects: Aspect[];
  patterns: AspectPattern[];
  createdAt: Date;
}

interface PlanetPosition {
  planet: string; // 'sun' | 'moon' | 'mercury' | ...
  sign: string;   // 'aries' | 'taurus' | ...
  degree: number; // 0-29.99
  minute: number;
  house: number;  // 1-12
  isRetrograde: boolean;
}

interface HouseCusp {
  house: number;  // 1-12
  sign: string;
  degree: number;
}

interface Aspect {
  planet1: string;
  planet2: string;
  aspectType: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition';
  orb: number;
  isApplying: boolean;
}

interface AspectPattern {
  patternType: 'grand_trine' | 't_square' | 'grand_cross' | 'yod' | 'stellium';
  planets: string[];
  description: string;
}
```

### AI Interpretation Output Structure

```typescript
interface ChartReading {
  chartId: string;
  readingType: 'personal' | 'business' | 'relationship' | 'relocation';
  sections: ReadingSection[];
  summary: string;
  keyTakeaways: string[];
  actionableGuidance: string[];
  generatedAt: Date;
}

interface ReadingSection {
  title: string;
  content: string;
  highlights: string[];
  practicalTips: string[];
}
```

---

## 5. IMPLEMENTATION GUIDE

### 5.1 Chart Calculation Engine

**Library Options:**
- **Swiss Ephemeris** (most accurate, C library with JS bindings)
- **Astro-Seek API** (cloud-based)
- **Ephemeris** (npm package, lighter weight)

**Required Calculations:**
- Planet positions for any date/time/location
- House cusps (multiple systems)
- Aspect calculations with orbs
- Aspect pattern detection

### 5.2 AI Integration Pipeline

```
User Input → Chart Calculation → Data Structuring → 
Prompt Selection → AI Generation → Output Formatting → Display/Save
```

### 5.3 Reading Types to Support

1. **Personal Natal Chart** (Free tier)
2. **Detailed Personal Analysis** (Premium)
3. **Business Astrology** (Premium)
4. **Relationship Synastry** (Premium)
5. **Relocation Analysis** (Pro)
6. **Electional Timing** (Pro)

---

## 6. KEY INSIGHTS FOR DEVELOPMENT

### 6.1 Differentiation Factors
- **Structured Output:** Data terstruktur, bukan teks panjang
- **Multiple Reading Types:** Personal, Business, Location, Event
- **AI-Powered:** Interpretasi personal dan actionable
- **Save & Compare:** History dan analisis perbandingan

### 6.2 Technical Challenges
- Accurate ephemeris calculation
- Timezone handling
- House system accuracy at extreme latitudes
- AI prompt optimization for consistent quality

### 6.3 Business Model
- Freemium: Basic natal chart free
- Premium: Detailed readings, business astrology
- Pro: Relocation, electional, relationship analysis
- Subscription tiers with monthly/annual options

---

*Research completed by Dr. Zemetia for AstroAI Platform*

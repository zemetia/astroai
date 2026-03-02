# Natal Chart Calculation API Research

> Research Date: March 2026
> Purpose: Evaluasi API/service untuk AstroAI - Generate data Natal Chart detail seperti astro-seek.com

---

## Executive Summary

Berdasarkan research, ada beberapa pendekatan untuk menghasilkan data Natal Chart:

1. **Self-Hosted Libraries** (Recommended untuk AstroAI) - Swiss Ephemeris sebagai gold standard
2. **Commercial APIs** - AstrologyAPI/VedicRishi, Prokerala
3. **JavaScript/Node.js Libraries** - Untuk client-side atau server-side JS

**Rekomendasi Utama:** Gunakan **Swiss Ephemeris** via Node.js bindings (`swisseph` atau `ephemeris` npm packages) untuk kontrol penuh dan akurasi tertinggi tanpa dependency external API.

---

## 1. API/SERVICE LIST

### 1.1 Swiss Ephemeris (Self-Hosted) ⭐ RECOMMENDED

**Overview:**
- **Type:** C Library dengan bindings untuk berbagai bahasa
- **Developer:** Dieter Koch & Alois Treindl (Astrodienst AG)
- **Base Data:** NASA JPL DE431 Ephemeris
- **Precision:** 0.001 arcseconds
- **Time Range:** 13,201 BC to AD 17,191

**Features:**
- ✅ Semua planet (Sun - Pluto)
- ✅ Chiron, North Node (Mean & True)
- ✅ Asteroids (380,000+ numbered asteroids)
- ✅ House cusps (Placidus, Koch, Equal, Whole Sign, dll)
- ✅ Aspects calculation
- ✅ Transit calculations
- ✅ Astro-cartography support
- ✅ Fixed stars (sefstars.txt)
- ✅ Planetary moons

**Available Bindings:**
| Language | Package/Repo |
|----------|--------------|
| C/C++ | Native - github.com/aloistr/swisseph |
| Node.js | `swisseph` (npm) |
| Java | th-mack.de/international/download/ |
| PHP | github.com/cyjoelchen/php-sweph |
| Perl | github.com/aloistr/perl-sweph |
| Python | `pyswisseph` (PyPI) |

**Licensing:**
- **Free/Open Source:** GNU AGPL (requires your project also AGPL)
- **Commercial:** Swiss Ephemeris Professional License (contact Astrodienst)

**Pricing:**
- Free for open source projects (AGPL)
- Professional License: Contact Astrodienst AG (astro.ch)

**Rate Limits:** None (self-hosted)

---

### 1.2 AstrologyAPI (VedicRishi) - Western & Vedic

**Overview:**
- **Type:** REST API (JSON)
- **Provider:** VedicRishi/AstrologyAPI
- **Website:** astrologyapi.com

**Features:**
- ✅ Natal Chart (Wheel Chart)
- ✅ Planet Positions
- ✅ House Cusps
- ✅ Aspects
- ✅ Transits
- ✅ Synastry (Compatibility)
- ✅ Solar Return
- ✅ Daily/Monthly/Yearly Horoscopes
- ✅ PDF Reports (Premium)
- ✅ Vedic & Western Astrology

**Limitations:**
- ❌ Limited customization
- ❌ Rate limited
- ❌ Ongoing subscription cost

**Pricing (approximate):**
- Free Trial available
- Monthly subscriptions tiered by call volume
- Western Astrology: $X - $XX/month (exact pricing requires contact)
- Vedic Astrology: Similar pricing
- PDF API: Separate pricing

**Rate Limits:**
- Based on subscription tier
- Typically 1,000 - 100,000+ calls/month

---

### 1.3 Prokerala Astrology API

**Overview:**
- **Type:** REST API
- **Provider:** Prokerala
- **Website:** prokerala.com

**Features:**
- ✅ Natal Chart
- ✅ Panchang (Vedic)
- ✅ Kundli
- ✅ Horoscope matching
- ✅ Daily predictions

**Limitations:**
- ❌ Primarily Vedic-focused
- ❌ Limited Western astrology features

**Pricing:**
- Free tier available
- Paid tiers for higher volume

---

### 1.4 JavaScript Libraries (Client/Server Side)

#### 1.4.1 `ephemeris` by mivion
- **Repo:** github.com/mivion/ephemeris
- **Type:** Pure JavaScript
- **Features:**
  - Sun, Moon, planets
  - Comets, asteroids, stars
  - Position calculations
- **License:** Unknown (check repo)

**Example Usage:**
```javascript
var date = {year: 1986, month: 1, day: 1, hours: 1, minutes: 52, seconds: 0};
$const.tlong = -71.10; // longitude
$const.glat = 42.37;   // latitude
$processor.init();
var body = $moshier.body.sun;
$processor.calc(date, body);
console.log(body.position);
```

#### 1.4.2 `swisseph` (Node.js bindings)
- **Package:** `swisseph` on npm
- **Type:** Node.js native addon
- **Features:** Full Swiss Ephemeris via Node.js
- **License:** AGPL/Commercial

---

### 1.5 Open Source Alternatives on GitHub

| Repo | Language | Features | Status |
|------|----------|----------|--------|
| aloistr/swisseph | C | Full ephemeris | Active |
| mivion/ephemeris | JavaScript | Basic ephemeris | Archived |
| timotejroiko/astrologico | TypeScript | Chart calculations | Check status |
| Astron/Astronomia | JavaScript | Astronomical calc | Archived |

---

## 2. FEATURE COMPARISON MATRIX

| Feature | Swiss Ephemeris | AstrologyAPI | Prokerala | JS Libraries |
|---------|-----------------|--------------|-----------|--------------|
| **Planet Positions** | ✅ All + asteroids | ✅ All major | ✅ All major | ⚠️ Limited |
| **Sun/Moon** | ✅ | ✅ | ✅ | ✅ |
| **Mercury-Pluto** | ✅ | ✅ | ✅ | ✅ |
| **Chiron** | ✅ | ✅ | ❓ | ❌ |
| **North Node** | ✅ Mean & True | ✅ | ✅ | ⚠️ |
| **Lilith** | ✅ | ✅ | ✅ | ❌ |
| **House Systems** | | | | |
| - Placidus | ✅ | ✅ | ✅ | ❌ |
| - Koch | ✅ | ✅ | ❓ | ❌ |
| - Equal | ✅ | ✅ | ❓ | ❌ |
| - Whole Sign | ✅ | ✅ | ✅ | ❌ |
| - Others (10+) | ✅ | ⚠️ | ⚠️ | ❌ |
| **Aspects** | ✅ Full calc | ✅ Pre-calculated | ✅ | ❌ |
| **Aspect Patterns** | ⚠️ DIY | ❌ | ❌ | ❌ |
| **Astro-cartography** | ✅ | ❌ | ❌ | ❌ |
| **Transits** | ✅ | ✅ | ✅ | ⚠️ |
| **Progressions** | ✅ | ⚠️ | ⚠️ | ❌ |
| **Fixed Stars** | ✅ | ❌ | ❌ | ⚠️ |
| **Asteroids** | ✅ 380k+ | ❌ | ❌ | ❌ |
| **Precision** | ⭐ 0.001" | ⚠️ Good | ⚠️ Good | ⚠️ Moderate |
| **Time Range** | 13k BC - 17k AD | Limited | Limited | Limited |
| **Self-hosted** | ✅ | ❌ | ❌ | ✅ |
| **Offline capable** | ✅ | ❌ | ❌ | ✅ |
| **Customizable** | ⭐ Full | ❌ Limited | ❌ Limited | ⚠️ |

**Legend:**
- ✅ = Full Support
- ⚠️ = Partial/Limited
- ❌ = Not Available
- ❓ = Unknown

---

## 3. PRICING & RATE LIMITS

### Swiss Ephemeris
| Usage Type | Cost | Notes |
|------------|------|-------|
| Open Source (AGPL) | **FREE** | Must release your code as AGPL |
| Commercial License | Contact Astrodienst | One-time or recurring fee |
| Hosting | Your server cost | ~100MB for planet files |

### AstrologyAPI
| Plan | Calls/Month | Price (est.) |
|------|-------------|--------------|
| Trial | Limited | Free |
| Basic | ~1,000 | $X |
| Pro | ~10,000 | $XX |
| Enterprise | 100,000+ | Custom |

### Prokerala
| Plan | Calls/Month | Price |
|------|-------------|-------|
| Free | Limited | Free |
| Paid | Various | Check website |

### JavaScript Libraries
| Library | License | Cost |
|---------|---------|------|
| ephemeris (mivion) | Unknown | Free |
| swisseph (npm) | AGPL | Free (with AGPL) |

---

## 4. REKOMENDASI UNTUK ASTROAI

### 4.1 Recommended Approach: Swiss Ephemeris + Node.js

**Architecture:**
```
AstroAI Backend
├── Swiss Ephemeris (C Library)
│   └── Node.js Bindings (swisseph npm)
├── Aspect Calculator (Custom JS)
├── Pattern Detector (Custom JS)
└── Astro-cartography (Custom JS using SE)
```

**Alasan:**
1. **Akurasi Tertinggi** - NASA JPL precision (0.001 arcsec)
2. **No Rate Limits** - Self-hosted
3. **No Ongoing Costs** - Free with AGPL
4. **Full Control** - Kustomisasi house systems, orbs, algorithms
5. **Future-proof** - Tidak bergantung pada vendor external
6. **Coverage Lengkap** - Semua planet, asteroid, fixed stars

### 4.2 Implementation Plan

**Phase 1: Basic Natal Chart**
```javascript
const sweph = require('swisseph');

// Set ephemeris path
sweph.swe_set_ephe_path('./ephe');

// Calculate planet positions
const julday = sweph.swe_julday(2024, 3, 15, 12.5, sweph.SE_GREG_CAL);
const result = sweph.swe_calc_ut(julday, sweph.SE_SUN, sweph.SEFLG_SPEED);
// result.longitude, result.latitude, result.speed
```

**Phase 2: House Cusps**
```javascript
// Calculate houses (Placidus system)
const houses = sweph.swe_houses_ex(
  julday,
  sweph.SEFLG_SIDEREAL,
  latitude,
  longitude,
  'P' // 'P' = Placidus, 'K' = Koch, 'E' = Equal, 'W' = Whole Sign
);
```

**Phase 3: Aspects**
- Implement custom aspect calculator menggunakan planet positions
- Support major aspects: Conjunction (0°), Sextile (60°), Square (90°), Trine (120°), Opposition (180°)
- Customizable orbs

**Phase 4: Aspect Patterns**
- Detect Grand Trine, T-Square, Yod, Stellium, Grand Cross, dll

**Phase 5: Astro-cartography**
- Calculate planetary lines menggunakan sweph.swe_gauquelin_sector()
- Relocation chart support

**Phase 6: Transits**
- Calculate current planet positions vs natal positions
- Transit timing dengan sweph.swe_solcross(), swe_mooncross()

### 4.3 Alternative: Hybrid Approach

Jika development time terbatas:

1. **MVP:** Gunakan AstrologyAPI untuk rapid prototyping
2. **Production:** Migrate ke Swiss Ephemeris self-hosted
3. **Backup:** Keep API account untuk redundancy

---

## 5. EXAMPLE RESPONSE FORMATS

### 5.1 Swiss Ephemeris (Direct Output)

```javascript
// Planet Calculation Result
{
  longitude: 165.4738291,    // Longitude in degrees (0-360)
  latitude: -0.0001247,      // Latitude in degrees
  distance: 0.9876543,       // Distance in AU
  speedLong: 1.0234567,      // Daily speed in longitude (deg/day)
  speedLat: 0.0001234,       // Daily speed in latitude
  speedDist: -0.0002345      // Daily speed in distance
}

// House Calculation Result
{
  houses: [
    45.1234567,  // House 1 cusp
    78.2345678,  // House 2 cusp
    // ... House 3-12
  ],
  ascendant: 45.1234567,
  mc: 123.4567890,
  armc: 123.9876543,
  vertex: 234.5678901,
  equatorialAscendant: 46.7890123,
  kochCoAscendant: 47.8901234,
  munkaseyCoAscendant: 48.9012345,
  munkaseyPolarAscendant: 49.0123456
}
```

### 5.2 AstroAI Target Format (Suggested)

```json
{
  "chart": {
    "datetime": "2024-03-15T12:30:00Z",
    "location": {
      "latitude": -6.2088,
      "longitude": 106.8456,
      "timezone": "Asia/Jakarta",
      "place_name": "Jakarta"
    },
    "house_system": "Placidus"
  },
  "planets": {
    "Sun": {
      "longitude": 165.47,
      "latitude": -0.0001,
      "sign": "Virgo",
      "sign_degree": 15.47,
      "house": 6,
      "retrograde": false,
      "speed": 1.02
    },
    "Moon": { /* ... */ },
    "Mercury": { /* ... */ },
    "Venus": { /* ... */ },
    "Mars": { /* ... */ },
    "Jupiter": { /* ... */ },
    "Saturn": { /* ... */ },
    "Uranus": { /* ... */ },
    "Neptune": { /* ... */ },
    "Pluto": { /* ... */ },
    "Chiron": { /* ... */ },
    "NorthNode": { /* ... */ }
  },
  "houses": {
    "1": { "cusp": 45.12, "sign": "Taurus" },
    "2": { "cusp": 78.23, "sign": "Gemini" },
    "3": { "cusp": 105.67, "sign": "Cancer" },
    "4": { "cusp": 135.89, "sign": "Leo" },
    "5": { "cusp": 168.45, "sign": "Virgo" },
    "6": { "cusp": 198.76, "sign": "Libra" },
    "7": { "cusp": 225.12, "sign": "Scorpio" },
    "8": { "cusp": 258.23, "sign": "Sagittarius" },
    "9": { "cusp": 285.67, "sign": "Capricorn" },
    "10": { "cusp": 315.89, "sign": "Aquarius" },
    "11": { "cusp": 348.45, "sign": "Pisces" },
    "12": { "cusp": 18.76, "sign": "Aries" }
  },
  "angles": {
    "ASC": 45.12,
    "MC": 315.89,
    "DSC": 225.12,
    "IC": 135.89
  },
  "aspects": [
    {
      "planet1": "Sun",
      "planet2": "Moon",
      "aspect": "Trine",
      "angle": 120.5,
      "orb": 0.5,
      "applying": true
    }
  ],
  "patterns": [
    {
      "type": "Grand Trine",
      "planets": ["Sun", "Mars", "Jupiter"],
      "element": "Fire"
    }
  ]
}
```

---

## 6. TECHNICAL NOTES

### 6.1 Swiss Ephemeris Setup

**Installation:**
```bash
# Install Node.js bindings
npm install swisseph

# Download ephemeris files
# From: https://github.com/aloistr/swisseph/tree/master/ephe
# Required files: sepl_18.se1, semo_18.se1, seas_18.se1 (for planets)
# Optional: sefstars.txt (fixed stars)
```

**Body Numbers (swephexp.h):**
```c
#define SE_SUN              0
#define SE_MOON             1
#define SE_MERCURY          2
#define SE_VENUS            3
#define SE_MARS             4
#define SE_JUPITER          5
#define SE_SATURN           6
#define SE_URANUS           7
#define SE_NEPTUNE          8
#define SE_PLUTO            9
#define SE_MEAN_NODE       10
#define SE_TRUE_NODE       11
#define SE_CHIRON          15
```

**House System Codes:**
- `'P'` = Placidus
- `'K'` = Koch
- `'O'` = Porphyrius
- `'R'` = Regiomontanus
- `'C'` = Campanus
- `'A'` = Equal (cusp 1 = ASC)
- `'E'` = Equal
- `'V'` = Vehlow equal
- `'W'` = Whole Sign

### 6.2 Aspect Orb Recommendations

| Aspect | Angle | Default Orb | Tight Orb |
|--------|-------|-------------|-----------|
| Conjunction | 0° | 8° | 5° |
| Semi-Sextile | 30° | 2° | 1° |
| Semi-Square | 45° | 2° | 1° |
| Sextile | 60° | 6° | 3° |
| Quintile | 72° | 2° | 1° |
| Square | 90° | 8° | 5° |
| Trine | 120° | 8° | 5° |
| Sesquiquadrate | 135° | 2° | 1° |
| BiQuintile | 144° | 2° | 1° |
| Quincunx | 150° | 2° | 1° |
| Opposition | 180° | 8° | 5° |

---

## 7. CONCLUSION & NEXT STEPS

### Final Recommendation

**Gunakan Swiss Ephemeris dengan Node.js bindings** untuk AstroAI karena:

1. **Highest Accuracy** - 0.001 arcsecond precision
2. **Full Feature Coverage** - Semua requirements terpenuhi
3. **Cost Effective** - Free (AGPL) atau one-time commercial license
4. **No External Dependencies** - Self-hosted
5. **Proven & Battle-tested** - Digunakan oleh astro.com dan software astrologi mayoritas

### Implementation Roadmap

```
Week 1-2: Setup Swiss Ephemeris + basic planet positions
Week 3-4: House calculation (all systems)
Week 5-6: Aspect calculation engine
Week 7-8: Aspect pattern detection
Week 9-10: Astro-cartography
Week 11-12: Transit calculations
Week 13+: Integration & optimization
```

### Resources

- **Swiss Ephemeris:** https://www.astro.com/swisseph/
- **GitHub:** https://github.com/aloistr/swisseph
- **Node.js Bindings:** https://www.npmjs.com/package/swisseph
- **Programming Guide:** https://www.astro.com/swisseph/swephprg.htm
- **Mailing List:** https://groups.io/g/swisseph

---

*Document created for AstroAI Project - March 2026*

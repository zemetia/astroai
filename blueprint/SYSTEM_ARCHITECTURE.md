# AstroAI Platform - System Architecture

**Version:** 1.0  
**Stack:** Next.js 15 + Prisma 6 + PostgreSQL + OpenAI/Claude + Swiss Ephemeris  
**Date:** 2 Maret 2026

---

## 1. OVERVIEW

AstroAI adalah platform astrologi AI yang menghasilkan pembacaan Natal Chart, analisis hubungan, relocation, dan prediksi berbasis astrologi geodetic & mundane.

### Core Features
- Natal Chart AI Reading (Personal & Business)
- Relationship Analysis (Synastry/Composite)
- Relocation Astrology (Astro-cartography)
- Event Astrology (Electional timing)
- Google OAuth + Subscription System
- Save & History dengan Prisma.js

---

## 2. SYSTEM ARCHITECTURE

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Next.js    │  │  React Query │  │   Zustand    │      │
│  │   App Router │  │  (TanStack)  │  │    Stores    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS/JSON
┌──────────────────────────▼──────────────────────────────────┐
│                      API LAYER                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Next.js API Routes                        │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │   │
│  │  │   /charts   │ │  /readings  │ │/subscriptions│     │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘     │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │   │
│  │  │  /payments  │ │   /user     │ │  /webhooks  │     │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘     │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   SERVICE LAYER                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │   NextAuth   │ │   AI Engine  │ │   Payment    │        │
│  │   (OAuth)    │ │(OpenAI/Claude)│ │ (Midtrans)   │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │   Swiss      │ │   Ephemeris  │ │   Chart      │        │
│  │  Ephemeris   │ │   Calculation│ │   Service    │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   DATA LAYER                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              PostgreSQL (Prisma ORM)                   │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │ │
│  │  │    Users    │ │   Charts    │ │  Readings   │      │ │
│  │  └─────────────┘ └─────────────┘ └─────────────┘      │ │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │ │
│  │  │Subscriptions│ │  Payments   │ │Audit Logs   │      │ │
│  │  └─────────────┘ └─────────────┘ └─────────────┘      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Tech Stack Detail

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 (App Router) | React framework dengan SSR/SSG |
| **Styling** | Tailwind CSS + shadcn/ui | Utility-first CSS + component library |
| **State Management** | Zustand + TanStack Query | Global state + server state |
| **Backend** | Next.js API Routes | REST API endpoints |
| **Database** | PostgreSQL 15+ | Primary data store |
| **ORM** | Prisma 6 | Database access & migrations |
| **Auth** | NextAuth.js v5 | OAuth (Google) + Credentials |
| **AI** | OpenAI GPT-4 / Claude 3 | Chart interpretation |
| **Ephemeris** | Swiss Ephemeris (swisseph) | Astronomical calculations |
| **Payment** | Midtrans / Xendit | Indonesian payment gateway |
| **Hosting** | Vercel (Frontend) + Railway (DB) | Production deployment |

---

## 3. CORE MODULES

### 3.1 Authentication Module

**Responsibilities:**
- User registration/login (email & OAuth)
- Session management (JWT)
- Password reset flow
- Account verification

**Key Components:**
- `NextAuth.js` configuration
- JWT token handling
- Password hashing (bcrypt)
- Email verification

### 3.2 Chart Module

**Responsibilities:**
- Natal chart calculation
- House system support (Placidus, Koch, Equal, Whole Sign)
- Planet positions
- Aspect calculations
- Pattern detection (Grand Trine, T-Square, Yod, dll)

**Integration:**
- Swiss Ephemeris via `swisseph` npm package
- Geocoding untuk lokasi (Google Maps API)
- Timezone handling (geo-tz)

### 3.3 AI Reading Module

**Responsibilities:**
- Generate AI interpretations
- Prompt management per reading type
- Response parsing & structuring
- Rate limiting & token management

**Reading Types:**
1. **Personal Natal** - Karakter, potensi, life path
2. **Business Analysis** - Company founding chart, timing
3. **Relationship Synastry** - Chart comparison
4. **Relocation Analysis** - Astro-cartography
5. **Electional Timing** - Event planning
6. **Transit Forecast** - Predictions

### 3.4 Subscription Module

**Tiers:**
| Tier | Price | Features |
|------|-------|----------|
| **FREE** | Rp 0 | 3 charts, 1 reading/month |
| **PREMIUM** | Rp 99.000/bulan | 10 charts, 10 readings/month |
| **PRO** | Rp 299.000/bulan | Unlimited, all reading types, astro-cartography |

**Features:**
- Plan management
- Usage tracking
- Upgrade/downgrade
- Cancel at period end

### 3.5 Payment Module

**Responsibilities:**
- Process payments (Midtrans/Xendit)
- Invoice generation
- Webhook handling
- Refund processing

**Payment Methods:**
- Credit/Debit Card
- Virtual Account (BCA, Mandiri, BNI, BRI)
- E-Wallet (GoPay, OVO, DANA, LinkAja)
- QRIS

---

## 4. DATA FLOW

### 4.1 Chart Creation Flow

```
User Input Birth Data
        ↓
Validate & Geocode Location
        ↓
Calculate Chart (Swiss Ephemeris)
        ↓
Store in Database (Prisma)
        ↓
Return Chart Data + Visualization
```

### 4.2 AI Reading Generation Flow

```
Select Chart + Reading Type
        ↓
Check Subscription Limits
        ↓
Build Prompt (Template + Chart Data)
        ↓
Call AI API (OpenAI/Claude)
        ↓
Parse & Structure Response
        ↓
Save Reading to Database
        ↓
Display to User
```

### 4.3 Payment Flow

```
Select Plan
        ↓
Create Subscription Record
        ↓
Generate Payment Token (Midtrans)
        ↓
Redirect to Payment Page
        ↓
Payment Webhook
        ↓
Activate Subscription
        ↓
Send Confirmation Email
```

---

## 5. SECURITY ARCHITECTURE

### 5.1 Authentication Security
- JWT dengan httpOnly cookies
- CSRF protection (SameSite=Lax)
- Password hashing (bcrypt, 12 rounds)
- Rate limiting login (5 attempts/15 min)
- Session timeout (30 days)

### 5.2 API Security
- Rate limiting per endpoint
- API key untuk internal services
- Input validation (Zod)
- SQL injection prevention (Prisma parameterized queries)

### 5.3 Data Security
- Encryption at rest (PostgreSQL TDE)
- Encryption in transit (TLS 1.3)
- Sensitive data encryption (birth dates)
- Backup encryption

### 5.4 Privacy
- GDPR compliance (data export/delete)
- Data retention policy
- Consent management
- Privacy policy

---

## 6. SCALABILITY CONSIDERATIONS

### 6.1 Horizontal Scaling
- Stateless API design
- Database connection pooling
- Redis untuk session caching (opsional)

### 6.2 Performance
- Chart calculation caching (Redis)
- AI response caching untuk similar charts
- CDN untuk static assets (Vercel Edge)
- Image optimization (Next.js Image)

### 6.3 Database Optimization
- Indexing pada foreign keys
- Partitioning untuk large tables (readings)
- Connection pooling (PgBouncer)

---

## 7. MONITORING & LOGGING

### 7.1 Application Monitoring
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- Uptime monitoring (UptimeRobot)

### 7.2 Business Metrics
- Daily active users
- Chart creation rate
- AI reading generation rate
- Subscription conversion rate
- Payment success rate

### 7.3 Audit Logging
- User actions (create, update, delete)
- Payment transactions
- Admin actions

---

## 8. DEPLOYMENT ARCHITECTURE

### 8.1 Production Setup

```
┌─────────────────────────────────────────────┐
│              Vercel Edge Network            │
│         (Global CDN + API Routes)           │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│           Railway.app (PostgreSQL)          │
│              Primary Database               │
└─────────────────────────────────────────────┘
```

### 8.2 Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="https://astroai.id"
NEXTAUTH_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# AI
OPENAI_API_KEY="..."
ANTHROPIC_API_KEY="..."

# Payment
MIDTRANS_SERVER_KEY="..."
MIDTRANS_CLIENT_KEY="..."
XENDIT_API_KEY="..."

# Ephemeris
EPHEMERIS_PATH="./ephemeris/files"
```

---

## 9. EXTERNAL INTEGRATIONS

### 9.1 Swiss Ephemeris (swisseph)
- **Purpose:** Accurate astronomical calculations
- **Accuracy:** 0.001 arcseconds
- **Coverage:** 13,201 BC to AD 17,191
- **Self-hosted:** Yes (no external API dependency)

### 9.2 Geocoding
- **Provider:** Google Maps Geocoding API
- **Purpose:** Convert location names to lat/long
- **Caching:** Redis (24 hours)

### 9.3 AI Providers
- **Primary:** OpenAI GPT-4
- **Fallback:** Anthropic Claude 3
- **Rate limiting:** Tier-based

### 9.4 Payment Gateways
- **Primary:** Midtrans
- **Secondary:** Xendit
- **Webhooks:** Secure endpoint dengan signature verification

---

## 10. FUTURE CONSIDERATIONS

### 10.1 Potential Enhancements
- Mobile app (React Native)
- Push notifications
- Social features (chart sharing community)
- Advanced AI models (fine-tuned astrology model)
- Vedic astrology support
- Chinese astrology integration

### 10.2 Scaling Challenges
- AI costs at scale (consider caching strategies)
- Database size (chart history archiving)
- Real-time features (WebSocket untuk live readings)

---

*System Architecture for AstroAI Platform*

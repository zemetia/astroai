# AstroAI Platform - Security Considerations

**Version:** 1.0  
**Date:** 2 Maret 2026  
**Classification:** Internal Security Document

---

## 1. AUTHENTICATION & SESSION MANAGEMENT

### 1.1 NextAuth.js Configuration

```typescript
// lib/auth/auth.config.ts
export const authConfig = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update every 24 hours
  },
  
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
    secret: process.env.JWT_SECRET,
  },
  
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
};
```

### 1.2 Password Security
- bcrypt dengan 12 salt rounds
- Minimum 8 karakter, complexity requirements
- Password reset token: 1 hour expiry
- No password reuse (history 5 passwords)

### 1.3 Session Security
- HttpOnly cookies
- SameSite=Lax untuk CSRF protection
- Secure flag untuk HTTPS-only
- Max 5 concurrent sessions per user
- Automatic logout after 30 days inactivity

---

## 2. AUTHORIZATION & RBAC

### 2.1 Role Hierarchy
- `USER` - Basic access
- `PREMIUM` - Premium features
- `PRO` - All features
- `ADMIN` - Admin panel access
- `SUPPORT` - Customer support tools

### 2.2 Permission Checks
```typescript
// Middleware untuk API routes
export async function checkPermission(
  userId: string,
  action: string,
  resource: string
): Promise<boolean> {
  const user = await getUserWithRole(userId);
  const permissions = await getRolePermissions(user.role);
  return permissions.some(p => 
    p.action === action && p.resource === resource
  );
}
```

---

## 3. DATA PROTECTION

### 3.1 Encryption at Rest
- PostgreSQL dengan Transparent Data Encryption (TDE)
- Sensitive fields (birth dates) di-encrypt sebelum save
- AES-256 untuk field-level encryption

### 3.2 Encryption in Transit
- TLS 1.3 minimum
- HSTS header
- Certificate pinning untuk mobile apps

### 3.3 API Security
```typescript
// Rate limiting
export const rateLimit = {
  free: { requests: 10, window: 60000 },    // 10 req/min
  premium: { requests: 60, window: 60000 }, // 60 req/min
  pro: { requests: 120, window: 60000 },    // 120 req/min
};

// Input validation dengan Zod
const chartSchema = z.object({
  birthDate: z.string().datetime(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});
```

---

## 4. PRIVACY & COMPLIANCE

### 4.1 GDPR Compliance
- Right to data export (JSON/CSV download)
- Right to erasure (account deletion)
- Consent tracking
- Data retention policy (delete after 2 years inactive)

### 4.2 Data Minimization
- Hanya collect data yang necessary
- Optional fields clearly marked
- No sensitive data in logs

### 4.3 Audit Logging
```typescript
// lib/db/audit.ts
export async function logAudit({
  userId,
  action,
  resource,
  resourceId,
  changes,
  ipAddress,
  userAgent,
}: AuditLogParams) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      resource,
      resourceId,
      oldValue: changes?.old,
      newValue: changes?.new,
      ipAddress,
      userAgent: userAgent?.slice(0, 255),
    },
  });
}
```

---

## 5. PAYMENT SECURITY

### 5.1 PCI Compliance
- No card data stored locally (tokenization via Midtrans/Xendit)
- Webhook signature verification
- HTTPS-only payment pages

### 5.2 Webhook Security
```typescript
// app/api/webhooks/midtrans/route.ts
export async function POST(req: Request) {
  const signature = req.headers.get('x-signature');
  const body = await req.text();
  
  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha512', process.env.MIDTRANS_SERVER_KEY)
    .update(body)
    .digest('hex');
  
  if (signature !== expectedSignature) {
    return new Response('Invalid signature', { status: 401 });
  }
  
  // Process webhook
  const payload = JSON.parse(body);
  await processPaymentWebhook(payload);
  
  return new Response('OK', { status: 200 });
}
```

---

## 6. AI SECURITY

### 6.1 Prompt Injection Prevention
- Input sanitization sebelum masuk ke prompt
- Structured output dengan JSON mode
- Rate limiting per user

### 6.2 API Key Management
- Keys stored di environment variables
- Separate keys untuk dev/staging/prod
- Regular key rotation (quarterly)

---

## 7. INFRASTRUCTURE SECURITY

### 7.1 Environment Variables
```bash
# Required security-related env vars
JWT_SECRET=<256-bit-random-string>
ENCRYPTION_KEY=<32-byte-hex-key>
DATABASE_URL=<encrypted-connection-string>
NEXTAUTH_SECRET=<256-bit-random-string>
```

### 7.2 CORS Policy
```typescript
// next.config.js
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Credentials', value: 'true' },
        { key: 'Access-Control-Allow-Origin', value: process.env.ALLOWED_ORIGIN },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
        { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
      ],
    },
  ];
}
```

### 7.3 Security Headers
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
  );
  
  return response;
}
```

---

## 8. INCIDENT RESPONSE

### 8.1 Security Incident Levels
1. **LOW** - Minor issue, no data exposure
2. **MEDIUM** - Potential vulnerability found
3. **HIGH** - Active exploit or data breach suspected
4. **CRITICAL** - Confirmed breach, immediate action required

### 8.2 Response Checklist
- [ ] Isolate affected systems
- [ ] Preserve logs and evidence
- [ ] Notify stakeholders
- [ ] Fix vulnerability
- [ ] Post-incident review

---

## 9. SECURITY TESTING

### 9.1 Regular Audits
- Monthly dependency audit (`npm audit`)
- Quarterly penetration testing
- Annual security review

### 9.2 Automated Scanning
- SAST (Static Application Security Testing)
- DAST (Dynamic Application Security Testing)
- Dependency vulnerability scanning

---

*Security Architecture for AstroAI Platform*

# Production Environment Rules — MobiFone Ca Mau Mini App

<!--
  NGUON GOC (doc truc tiep, khong bia):
  [1] OWASP ASVS 5.0 — V14: Configuration
      https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x22-V14-Configuration.md
  [2] OWASP ASVS 5.0 — V12: Files and Resources
      https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x20-V12-Files-Resources.md
  [3] Twelve-Factor App — III Config
      https://12factor.net/config
  [4] OWASP Testing Guide v4.2 — OTG-CONFIG
      https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/
-->

## ENV1 — Cac moi truong la khac nhau

**Nguon: Twelve-Factor App III [3]; OWASP ASVS 5.0 V14 [1]**

**ENV1.1 — Bo tu moi truong**

```
DEV (local)  →  TEST (CI)  →  STAGING  →  PRODUCTION
```

Moi moi truong co:
- Config rieng biet.
- Database rieng biet (KHONG dung chung production DB cho dev/test).
- Credential rieng biet.
- Log level rieng biet.

**ENV1.2 — KHONG suy luan tu localhost sang production**

AI KHONG duoc gia dinh:
```
localhost config = production config
DEBUG=true OK trong production
console.log OK trong production
CORS * OK trong production
HTTP (khong HTTPS) OK trong production
```

Moi su khac biet DEV vs PRODUCTION phai duoc noi ro va co config tuong ung.

---

## ENV2 — Configuration Management

**Nguon: Twelve-Factor App III [3]; OWASP ASVS 5.0 V14.2 [1]**

Trich dan [3]:
> "An app's config is everything that is likely to vary between deploys
> (staging, production, developer environments, etc). Config should be strictly
> separated from code."

**ENV2.1 — Config qua environment variables**

```typescript
// SAI — hardcode config
const dbHost = 'localhost:5432';
const jwtSecret = 'my-secret-key';

// DUNG — lay tu environment
const dbHost = process.env.DATABASE_HOST;
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is required');
}
```

**ENV2.2 — Validate config khi khoi dong**

Ung dung phai fail fast neu config bat buoc bi thieu.
KHONG de ung dung chay voi config sai / thieu va gay loi o giua.

**ENV2.3 — Cac gia tri default nguy hiem**

KHONG dung cac default nay trong bat ky moi truong nao (ke ca dev):
```
password: "password"
secret: "secret"
key: "key"
token: "test"
JWT_SECRET: "your-secret-key"
```

---

## ENV3 — Log Level theo Environment

**ENV3.1 — Log level quy dinh**

| Environment | Log Level | Ghi chu |
|-------------|-----------|---------|
| DEV | DEBUG | Verbose, bao gom request/response |
| TEST | INFO | Du de debug CI failures |
| STAGING | INFO | Giong production nhung co the verbose hon |
| PRODUCTION | WARN / ERROR | KHONG log DEBUG / INFO thua trong production |

**ENV3.2 — KHONG dung console.log trong production code**

`console.log` la debug tool, khong phai logging solution.
Dung structured logger (winston, pino) voi log level.

```typescript
// SAI trong production code
console.log('User data:', userData);

// DUNG
logger.info('User login successful', { userId: user.id });
logger.warn('Failed login attempt', { phone: maskPhone(phone), attempts });
```

---

## ENV4 — Security Headers trong Production

**Nguon: OWASP ASVS 5.0 V14.4 [1]**

Cac header sau PHAI co trong production:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: [policy phu hop voi ung dung]
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

AI KHONG duoc tu y tat hoac sua cau hinh security headers
ma khong co human review.

---

## ENV5 — Database trong Production

**Nguon: OWASP ASVS 5.0 V3 [1]; OWASP Testing Guide [4]**

**ENV5.1 — Khong chay migration tu dong trong production**

Migration co kha nang xoa data (DROP, TRUNCATE, ALTER xoa column)
PHAI co:
1. Backup truoc khi chay.
2. Human review va approval.
3. Rollback plan.
4. Chay trong maintenance window.

AI KHONG duoc tu dong chay migration trong production environment.

**ENV5.2 — Least privilege cho database account**

- Ung dung chi co quyen can thiet: SELECT, INSERT, UPDATE, DELETE tren table duoc chi dinh.
- KHONG dung root / admin account cho ung dung.
- DDL operations (CREATE TABLE, DROP, ALTER) phai tach thanh account rieng cho migration.

**ENV5.3 — KHONG expose database truc tiep**

Database KHONG duoc expose public internet.
Chi truy cap qua application layer hoac VPN / bastion host.

---

## ENV6 — Error Handling trong Production

**ENV6.1 — KHONG expose internal error cho user**

```typescript
// SAI — expose stack trace
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message, stack: err.stack });
});

// DUNG — che dau chi tiet loi
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({
    error: 'Internal server error',
    requestId: req.id,  // de user co the bao cao
  });
});
```

**ENV6.2 — Phan biet error message cho DEV va PRODUCTION**

Trong DEV: co the show chi tiet loi de debug.
Trong PRODUCTION: chi show message chung, ghi log day du phia server.

---

## ENV7 — Rollback Plan

**ENV7.1 — Moi deploy phai co rollback plan**

Truoc khi deploy, phai co cau tra loi cho:
- Neu deploy that bai: lam gi?
- Neu phat hien bug sau deploy: rollback den phien ban nao?
- Database migration da chay: co the rollback khong?

**ENV7.2 — Blue-Green / Canary khi co the**

Khong bat buoc nhung strongly recommended cho production changes lon:
deploy cho mot phan nho traffic truoc, kiem tra, sau moi mo rong.

AI KHONG tu y quyet dinh deployment strategy. Day la human decision.

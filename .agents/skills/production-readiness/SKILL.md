---
name: production-readiness
description: >
  Checklist san sang production truoc khi deploy feature hoac release.
  Review tren: functionality, security, performance, monitoring, rollback.
  Invoke khi user noi "san sang deploy chua", "production readiness", "pre-production check",
  "deploy checklist", "co the release khong".
license: proprietary
metadata:
  author: mobiops
  version: "1.0.0"
  sources:
    - ".agents/rules/10-production.md"
    - "OWASP ASVS 5.0 V14 Configuration: https://github.com/OWASP/ASVS"
    - "Google SRE Book — Production Readiness Review: https://sre.google/sre-book/evolving-sre-engagement-model/"
---

# Production Readiness Skill

Kiem tra truoc khi deploy. KHONG deploy khi chua pass checklist nay.

---

## Section 1 — Functionality

```
[ ] Feature da pass tat ca test (unit, integration, E2E)?
[ ] Da test tren staging environment?
[ ] Hien tuong loi cu biet da duoc fix?
[ ] Khong co TODO / FIXME / HACK trong code scope nay?
[ ] Breaking change da duoc xac nhan va co migration plan?
```

---

## Section 2 — Security

```
[ ] Security review da duoc chay (dung security-review skill)?
[ ] npm audit: khong co CRITICAL / HIGH CVE chua xu ly?
[ ] Secret scan: khong phat hien secret bi hardcode?
[ ] Authentication duoc kiem tra?
[ ] Authorization duoc kiem tra (IDOR test)?
[ ] Input validation da duoc implement phia server?
[ ] Security headers duoc cau hinh?
[ ] CORS whitelist duoc set (khong dung *)?
[ ] Human review da duoc hoan thanh?
```

---

## Section 3 — Configuration

Tham chieu `.agents/rules/10-production.md`:

```
[ ] Environment variables duoc cau hinh du cho production?
[ ] .env.production khong chua gia tri dev/test?
[ ] Database connection tro dung production DB?
[ ] Log level duoc set phu hop (WARN / ERROR, khong phai DEBUG)?
[ ] Debug mode bi tat (NODE_ENV=production)?
[ ] Verbose error response bi tat?
```

---

## Section 4 — Database & Migration

```
[ ] Migration da chay tren staging va ket qua OK?
[ ] Migration co the rollback neu can? (co down migration?)
[ ] Backup production database truoc khi chay migration?
[ ] Co migration nao xoa data? -> can written approval tu team lead
[ ] Database connection pool duoc cau hinh phu hop?
```

---

## Section 5 — Performance

```
[ ] Khong co obvious N+1 query problem?
[ ] Pagination duoc ap dung cho list endpoint?
[ ] File / image duoc serve qua CDN hoac optimized?
[ ] API timeout duoc set cho external calls?
[ ] Rate limiting duoc cau hinh?
```

---

## Section 6 — Monitoring & Observability

```
[ ] Health check endpoint ton tai va hoat dong?
[ ] Loi quan trong duoc log voi du thong tin de debug?
[ ] Alert duoc cau hinh cho error spike?
[ ] Khong co PII trong log (tham chieu 06-data-privacy.md)?
```

---

## Section 7 — Rollback Plan

**Truoc khi deploy, tra loi 3 cau hoi:**

```
1. Neu deploy that bai trong qua trinh deploy: hanh dong la gi?
   -> [cau tra loi cu the]

2. Neu phat hien bug nghiem trong sau deploy: rollback den phien ban nao?
   -> [ten version / tag]

3. Database migration da chay: co rollback duoc khong?
   -> [Yes / No / Co rollback script: ...]
```

Neu khong tra loi duoc: **KHONG deploy cho den khi co cau tra loi**.

---

## Section 8 — CI/CD Gate

```
[ ] Lint: PASS
[ ] Type Check: PASS
[ ] Unit Tests: PASS
[ ] Integration Tests: PASS
[ ] SAST (Semgrep): PASS
[ ] Secret Scan (Gitleaks): PASS
[ ] Dependency Scan (OSV-Scanner): PASS
[ ] Human Review: APPROVED
```

---

## Output

```markdown
# Production Readiness Report

**Feature/Release:** [ten]
**Date:** [ngay]
**Target Environment:** PRODUCTION

## Section Status

| Section | Status | Blocking Issues |
|---------|--------|----------------|
| Functionality | PASS / FAIL | |
| Security | PASS / FAIL | |
| Configuration | PASS / FAIL | |
| Database | PASS / FAIL | |
| Performance | PASS / FAIL | |
| Monitoring | PASS / FAIL | |
| Rollback Plan | READY / NOT READY | |
| CI/CD Gate | PASS / FAIL | |

## Rollback Plan

[Noi dung rollback plan]

## Deployment Recommendation

[ ] READY — Tat ca section PASS, san sang deploy
[ ] NOT READY — [Liet ke section chua pass va ly do]
[ ] CONDITIONAL — San sang deploy voi dieu kien: [dieu kien]
```

---

## Luu y

- Skill nay chi la ho tro. Decision cuoi cung la cua con nguoi.
- "AI noi san sang" khong phai quyen deploy. Human phai sign-off.
- Neu co section chua ro: bao cao la UNKNOWN, khong report PASS.

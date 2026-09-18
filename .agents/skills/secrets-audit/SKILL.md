---
name: secrets-audit
description: >
  Quet secret va credential bi hardcode hoac commit nham trong codebase.
  Tim API key, password, token, private key trong source code, config files,
  va git history. Ket hop voi Gitleaks neu co. Invoke khi user noi "kiem tra secret",
  "co secret nao bi lo khong", "scan credential", "gitleaks", "secrets audit".
license: proprietary
metadata:
  author: mobiops
  version: "1.0.0"
  sources:
    - "Gitleaks v8: https://github.com/gitleaks/gitleaks"
    - "OWASP AISVS 1.0 AC.3.1: https://github.com/OWASP/AISVS"
    - "OWASP Cheat Sheet - Secrets Management: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
    - ".agents/rules/06-data-privacy.md"
    - ".agents/rules/09-ai-agent-ops.md"
---

# Secrets Audit Skill

Quet tim secret bi hardcode hoac commit nham.

---

## Nguyen tac an toan khi chay skill nay

**AI KHONG duoc:**
- In gia tri secret ra output.
- Ghi secret vao bat ky file nao.
- Tra loi chua gia tri secret.

Neu tim thay secret: chi bao cao **vi tri** (file, dong), KHONG bao cao **gia tri**.

---

## Buoc 1 — Chay Gitleaks (neu da cai)

```bash
# Scan toan bo repository bao gom git history
gitleaks detect --source . --report-format json --report-path gitleaks-report.json

# Hoac scan chi staged files
gitleaks protect --staged --redact

# Xem ket qua
cat gitleaks-report.json
```

Neu chua cai Gitleaks: thuc hien buoc 2 bang cach doc thu cong.

---

## Buoc 2 — Tim thu cong (pattern matching)

Quet cac pattern sau trong source code, config va .env files:

### Pattern nguy hiem trong source code:

```
API_KEY=
SECRET=
PASSWORD=
TOKEN=
PRIVATE_KEY=
DATABASE_URL=
JWT_SECRET=
ACCESS_KEY=
SECRET_KEY=
BEARER=
```

### File can quet uu tien:

```
.env
.env.local
.env.production
.env.staging
config/database.js (hoac .ts, .json, .yaml)
config/auth.js
src/config.*
*.config.js
*.config.ts
docker-compose.yml (co the co secrets)
```

### File KHONG quet (binary, node_modules):

```
node_modules/
dist/
build/
*.jpg, *.png, *.gif, *.pdf
```

---

## Buoc 3 — Kiem tra .gitignore

```
[ ] .env co trong .gitignore?
[ ] .env.local co trong .gitignore?
[ ] .env.production co trong .gitignore?
[ ] Cac file backup (*~, *.bak, *.orig) co trong .gitignore?
```

Neu .env KHONG co trong .gitignore: day la finding CRITICAL.

---

## Buoc 4 — Kiem tra Git History (khi can)

> **Canh bao:** Chi chay khi co yeu cau ro rang hoac nghi ngo da commit secret.
> Khong tu dong quet git history vi co the mat thoi gian.

```bash
# Tim secret trong git log (Gitleaks)
gitleaks detect --source . --log-opts="--all"

# Tim bang grep trong git log (thu cong)
git log --all --oneline --diff-filter=A -- '*.env'
git log --all -p --follow -- config/database.js
```

Neu phat hien secret trong history: **can rewrite history hoac revoke secret ngay.**
Day la CRITICAL finding. Bao cao cho nguoi dung ngay.

---

## Buoc 5 — Kiem tra environment variable usage

Quet code xem co dung environment variable dung cach khong:

```typescript
// DUNG: lay tu process.env, validate
const secret = process.env.JWT_SECRET;
if (!secret) throw new Error('JWT_SECRET is required');

// SAI pattern 1: fallback ve gia tri default la secret
const secret = process.env.JWT_SECRET || 'my-secret-key';

// SAI pattern 2: hardcode truc tiep
const secret = 'my-super-secret';
```

Tim cac fallback nguy hiem:

```
process.env.X || 'hardcoded-value'
process.env.X ?? 'hardcoded-value'
```

---

## Buoc 6 — Output Report

```markdown
# Secrets Audit Report

**Date:** [ngay]
**Tool:** Gitleaks / Manual review
**Scope:** [thu muc / tat ca repository]

## Critical Findings

### SECRET-001 — [Mo ta loai secret tim thay]

**File:** [duong dan file]
**Line:** [so dong]
**Pattern:** [loai pattern, vi du: JWT secret]
**Value:** [REDACTED — khong hien thi gia tri]
**Git history:** [co / khong]

**Hanh dong yeu cau:**
- [ ] Revoke secret ngay lap tuc
- [ ] Rotate toan bo secret co lien quan
- [ ] Remove khoi git history (neu da commit)
- [ ] Them vao .gitignore

---

## .gitignore Status

| File | Co trong .gitignore? |
|------|-------------------|
| .env | [Yes / NO — CRITICAL] |
| .env.local | [Yes / No] |

## Recommendations

1. [Hanh dong uu tien cao nhat]
2. ...

## Status

[ ] CRITICAL: Can xu ly ngay truoc khi merge
[ ] CLEAN: Khong phat hien secret bi hardcode
```

---

## Hanh dong khan cap neu tim thay secret trong Git history

1. **Revoke ngay:** goi API cua service de invalidate key/secret.
2. **Khong xoa commit ngay** — trao doi voi team lead truoc.
3. **Neu repo la public:** assume secret da bi lo. Revoke va rotate het.
4. **git filter-repo** hoac **BFG Repo Cleaner** de xoa khoi history — can human thuc hien.

AI KHONG tu dong thuc hien rewrite git history.

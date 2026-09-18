# Dependency Security Rules — MobiFone Ca Mau Mini App

<!--
  NGUON GOC (doc truc tiep, khong bia):
  [1] OWASP ASVS 5.0 — V14: Configuration / Dependency
      https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x22-V14-Configuration.md
  [2] OWASP Secure Coding with AI Cheat Sheet — Section 1: Dependency Hallucination
      https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html
  [3] OpenSSF Best Practices — Dependency Management
      https://bestpractices.coreinfrastructure.org/en/criteria
  [4] Supply Chain Levels for Software Artifacts (SLSA) — Level 1 requirements
      https://slsa.dev/spec/v1.0/levels
  [5] npm Security Best Practices — GitHub Blog
      https://github.blog/security/supply-chain-security/
-->

## DEP1 — Nguyen tac truoc khi them package

**Nguon: OWASP Secure Coding with AI Cheat Sheet [2]; OpenSSF Best Practices [3]**

Trich dan [2]:
> "AI coding assistants frequently suggest package names that do not exist on public registries.
> Attackers monitor these hallucinated names and register malicious packages with matching names."

**Decision tree bat buoc (theo thu tu):**

```
Can xu ly bang native API khong?
  ↓ Co → Dung native, KHONG install package
  ↓ Khong

Da co dependency tuong tu trong project khong?
  ↓ Co → Dung cai da co, KHONG install package moi
  ↓ Khong

Xac minh package ton tai tren registry chinh thuc:
  npm view <package-name> (hoac kiem tra npmjs.com)
  ↓ Khong ton tai → DUNG, bao cao cho nguoi dung

Danh gia package (xem DEP2):
  ↓ Khong dat tieu chuan → KHONG install, bao cao

Install (voi phien ban cu the, khong dung "latest")
```

---

## DEP2 — Tieu chi danh gia package truoc khi cai

**DEP2.1 — Tin hieu WARNING (de nghi xem xet ky)**

- Package tren npmjs.com duoi 30 ngay tuoi.
- Weekly downloads duoi 1.000.
- Chi co 1 maintainer, khong co package nao khac.
- Repository GitHub sap bi archive hoac da bi archive.
- Khong co file `CHANGELOG.md` hoac khong co versioning.
- Ten package rat giong ten package pho bien (typosquatting).

**DEP2.2 — Tin hieu BLOCK (khong install)**

- Package bi flag la malicious tren npmjs.com / OSV.dev.
- Package bao gom install script sau la la: `preinstall`, `postinstall` goi network.
- Package yeu cau quyen OS khong lien quan den chuc nang (doc file, env vars khong ro ly do).
- Package duoc AI de xuat nhung khong the xac minh tren npmjs.com.

**DEP2.3 — Kiem tra license**

Uu tien su dung:
- MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC — dung duoc.
- GPL-3.0, AGPL-3.0 — can xac nhan truoc voi trum truong du an.
- UNLICENSED, PROPRIETARY — KHONG dung.

---

## DEP3 — Phien ban va Lockfile

**Nguon: OWASP ASVS 5.0, V14.2 [1]; SLSA Level 1 [4]**

**DEP3.1 — Pin phien ban cu the**

```json
// SAI — version float (co the lay phien ban co lo hong)
"dependencies": {
  "axios": "^1.0.0"
}

// DUNG — pin exact version trong lockfile
// Co the dung caret trong package.json nhung lockfile phai duoc commit
```

**DEP3.2 — Lockfile PHAI duoc commit**

- `package-lock.json` (npm): PHAI commit.
- `pnpm-lock.yaml` (pnpm): PHAI commit.
- `yarn.lock` (yarn): PHAI commit.

KHONG gitignore lockfile. Lockfile la bao dam toan ven dependency chain.

**DEP3.3 — Khong xoa va tao lai lockfile tu do**

`npm install --legacy-peer-deps` hoac `rm package-lock.json && npm install`
chi thuc hien khi co ly do ro rang va duoc ghi ro trong commit message.
Khong tu do xoa lockfile de "sua loi".

---

## DEP4 — Danh sach package khong duoc dung (Do NOT Use)

Danh sach duoi day dua tren trang thai thuc te cua package tai thoi diem viet rules.
Kiem tra lai truoc khi ap dung neu codebase da co convention khac.

| Package | Ly do tranh | Thay the |
|---------|------------|---------|
| `moment` | Bundle size lon, da deprecate (chi con maintain) | `date-fns` hoac native `Intl` API |
| `request` | Da deprecated hoan toan | `axios` hoac native `fetch` |
| `node-uuid` | Da deprecated | `uuid` (v4+) hoac `crypto.randomUUID()` |
| `lodash` (ca module) | Bundle size | Import cu the: `import debounce from 'lodash/debounce'` |

Neu project hien tai da dung package trong danh sach nay: KHONG tu y refactor.
Bao cao cho nguoi dung de co plan migration.

---

## DEP5 — Quy tac sau khi them package

**DEP5.1 — Kiem tra audit sau khi them**

```bash
npm audit
```

Neu co CRITICAL hoac HIGH CVE: KHONG commit cho den khi xu ly xong.
Neu co MODERATE: bao cao cho nguoi dung de quyet dinh.

**DEP5.2 — Ghi ro trong commit message**

```
chore(deps): add date-fns v3.6.0

Replaces manual date formatting in order module.
License: MIT
Weekly downloads: 52M (npmjs.com)
npm audit: no vulnerabilities
```

**DEP5.3 — Khong add devDependency vao dependencies**

Package chi dung luc build/test (jest, eslint, typescript) phai nam trong `devDependencies`.
Neu dua vao `dependencies` se bi bundle vao production, tang bundle size.

---

## DEP6 — Transitive Dependencies

**DEP6.1 — Biet chuoi phu thuoc**

Khi install `axios`, no keo theo cac package khac. Biet dieu nay.
Neu OSV-Scanner hoac `npm audit` bao lo hong trong transitive dependency,
xu ly nhu lo hong truc tiep (khong bo qua vi "minh khong cai no").

**DEP6.2 — Dung `overrides` / `resolutions` can than**

`overrides` trong package.json co the fix transitive dep nhung cung co the gay breaking changes.
Chi dung khi hieu ro va co test bao dam.

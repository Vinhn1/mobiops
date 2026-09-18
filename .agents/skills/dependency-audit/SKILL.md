---
name: dependency-audit
description: >
  Kiem tra dependency security cho project MobiFone. Phan tich package.json,
  lockfile, tim CVE, package loi thoi, license van de, va package dang nghi.
  Ket hop voi OSV-Scanner CLI neu co. Invoke khi user noi "kiem tra dependency",
  "audit package", "security check dependencies", "co CVE nao khong".
license: proprietary
metadata:
  author: mobiops
  version: "1.0.0"
  sources:
    - "OSV-Scanner v2: https://osv.dev/"
    - "npm audit: https://docs.npmjs.com/cli/v10/commands/npm-audit"
    - "OWASP ASVS 5.0 V14: https://github.com/OWASP/ASVS"
    - ".agents/rules/07-dependency.md"
---

# Dependency Audit Skill

Kiem tra toan dien dependency security cho project.

---

## Buoc 1 — Doc va xac dinh file can audit

```
[ ] package.json ton tai?
[ ] package-lock.json ton tai va duoc commit? (neu khong: BAO CAO)
[ ] pnpm-lock.yaml ton tai? (neu dung pnpm)
[ ] .npmrc ton tai? (co the co registry override)
```

---

## Buoc 2 — Chay npm audit (bat buoc)

```bash
npm audit
```

Hoac neu OSV-Scanner da duoc cai:

```bash
osv-scanner --lockfile=package-lock.json
# Hoac:
osv-scanner -r .
```

**Phan tich ket qua:**

| Muc do | Hanh dong |
|--------|----------|
| CRITICAL | Block. Phai xu ly truoc khi merge |
| HIGH | Block. Phai xu ly hoac co written exception |
| MODERATE | Bao cao. Nguoi dung quyet dinh |
| LOW | Bao cao. Co the chap nhan voi ghi nhan |
| INFO | Luu y |

---

## Buoc 3 — Kiem tra package thu cong

Doc danh sach `dependencies` va `devDependencies` trong `package.json`.
Danh gia tung package theo tieu chi trong `.agents/rules/07-dependency.md`:

### Checklist cho moi package dang nghi:

```
[ ] Package ton tai tren npmjs.com? (kiem tra truc tiep)
[ ] Weekly downloads > 1.000?
[ ] Lan phat hanh cuoi trong vong 1 nam?
[ ] Repository khong bi archive?
[ ] Khong co install script la la (preinstall/postinstall goi network)?
[ ] License chap nhan duoc (MIT/Apache/BSD)?
```

---

## Buoc 4 — Kiem tra Lockfile integrity

```
[ ] package-lock.json co duoc commit khong?
[ ] package-lock.json co khop voi package.json khong? (npm ci se bao loi neu khong)
[ ] Co resolved URL la la trong lockfile khong? (khong phai registry.npmjs.org)
```

Dau hieu lockfile bi tamper:
- `resolved` URL tro den registry khong phai npmjs.com / registry da cau hinh.
- `integrity` (sha512) bi thay doi.

---

## Buoc 5 — Tim package loi thoi va unused

```bash
# Kiem tra update co san
npx npm-check-updates --format group

# Hoac doc lai package.json va so sanh phien ban voi npmjs.com
```

Luu y: chi de xuat cap nhat, khong tu y chay `npm update` trong production scope.

---

## Buoc 6 — Output Report

```markdown
# Dependency Audit Report

**Project:** [ten project]
**Date:** [ngay]
**Lockfile:** package-lock.json [commit / missing]

## Vulnerabilities (tu npm audit / osv-scanner)

| Package | Version | Severity | CVE | Fix Available |
|---------|---------|---------|-----|--------------|
| [ten] | [ver] | CRITICAL | CVE-XXXX | v1.2.3 |

## Suspicious Packages

| Package | Ly do nghi | Khuyen nghi |
|---------|-----------|------------|

## Outdated Packages (quan trong)

| Package | Current | Latest | Update Risk |
|---------|---------|--------|------------|

## License Issues

| Package | License | Trang thai |
|---------|---------|----------|

## Recommendations

1. [Hanh dong uu tien 1]
2. [Hanh dong uu tien 2]

## Status

[ ] Block merge (CRITICAL/HIGH chua xu ly)
[ ] OK to merge (sau khi xu ly cac item blocked)
```

---

## Luu y

- KHONG tu dong chay `npm install` hoac `npm update` truoc khi bao cao.
- KHONG commit change vao lockfile ma khong co human review.
- Ket qua audit la thoi diem cu the, can chay lai dinh ky.

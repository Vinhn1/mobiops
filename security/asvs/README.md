# OWASP ASVS 5.0 — MobiFone Ca Mau Mini App

<!--
  NGUON GOC:
  OWASP Application Security Verification Standard (ASVS) Version 5.0.0
  Phat hanh: 30/05/2025
  GitHub: https://github.com/OWASP/ASVS
  Cac requirement ID trong thu muc nay tham chieu truc tiep den ASVS 5.0.0.
  Kiem tra lai voi file CSV/JSON chinh thuc tren GitHub truoc khi audit.
-->

## ASVS la gi?

OWASP ASVS (Application Security Verification Standard) la bo tieu chuan
kiem tra bao mat ung dung web va dich vu. ASVS 5.0 (phat hanh 30/05/2025)
bao gom 17 chuong, khoang 350 requirements co the kiem chung.

---

## 3 muc Level

| Level | Mo ta | Ap dung |
|-------|-------|---------|
| Level 1 | Baseline — tat ca ung dung phai dat | Bat dau tu day |
| Level 2 | Standard — ung dung xu ly du lieu nhay cam | Mobiops target |
| Level 3 | Advanced — he thong yeu cau dam bao cao nhat | Trong tuong lai |

**Level ap dung cho MobiFone Ca Mau Mini App: Level 2.**

Du an la Mini App quan ly dich vu, xu ly so dien thoai khach hang,
thong tin goi cuoc, lich su giao dich — du dieu kien Level 2.

---

## 17 Chuong cua ASVS 5.0

| Chuong | Ten | File checklist |
|--------|-----|---------------|
| V1 | Encoding and Sanitization | (trong level1-checklist.md) |
| V2 | Validation | (trong level1-checklist.md) |
| V3 | Web Frontend Security | (trong level1-checklist.md) |
| V4 | Session Management | (trong level1-checklist.md) |
| V5 | Cryptography | (trong level1-checklist.md) |
| V6 | Error Handling and Logging | (trong level1-checklist.md) |
| V7 | Data Protection | (trong level1-checklist.md) |
| V8 | Communication | (trong level1-checklist.md) |
| V9 | Malicious Code | (trong level1-checklist.md) |
| V10 | Business Logic | (trong level1-checklist.md) |
| V11 | Files and Resources | (trong level1-checklist.md) |
| V12 | API and Web Services | (trong level1-checklist.md) |
| V13 | Configuration | (trong level1-checklist.md) |
| V14 | Authentication | (trong level1-checklist.md) |
| V15 | Access Control | (trong level1-checklist.md) |
| V16 | Secure Development and Architecture | (trong level1-checklist.md) |
| V17 | WebSockets | (trong level1-checklist.md — neu project dung WS) |

---

## Cach su dung

1. **Pre-development:** Doc `checklists/pre-development.md`.
2. **Trong khi implement:** Tham chieu requirement tuong ung khi viet code.
3. **Pre-merge:** Chay checklist `checklists/pre-merge.md`.
4. **Pre-production:** Chay checklist `checklists/pre-production.md`.

---

## Quan trong

- Tung requirement trong ASVS duoc phat bieu la "Verify that..."
  → Khi apply vao project, bien thanh "Kiem tra rang..."
- Khong the "dat" ASVS bang mot lan review. Day la qua trinh lien tuc.
- Level 1 la floor, khong phai ceiling.
- So requirement ID (vd: V14.2.1) co the thay doi giua cac phien ban.
  Luon xac nhan voi ASVS 5.0.0 chinh thuc tren GitHub khi audit chinh thuc.

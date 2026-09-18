---
name: threat-modeling
description: >
  Threat modeling skill theo phuong phap STRIDE cho MobiFone Ca Mau Mini App.
  Su dung khi thiet ke feature moi, review architecture, hoac can xac dinh attack surface.
  Output la threat model co cau truc: assets, entry points, trust boundaries, threats va
  mitigations. Invoke khi user noi "threat model", "mo hinh bao mat", "attack surface",
  "ai co the tan cong", "trust boundary".
license: proprietary
metadata:
  author: mobiops
  version: "1.0.0"
  sources:
    - "STRIDE methodology: Microsoft SDL Threat Modeling"
    - "OWASP Threat Modeling: https://owasp.org/www-community/Threat_Modeling"
    - "OWASP Cheat Sheet - Threat Modeling: https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html"
---

# Threat Modeling Skill (STRIDE)

Su dung skill nay de phan tich rui ro bao mat truoc khi viet code.
Ket qua giup xac dinh security control can thiet.

---

## STRIDE la gi?

| Thu | Loai tan cong | Cau hoi can tra loi |
|-----|-------------|-------------------|
| **S**poofing | Gia mao danh tinh | Ke tan cong co the gia mao ai? |
| **T**ampering | Thay doi du lieu | Ke tan cong co the sua du lieu gi? |
| **R**epudiation | Phu nhan hanh dong | Ai co the noi "toi khong lam dieu nay"? |
| **I**nformation Disclosure | Lo thong tin | Du lieu gi co the bi lo? |
| **D**enial of Service | Lam tu choi dich vu | He thong co the bi lam sap nhu the nao? |
| **E**levation of Privilege | Leo quyen | Ai co the co duoc quyen cao hon? |

---

## Buoc 1 — Xac dinh Assets (Tai san can bao ve)

Hoi: "Neu mat cai gi thi he thong gay hai nhat?"

Vi du cho MobiFone context:

| Asset | Phan loai | Tam quan trong |
|-------|-----------|---------------|
| So dien thoai, CCCD khach hang | SENSITIVE | Rat cao |
| Lich su giao dich | CONFIDENTIAL | Cao |
| Token xac thuc | SENSITIVE | Rat cao |
| Thong tin goi cuoc dang ky | CONFIDENTIAL | Cao |
| Cau hinh he thong | INTERNAL | Trung binh |

---

## Buoc 2 — Xac dinh Entry Points (Diem vao he thong)

Liet ke cac duong vao he thong ma ke tan cong co the tiep can:

```
[ ] Browser / Mobile client → Frontend (HTTP/HTTPS)
[ ] Frontend → API (REST/GraphQL)
[ ] API → Internal services
[ ] API → Database
[ ] API → External APIs (MobiFone backend, payment)
[ ] Admin UI → API
[ ] CI/CD pipeline → Infrastructure
[ ] File upload endpoint
[ ] WebSocket connections (neu co)
```

---

## Buoc 3 — Ve Trust Boundaries

Xac dinh ranh gioi nao can xac thuc / uy quyen:

```
[Internet / Untrusted Zone]
        ↓  (HTTPS, authentication required)
[Frontend / Client App]
        ↓  (API calls, JWT validation)
[API Gateway / Backend]
        ↓  (service-to-service auth)
[Internal Services]
        ↓  (parameterized queries, least privilege)
[Database]

[Admin Zone] -- higher privilege, separate auth --→ [API]
```

Moi duong mui ten la mot trust boundary. Moi boundary can security control.

---

## Buoc 4 — Lap STRIDE Threat Table

Voi moi entry point va trust boundary, dat cac cau hoi STRIDE:

### Template

| ID | Component | Threat type (STRIDE) | Mo ta threat | Muc do | Mitigation | Status |
|----|-----------|---------------------|-------------|--------|-----------|--------|
| T1 | Login API | Spoofing | Gia mao user khac bang token bi danh cap | HIGH | Token rotation, short expiry, revocation | TODO |
| T2 | Customer API | Info Disclosure | Lo thong tin khach hang qua IDOR | HIGH | Authorization check per resource | TODO |
| T3 | File Upload | Tampering | Upload file doc hai | MEDIUM | MIME validation, virus scan | TODO |
| ... | | | | | | |

---

## Buoc 5 — Danh gia Muc do (DREAD-simplified)

Su dung thang diem 3 muc:

| Muc | Dieu kien |
|-----|----------|
| HIGH | De khai thac, impact cao, pho bien |
| MEDIUM | Can dieu kien, impact trung binh |
| LOW | Kho khai thac hoac impact thap |

---

## Buoc 6 — Output Threat Model

```markdown
# Threat Model

**Feature/Component:** [ten]
**Date:** [ngay]
**Author:** [ten]

## Assets

[Danh sach tai san can bao ve]

## Entry Points

[Danh sach diem vao]

## Trust Boundaries

[Mo ta trust boundary diagram]

## Threat Table

[Bang STRIDE day du]

## Security Requirements phat sinh

Tu threat model, cac security requirement sau can implement:

1. [Requirement 1] — giai quyet [threat ID]
2. [Requirement 2] — giai quyet [threat ID]
...

## Out of Scope

[Nhung gi khong nam trong scope cua threat model nay]
```

---

## Luu y

- Threat model la van song: cap nhat khi feature thay doi.
- KHONG bao "khong co rui ro" — moi he thong co rui ro, chi khac muc do.
- Tap trung vao realistic threats, khong can model tat ca attack scenarios ly thuyet.
- Khi khong chac muc do cua mot threat: bao cao la MEDIUM, de human quyet dinh.

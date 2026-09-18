---
name: privacy-review
description: >
  Review data privacy compliance cho code va feature cua MobiFone. Kiem tra
  phan loai du lieu, log masking, API response exposure, data retention, va
  tuan thu Nghi dinh 13/2023/ND-CP. Invoke khi user noi "privacy review",
  "kiem tra lo thong tin", "data privacy", "GDPR", "Nghi dinh 13",
  "du lieu ca nhan", "PII".
license: proprietary
metadata:
  author: mobiops
  version: "1.0.0"
  sources:
    - ".agents/rules/06-data-privacy.md"
    - "OWASP ASVS 5.0 V8 Data Protection: https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x16-V8-Data-Protection.md"
    - "Vietnam Decree 13/2023/ND-CP on Personal Data Protection"
    - "OWASP Logging Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"
---

# Privacy Review Skill

Kiem tra tuan thu data privacy cho code va feature.

---

## Buoc 1 — Xac dinh PII trong Scope

Doc code va liet ke tat ca fields du lieu nguoi dung duoc xu ly:

```
Danh sach fields:
- field_name: [phan loai: PUBLIC/INTERNAL/CONFIDENTIAL/SENSITIVE]
- ...
```

Tham chieu `.agents/rules/06-data-privacy.md` D1 de phan loai.

**Fields SENSITIVE theo Nghi dinh 13/2023 (quan ly biet):**
- So CCCD / CMND / Ho chieu
- So dien thoai (Dieu 2 Khoan 4)
- Thong tin tai chinh
- Du lieu sinh trac hoc

---

## Buoc 2 — Kiem tra Logging Compliance

Quet tat ca `logger.*`, `console.log`, `console.error` trong scope:

**Checklist:**

```
[ ] Co truong hop nao log toan bo request body chua PII?
[ ] Co log truc tiep: phone, email, password, token?
[ ] Mask dung cach (xem D3 trong rules/06-data-privacy.md)?
[ ] Error log co tiet lo thong tin nhay cam cua user?
```

**Scan pattern:**
```typescript
// CAC PATTERN CAN KIEM TRA:
logger.info({ user })           // -> lo toan bo user object?
logger.error('Failed', { req.body })  // -> req.body co password?
console.log('Phone:', phone)    // -> lo so dien thoai?
```

---

## Buoc 3 — Kiem tra API Response Exposure

Quet cac endpoint tra du lieu nguoi dung:

```
[ ] API tra ve toan bo database object (co truong thua)?
[ ] API tra ve password_hash, internal_flags, role_flags?
[ ] Truong SENSITIVE hien thi day du khi chi can hien thi partial?
    (vi du: so dien thoai hien thi day du khi co the hien thi masked)
[ ] Pagination / search endpoint co tra ve qua nhieu record?
```

**Kem theo:**
- File: [ten file]
- Endpoint: [HTTP method + path]
- Fields bi expose: [danh sach]
- Khuyen nghi: [thay doi gi]

---

## Buoc 4 — Kiem tra Data Storage

```
[ ] Password duoc hash bang bcrypt / argon2?
[ ] Token / secret duoc luu duoi dang encrypted?
[ ] Du lieu SENSITIVE trong database co duoc ma hoa at-rest?
[ ] localStorage / sessionStorage co chua SENSITIVE data?
[ ] Cookie co HttpOnly + Secure flag?
```

---

## Buoc 5 — Kiem tra Data Minimization

```
[ ] API collect du lieu nguoi dung nhieu hon can thiet?
[ ] Database luu truong khong dung den?
[ ] Truong cu (da deprecated) van con collect?
```

---

## Buoc 6 — Kiem tra Retention va Deletion

```
[ ] Session / token het han co bi xoa khoi database?
[ ] Log chua PII co duoc tu dong xoa sau thoi han luu tru?
[ ] Co endpoint / process nao cho phep xoa du lieu nguoi dung?
    (yeu cau theo Nghi dinh 13: nguoi dung co quyen yeu cau xoa)
```

---

## Output Report

```markdown
# Privacy Review Report

**Module:** [ten]
**Date:** [ngay]
**Regulation context:** Nghi dinh 13/2023/ND-CP, OWASP ASVS 5.0 V8

## PII Fields Identified

| Field | Classification | Handled Correctly? |
|-------|---------------|-------------------|
| phone | CONFIDENTIAL | Masked in logs: [Yes/No] |
| password | SENSITIVE | Hashed (bcrypt): [Yes/No] |
| ... | | |

## Findings

### PRIVACY-001 — [Mo ta]

**Severity:** HIGH / MEDIUM / LOW
**File:** [duong dan]
**Lines:** [so dong]
**Issue:** [mo ta cu the]
**Recommendation:** [cach sua]

## Compliance Status

| Requirement | Status |
|------------|--------|
| Masking trong log | PASS / FAIL |
| Password hashing | PASS / FAIL |
| Khong expose thua qua API | PASS / FAIL |
| HttpOnly cookie | PASS / FAIL |
```

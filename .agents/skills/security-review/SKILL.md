---
name: security-review
description: >
  Security review skill cho code va feature cua MobiFone Ca Mau Mini App.
  Su dung khi duoc yeu cau review security cho mot module, API, component, hoac
  toan bo feature. Thuc hien quet theo 12 domain bao mat, output bao cao thuc te
  (khong bao cao so lieu khi chua quet xong). Invoke khi user noi "review security",
  "kiem tra bao mat", "security check", "audit module nay".
license: proprietary
metadata:
  author: mobiops
  version: "1.0.0"
  sources:
    - "OWASP Testing Guide v4.2: https://owasp.org/www-project-web-security-testing-guide/"
    - "OWASP ASVS 5.0: https://github.com/OWASP/ASVS"
    - "OWASP API Security Top 10 2023: https://owasp.org/API-Security/"
---

# Security Review Skill

Su dung skill nay khi duoc yeu cau review security cho bat ky phan nao cua codebase.

---

## Buoc 1 — Xac dinh Scope

Truoc khi bat dau, xac dinh ro:

```
Scope: [ten module, file, hoac feature]
Loai review: [ ] Module review  [ ] Feature review  [ ] Full codebase review
```

Doc cac file trong scope. KHONG review nhung gi khong trong scope.

---

## Buoc 2 — Quet theo 12 Domain

Voi moi domain duoi, quet thuc te va ghi nhan ket qua.
KHONG ghi "PASS" khi chua doc code.
KHONG ghi so luong finding khi chua quet xong.

### D01 — Authentication

Kiem tra:
- [ ] Co authentication middleware bao ve cac endpoint can bao ve khong?
- [ ] Password / PIN duoc hash bang bcrypt / argon2 khong? (KHONG MD5 / SHA1)
- [ ] OTP / token co gioi han thoi gian hieu luc khong?
- [ ] Sau bao nhieu lan sai mat khau thi bi lock / delay?
- [ ] Logout co revoke token / session khong?

### D02 — Authorization

Kiem tra:
- [ ] Moi endpoint co kiem tra role/permission khong, hay chi kiem tra "co dang nhap"?
- [ ] IDOR: user co the truy cap resource cua user khac qua thay doi ID khong?
- [ ] Admin endpoint co duoc bao ve rieng, khong chi dua vao `if role === 'admin'`?
- [ ] Horizontal privilege escalation: user co leo quyen ngang khong?

### D03 — Input Validation

Kiem tra:
- [ ] Moi dau vao tu user co duoc validate (type, length, format, range)?
- [ ] Validation dung phia server, khong chi phia client?
- [ ] File upload: co kiem tra MIME type va extension khong?
- [ ] So dien thoai, email, so CCCD co duoc validate dung dinh dang khong?

### D04 — Output Encoding / XSS Prevention

Kiem tra:
- [ ] Du lieu nguoi dung hien thi tren UI co duoc encode/escape khong?
- [ ] `dangerouslySetInnerHTML` hoac `innerHTML` co duoc dung khong? (can xem xet ky)
- [ ] CSP header co duoc cau hinh khong?

### D05 — Injection Prevention

Kiem tra:
- [ ] SQL: co dung parameterized query / ORM, khong noi chuoi SQL?
- [ ] NoSQL: co kiem tra operator injection (`$where`, `$gt`)?
- [ ] Command injection: co chay shell command voi user input khong?

### D06 — Session Management

Kiem tra:
- [ ] Token duoc luu an toan (HttpOnly cookie, khong localStorage)?
- [ ] Session timeout co duoc thiet lap?
- [ ] Token rotation sau sensitive action (doi mat khau)?

### D07 — API Security

Kiem tra:
- [ ] Rate limiting co duoc ap dung khong?
- [ ] CORS origin co duoc whitelist (khong dung `*`)?
- [ ] Mass assignment: co filter truoc khi save vao database?
- [ ] Pagination co duoc gioi han (khong cho fetch toan bo data)?
- [ ] Error response co tiet lo thong tin noi bo (stack trace, SQL error)?

### D08 — Secrets Management

Kiem tra:
- [ ] Co hardcoded secret, API key, password trong code khong?
- [ ] .env file co trong .gitignore khong?
- [ ] Secret co bi in ra log khong?

### D09 — Data Privacy (theo 06-data-privacy.md)

Kiem tra:
- [ ] Truong SENSITIVE co bi log / tra ve API response khong can thiet?
- [ ] So dien thoai co duoc mask khi log?
- [ ] Du lieu khach hang co duoc bao ve dung muc?

### D10 — Dependency Security (theo 07-dependency.md)

Kiem tra:
- [ ] Chay `npm audit` — co CVE CRITICAL / HIGH?
- [ ] Co package nao chua duoc xac minh nguon goc?
- [ ] Lockfile co duoc commit?

### D11 — Error Handling

Kiem tra:
- [ ] Stack trace co bi tra ve cho client?
- [ ] Internal error message co tiet lo infrastructure info?
- [ ] Error log co du thong tin de debug ma khong co secret?

### D12 — Security Headers (neu la web app)

Kiem tra:
- [ ] `Strict-Transport-Security` co duoc set?
- [ ] `Content-Security-Policy` co duoc cau hinh?
- [ ] `X-Content-Type-Options: nosniff` co duoc set?

---

## Buoc 3 — Phan loai Finding

Sau khi quet xong toan bo scope, phan loai findings:

| Muc do | Dinh nghia |
|--------|-----------|
| `CRITICAL` | Co the bi khai thac tu xa, gay data breach, chiem quyen admin |
| `HIGH` | Vuln cu the, can co dieu kien nhat dinh de khai thac |
| `MEDIUM` | Loi thiet ke hoac misconfiguration, kho khai thac nhung co rui ro |
| `LOW` | Best practice vi pham, hien tai it rui ro |
| `INFO` | Quan sat, goi y cai thien |

---

## Buoc 4 — Output Report

Su dung template:

```markdown
# Security Review Report

**Scope:** [ten module/feature]
**Date:** [ngay]
**Reviewer:** AI Security Review (MobOps skill)

## Findings Summary

| Muc do | So luong |
|--------|---------|
| CRITICAL | N |
| HIGH | N |
| MEDIUM | N |
| LOW | N |
| INFO | N |

## Findings Chi tiet

### [CRITICAL/HIGH/MEDIUM/LOW/INFO]-001 — [Ten finding]

**Domain:** [D01–D12]
**File:** [duong dan file]
**Lines:** [so dong]

**Mo ta:**
[Mo ta cu the van de tim thay]

**Tac dong:**
[Neu bi khai thac, co the xay ra gi]

**Khuyen nghi:**
[Cach sua]

**Status:** OPEN / ACCEPTED (co giai thich) / FALSE POSITIVE (co giai thich)

---
```

## Luu y quan trong

- So lieu trong report phai la ket qua thuc te cua viec doc code.
- KHONG dien so gia dinh vao template.
- KHONG bao "PASS" cho domain chua duoc quet.
- Neu scope qua lon, chia thanh nhieu lan review, moi lan mot domain.

---
name: secure-feature-dev
description: >
  Secure feature development workflow cho MobiFone Ca Mau Mini App.
  Bat buoc su dung khi bat dau xay dung bat ky feature moi nao. Ngan AI code ngay lap tuc
  ma khong co planning va security review truoc. Workflow: Requirement → Architecture →
  Threat Model → Data Classification → API Contract → Auth/Authz → Implementation → Tests →
  Security Review. Invoke khi user noi "build feature", "them tinh nang", "implement",
  "xay module", hoac bat ky yeu cau tao functionality moi.
license: proprietary
metadata:
  author: mobiops
  version: "1.0.0"
  sources:
    - "OWASP Secure Coding with AI Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html"
    - "OWASP AISVS 1.0 AC.1: https://github.com/OWASP/AISVS"
    - "OWASP ASVS 5.0: https://github.com/OWASP/ASVS"
---

# Secure Feature Development Skill

**Khong duoc bat dau code ngay khi nhan yeu cau.**

Thuc hien tung buoc duoi theo thu tu. Moi buoc co the can hoi nguoi dung truoc khi di tiep.

---

## Buoc 0 — Lay yeu cau ro rang

Hoi neu thieu:

```
[ ] Feature ten la gi?
[ ] Ai dung chuc nang nay? (user thuong / admin / he thong)
[ ] Input: nhan du lieu gi?
[ ] Output: tra ve gi?
[ ] Co dieu kien tien quyet khong? (phai dang nhap, phai co quyen gi)
[ ] Co tuong tac voi du lieu nhay cam khong?
```

Neu cac cau hoi tren chua co cau tra loi, **hoi nguoi dung truoc** (khong gia su).

---

## Buoc 1 — Kiem tra Architecture hien tai

**KHONG tao module moi khi da co module phuc vu muc dich tuong tu.**

```
[ ] Da co service/module nao xu ly logic tuong tu chua?
[ ] Can reuse hay extend cai cu?
[ ] Feature nay thuoc lop nao: Presentation / Application / Domain / Infrastructure?
[ ] Se them vao file nao? (khong tao thu muc moi neu khong can thiet)
```

Tham khao `.agents/rules/05-architecture.md` truoc khi quyet dinh.

---

## Buoc 2 — Phan tich Threat (nhanh)

Su dung `threat-modeling` skill hoac tra loi 3 cau hoi toi thieu:

```
[ ] Ai co the lam dung feature nay? (user khac, hacker, bot)
[ ] Du lieu nao co the bi lo hoac bi thay doi?
[ ] Authorization: ai duoc phep lam gi?
```

Neu feature khong lien quan den du lieu nhay cam va khong co auth,
co the bo qua buoc day du va chi tra loi 3 cau hoi tren.

---

## Buoc 3 — Data Classification

Voi moi field du lieu feature se xu ly:

```
Xac dinh: PUBLIC / INTERNAL / CONFIDENTIAL / SENSITIVE
(Tham khao .agents/rules/06-data-privacy.md)
```

Neu co field CONFIDENTIAL hoac SENSITIVE: bat buoc ap dung quy tac log masking va storage.

---

## Buoc 4 — API Contract (neu feature co API)

Thoa thuan API contract truoc khi viet code:

```yaml
# Vi du
endpoint: POST /api/packages/register
method: POST
auth: required (Bearer token)
permissions: user:package:write

request:
  body:
    packageCode: string (required, format: /^[A-Z0-9]{4,10}$/)
    duration: integer (required, 1-12)

response:
  200:
    orderId: string
    status: "pending" | "success"
  400:
    error: string (khong tiet lo internal info)
  401: Unauthorized
  403: Forbidden
```

**KHONG viet code khi API contract chua ro rang.**

---

## Buoc 5 — Authorization Design

```
[ ] Endpoint nay can auth khong? -> neu co: xac dinh token type
[ ] Role nao duoc phep? -> liet ke cu the
[ ] Resource-level check can thiet? -> user chi duoc xem du lieu cua minh
[ ] Admin-only? -> phai co separate middleware, khong chi check role trong controller
```

Viet ra authorization matrix:

| Endpoint | Unauthenticated | User | Admin |
|----------|----------------|------|-------|
| GET /... | | | |
| POST /... | | | |

---

## Buoc 6 — Input Validation Plan

Cho moi input field, xac dinh:

```
phone: string, bat buoc, regex /^(03|05|07|08|09)[0-9]{8}$/, max 10 chars
packageCode: string, bat buoc, alphanumeric, max 20 chars
...
```

Server-side validation la bat buoc. Client-side la optional (UX).

---

## Buoc 7 — Implementation

Chi bat dau viet code sau khi buoc 1-6 da clear.

Tuan thu:
- `.agents/rules/05-architecture.md` (layered architecture)
- `.agents/rules/02-code-quality.md` (code standards)
- `.agents/rules/07-dependency.md` (truoc khi them package moi)

---

## Buoc 8 — Tests

Tuan thu `.agents/rules/08-testing.md`.

Bat buoc:
```
[ ] Unit test cho service layer logic
[ ] Test happy path
[ ] Test error case (invalid input, unauthorized, not found)
[ ] Neu co auth: test unauthorized va forbidden
[ ] Neu co IDOR risk: test cross-user access
```

---

## Buoc 9 — Self Security Review

Truoc khi nop PR, chay qua checklist nhanh:

```
[ ] Khong co hardcoded secret?
[ ] Authentication duoc kiem tra?
[ ] Authorization duoc kiem tra tung resource?
[ ] Input duoc validate phia server?
[ ] Output khong tra ve field thua?
[ ] Log khong chua PII?
[ ] npm audit: khong co critical/high CVE?
```

Neu bat ky item nao FAIL: sua truoc khi nop PR.

---

## Output cua Skill

Sau khi hoan thanh workflow, tao summary:

```markdown
## Feature: [ten feature]

### Decisions Made
- Architecture: [chon layer nao, file nao]
- Auth: [yeu cau gi]
- Data: [SENSITIVE fields nao duoc xu ly]
- API contract: [endpoint, method, payload]

### Security Controls Applied
- [Liet ke cac control da implement]

### Test Coverage
- [So test case, cac scenario da cover]

### Open Items (can human review)
- [Bat ky dieu gi con chua ro hoac can quyet dinh tu nguoi]
```

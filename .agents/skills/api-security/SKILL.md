---
name: api-security
description: >
  Kiem tra bao mat API theo OWASP API Security Top 10 2023 cho MobiFone.
  Ap dung cho REST API, backend endpoints, BFF layer. Invoke khi user noi
  "review API", "kiem tra endpoint", "API security", "OWASP API Top 10",
  "co IDOR khong", "rate limiting", "authentication API".
license: proprietary
metadata:
  author: mobiops
  version: "1.0.0"
  sources:
    - "OWASP API Security Top 10 2023: https://owasp.org/API-Security/editions/2023/en/0x00-header/"
    - "OWASP ASVS 5.0 V4 Access Control: https://github.com/OWASP/ASVS"
    - "OWASP REST Security Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html"
---

# API Security Skill

Kiem tra bao mat API theo OWASP API Security Top 10 2023.

---

## OWASP API Security Top 10 — 2023 Edition

### API1:2023 — Broken Object Level Authorization (BOLA / IDOR)

**Dau hieu nguy hiem:**
```typescript
// SAI — lay theo ID tu request, khong kiem tra ownership
app.get('/api/orders/:id', auth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order); // bat ky user nao cung xem duoc order cua nguoi khac
});

// DUNG — kiem tra ownership
app.get('/api/orders/:id', auth, async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    userId: req.user.id  // chi lay order cua chinh user nay
  });
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json(order);
});
```

**Checklist:**
- [ ] Moi endpoint lay theo ID co kiem tra ownership/permission?
- [ ] Test: user A co the xem data cua user B qua thay doi ID?

---

### API2:2023 — Broken Authentication

**Checklist:**
- [ ] Token duoc validate dung chu ky / secret?
- [ ] Token het han duoc tu choi (khong tu dong gia han)?
- [ ] Credential stuffing: co rate limiting tren login endpoint?
- [ ] Weak password duoc tu choi?
- [ ] JWT: `alg: none` bi tu choi?

---

### API3:2023 — Broken Object Property Level Authorization

**Dau hieu:**
```typescript
// SAI — update toan bo object tu body
app.put('/api/users/:id', auth, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body); // nguoi dung co the tu dat role: "admin"
});

// DUNG — chi cho phep update mot so field
app.put('/api/users/:id', auth, async (req, res) => {
  const allowed = { name: req.body.name, email: req.body.email };
  await User.findByIdAndUpdate(req.params.id, allowed);
});
```

**Checklist:**
- [ ] Moi update endpoint co whitelist field duoc phep?
- [ ] Nguoi dung khong the tu doi `role`, `isAdmin`, `verified`?

---

### API4:2023 — Unrestricted Resource Consumption

**Checklist:**
- [ ] Rate limiting tren cac endpoint ton tai (dac biet: login, OTP, file upload)?
- [ ] Pagination co gioi han toi da? (`limit` max 100, khong cho `limit=999999`)
- [ ] File upload co gioi han kich thuoc?
- [ ] Query co the gay database scan toan bo table?

---

### API5:2023 — Broken Function Level Authorization

**Checklist:**
- [ ] Admin endpoints (`/api/admin/*`) co middleware rieng khong?
- [ ] Endpoint xoa / export / bulk action co kiem tra quyen cao hon?
- [ ] HTTP method switching: `GET /api/users` vs `DELETE /api/users` co quyen khac nhau?

---

### API6:2023 — Unrestricted Access to Sensitive Business Flows

**Dau hieu trong MobiFone context:**
- Dang ky goi cuoc khong co rate limit → có thể dang ky hang loat.
- Resend OTP khong co cooldown → OTP brute force.
- Export data khach hang khong co gioi han → data scraping.

**Checklist:**
- [ ] Business-critical actions co anti-automation (rate limit, CAPTCHA)?
- [ ] Resend OTP / email co cooldown?

---

### API7:2023 — Server Side Request Forgery (SSRF)

**Dau hieu:**
```typescript
// NGUY HIEM — fetch URL tu user
app.post('/api/fetch', async (req, res) => {
  const data = await fetch(req.body.url); // SSRF
});
```

**Checklist:**
- [ ] Co endpoint nao fetch URL tu user cung cap?
- [ ] Neu co: whitelist domain duoc phep, block 169.254.x.x, 10.x.x.x, 172.16-31.x.x, 192.168.x.x.

---

### API8:2023 — Security Misconfiguration

**Checklist:**
- [ ] CORS: `Access-Control-Allow-Origin: *` trong production?
- [ ] Debug mode / verbose error trong production?
- [ ] Default credentials chua doi?
- [ ] Unnecessary HTTP methods (TRACE, PUT) duoc disable?
- [ ] Security headers (xem `10-production.md`)?

---

### API9:2023 — Improper Inventory Management

**Checklist:**
- [ ] Co endpoint nao khong co trong API documentation nhung van ton tai?
- [ ] API version cu (v1) van chay trong khi v2 da ra?
- [ ] Endpoint test / debug trong production code?

---

### API10:2023 — Unsafe Consumption of APIs

**Checklist:**
- [ ] Du lieu tu external API (MobiFone backend) co duoc validate truoc khi dung?
- [ ] External API error co duoc xu ly, khong de crash ung dung?
- [ ] Timeout duoc set cho tat ca external API call?

---

## Output Report

```markdown
# API Security Review

**Scope:** [endpoint hoac module]
**Date:** [ngay]

## Findings theo OWASP API Top 10

| ID | Category | Finding | Severity | Status |
|----|---------|---------|---------|--------|
| API1 | BOLA | [mo ta] | HIGH | OPEN |
| ... | | | | |

## Recommendations

[Danh sach hanh dong cu the]
```

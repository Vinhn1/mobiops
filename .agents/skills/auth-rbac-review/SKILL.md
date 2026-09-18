---
name: auth-rbac-review
description: >
  Review Authentication va RBAC (Role-Based Access Control) cho MobiFone Admin CMS
  va Mini App. Kiem tra phan biet Authentication vs Authorization, RBAC model chinh xac,
  privilege escalation, va IDOR. Invoke khi user noi "review auth", "kiem tra quyen",
  "RBAC", "role permission", "ai duoc lam gi", "authorization".
license: proprietary
metadata:
  author: mobiops
  version: "1.0.0"
  sources:
    - "OWASP ASVS 5.0 V4 Access Control: https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x12-V4-Access-Control.md"
    - "OWASP Authorization Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
    - "OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
---

# Auth & RBAC Review Skill

---

## Phan biet Authentication vs Authorization

```
Authentication:          Authorization:
"Ban la ai?"             "Ban duoc lam gi?"
     |                        |
  Token / JWT            Role + Permission
  OTP / Password         Resource ownership
  Session                Action rules
```

**Anti-pattern nguy hiem:**
```typescript
// SAI — chi check "dang nhap" cho ca endpoint quan trong
if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
// -> bat ky user nao cung xoa duoc don hang cua nguoi khac!

// DUNG — check ca authentication + authorization
if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
if (!req.user.permissions.includes('order:delete'))
  return res.status(403).json({ error: 'Forbidden' });
```

---

## Buoc 1 — Kiem tra Authentication

```
[ ] Moi protected endpoint co middleware xac thuc khong?
[ ] Middleware duoc ap tren ROUTE GROUP, khong ap tung endpoint rieng le?
    (ap rieng le de so lo sot)
[ ] JWT signature duoc verify dung key/secret?
[ ] JWT expiry duoc kiem tra?
[ ] JWT `alg` field duoc whitelist (khong chap nhan `none`)?
[ ] Refresh token co duoc revoke khi logout?
[ ] Sau doi mat khau: tat ca token cu bi invalidate?
```

---

## Buoc 2 — Kiem tra RBAC Model

**RBAC model chuan cho MobiFone:**

```
User
  |
  +-- Role (vi du: content_admin, super_admin, viewer)
        |
        +-- Permission set (vi du: promotion.read, promotion.write)
              |
              +-- Resource + Action
```

**Checklist:**

```
[ ] Role duoc dinh nghia o dau? (enum, database, config?)
[ ] Permission duoc luu o dau? (database, JWT claim, config?)
[ ] Co danh sach day du Role va Permission khong?
[ ] "Super admin" co duoc giam sat biet khong?
```

**Anti-pattern can tranh:**

```typescript
// SAI — check role theo string, de sai chinh ta
if (req.user.role === 'admin') { ... }

// DUNG — dung enum / constant
enum Role {
  SUPER_ADMIN = 'super_admin',
  CONTENT_ADMIN = 'content_admin',
  VIEWER = 'viewer',
}

// SAI — mot check cho moi thu
if (req.user.role === 'admin') { // admin lam duoc moi thu? }

// DUNG — granular permission
if (!req.user.permissions.includes(Permission.PROMOTION_DELETE)) {
  return res.status(403).json({ error: 'Forbidden' });
}
```

---

## Buoc 3 — Kiem tra Resource-level Authorization

**Horizontal privilege escalation (IDOR):**

```
[ ] User co the truy cap / sua / xoa resource cua user khac?
[ ] Endpoint lay `id` tu URL co kiem tra ownership?
[ ] Batch endpoint co kiem tra tung item?
```

**Vertical privilege escalation:**

```
[ ] User thuong co the thay doi role / permission cua chinh minh?
[ ] Admin endpoint co the duoc truy cap boi user thuong qua URL manipulation?
```

---

## Buoc 4 — Danh gia Authorization Matrix

Tao hoac xac minh authorization matrix cho feature dang review:

| Endpoint / Action | Unauthenticated | User (viewer) | Content Admin | Super Admin |
|-------------------|----------------|--------------|--------------|------------|
| GET /promotions | OK | OK | OK | OK |
| POST /promotions | 401 | 403 | OK | OK |
| DELETE /promotions/:id | 401 | 403 | 403 | OK |
| GET /users | 401 | 403 | 403 | OK |

Neu matrix nay chua ton tai: day la finding. Can tao truoc khi code.

---

## Buoc 5 — Kiem tra Edge Cases

```
[ ] Token expired + action quan trong: bi tu choi hay duoc tiep tuc?
[ ] User bi vo hieu hoa (disabled account): token cu van dung duoc?
[ ] Role thay doi: co can logout lai khong? (token co mang role cu?)
[ ] Multi-tab: logout mot tab co affect tab khac?
```

---

## Output Report

```markdown
# Auth & RBAC Review

**Module:** [ten]
**Date:** [ngay]

## Authentication Status

[ ] PASS — authentication duoc ap dung dung
[ ] FAIL — [mo ta van de]

## Authorization Status

[ ] PASS — authorization du tin cay
[ ] FAIL — [mo ta van de]

## Authorization Matrix

[Bang matrix]

## Findings

### [HIGH/MEDIUM/LOW]-001 — [Ten finding]

[Mo ta, file, dong, khuyen nghi]

## Recommendations

1. [Hanh dong]
```

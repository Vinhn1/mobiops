---
name: database-security
description: >
  Kiem tra bao mat database cho MobiFone project: SQL/NoSQL injection, least privilege,
  migration safety, query security va ORM misuse. Invoke khi user noi "database security",
  "kiem tra query", "SQL injection", "migration an toan", "database permission",
  "ORM security".
license: proprietary
metadata:
  author: mobiops
  version: "1.0.0"
  sources:
    - "OWASP SQL Injection Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"
    - "OWASP Query Parameterization Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html"
    - "OWASP ASVS 5.0 V5.3 Output Encoding: https://github.com/OWASP/ASVS"
    - ".agents/rules/10-production.md ENV5"
---

# Database Security Skill

Kiem tra bao mat tat ca tuong tac voi database.

---

## Buoc 1 — SQL Injection

**Pattern SAI (can block ngay):**

```typescript
// SAI — noi chuoi SQL
const query = `SELECT * FROM users WHERE phone = '${phone}'`;
db.query(query);

// SAI — template literal trong ORM raw query
const result = await prisma.$queryRaw`
  SELECT * FROM users WHERE phone = '${phone}'  -- SAI
`;
```

**Pattern DUNG:**

```typescript
// DUNG — parameterized query
const query = 'SELECT * FROM users WHERE phone = ?';
db.query(query, [phone]);

// DUNG — Prisma parameterized raw
const result = await prisma.$queryRaw`
  SELECT * FROM users WHERE phone = ${phone}
`;
// (Prisma tu dong dung placeholder cho Prisma.$queryRaw template literals)

// DUNG — ORM query builder (an toan nhat)
const user = await prisma.users.findFirst({
  where: { phone }
});
```

**Checklist:**

```
[ ] Co raw SQL query noi chuoi voi user input?
[ ] ORM query builder duoc dung cho business logic?
[ ] $queryRaw / query() chi dung khi thuc su can, voi parameterized?
```

---

## Buoc 2 — NoSQL Injection (neu dung MongoDB / DynamoDB)

**Pattern nguy hiem:**

```typescript
// SAI — user co the gui { phone: { $gt: '' } }
const user = await User.findOne({ phone: req.body.phone });

// DUNG — validate type truoc
const phone = String(req.body.phone); // dam bao la string
const user = await User.findOne({ phone });
```

**Checklist:**

```
[ ] Input duoc validate la dung type truoc khi dua vao query?
[ ] Co cho phep user truyen operator MongoDB ($gt, $where)?
[ ] Schema validation (mongoose/joi/zod) duoc ap truoc khi query?
```

---

## Buoc 3 — Least Privilege Account

**Nguon: .agents/rules/10-production.md ENV5.2**

```
[ ] Ung dung dung account database nao?
[ ] Account do co chi quyen SELECT/INSERT/UPDATE/DELETE tren cac table can thiet?
[ ] KHONG dung root / sa / DBA account cho ung dung?
[ ] DDL operations (CREATE, DROP, ALTER) co tach thanh account rieng?
[ ] Co ket noi database string nao chua credential admin?
```

---

## Buoc 4 — Migration Safety

**Nguon: .agents/rules/10-production.md ENV5.1**

Quet cac migration file (Prisma migrations, Sequelize migrations, SQL files):

```
[ ] Co migration nao DROP TABLE / DROP COLUMN?
[ ] Co migration nao TRUNCATE?
[ ] Co migration nao ALTER COLUMN xoa data?
[ ] Neu co: co rollback plan khong?
[ ] Migration co duoc review truoc khi chay len staging/production?
```

**Rule:**

AI KHONG tu dong propose chay migration trong production context.
Migration phai co human approval.

---

## Buoc 5 — Query Performance (security-related)

```
[ ] Co query khong co WHERE clause -> quet toan bo table -> DoS risk?
[ ] Pagination co gioi han toi da? (khong cho fetch 100k records)
[ ] Co N+1 query problem -> doi voi data lon co the gay hieu nang kem?
```

---

## Buoc 6 — Sensitive Data in Database

```
[ ] Password duoc hash bang bcrypt / argon2? (khong MD5, SHA1)
[ ] Truong SENSITIVE duoc ma hoa at-rest neu can thiet?
[ ] Encryption key khong duoc luu cung database?
[ ] Backup database co duoc ma hoa?
```

---

## Output Report

```markdown
# Database Security Review

**Scope:** [ORM / raw queries / migration files]
**Date:** [ngay]

## SQL/NoSQL Injection

| Finding | File | Line | Severity |
|---------|------|------|---------|
| [mo ta] | | | |

## Permission Model

| Item | Status |
|------|--------|
| Least privilege account | PASS / FAIL |
| No root/admin account in app | PASS / FAIL |

## Migration Safety

| Migration | Risk | Rollback Plan |
|-----------|------|--------------|

## Findings

[Chi tiet]

## Recommendations

[Danh sach hanh dong]
```

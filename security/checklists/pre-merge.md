# Pre-Merge Security Checklist

<!--
  Dung truoc khi nop PR hoac request merge.
  Developer tu chay checklist nay. Neu bat ky item CRITICAL fail: khong nop PR.
  Ket qua co the paste vao PR description.
-->

## CRITICAL — Fail = Block merge

### Secrets

```
[ ] Khong co API key, password, token nao bi hardcode trong code moi them?
[ ] Khong co .env file nao bi them vao commit?
[ ] `process.env.X || 'hardcoded-fallback'` voi hardcoded la secret: KHONG co?
```

### Authentication & Authorization

```
[ ] Moi endpoint moi them co authentication middleware?
[ ] Moi endpoint co resource ID co kiem tra ownership (chong IDOR)?
[ ] Admin endpoint co guard rieng (khong chi check role trong controller)?
```

### Input Validation

```
[ ] Moi input tu user co duoc validate phia server?
[ ] File upload (neu co): MIME type va extension duoc kiem tra?
[ ] Khong co raw SQL noi chuoi voi user input?
```

### Test

```
[ ] Unit test da duoc viet va chay xanh?
[ ] Cac security-sensitive test case co trong test file?
[ ] CI tren branch nay da pass?
```

---

## HIGH — Strongly recommended

### Code Quality

```
[ ] Khong co `any` trong TypeScript ma khong co ly do?
[ ] Khong co `console.log` duoc de lai trong code production?
[ ] Khong co dead code, commented-out code?
[ ] Ham/component co single responsibility?
```

### Dependencies

```
[ ] Khong them package moi ma chua qua quy trinh `07-dependency.md`?
[ ] `npm audit` khong co CRITICAL/HIGH?
[ ] Lockfile duoc cap nhat va commit?
```

### Logging

```
[ ] Log khong chua plain text: phone, password, token?
[ ] Error handler khong expose stack trace cho client?
```

---

## MEDIUM — Should fix

```
[ ] TODO / FIXME con lai trong code da duoc ghi ticket?
[ ] API response khong tra ve field thua (khong return ca user object khi chi can id, name)?
[ ] Rate limiting co tren cac action quan trong?
[ ] Comment giai thich "tai sao" voi logic phuc tap?
```

---

## Kiem tra nhanh truoc khi push

```bash
# Chay cac lenh sau truoc khi git push

# 1. Lint
npm run lint

# 2. Type check
npx tsc --noEmit

# 3. Test
npm test

# 4. Secret scan (neu co gitleaks)
gitleaks protect --staged --redact

# 5. Dependency audit
npm audit --audit-level=high
```

---

## Template de paste vao PR Description

```markdown
## Security Checklist (Pre-Merge)

**Tong kiet qua:**
- Critical items: [X] tat ca pass / [F] [so luong] fail
- High items: [X] tat ca pass / [thieu gi?]
- Secret scan: PASS / FAIL
- npm audit: PASS / FAIL (neu fail: [CVE, muc do])

**AI-generated code:**
- [ ] Khong co AI-generated code
- [ ] Co AI-generated code, da review: [mo ta phan nao]

**Security notes:**
[Ghi bat ky note bao mat dac biet cho reviewer]
```

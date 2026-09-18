# Pre-Production Security Checklist

<!--
  Dung truoc moi lan deploy len production.
  Day la gate cuoi cung. Neu bat ky CRITICAL item fail: KHONG deploy.
  Phai co sign-off tu nguoi co quyen (tech lead / security owner).
-->

## Ky hieu

- `[x]` PASS
- `[F]` FAIL — ghi ro ly do
- `[W]` Waived — duoc chap nhan voi ly do: _____________
- `[N/A]` Khong ap dung

---

## Section A — Security Gate CI/CD

Tat ca check nay phai PASS tren commit duoc deploy:

```
[ ] Lint: PASS
[ ] TypeScript type check: PASS
[ ] Unit tests: PASS
[ ] Integration tests: PASS
[ ] SAST (Semgrep): khong co rule-severity=error findings
[ ] Secret scan (Gitleaks): CLEAN — khong phat hien secret
[ ] Dependency scan (OSV-Scanner): khong co CRITICAL CVE
[ ] Code review: da duoc human approve tren GitHub
```

---

## Section B — Configuration Verification

Tat ca phai duoc kiem tra tren environment production THUC TE,
khong chi tren staging:

```
[ ] NODE_ENV=production
[ ] DATABASE_URL tro dung production database
[ ] JWT_SECRET la gia tri production (khong phai dev/test value)
[ ] Tat ca required env vars co gia tri (ung dung se validate khi khoi dong)
[ ] Log level: WARN hoac ERROR (khong phai DEBUG)
[ ] Debug mode / verbose error: OFF
[ ] CORS origin: whitelist cu the (khong co *)
```

---

## Section C — Database & Migration

```
[ ] Migration da chay tren staging va ket qua dung?
[ ] Migration khong co destructive operation? (neu co: xem muc duoi)
[ ] Backup production database da duoc thuc hien?
[ ] Ket noi database dung account least-privilege?
[ ] Khong co raw credential trong connection string trong env sai?
```

**Neu co destructive migration (DROP, TRUNCATE, ALTER xoa column):**

```
[ ] Team lead da duoc thong bao va dong y?
[ ] Rollback plan da duoc viet ra?
[ ] Maintenance window da duoc xac nhan?
```

---

## Section D — Application Security

```
[ ] Security headers duoc cau hinh dung:
    [ ] Strict-Transport-Security
    [ ] Content-Security-Policy
    [ ] X-Content-Type-Options: nosniff
    [ ] X-Frame-Options: DENY
    [ ] Referrer-Policy
[ ] HTTPS duoc enforce (HTTP redirect sang HTTPS)?
[ ] Error response khong expose stack trace?
[ ] Rate limiting duoc kich hoat?
[ ] File upload security (neu co): MIME check, size limit?
```

---

## Section E — Rollback Plan

Ba cau hoi bat buoc phai co cau tra loi truoc khi deploy:

**E1. Neu deploy that bai o giua:**
```
Hanh dong: _________________________________________________
Ai thuc hien: _______________________________________________
Thoi gian du kien: __________________________________________
```

**E2. Neu phat hien bug sau deploy:**
```
Phien ban rollback den: _____________________________________
Tag / commit: _______________________________________________
Lenh rollback: ______________________________________________
```

**E3. Database migration rollback:**
```
[ ] Co rollback migration? (neu khong: ghi ro ly do)
Lenh rollback: _______________________________________________
```

---

## Section F — Monitoring

```
[ ] Health check endpoint hoat dong va duoc monitor?
[ ] Alert duoc cau hinh cho error rate tang dot bien?
[ ] Log co the truy cap khi can debug incident?
```

---

## Sign-off (bat buoc)

```
Deploy duoc thuc hien boi:    _______________________________
Nguoi sign-off (tech lead):   _______________________________
Thoi gian deploy:             _______________________________
Phien ban / tag:              _______________________________

[ ] Toi xac nhan tat ca CRITICAL items da pass hoac duoc waive voi ly do.
[ ] Rollback plan da san sang.
[ ] Toi hieu pham vi thay doi cua deployment nay.
```

---

## Neu phat hien van de o day

**DUNG** va tra loi cac cau hoi:
1. Van de co the duoc giai quyet nhanh (< 30 phut) khong?
2. Van de co anh huong den bao mat khong?
3. Co the deploy khong co feature nay (feature flag) khong?

Neu khong the giai quyet an toan: postpone deploy va fix truoc.
"Deploy va fix sau" la rui ro chap nhan duoc chi voi non-security issues nho.

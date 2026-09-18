# OWASP ASVS 5.0 — Level 1 Checklist

<!--
  NGUON GOC:
  OWASP ASVS 5.0.0 (phat hanh 30/05/2025)
  GitHub: https://github.com/OWASP/ASVS/tree/v5.0.0/5.0/en

  CANH BAO:
  Checklist nay trich ra cac requirement Level 1 quan trong nhat cho context
  MobiFone Ca Mau Mini App (React + Node.js API).
  Day KHONG PHAI ban day du cua ASVS 5.0.
  Audit chinh thuc phai doi chieu voi file ASVS 5.0 goc tren GitHub.

  LICH SU:
  Tao: 2026-09-18
  Cap nhat khi: project co thay doi cong nghe lon hoac ASVS co phien ban moi.
-->

## Huong dan dung

- `[ ]` = Chua kiem tra
- `[x]` = Da pass
- `[F]` = Fail — can ghi ro finding
- `[N/A]` = Khong ap dung cho project nay

Khi gap `[F]`, tao finding trong security report tuong ung.

---

## V14 — Authentication (trich Level 1)

```
[ ] V14.1 — Ung dung khong cho phep login bang default credential (admin/admin).
[ ] V14.2 — Ung dung co co che chong password brute force (lockout hoac delay).
[ ] V14.3 — Password phai du do phuc tap (toi thieu 8 ky tu hoac theo NIST SP 800-63B).
[ ] V14.4 — Password duoc hash bang thuat toan hien dai (bcrypt, argon2id, scrypt).
            KHONG dung MD5, SHA1, SHA256 thuan tuy de hash password.
[ ] V14.5 — OTP co thoi gian hieu luc gioi han (khuyen nghi: 5-10 phut).
[ ] V14.6 — Thong bao loi khi sai credential khong tiet lo field nao sai
            ("Email hoac mat khau khong dung", khong phai "Email khong ton tai").
```

---

## V15 — Access Control (trich Level 1)

```
[ ] V15.1 — Nguyen tac deny-by-default: neu khong co grant ro rang thi bi tu choi.
[ ] V15.2 — Kiem tra quyen duoc thuc hien phia server, khong chi phia client.
[ ] V15.3 — User chi truy cap duoc resource cua chinh minh (khong IDOR).
[ ] V15.4 — Admin chuc nang chi truy cap duoc boi nguoi co role admin.
[ ] V15.5 — Directory listing bi tat tren web server.
[ ] V15.6 — File metadata (backup, .bak, .git) khong bi expose qua web server.
```

---

## V4 — Session Management (trich Level 1)

```
[ ] V4.1 — Session token duoc tao bang CSPRNG (cryptographically secure random).
[ ] V4.2 — Session token dai toi thieu 128 bit entropy.
[ ] V4.3 — Session bị invalidate sau logout.
[ ] V4.4 — Session timeout sau thoi gian khong hoat dong.
[ ] V4.5 — Session token khong bao gio trong URL.
[ ] V4.6 — Cookie co HttpOnly flag (chong JavaScript doc cookie).
[ ] V4.7 — Cookie co Secure flag (chi gui qua HTTPS).
[ ] V4.8 — Cookie co SameSite=Strict hoac Lax (giam rui ro CSRF).
```

---

## V1 & V2 — Encoding & Validation (trich Level 1)

```
[ ] V1.1 — Output encoding duoc ap dung phu hop voi context
            (HTML encode cho HTML, URL encode cho URL, v.v.).
[ ] V1.2 — Tat ca user-controlled output duoc encode truoc khi hien thi (chong XSS).
[ ] V2.1 — Input validation duoc thuc hien phia server.
[ ] V2.2 — Input validation dung allowlist (chi chap nhan dung cu the),
            khong dung blacklist (chi tu choi nhung gi biet la xau).
[ ] V2.3 — Structured data (JSON, XML) duoc validate theo schema.
[ ] V2.4 — URL redirect chi den whitelist destination.
```

---

## V5 — Cryptography (trich Level 1)

```
[ ] V5.1 — Ung dung khong dung thuat toan ma hoa da loi thoi:
            MD5, SHA1, DES, 3DES, RC4 bi cam hoan toan.
[ ] V5.2 — Khong dung ham random khong an toan cho security purpose:
            Math.random() KHONG duoc dung de tao token, OTP, session ID.
[ ] V5.3 — Khoa ma hoa co do dai phu hop: RSA >= 2048 bit, AES >= 128 bit.
[ ] V5.4 — Private key va symmetric key duoc luu an toan, khong trong source code.
```

---

## V6 — Error Handling and Logging (trich Level 1)

```
[ ] V6.1 — Ung dung khong tiet lo stack trace hoac thong tin noi bo cho user.
[ ] V6.2 — Log duoc ghi cho cac su kien bao mat: login thanh cong/that bai,
            permission denied, admin action.
[ ] V6.3 — Log khong chua password, token, hoac thong tin nhay cam (SENSITIVE data).
[ ] V6.4 — Log duoc luu an toan, khong ghi de duoc boi user.
```

---

## V7 — Data Protection (trich Level 1)

```
[ ] V7.1 — Du lieu nhay cam khong duoc cache boi browser (Cache-Control: no-store).
[ ] V7.2 — Du lieu nhay cam khong trong URL (vi du: token, password trong query string).
[ ] V7.3 — Application luu tru toi thieu du lieu ca nhan can thiet.
```

---

## V8 — Communication (trich Level 1)

```
[ ] V8.1 — Tat ca ket noi su dung TLS (HTTPS, khong HTTP thuan tuy).
[ ] V8.2 — TLS version hien dai: TLS 1.2 toi thieu, TLS 1.3 duoc khuyen nghi.
[ ] V8.3 — Certificate hop le, khong su dung self-signed trong production.
[ ] V8.4 — HSTS header duoc cau hinh.
```

---

## V13 — Configuration (trich Level 1)

```
[ ] V13.1 — Components khong con duoc su dung bi xoa (dead code, unused dependencies).
[ ] V13.2 — Thong tin debug bi tat trong production.
[ ] V13.3 — HTTP security headers duoc cau hinh:
            X-Content-Type-Options: nosniff
            X-Frame-Options: DENY hoac SAMEORIGIN
            Referrer-Policy: strict-origin-when-cross-origin
[ ] V13.4 — CORS duoc cau hinh voi whitelist, khong dung wildcard (*) trong production.
[ ] V13.5 — Khong co credential nao trong source code.
[ ] V13.6 — Dependencies khong co known critical vulnerability.
```

---

## V12 — API and Web Services (trich Level 1)

```
[ ] V12.1 — Tat ca API endpoint su dung authentication tru endpoint danh cho public.
[ ] V12.2 — HTTP method duoc gioi han phu hop (endpoint chi nhan dung method can thiet).
[ ] V12.3 — JSON parse duoc goi han size de chong JSON bomb / large payload attack.
[ ] V12.4 — Content-Type header duoc validate (khong xu ly payload sai type).
```

---

## V10 — Business Logic (trich Level 1)

```
[ ] V10.1 — Business logic flow khong the bi bypass (vi du: bo qua buoc thanh toan).
[ ] V10.2 — He thong chong replay attack cho cac action quan trong (OTP dung lai).
[ ] V10.3 — Gioi han toc do cho cac action co gia tri: dang ky, OTP resend, order.
```

---

## Tong ket kiem tra

| Chuong | Tong so check | Pass | Fail | N/A |
|--------|--------------|------|------|-----|
| V14 Authentication | 6 | | | |
| V15 Access Control | 6 | | | |
| V4 Session | 8 | | | |
| V1-V2 Validation | 6 | | | |
| V5 Cryptography | 4 | | | |
| V6 Error/Logging | 4 | | | |
| V7 Data Protection | 3 | | | |
| V8 Communication | 4 | | | |
| V13 Configuration | 6 | | | |
| V12 API | 4 | | | |
| V10 Business Logic | 3 | | | |
| **TONG** | **54** | | | |

**Pass rate muc tieu: >= 80% de xem la acceptable cho Sprint hien tai.**

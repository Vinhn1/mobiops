# Security Policy — MobiFone Ca Mau Mini App

<!--
  NGUON GOC:
  Template theo: https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository
  Adapted for MobiFone internal project context.
-->

## Phien ban duoc ho tro

| Phien ban | Ho tro bao mat |
|-----------|---------------|
| `main` (latest) | Da |
| `develop` | Da (pre-release) |
| Phien ban cu hon 3 thang | Khong |

---

## Bao cao Vulnerability

**KHONG dung GitHub Issues de bao cao security vulnerability.**

Neu ban phat hien van de bao mat trong project nay:

### Quy trinh bao cao

1. **Dung GitHub Private Security Advisory:**
   - Vao tab **Security** cua repo
   - Chon **Advisories** → **New draft security advisory**
   - Mo ta van de va submit

   Hoac:

2. **Gui email den security owner:**
   - Email: [dia chi email cua security owner — dien vao truoc khi dung]
   - Tieu de: `[SECURITY] <Mo ta ngan]`
   - Encrypt bang PGP neu co the (key: [link hoac fingerprint])

### Thong tin can bao cao

- Mo ta van de va tac dong tiep nhan
- Cach tai tao (reproduction steps)
- Phien ban bi anh huong
- De xuat cach khac phuc (neu co)

### SLA xu ly

| Severity | Thoi gian xac nhan | Thoi gian sua |
|----------|------------------|--------------|
| CRITICAL | 24 gio | 48 gio |
| HIGH | 48 gio | 7 ngay |
| MEDIUM | 72 gio | 30 ngay |
| LOW | 7 ngay | Tuy sprint |

---

## Pham vi (In Scope)

Van de bao mat sau duoc chap nhan de bao cao:

- Authentication bypass
- Authorization flaws / privilege escalation
- Injection vulnerabilities (SQL, NoSQL, command)
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Sensitive data exposure
- Security misconfiguration dan den khai thac thuc te
- Server-Side Request Forgery (SSRF)
- Insecure Direct Object Reference (IDOR)

## Ngoai pham vi (Out of Scope)

Cac muc sau KHONG thuoc pham vi:

- DoS / DDoS attacks
- Social engineering
- Van de tren infrastructure ben ngoai project (CDN, nha cung cap)
- Bugs khong co tac dong bao mat
- Vulnerabilities trong dependencies ma upstream chua co fix

---

## Chinh sach Responsible Disclosure

- Chung toi cam ket xu ly bao cao trong thoi han neu tren.
- Khong thuc hien hanh dong phap ly voi nguoi bao cao hop le tuan thu quy trinh nay.
- Credit duoc ghi nhan (neu nguoi bao cao muon) trong changelog hoac advisory.
- KHONG public thong tin ve vulnerability truoc khi da co patch va team duoc thong bao.

---

## Security Contacts

| Role | Lien he |
|------|---------|
| Security Owner | [Ten — Email] |
| Tech Lead | [Ten — Email] |
| Emergency | [So dien thoai hoac kenh khac] |

*Cap nhat thong tin lien he truoc khi public repo.*

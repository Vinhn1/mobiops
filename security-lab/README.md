# Security Lab — MobiFone Ca Mau Mini App

## Muc dich

`security-lab/` la thu muc hoc tap ve bao mat ung dung web, phuc vu:

- Hieu ro cac loai vulnerability qua mo ta va code pattern (khong phai app chay duoc).
- Lien he ly thuyet bao mat voi code thuc te trong project.
- Dao tao developer moi ve Secure Coding.
- Tai lieu tham khao khi gap van de tuong tu trong production.

---

## CANH BAO

> **Day KHONG PHAI vulnerable application chay duoc.**
>
> Khong co code nao trong thu muc nay co the deploy hoac chay.
> Day la tai lieu hoc tap duoi dang Markdown va code snippet.
>
> Neu can hoc voi app chay duoc thuc te, su dung:
> - OWASP WebGoat: https://github.com/WebGoat/WebGoat
> - OWASP Juice Shop: https://github.com/juice-shop/juice-shop
> - DVWA: https://github.com/digininja/DVWA
>
> Cac app tren KHONG DUOC chay tren network co the truy cap tu ben ngoai.
> Chi chay tren localhost hoac lab environment co kiem soat.

---

## Cau truc thu muc

```
security-lab/
├── README.md                   <- File nay
├── vulnerabilities/
│   ├── A01-idor.md             <- OWASP A01: IDOR / BOLA
│   ├── A02-cryptographic.md    <- OWASP A02: Cryptographic Failures
│   ├── A03-injection.md        <- OWASP A03: Injection (SQL, NoSQL, Command)
│   ├── A04-insecure-design.md  <- OWASP A04: Insecure Design
│   ├── A05-misconfiguration.md <- OWASP A05: Security Misconfiguration
│   ├── A06-vulnerable-deps.md  <- OWASP A06: Vulnerable Dependencies
│   ├── A07-auth-failures.md    <- OWASP A07: Authentication Failures
│   ├── A08-ssrf.md             <- OWASP A08: SSRF
│   ├── A09-logging.md          <- OWASP A09: Security Logging Failures
│   └── A10-xss.md              <- XSS (trong OWASP Top 10 2021)
├── mobifone-context/
│   ├── phone-number-attacks.md <- Tan cong dac thu so dien thoai VN
│   ├── otp-bypass.md           <- OTP bypass patterns
│   └── subscription-abuse.md   <- Abuse cua chuc nang dang ky goi cuoc
└── fix-patterns/
    ├── safe-auth.md             <- Pattern authentication an toan
    ├── safe-query.md            <- Parameterized query examples
    └── safe-output.md           <- Output encoding examples
```

---

## Format cho moi file trong `vulnerabilities/`

Moi file vulnerability co cau truc:

```markdown
# [Ten Vulnerability]

## Ma OWASP
[OWASP Top 10 A0X hoac CWE ID]

## Mo ta
[Giai thich vulnerability la gi, tai sao nguy hiem]

## Pattern nguy hiem (vi du code co loi)
[Code snippet voi chú thích ro rang — KHONG phai code chay duoc]

## Pattern an toan (cach sua)
[Code snippet an toan tuong ung]

## Cach nhan biet trong code review
[Dau hieu de tim trong codebase]

## Reference
[Link den tai lieu chinh thuc]
```

---

## Noi dung hien co

*Thu muc nay con trong. Noi dung se duoc tao dan trong qua trinh training.*

*Uu tien tao truoc cac vulnerability lien quan truc tiep den project:*
- IDOR (lien quan den: Customer ID, Order ID)
- OTP bypass (lien quan den: dang nhap bang OTP)
- Mass assignment (lien quan den: dang ky goi cuoc API)
- SQL/NoSQL injection

---

## Dong gop noi dung

Khi phat hien pattern vulnerability moi trong code review hoac audit:

1. Tao file trong `vulnerabilities/` theo format tren.
2. Ghi ro nguon tham khao (CVE, OWASP, bai viet).
3. Khong dua vao noi dung thuc te tu production (du lieu that, IP that, key that).
4. Submit PR nhu binh thuong.

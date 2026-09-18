# Data Privacy Rules — MobiFone Ca Mau Mini App

<!--
  NGUON GOC (doc truc tiep, khong bia):
  [1] OWASP ASVS 5.0 — Chapter V8: Data Protection
      https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x16-V8-Data-Protection.md
  [2] OWASP Cheat Sheet Series — Logging Cheat Sheet
      https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
  [3] OWASP Cheat Sheet Series — Password Storage Cheat Sheet
      https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
  [4] Vietnam Personal Data Protection Decree 13/2023/ND-CP (hieu luc tu 01/07/2023)
      https://vanban.chinhphu.vn/?pageid=27160&docid=206998
-->

## D1 — Phan loai du lieu

**Nguon: OWASP ASVS 5.0, V8.1 [1]; Nghi dinh 13/2023/ND-CP [4]**

Truoc khi viet bat ky doan code nao xu ly du lieu,
AI phai xac dinh du lieu thuoc phan loai nao:

| Phan loai | Dinh nghia | Vi du trong he thong MobiFone |
|-----------|-----------|-------------------------------|
| `PUBLIC` | Co the truy cap tu do | Ten goi cuoc (cong khai), lich su khuyen mai, dia chi cua hang |
| `INTERNAL` | Noi bo to chuc | Bao cao doanh thu, danh sach nhan vien, cau hinh he thong |
| `CONFIDENTIAL` | Nhay cam, gioi han truy cap | So dien thoai khach hang, dia chi, lich su giao dich |
| `SENSITIVE` | Rat nhay cam, bao ve cao nhat | CCCD/CMND, thong tin thanh toan, mat khau, token xac thuc |

**Nghi dinh 13/2023/ND-CP [4] — Du lieu ca nhan nhay cam bao gom:**
- So CCCD/CMND, ho chieu.
- So dien thoai (duoc bao ve theo Dieu 2 Khoan 4).
- Thong tin tai chinh, so tai khoan ngan hang.
- Du lieu sinh trac hoc.

---

## D2 — Quy tac xu ly theo phan loai

**D2.1 — SENSITIVE data**

KHONG duoc:
- Luu `password`, `pin`, `secret_key` duoi dang plain text.
- Ghi bat ky SENSITIVE field vao log (du la log debug/dev).
- Tra ve SENSITIVE data trong API response khi khong can thiet.
- Luu SENSITIVE data vao `localStorage`, `sessionStorage`, hoac cookie khong ma hoa.
- Hardcode SENSITIVE value trong source code.

PHAI:
- Ma hoa mat khau bang bcrypt/argon2 (khong MD5, khong SHA1, khong SHA256 thuan tuy).
- Luu token vao HttpOnly cookie hoac memory (khong localStorage).
- Xoa SENSITIVE data khoi bo nho khi khong con dung (set null).

**D2.2 — CONFIDENTIAL data**

- Phai co authentication truoc khi truy cap.
- Phai co authorization: chi nguoi co quyen moi xem duoc.
- Khi log: phai mask (xem D3).
- Khi display tren UI: hoi xem co can hien thi day du khong, hay co the dung partial display.

**D2.3 — PUBLIC data**

- Khong can encryption dac biet.
- Van phai validate input (du la PUBLIC, KHONG trust user input).

---

## D3 — Logging — Quy tac mask du lieu

**Nguon: OWASP Logging Cheat Sheet [2]**

Trich dan [2]:
> "Never log the contents of sensitive form fields such as passwords or credit card numbers."

**D3.1 — Tuyet doi KHONG ghi vao log**

```
password
pin
secret
private_key
api_key
jwt (noi dung)
credit_card_number
cvv
cccd / cmnd number (day du)
```

**D3.2 — Phai mask khi ghi vao log**

```
phone number:    "09******21"   (giu 2 so dau, 2 so cuoi)
email:           "v***@gmail.com"
token (ref):     "[TOKEN_REF:abc123]"   (chi ghi ID tham chieu, khong ghi gia tri)
account_id:      hien thi duoc (day du)
```

**D3.3 — Format mask chuan**

```typescript
// Mask phone number
function maskPhone(phone: string): string {
  if (phone.length < 6) return '***';
  return phone.slice(0, 2) + '******' + phone.slice(-2);
}

// Mask email
function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  return user[0] + '***@' + domain;
}

// KHONG log truc tiep
// logger.info('User login', { phone: req.body.phone }); // SAI

// DUNG
// logger.info('User login', { phone: maskPhone(req.body.phone) }); // DUNG
```

---

## D4 — API Response — Khong expose du lieu thua

**Nguon: OWASP API Security Top 10 2023 — API3:2023 Broken Object Property Level Authorization**

**D4.1 — KHONG tra ve toan bo object database**

```typescript
// SAI — tra ve toan bo user object tu DB
app.get('/user/profile', (req, res) => {
  const user = await db.users.findById(req.user.id);
  res.json(user); // co the bao gom password_hash, internal_flags, v.v.
});

// DUNG — chi tra ve field can thiet
app.get('/user/profile', (req, res) => {
  const user = await db.users.findById(req.user.id);
  res.json({
    name: user.name,
    phone: maskPhone(user.phone),
    // khong tra ve: password_hash, role_flags, internal_id, v.v.
  });
});
```

**D4.2 — Explicit allowlist, khong blacklist**

Chi tra ve nhung field duoc phep ro rang (allowlist).
Khong dung ca tiep thu de loai tru field nhay cam (blacklist co the bi blo sot).

---

## D5 — Data Retention — Khong luu qua lau

**D5.1 — Session / Token**

- Access token: thoi han ngan (khuyen nghi: 15 phut den 1 gio).
- Refresh token: thoi han dai hon nhung phai co revocation.
- Khong luu token het han trong database ma khong xoa.

**D5.2 — Log retention**

- Log chua PII: khong luu qua 30 ngay tru khi co yeu cau compliance.
- Log security event (auth attempt, permission denied): luu du de audit.

---

## D6 — Nhac nho voi du lieu MobiFone

Trong context du an MobiFone Ca Mau Mini App,
cac field sau duoc xem la CONFIDENTIAL hoac SENSITIVE:

- `phone`, `subscriber_id`, `msisdn` — CONFIDENTIAL
- `cmnd`, `cccd`, `passport_number` — SENSITIVE
- `address`, `district`, `province` — CONFIDENTIAL
- `package_history`, `usage_data`, `billing_info` — CONFIDENTIAL
- `token`, `access_token`, `refresh_token` — SENSITIVE
- `password`, `pin`, `otp` — SENSITIVE
- `payment_method`, `bank_account` — SENSITIVE

Khi AI viet code xu ly bat ky field nao trong danh sach tren,
phai ap dung dung quy tac cua phan loai tuong ung.

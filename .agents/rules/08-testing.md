# Testing Rules — MobiFone Ca Mau Mini App

<!--
  NGUON GOC (doc truc tiep, khong bia):
  [1] OWASP Testing Guide v4.2
      https://owasp.org/www-project-web-security-testing-guide/
  [2] OWASP ASVS 5.0 — V5: Validation, Sanitization and Encoding
      https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x13-V5-Validation-Sanitization-Encoding.md
  [3] OWASP AISVS 1.0 — AC.4: Validation of AI-Generated Code
      https://github.com/OWASP/AISVS/blob/main/1.0/en/0x92-Appendix-C_AI_for_Code_Generation.md
  [4] Google Testing Blog — Test Sizes
      https://testing.googleblog.com/2010/12/test-sizes.html
-->

## T1 — Nguyen tac co ban

**T1.1 — Test khong phai tuy chon**

"Code chay duoc tren may minh" khong phai tieu chuan chap nhan duoc.
Moi feature AI viet ra PHAI co test kem theo.

**T1.2 — AI-generated code phai co test truoc khi merge**

Trich dan OWASP AISVS 1.0 AC.4.2 [3]:
> "Automated security testing on every PR containing AI code: SAST, secret scanning, SCA."

Unit test toi thieu phai chay xanh truoc khi nop PR.

**T1.3 — Khong xoa hoac comment-out test de CI pass**

Day la vi pham nghiem trong. Neu test that bai, sua code chu khong sua test.
Tru truong hop test sai, khi do ghi ro ly do trong commit message.

---

## T2 — Test Pyramid

**Nguon: Google Testing Blog [4]**

```
          E2E Tests
         (it nhat)

      Integration Tests
         (vua phai)

       Unit Tests
      (nhieu nhat)
```

**T2.1 — Unit Test**

- Test logic nghiep vu doc lap (khong can server, khong can DB).
- Phai nhanh (< 100ms moi test).
- Moi function/component quan trong phai co unit test.
- Mock external dependencies (API calls, DB).

**T2.2 — Integration Test**

- Test tuong tac giua cac module: service + repository, API + middleware.
- Chay voi test database thay vi production DB.

**T2.3 — E2E Test**

- Test user flow tu dau den cuoi.
- Chi viet cho critical paths: login, thanh toan, dang ky goi cuoc.
- Chay trong CI nhung co the cham hon unit test.

---

## T3 — Coverage Requirements

**T3.1 — Muc coverage toi thieu**

| Loai code | Coverage toi thieu |
|-----------|-------------------|
| Security-critical (auth, authz, payment) | 100% branch coverage |
| Business logic (service layer) | 80% |
| Utility functions | 70% |
| UI components | Khong bat buoc cu the, nhung critical UI phai co |

**T3.2 — Coverage khong phai muc tieu cuoi cung**

100% coverage voi test kem chat luong con toi hon 70% coverage voi test tot.
Test phai kiem tra hanh vi, khong chi la ket qua tra ve.

---

## T4 — Security-sensitive code PHAI co test

**Nguon: OWASP Testing Guide v4.2 [1]**

Cac chuc nang sau PHAI co test case bao gom ca negative case:

**T4.1 — Authentication**
- Dang nhap thanh cong.
- Dang nhap that bai (sai mat khau, sai OTP).
- Account bi khoa sau nhieu lan that bai.
- Token het han.
- Session bi thu hoi.

**T4.2 — Authorization**
- User co quyen truy cap dung resource.
- User KHONG co quyen bi tu choi (403, khong phai redirect).
- Admin endpoint khong truy cap duoc boi user thuong.
- IDOR: user A khong the xem/sua du lieu cua user B.

**T4.3 — Input Validation**
- Input hop le duoc chap nhan.
- Input qua dai bi reject.
- SQL injection payload bi xu ly dung.
- XSS payload bi escape.
- So dien thoai sai dinh dang bi reject.

**T4.4 — File Upload (neu co)**
- File hop le duoc upload thanh cong.
- File vuot gioi han kich thuoc bi reject.
- File co extension khong cho phep bi reject.

---

## T5 — Test Naming Convention

**T5.1 — Format**

```typescript
describe('FeatureName', () => {
  describe('methodName / action', () => {
    it('should [expected behavior] when [condition]', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

**T5.2 — Vi du**

```typescript
describe('CustomerService', () => {
  describe('login', () => {
    it('should return access token when credentials are valid', async () => {
      // ...
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      // ...
    });

    it('should lock account when failed attempts exceed 5', async () => {
      // ...
    });
  });
});
```

---

## T6 — Testing trong CI Pipeline

**T6.1 — Thu tu bat buoc**

```
Lint
  ↓
Type Check (tsc --noEmit)
  ↓
Unit Tests
  ↓
Integration Tests
  ↓
Build (kiem tra khong co loi compile)
  ↓
E2E (optional tuy theo setup)
```

**T6.2 — Fail fast**

Neu Lint hoac Type Check that bai, DUNG o day, khong chay tiep.
Tiet kiem thoi gian CI va tra loi nhanh cho developer.

**T6.3 — Khong skip step trong CI**

AI KHONG duoc them `|| true` hoac `--passWithNoTests` de qua mat buoc kiem tra.
Tru khi co y kien ro rang tu nguoi co quyen.

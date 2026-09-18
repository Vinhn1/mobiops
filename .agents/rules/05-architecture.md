# Architecture Rules — MobiFone Ca Mau Mini App

<!--
  NGUON GOC (doc truc tiep, khong bia):
  [1] Clean Architecture — Robert C. Martin (Uncle Bob)
      https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
  [2] Layered Architecture Pattern — Microsoft Application Architecture Guide
      https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier
  [3] Domain-Driven Design — Eric Evans (trich dan tu cac bai viet cong dong)
  [4] OWASP Secure Coding Practices - Separation of Concerns
      https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/
-->

## A1 — Nguyen tac phan tang (Layered Architecture)

**A1.1 — Thu tu phu thuoc bat buoc**

AI phai ton trong thu tu phu thuoc sau. Lop tren co the goi lop duoi.
Lop duoi KHONG duoc biet den lop tren.

```
Presentation Layer   (React components, pages, layouts)
        ↓
Application Layer    (hooks, use cases, business logic)
        ↓
Domain Layer         (entities, value objects, interfaces)
        ↓
Infrastructure Layer (API clients, database, file system, external services)
```

**A1.2 — Vi pham nghiem cam**

AI KHONG duoc tao:

- React component goi truc tiep database / SQL query.
- React component goi truc tiep external API (khong qua service/hook).
- Business logic nam trong UI component.
- Infrastructure code nam trong domain layer.

**A1.3 — Node.js Backend (neu co)**

```
Controller / Route Handler
        ↓
Service (business logic)
        ↓
Repository (data access)
        ↓
Database / External API
```

Controller KHONG duoc chua SQL query. Repository KHONG duoc chua business logic.

---

## A2 — Kiem tra truoc khi tao module moi

**A2.1 — Thu tu bat buoc khi nhan yeu cau tao module/feature moi**

1. Doc cac file trong thu muc hien tai cua project.
2. Kiem tra da co module tuong tu chua (tranh duplicate).
3. Kiem tra gia tri cua pattern da dung trong codebase.
4. Chi tao moi khi khong co gi co the tai su dung hoac extend.

**A2.2 — Khong tu tao ten thu muc "an toan" de tranh xung dot**

AI KHONG duoc tu y tao nhung thu muc kieu:

```
utils2/
helpers-new/
common2/
services-final/
service-new/
api-v2/
temp-fix/
```

Neu ten thu muc da ton tai va co xung dot, BAO CAO cho nguoi dung thay vi tu dat ten moi.

**A2.3 — Khong tao "junk drawer"**

Khong tao file `utils.ts` / `helpers.ts` / `common.ts` chua moi thu linh tinh.
Moi module phai co trach nhiem ro rang (Single Responsibility).
Neu khong biet dat ten -> day la dau hieu chua hieu ro domain.

---

## A3 — Module Boundaries

**A3.1 — Khong deep import**

Khong import tu duong dan internal cua module khac:

```typescript
// SAI — import truc tiep vao internal
import { validatePhone } from '../customer/utils/validators/phone';

// DUNG — import tu public API cua module
import { validatePhone } from '../customer';
```

Module chi expose nhung gi can thiet qua `index.ts` hoac tuong duong.

**A3.2 — Dependency direction**

Neu module A phu thuoc vao module B:
- A co the import B.
- B KHONG duoc import A (circular dependency).

Neu phat hien circular dependency -> bao cao, khong tu xu ly bang workaround.

---

## A4 — File va Folder naming

**A4.1 — Quy uoc dat ten**

- File: `kebab-case.ts` (vi du: `customer-service.ts`).
- Component: `PascalCase.tsx` (vi du: `CustomerList.tsx`).
- Hook: `use` prefix + PascalCase (vi du: `useCustomerData.ts`).
- Constant: `UPPER_SNAKE_CASE` cho constant o cap module tro len.

**A4.2 — Co-location**

Test file nam cung cap voi file duoc test:

```
customer-service.ts
customer-service.test.ts
```

KHONG tao thu muc `__tests__` rieng biet tru khi project da dung convention do.

---

## A5 — API Versioning

**A5.1 — Khong tu them versioning khi chua co**

Neu project hien tai khong co API versioning (`/v1/`, `/v2/`), KHONG tu y them.
Them versioning la quyet dinh kien truc, phai co human decision.

**A5.2 — Khong thay doi endpoint da ton tai**

KHONG doi ten, method, hoac response shape cua endpoint da co
ma khong bao truoc va khong co backward compatibility plan.
Breaking change phai co human review.

---

## A6 — Dependency Inversion

**A6.1 — Truyen qua props/injection, khong import truc tiep**

Khi co the, truyen dependency qua props/parameter thay vi import hard-coded.
Dieu nay giup test de hon va giam coupling.

**A6.2 — Shared state**

Shared state (Zustand, Redux, Context) chi chua state thuc su can chia se.
Component-local state phai la `useState` / `useReducer`.
Khong dua moi thu vao global store de tien.

---
name: code-review
description: >
  Code review skill theo OWASP AISVS 1.0 cho AI-generated code va human code.
  Review tren 5 chieu: correctness, security, architecture, quality, testability.
  Invoke khi user noi "review code", "review PR", "xem code nay duoc chua",
  "code review", "check PR".
license: proprietary
metadata:
  author: mobiops
  version: "1.0.0"
  sources:
    - "OWASP AISVS 1.0 AC.4: https://github.com/OWASP/AISVS"
    - ".agents/rules/00-core.md"
    - ".agents/rules/01-security.md"
    - ".agents/rules/02-code-quality.md"
    - ".agents/rules/05-architecture.md"
    - ".agents/rules/08-testing.md"
---

# Code Review Skill

Review code theo 5 chieu. AI KHONG duoc tu chap nhan code cua chinh minh.

---

## Nguyen tac review

**Tu OWASP AISVS 1.0 AC.4.1:**
> "AI-generated code always goes through code review by a qualified human engineer.
> The reviewer must not be the same identity that asked for the AI generation."

AI co the ho tro review nhung **khong thay the human review**.
Output cua skill nay la input cho human reviewer.

---

## Buoc 1 — Xac dinh loai code

```
[ ] Code nay la AI-generated?
[ ] Code nay la security-critical (auth, authz, payment, crypto)?
[ ] Code nay thay doi existing behavior hay them moi?
```

Neu AI-generated + security-critical: can **elevated review** (2 nguoi hoac security team).

---

## Chieu 1 — Correctness

```
[ ] Code lam dung nhung gi requirement yeu cau?
[ ] Edge cases duoc xu ly (null, empty, overflow, concurrent)?
[ ] Error cases co ket qua dung?
[ ] Khong co logic sai: off-by-one, wrong operator, sai dieu kien?
[ ] Async/await duoc dung dung (khong quen await, khong race condition)?
```

**TypeScript specific:**

```
[ ] Khong co `any` khong co ly do?
[ ] Type assertion (`as`) co ly do ro rang?
[ ] Non-null assertion (`!`) co duoc bao dam?
```

---

## Chieu 2 — Security

Tham chieu nhanh sang `security-review` skill cho quet day du.
Trong code review, check toi thieu:

```
[ ] Co hardcoded secret?
[ ] Input co duoc validate?
[ ] Authorization duoc kiem tra dung moi endpoint?
[ ] Output co tiet lo thong tin nhay cam?
[ ] Dependencies moi them co trong 07-dependency.md checklist?
```

---

## Chieu 3 — Architecture

Tham chieu `.agents/rules/05-architecture.md`:

```
[ ] Code thuoc dung layer?
[ ] Dependency direction hop ly (khong co circular)?
[ ] Khong tao thu muc / file moi khong can thiet (utils2, helpers-new)?
[ ] Khong vi pham module boundary?
[ ] Khong duplicate logic da ton tai o noi khac?
```

---

## Chieu 4 — Code Quality

Tham chieu `.agents/rules/02-code-quality.md`:

```
[ ] Ham co Single Responsibility?
[ ] Ten bien, ham, component ro rang, co the doc thanh tieng?
[ ] Khong co magic number (dung constant co ten)?
[ ] Comment giai thich "tai sao", khong giai thich "cai gi"?
[ ] Khong co dead code, commented-out code?
```

---

## Chieu 5 — Testability & Tests

Tham chieu `.agents/rules/08-testing.md`:

```
[ ] Co test kem theo?
[ ] Test cover happy path va error case?
[ ] Security-sensitive code co test negative case?
[ ] Test co the chay doc lap (khong phu thuoc vao state ben ngoai)?
```

---

## Output: Code Review Comments

Su dung format:

```markdown
## Code Review

**File:** [duong dan]
**Reviewer:** AI Code Review (MobOps skill)
**Type:** [AI-generated / Human / Mixed]

### Critical (must fix before merge)

- **Line X:** [van de] → [khuyen nghi]

### High (strongly recommended)

- **Line Y:** [van de] → [khuyen nghi]

### Medium (should fix)

- **Line Z:** [van de] → [khuyen nghi]

### Low / Nit (optional)

- [van de] → [goi y]

### Summary

Code [Co the merge / Can sua truoc khi merge] voi [N critical, M high, ...].

Human review required: [Yes — vi ly do X / No].
```

---

## Note dac biet cho AI self-review

AI KHONG duoc tra loi:
```
"Code nay trong on, co the merge."
```

ma khong co ket qua cu the cua tung chieu review.

Neu code la AI-generated: phai note ro de human reviewer biet.

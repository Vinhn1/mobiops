# Git Workflow Rules — MobiFone Ca Mau Mini App

<!--
  NGUON GOC:
  [1] Conventional Commits 1.0.0
      https://www.conventionalcommits.org/en/v1.0.0/
  [2] OWASP AISVS 1.0 - AC.5 Traceability
      https://github.com/OWASP/AISVS/blob/main/1.0/en/0x92-Appendix-C_AI_for_Code_Generation.md
-->

## G1 — Commit Convention

**Nguon: Conventional Commits 1.0.0 [1]**

Trich dan [1]:
> "The Conventional Commits specification is a lightweight convention on top of commit messages.
> It provides an easy set of rules for creating an explicit commit history."

Dinh dang: `<type>(<scope>): <description>`

Types hop le:
- `feat`: tinh nang moi.
- `fix`: sua loi.
- `refactor`: tai cau truc code, khong them tinh nang, khong sua loi.
- `docs`: chi thay doi tai lieu.
- `style`: thay doi format, khong anh huong logic.
- `test`: them hoac sua test.
- `chore`: update build scripts, configs, dependencies.
- `ci`: thay doi CI/CD config.
- `perf`: cai thien hieu nang.

Quy tac:
- Description viet chu thuong, khong dau chm cuoi.
- Khong dung emoji trong commit message (theo user rules).
- Breaking change: them "!" sau type: `feat!: ...` hoac them footer "BREAKING CHANGE:".

**Vi du hop le:**
```
feat(auth): add OTP verification for login
fix(order): handle empty cart edge case
refactor(api): extract common error handler
```

---

## G2 — Branch Strategy

**G2.1 — Branch naming**
- Feature: `feat/<ten-ngan>`
- Bug fix: `fix/<ten-ngan>`
- Hotfix: `hotfix/<ten-ngan>`
- Release: `release/<version>`

**G2.2 — Rules**
- Khong commit truc tiep vao `main` hoac `develop` - dung PR.
- Moi PR chi giai quyet mot van de ro rang.
- Xoa branch sau khi merge.

---

## G3 — Traceability cho AI-generated code

**Nguon: OWASP AISVS 1.0, AC.5.1 [2]**

Trich dan [2]:
> "Verify that prompt-and-response pairs are logged with stable correlation identifiers,
> so that an investigator can later replay the whole chain:
> prompt -> response -> commit -> build -> deployment."

**Quy tac:**
- Khi code duoc tao bang AI, ghi ro trong PR description:
  - Tool da dung (Antigravity).
  - Prompt chung da su dung.
  - Nhung gi da review va kiem tra truoc khi commit.
- Commit message khong can ghi "AI-generated" neu developer hieu va review toan bo.
  Nhung neu chi review mot phan, ghi ro trong PR description phan nao chua duoc review.

---

## G4 — Code Review Requirements

**Nguon: OWASP AISVS 1.0, AC.4.1 & AC.4.4 [2]**

**G4.1 — AI-generated code**
- Bat buoc it nhat 1 reviewer la nguoi khac (khong phai nguoi da tao PR).
- AI agent khong duoc tinh la reviewer.

**G4.2 — Security-critical code**
- Auth, authz, cryptography, CI/CD config, deployment manifests.
- Yeu cau 2 reviewers hoac security team sign-off.
- Viet ro trong PR description: "Security-critical change, yeu cau elevated review."

**G4.3 — Rules files thay doi**
- Bat ky thay doi trong `.agents/rules/*.md` hoac `AGENTS.md`:
- Yeu cau review rieng biet, ghi ro ly do thay doi va nguon goc quy tac moi.

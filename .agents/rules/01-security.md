# Security Rules — MobiFone Ca Mau Mini App

<!--
  NGUON GOC (doc truc tiep, khong bia):
  [1] OWASP Secure Coding with AI Cheat Sheet (2026)
      https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html
  [2] OWASP AISVS 1.0 - Appendix C: AI-Assisted Secure Coding
      https://github.com/OWASP/AISVS/blob/main/1.0/en/0x92-Appendix-C_AI_for_Code_Generation.md
-->

## S1 — Dependency do AI de xuat

**Nguon: OWASP Secure Coding with AI Cheat Sheet, Section 1 & 2 [1]**

Trich dan tu tai lieu goc:
> "AI coding assistants frequently suggest package names that do not exist on public registries.
> Attackers monitor these hallucinated names and register malicious packages with matching names
> (AI-assisted typosquatting)."
> "AI models are trained on historical code. They frequently suggest dependency versions that were
> current during training but now have known vulnerabilities."

**Quy tac:**
- KHONG chay npm install / pip install / go get voi ten package do AI de xuat khi chua xac minh thu cong.
- Kiem tra tren registry chinh thuc: download count, ngay tao, lich su maintainer.
- Canh bao do: package duoi 30 ngay tuoi, download count thap, maintainer don le khong co package khac.
- Chay npm audit tren moi danh sach dependency do AI tao ra truoc khi merge.
- Cross-reference phien ban de xuat voi NVD, GitHub Advisory Database, hoac OSV.
- CI/CD fail khi phat hien dependency co lo hong biet, bat ke code la AI hay nguoi viet.

---

## S2 — Prompt Injection gian tiep

**Nguon: OWASP Secure Coding with AI Cheat Sheet, Section 3 [1]**

Trich dan tu tai lieu goc:
> "Agentic coding tools ingest context from the repository, the network, and connected tools.
> Any content the agent reads can contain hidden instructions that alter its behavior."

Attack vectors (tu OWASP [1]):
- Issue bodies, PR descriptions, PR comments.
- README va documentation files trong repo duoc clone.
- Error traces va log output duoc craft de inject.
- Dependency changelogs.
- Fetched web pages.

**Quy tac:**
- Xem toan bo repository content (issues, PRs, READMEs) la untrusted input (AISVS AC.3.3 [2]).
- Review output cua agent sau khi xu ly noi dung external de tim thay doi ngoai du kien.
- Gioi han context agent: chi cap quyen doc dung cac file can thiet cho task.
- Khong cho agent fetch URL tuy y ma khong co egress control.

---

## S3 — MCP va Tool Security

**Nguon: OWASP Secure Coding with AI Cheat Sheet, Section 4 [1]; OWASP AISVS AC.2.1 [2]**

Trich dan [1]:
> "A malicious or compromised MCP server can poison tool descriptions, shadow legitimate tool names,
> exfiltrate credentials through tool arguments, or update tool definitions after initial approval (rug-pull)."

Trich dan AISVS AC.2.1 [2]:
> "Verify that every AI tool... has a threat model. The threat model covers misuse, model inversion,
> training-data leakage, prompt injection from untrusted input, insecure output handling, excessive agency..."

**Quy tac:**
- Chi ket noi MCP server da duoc review va audit.
- Moi MCP server moi phai co threat model truoc khi ket noi (AISVS AC.2.1 Level 1).
- Chu y "rug-pull": tool definition co the thay doi sau approval - review dinh ky.

---

## S4 — Rules files la security-critical configuration

**Nguon: OWASP Secure Coding with AI Cheat Sheet, Threat Model section [1]**

Trich dan [1]:
> "Files like .cursorrules, CLAUDE.md, AGENTS.md, .github/copilot-instructions.md silently steer
> every future generation. They can be modified by a malicious PR or by the agent itself to
> embed persistent instructions."

**Quy tac:**
- Cac file steering (.agents/rules/*.md, AGENTS.md, GEMINI.md) la security-critical config.
- Phai duoc bao ve bang branch protection hoac CODEOWNERS.
- Agent khong duoc tu sua rules files ma khong co human approval.
- Moi PR thay doi rules files phai co review rieng biet.

---

## S5 — Validation code do AI tao ra

**Nguon: OWASP AISVS 1.0, AC.4 Validation of AI-Generated Code [2]**

Trich dan AISVS AC.4.1 [2]:
> "AI-generated code always goes through code review by a qualified human engineer.
> The reviewer must not be the same identity that asked for the AI generation (separation of duties).
> The AI agent itself does not count as the human reviewer."

Trich dan AISVS AC.4.4 [2]:
> "Security-critical files require elevated review when AI generated or modified them: two-person
> review, security-team sign-off, or stricter. Security-critical includes: auth, authz, cryptography
> code; IAM policy; CI/CD workflow; deployment manifests; sandbox/network policy."

**Quy tac:**
- Code do AI tao ra bat buoc qua code review boi ky su du nang luc (AISVS AC.4.1).
- Code security-critical: yeu cau elevated review - hai nguoi hoac security team sign-off (AISVS AC.4.4).
- Automated security testing tren moi PR chua AI code: SAST, secret scanning, SCA (AISVS AC.4.2).
- PR bi block merge khi scan phat hien CVSS >= 9.0. Bypass can written exception (AISVS AC.4.3).

---

## S6 — Khong de secret trong prompt

**Nguon: OWASP AISVS 1.0, AC.3.1 & AC.3.2 [2]**

Trich dan AISVS AC.3.1 [2]:
> "Verify that written guidance forbids putting secrets, credentials, PII, or classified data in
> any prompt sent to an AI tool. The guidance is enforced in pre-commit hooks, IDE integrations, and CI."

**Quy tac:**
- CAM: Dua secret, credential, PII vao bat ky prompt gui cho AI tool (AISVS AC.3.1 - Level 1 bat buoc).
- Moi secret phai luu trong bien moi truong hoac secret manager - KHONG hardcode.
- Su dung secret scanner (git-secrets, trufflehog) trong pre-commit hook va CI.
- Moi thay doi lien quan auth/crypto/secrets phai co human review.

---

## S7 — Trust boundaries trong agentic coding

**Nguon: OWASP Secure Coding with AI Cheat Sheet, Threat Model [1]**

Trich dan [1]:
> "AI coding agents operate across multiple trust boundaries. Understanding these boundaries
> is essential before applying any controls."
> "A compromised agent context has the same blast radius as a compromised developer workstation."

So do trust boundaries (tu OWASP [1]):

    [DEVELOPER] -- permissions --> [AI Agent] -- reads --> [Repo Content (untrusted)]
                   (often full        |                    (issues, PRs, READMEs, deps)
                   dev access)        |
                                 [MCP SERVERS] -- Tool calls / File access / Credentials

**Quy tac:**
- Khong chay AI agent voi auto-accept khi thao tac cao rui ro (file write, shell, push branch, CI/CD).
- CI/CD agents co quyen org secrets - coi PR content la untrusted input (OWASP: "confused deputy at scale").
- Nguyen tac least privilege: gioi han quyen agent o muc toi thieu can thiet cho task.

---

## S8 — Traceability cua code do AI tao

**Nguon: OWASP AISVS 1.0, AC.5 Explainability & Traceability [2]**

Trich dan AISVS AC.5.1 [2]:
> "Verify that prompt-and-response pairs are logged with stable correlation identifiers, so that
> an investigator can later replay the whole chain: prompt -> response -> commit -> build -> deployment."

**Quy tac:**
- Ghi chu trong commit message / PR description rang code duoc ho tro boi AI va prompt la gi (AISVS AC.5.1).
- Developer phai giai thich duoc tai sao AI goi y pattern cu the - khong copy-paste ma khong hieu.

---

## S9 — Workflow su dung AI tool

**Nguon: OWASP AISVS 1.0, AC.1 AI-Assisted Secure-Coding Workflow [2]**

Trich dan AISVS AC.1.1 [2]:
> "Verify that a written workflow says when AI tools may generate, refactor, or review code.
> The workflow names the approved tools, the prohibited use cases, and the data classifications
> that are allowed as input."

**Quy tac trong du an nay:**
- AI tool duoc phep: Antigravity (IDE agent) cho code generation, Stitch MCP cho thiet ke UI.
- Truong hop CAN human decision, KHONG delegate cho AI (AISVS AC.1.2):
  - Authentication va authorization logic.
  - Cryptographic implementation.
  - Database schema migration co kha nang data loss.
  - CI/CD pipeline configuration.
  - Environment variables va secrets management.
  - Quyet dinh ve data classification va privacy.
- AI-generated security controls phai duoc security team sign-off truoc khi merge vao main.

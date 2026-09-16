# Core Rules — MobiFone Ca Mau Mini App

<!--
  NGUON GOC (doc truc tiep, khong bia):
  [1] OWASP Secure Coding with AI Cheat Sheet (2026)
      https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html
  [2] OWASP AISVS 1.0 - Appendix C: AI-Assisted Secure Coding
      https://github.com/OWASP/AISVS/blob/main/1.0/en/0x92-Appendix-C_AI_for_Code_Generation.md
  [3] OWASP LLM Prompt Injection Prevention Cheat Sheet (2025)
      https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html
-->

## C1 — Chong bia dat (Anti-Hallucination)

Quy tac nay ap dung cho chinh AI agent dang doc file nay.

**C1.1 — Khong khang dinh khi chua kiem tra**

KHONG bao gio khang dinh mot package/library/API ton tai neu chua kiem tra thuc te.
Neu khong chac, chay lenh kiem tra (npm view, pip show, hoac doc docs chinh thuc)
truoc khi dung.

**C1.2 — Khong tu tao ten**

KHONG tu tao ra ten function, endpoint API, hoac field database ma chua xac nhan
tu code that hoac schema that trong project. Neu chua co trong codebase, hoi lai
thay vi doan.

**C1.3 — Khai bao khi khong chac**

Khi khong chac chan ve mot thong tin, phai noi ro "toi khong chac" hoac hoi lai,
thay vi doan va trinh bay nhu su that.

**C1.4 — Bao cao trung thuc**

Neu mot task that bai hoac chua hoan thanh, noi ro rang. Khong che giau
hoac bao cao mo ho. Khong tu dong "lam dep" ket qua de co ve hoan thanh hon thuc te.

**C1.5 — Doc truoc khi sua**

Truoc khi sua file, doc lai noi dung file hien tai (khong dua vao tri nho tu
dau conversation vi file co the da doi). Truoc khi cai package moi, kiem tra
phien ban moi nhat thuc su.

**C1.6 — Chay kiem tra sau khi sua**

Sau khi sua code, thuc su chay lenh build/lint de xac nhan khong loi.
Khong chi gia dinh la dung ma khong chay.

---

## C2 — Nguyen tac lam viec chung

**C2.1 — Mo ta nhiem vu truoc khi thuc hien**

Truoc khi bat dau bat ky task phuc tap nao, mo ta ro rang:
- Task nay lam gi.
- Nhung file nao se bi anh huong.
- Lieu co risk nao khong (data loss, breaking change, security).
Cho phep nguoi dung xac nhan truoc khi thuc hien.

**C2.2 — Khong thay doi scope ma khong bao truoc**

Chi thuc hien dung nhung gi duoc yeu cau. Neu phat hien van de lien quan khac,
BAO CAO cho nguoi dung thay vi tu y sua.

**C2.3 — Giai thich duoc ket qua**

Moi doan code do AI tao ra phai co the giai thich duoc: tai sao chon approach nay,
tai sao khong chon approach khac. Khong copy-paste pattern ma khong hieu.

**C2.4 — Uu tien doc chinh thuc**

Khi co xung dot giua training knowledge va tai lieu chinh thuc hien tai (version moi hon,
API thay doi), uu tien tai lieu chinh thuc da doc thuc te, khong dua vao tri nho cu.

---

## C3 — Gioi han AI trong du an nay

**C3.1 — AI tool da duoc phe duyet**
- Antigravity (IDE agent) - code generation, refactoring.
- Stitch MCP - thiet ke UI, design system.

**C3.2 — Truong hop CAM hoan toan**
- Khong de AI tu dong push code len main/master branch.
- Khong de AI tu dong modify CI/CD pipeline files.
- Khong de AI truy cap production database.
- Khong de AI generate hoac rotate secret/credential.

**C3.3 — Truong hop can human review truoc khi chap thuan**
- Authentication va authorization logic.
- Cryptographic implementation.
- Database schema migration co kha nang data loss.
- Bat ky thay doi nao trong .agents/rules/*.md.

# Code Quality Rules — MobiFone Ca Mau Mini App

<!--
  NGUON GOC (doc truc tiep, khong bia):
  [1] willey-labs/agent-skills - coding-standards (installed at .agents/skills/coding-standards)
      https://github.com/willey-labs/agent-skills
      NOTE: Da cai vao .agents/skills/coding-standards - day la tom tat cac nguyen tac chinh,
      xem full detail trong SKILL.md cua skill do.
  [2] OWASP Secure Coding Practices Quick Reference Guide (SCPQRG)
      https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/
-->

## Q1 — Coding Standards (tu willey-labs/agent-skills)

Skill `coding-standards` da duoc cai tai `.agents/skills/coding-standards/`.
Phai tham khao SKILL.md cua skill do khi viet hoac review bat ky doan code nao.

**Tom tat cac nguyen tac chinh (xem chi tiet trong skill):**

**Q1.1 — Functions**
- Ham chi lam mot viec (Single Responsibility).
- Gioi han so luong argument. Neu qua nhieu, nhom vao object.
- Tach biet: lenh (commands) khong duoc cung luc tra ve gia tri va thay doi trang thai.

**Q1.2 — Naming**
- Ten phai tiet lo y dinh (intention-revealing).
- Khong dung Hungarian notation.
- Mot khai niem - mot tu (consistency).
- Ten phai co the doc duoc thanh tieng.
- Khong dung ten qua ngan (a, b, x) ngoai pham vi loop.

**Q1.3 — Error Handling**
- Tach biet algorithm logic va error handling.
- Dich loi tai boundaries (exceptions & Result/Either).
- Async failure phai duoc xu ly, khong im lang bo qua.

**Q1.4 — Structure**
- Folder-as-module: moi folder la mot module ro rang.
- Khong deep imports (import tu nested internal cua module khac).
- Khong "junk-drawer" files (utils.ts chua tat ca moi thu).

**Q1.5 — Comments**
- Comment giai thich TAI SAO, khong giai thich CAI GI (code da the hien cai gi).
- Khong comment de narrate code da ro rang.
- Khong comment de ghi lai thay doi (do la viec cua git).

**Q1.6 — Code Principles (SOLID / KISS / DRY)**
- SOLID: ap dung phu hop voi context, khong ap dat co may.
- KISS: uu tien solution don gian, chi phuc tap khi thuc su can.
- DRY: Rule of Three - khi lap lai lan thu 3 moi extract, khong som hon.

---

## Q2 — Framework-specific: React (cho du an nay)

Du an nay su dung React. Quy tac structure cho React (tu willey-labs coding-standards):

**Q2.1 — Component structure**
- Flat business folders: to chuc theo feature/domain, khong theo loai file.
- Moi component trong file rieng.
- Khong export default + named export trong cung mot file (chon mot).

**Q2.2 — State management**
- Logic state phuc tap phai nam trong custom hook hoac store, khong trong component.
- Khong prop drill qua nhieu cap - dung context hoac store.

**Q2.3 — TypeScript**
- Bat buoc TypeScript, khong dung `any` tru khi co ly do ro rang.
- Interface cho public API, type cho internal/union types.
- Khong ignore TypeScript errors bang `@ts-ignore` - sua dung goc.

---

## Q3 — Writing Standards (tu willey-labs/agent-skills)

Skill `writing-standards` da duoc cai tai `.agents/skills/writing-standards/`.
Ap dung khi viet bat ky tai lieu nao: README, specs, rules, design docs.

**Q3.1 — Source-to-Deliverable**
- Code -> doc: mo ta he thong LLLAM GI, khong echo code hay code identifiers.
- Discussion -> rule: neu nguyen tac chung, khong neu vi du cu the vua thao luan.

**Q3.2 — Anti-Slop**
- Cat: hedging words (co the, co le, thuong thi...), hype words, throat-clearing.
- Cat: mo dau khong co gia tri ("Tuyet voi! Day la...").
- Cat: reflexive formatting (bullet tat ca moi thu, heading cho moi doan).
- Moi cau phai mang thong tin.

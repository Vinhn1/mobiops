# Stitch UI Design Rules — MobiFone Ca Mau Mini App

<!--
  NGUON GOC:
  [1] google-labs-code/stitch-skills (da cai vao .agents/skills/)
      https://github.com/google-labs-code/stitch-skills
      Cac skill lien quan da cai: stitch::react-components, design-md,
      stitch::manage-design-system, stitch::extract-design-md, stitch::code-to-design
  [2] Stitch MCP - da ket noi qua MCP server (StitchMCP)
  [3] MobiFone Ca Mau Mini App - Stitch project ID: 7892103816095828798
-->

## U1 — Nguon thiet ke phai tu Stitch project thuc te

**U1.1 — Khong tu y tao design token**

KHONG tao mau sac, font size, spacing, hoac bat ky design token nao tu tren troi xuong.
Tat ca design token phai den tu Stitch project thuc te cua du an:
- Project ID: 7892103816095828798 (MobiFone Ca Mau Mini App)
- Dung skill `design-md` de trich xuat DESIGN.md tu project truoc khi code UI.

**U1.2 — Quy trinh bat buoc khi them UI moi**

Thu tu bat buoc:
1. Doc DESIGN.md hien tai (neu co) - khong bat dau tu zero.
2. Kiem tra Stitch project co man hinh tuong tu khong (dung `list_screens`).
3. Neu chua co man hinh, tao bang Stitch MCP truoc khi viet code.
4. Dung skill `stitch::react-components` de convert Stitch -> React.
5. Khong tu y viet CSS color/font ngoai nhung gi co trong DESIGN.md.

**U1.3 — Khi DESIGN.md chua ton tai**

Neu chua co DESIGN.md trong project:
- Khong gia dinh design tokens.
- Chay skill `design-md` de trich xuat tu Stitch project.
- Neu Stitch project chua co du man hinh: bao cao cho nguoi dung truoc khi tao placeholder values.

---

## U2 — Component Code tu Stitch

**U2.1 — Dung skill dung**

- Convert Stitch -> React: dung `stitch::react-components` skill (da cai).
- Code -> Stitch: dung `stitch::code-to-design` skill (da cai).
- Trich xuat design: dung `stitch::extract-design-md` hoac `design-md` skill (da cai).

**U2.2 — Khong duplicating design system**

Neu Stitch project da co design system, phai apply qua `stitch::manage-design-system`,
khong tao file design system rieng bi phu.

---

## U3 — Mobile-first (Mini App context)

Du an la Mini App chay trong moi truong MobiFone:

**U3.1 — Touch targets**
- Touch target toi thieu: 44x44px (Apple HIG) hoac 48x48dp (Material Design).
- Khong dat interactive elements sat nhau ma khong co khoang cach.

**U3.2 — Performance**
- Component phai render hieu qua - tranh re-render khong can thiet.
- Image phai co `loading="lazy"` va kich thuoc ro rang.

**U3.3 — Accessibility co ban**
- Moi image phai co `alt` text.
- Moi form field phai co `label`.
- Contrast ratio toi thieu: 4.5:1 cho text thuong (WCAG 2.1 AA).

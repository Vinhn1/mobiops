# MobiFone Ca Mau Mini App — Secure Vibe Coding Engineering System

He thong phat trien ung dung Mini App quan ly dich vu MobiFone tinh Ca Mau, tich hop mo hinh Secure Vibe Coding nham ket hop toc do phat trien bang AI voi co che kiem soat kien truc, bao mat va chat luong code nghiem ngat.

---

## 1. Triet ly he thong: Secure Vibe Coding

He thong duoc thiet ke de dam bao chat luong va an toan thong tin xuyen suot chu trinh phat trien:

```text
[AI Sinh Code / Dev Code]
           |
           v
[AI Tu Kiem Tra (Rules & Skills)]
           |
           v
[Security Gate (Gitleaks, Semgrep, OSV-Scanner)]
           |
           v
[Automated Tests (Unit, Integration)]
           |
           v
[Human Code Review & ASVS Checklists]
           |
           v
[Merge & Deploy]
```

---

## 2. Cau truc thu muc

```text
mobiops/
├── .agents/
│   ├── rules/                 # 11 bo quy tac ky thuat va bao mat bat buoc
│   └── skills/                # 18 ky nang ho tro AI (Security, UI Stitch, Standards)
├── .github/
│   └── workflows/
│       └── security-gate.yml  # Pipeline kiem tra bao mat tu dong tren GitHub Actions
├── .pre-commit-config.yaml    # Cau hinh chan commit secret local (Gitleaks)
├── scripts/                   # Cac bash script quet bao mat tai cho
│   ├── scan-secrets.sh        # Quet secret (Gitleaks)
│   ├── scan-deps.sh           # Quet lo hong dependencies (npm audit, OSV-Scanner)
│   └── scan-sast.sh           # Quet SAST (Semgrep)
├── security/
│   ├── asvs/                  # Tai lieu va checklist OWASP ASVS 5.0 Level 1
│   └── checklists/            # 3 checklist cho cac giai doan phat trien
├── security-lab/              # Khong gian nghien cuu, tai lieu hoc tap ve lo hong web
├── reports/
│   └── security/              # Thu muc chua ket qua quet bao mat local (git ignored)
├── SECURITY.md                # Chinh sach tiep nhan va xu ly lo hong bao mat
└── README.md                  # Tai lieu huong dan he thong
```

---

## 3. He thong Quy tac Ky thuat (.agents/rules/)

Moi tac vu lap trinh deu phai tuan thu cac quy tac da duoc dinh nghia tai `.agents/rules/`:

- `00-core.md`: Nguyen tac cot loi, chong bia dat (anti-hallucination), ranh gioi tin cay.
- `01-security.md`: Quy chuan bao mat ung dung theo OWASP AISVS 1.0 (S1–S9).
- `02-code-quality.md`: Tieu chuan code React, TypeScript, Clean Code.
- `03-git-workflow.md`: Conventional Commits va truy vet thay doi tu AI.
- `04-ui-stitch.md`: Quy trinh tich hop thiet ke giao dien qua Stitch MCP.
- `05-architecture.md`: Quan tri kien truc phan tang, pham vi module, cam file rac.
- `06-data-privacy.md`: Phan loai du lieu, quy tac masking PII (SDT, CCCD) va logging.
- `07-dependency.md`: Danh gia, cap phep va quan ly rui ro chuoi cung ung package.
- `08-testing.md`: Dinh muc do phu test cho logic kinh doanh va vung nhay cam bao mat.
- `09-ai-agent-ops.md`: Gioi han pham vi hoat dong an toan cua AI agent, phong chong prompt injection.
- `10-production.md`: Quy dinh ve 4 moi truong (DEV/TEST/STAGING/PROD) va quy trinh rollback.

---

## 4. He thong Ky nang AI (.agents/skills/)

Cac ky nang chuyen biet giup AI va lap trinh vien thuc hien cac nhiem vu phuc tap:

### Security & Governance Skills
- `security-review`: Danh gia bao mat toan dien theo 12 mien an ninh.
- `threat-modeling`: Mo hinh hoa moi de doa theo phuong phap STRIDE.
- `secure-feature-dev`: Quy trinh phat trien tinh nang an toan theo 9 buoc khep kin.
- `dependency-audit`: Kiem tra phan tich lo hong va giay phep cua dependencies.
- `secrets-audit`: Ra quet khoa bi mat, token trong ma nguon va lich su commit.
- `api-security`: Kiem tra API theo OWASP API Security Top 10.
- `auth-rbac-review`: Danh gia xac thuc, phan quyen RBAC va chong bypass IDOR.
- `privacy-review`: Kiem tra tuan thu bao ve du lieu ca nhan va masking PII.
- `database-security`: Bao mat co so du lieu, chong SQL Injection, quan tri migration.
- `ci-cd-security`: Kiem tra an toan pipeline va cau hinh GitHub Actions.
- `code-review`: Tieu chuan ra soat code do AI tao ra.
- `production-readiness`: Danh gia dieu kien san sang truoc khi dua len production.

### UI & Architecture Skills
- `stitch-react-components`: Tao component React tu mau thiet ke Stitch.
- `stitch-manage-design-system`: Quan ly tokens, mau sac, typography qua Stitch MCP.
- `stitch-code-to-design` & `stitch-extract-design-md`: Dong bo ma nguon va tai lieu thiet ke.
- `design-md`: Tong hop he thong thiet ke thanh dac ta `DESIGN.md`.
- `coding-standards` & `writing-standards`: Bo cong cu tieu chuan code va van ban.

---

## 5. Danh muc Kiem tra Bao mat (security/)

- **OWASP ASVS 5.0**: Ap dung chuong trinh danh gia ung dung theo chuan OWASP ASVS 5.0 Level 1 tai `security/asvs/level1-checklist.md`.
- **Giai doan tien phat trien**: `security/checklists/pre-development.md` (Ap dung truoc khi bat tay vao viet ma).
- **Giai doan truoc khi merge**: `security/checklists/pre-merge.md` (Ap dung trong Pull Request).
- **Giai doan truoc khi phat hanh**: `security/checklists/pre-production.md` (Ap dung truoc khi trien khai Production).

---

## 6. Cong cu Tu dong hoa (Automation & Tools)

### Chay quet kiem tra tai may lap trinh vien (Local)

Cac script duoc dat trong thu muc `scripts/` va xuat bao cao vao `reports/security/`:

```bash
# 1. Quet secret tren repo hien tai
bash scripts/scan-secrets.sh

# 2. Quet secret tren commit dang staged (truoc khi commit)
bash scripts/scan-secrets.sh --staged

# 3. Quet lo hong dependency bang npm audit va OSV-Scanner
bash scripts/scan-deps.sh

# 4. Quet tinh ma nguon (SAST) bang Semgrep
bash scripts/scan-sast.sh
```

### Git Pre-commit Hook

Cai dat pre-commit de chan leak secret tu dong:

```bash
pip install pre-commit
pre-commit install
```

### GitHub Actions Pipeline

Khi tao Pull Request hoac push vao cac nhanh `main`, `master`, `develop`, pipeline `.github/workflows/security-gate.yml` se tu dong thuc thi cac cong viec sau:
1. `secret-scan`: Quet secret bang Gitleaks.
2. `lint-and-typecheck`: Kiem tra cu phap va kieu du lieu TypeScript.
3. `tests`: Chay bo kiem thu tu dong.
4. `sast`: Quet lo hong ma nguon voi Semgrep.
5. `dependency-scan`: Quet dependencies voi npm audit va OSV-Scanner.
6. `security-gate-summary`: Tong hop ket qua va quyet dinh chan (block) neu phat hien loi muc do CRITICAL hoac HIGH.

---

## 7. Huong dan bat dau (Quick Start)

### Yeu cau moi truong
- Node.js >= 18
- npm >= 9
- Git

### Cai dat va khoi chay

```bash
# Cai dat dependencies
npm install

# Khoi chay moi truong dev
npm run dev

# Chay kiem tra type
npm run build
```

---

## 8. Bao cao Lo hong & Thuc hanh

- Xem chi tiet chinh sach tiep nhan bao cao va cam ket SLA tai [SECURITY.md](SECURITY.md).
- Xem tai lieu huong dan phan tich lo hong web phuc vu dao tao tai [security-lab/README.md](security-lab/README.md).

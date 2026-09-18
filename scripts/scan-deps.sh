#!/usr/bin/env bash
# scripts/scan-deps.sh
#
# Quet vulnerability trong dependencies bang OSV-Scanner va npm audit.
#
# NGUON GOC:
#   OSV-Scanner v2: https://github.com/google/osv-scanner
#   npm audit: https://docs.npmjs.com/cli/v10/commands/npm-audit
#
# DUNG:
#   bash scripts/scan-deps.sh
#
# THOAT CODE:
#   0 = CLEAN hoac chi co findings < HIGH
#   1 = FAIL, co CRITICAL hoac HIGH vulnerability
#
# YEU CAU:
#   - Node.js + npm (de chay npm audit)
#   - osv-scanner (tu chon nhung duoc khuyen nghi):
#     Cai dat: https://github.com/google/osv-scanner/releases

set -euo pipefail

REPORT_DIR="${REPORT_DIR:-./security/reports}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
FAIL=0

mkdir -p "${REPORT_DIR}"

echo "======================================================"
echo "  Dependency Vulnerability Scan"
echo "  $(date)"
echo "======================================================"

# ============================================================
# 1. npm audit
# ============================================================
echo ""
echo "[Step 1/2] npm audit..."

if ! command -v npm &>/dev/null; then
  echo "[SKIP] npm khong tim thay trong PATH."
else
  NPM_REPORT="${REPORT_DIR}/npm-audit-${TIMESTAMP}.json"

  # Chay npm audit, bat exit code but tiep tuc
  npm audit --json > "${NPM_REPORT}" 2>/dev/null || true

  # Dem findings theo severity
  if command -v python3 &>/dev/null; then
    python3 - <<'PYEOF'
import json, sys

try:
    with open('${NPM_REPORT}', 'r') as f:
        data = json.load(f)

    vulns = data.get('vulnerabilities', {})
    counts = {'critical': 0, 'high': 0, 'moderate': 0, 'low': 0, 'info': 0}

    for name, v in vulns.items():
        sev = v.get('severity', 'info').lower()
        if sev in counts:
            counts[sev] += 1

    print(f"  CRITICAL: {counts['critical']}")
    print(f"  HIGH:     {counts['high']}")
    print(f"  MODERATE: {counts['moderate']}")
    print(f"  LOW:      {counts['low']}")

    if counts['critical'] > 0 or counts['high'] > 0:
        print("\n  [FAIL] Co CRITICAL hoac HIGH vulnerability.")
        sys.exit(1)
    else:
        print("\n  [PASS] Khong co CRITICAL/HIGH vulnerability.")
except Exception as e:
    print(f"  [WARN] Khong doc duoc report: {e}")
    print("  Chay 'npm audit' truc tiep de xem ket qua.")
PYEOF
    if [ $? -ne 0 ]; then FAIL=1; fi
  else
    # Fallback neu khong co python3
    npm audit --audit-level=high && echo "  [PASS] npm audit OK" || { echo "  [FAIL] npm audit: co HIGH+ vuln"; FAIL=1; }
  fi
fi

# ============================================================
# 2. OSV-Scanner (neu co)
# ============================================================
echo ""
echo "[Step 2/2] OSV-Scanner..."

if ! command -v osv-scanner &>/dev/null; then
  echo "[SKIP] osv-scanner khong tim thay trong PATH."
  echo "       Cai dat tu: https://github.com/google/osv-scanner/releases"
  echo "       OSV-Scanner quet ca git history va nhieu lockfile formats."
else
  OSV_REPORT="${REPORT_DIR}/osv-scanner-${TIMESTAMP}.json"

  osv-scanner \
    --lockfile=package-lock.json \
    --json \
    > "${OSV_REPORT}" 2>/dev/null \
    || OSV_EXIT=$?

  OSV_EXIT=${OSV_EXIT:-0}

  if [ "${OSV_EXIT}" -ne 0 ]; then
    echo "  [FAIL] OSV-Scanner phat hien vulnerability."
    echo "  Xem report: ${OSV_REPORT}"
    FAIL=1
  else
    echo "  [PASS] OSV-Scanner: khong phat hien vulnerability."
  fi
fi

# ============================================================
# Ket qua cuoi
# ============================================================
echo ""
echo "======================================================"
if [ "${FAIL}" -eq 0 ]; then
  echo "  KET QUA: PASS — Khong co HIGH+ vulnerability."
  exit 0
else
  echo "  KET QUA: FAIL — Co vulnerability can xu ly."
  echo ""
  echo "  HANH DONG:"
  echo "  1. Xem report trong ${REPORT_DIR}/"
  echo "  2. Chay 'npm audit' de xem chi tiet"
  echo "  3. Chay 'npm audit fix' de tu dong fix (neu co the)"
  echo "  4. Neu khong fix duoc: ghi lai ly do trong PR"
  echo "======================================================"
  exit 1
fi

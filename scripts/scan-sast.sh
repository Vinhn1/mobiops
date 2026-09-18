#!/usr/bin/env bash
# scripts/scan-sast.sh
#
# Static Application Security Testing bang Semgrep.
#
# NGUON GOC:
#   Semgrep OSS: https://github.com/semgrep/semgrep
#   Semgrep rules: https://semgrep.dev/p/typescript
#
# DUNG:
#   bash scripts/scan-sast.sh           # Quet toan bo project
#   bash scripts/scan-sast.sh src/      # Chi quet thu muc cu the
#
# THOAT CODE:
#   0 = PASS hoac khong co finding > WARNING
#   1 = FAIL, co ERROR-level finding
#
# YEU CAU:
#   Semgrep: pip install semgrep
#   Hoac: brew install semgrep
#   Hoac Docker: docker run semgrep/semgrep

set -euo pipefail

REPORT_DIR="${REPORT_DIR:-./security/reports}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
SCAN_TARGET="${1:-.}"

mkdir -p "${REPORT_DIR}"

echo "======================================================"
echo "  SAST Scan (Semgrep)"
echo "  Target: ${SCAN_TARGET}"
echo "  $(date)"
echo "======================================================"

# ============================================================
# Kiem tra Semgrep
# ============================================================
if ! command -v semgrep &>/dev/null; then
  echo ""
  echo "[ERROR] semgrep khong tim thay trong PATH."
  echo ""
  echo "  Cai dat:"
  echo "  1. pip install semgrep"
  echo "  2. brew install semgrep"
  echo "  3. Docker: docker run --rm -v \"\$(pwd):/src\" semgrep/semgrep semgrep ..."
  exit 1
fi

SEMGREP_VERSION=$(semgrep --version 2>/dev/null | head -1 || echo "unknown")
echo "[INFO] Semgrep version: ${SEMGREP_VERSION}"

# ============================================================
# Chay Semgrep voi cac ruleset phu hop
# ============================================================
REPORT_SARIF="${REPORT_DIR}/semgrep-${TIMESTAMP}.sarif"
REPORT_JSON="${REPORT_DIR}/semgrep-${TIMESTAMP}.json"

echo ""
echo "[INFO] Dang chay Semgrep scan..."
echo "[INFO] Ruleset: p/typescript, p/nodejs, p/owasp-top-ten"
echo ""

SEMGREP_EXIT=0

semgrep \
  --config "p/typescript" \
  --config "p/nodejs" \
  --config "p/owasp-top-ten" \
  --sarif \
  --output "${REPORT_SARIF}" \
  --json-output "${REPORT_JSON}" \
  --no-git-ignore \
  --exclude "node_modules" \
  --exclude "dist" \
  --exclude "build" \
  --exclude "coverage" \
  --exclude ".agents" \
  --exclude "security/reports" \
  "${SCAN_TARGET}" \
  2>/dev/null \
  || SEMGREP_EXIT=$?

# ============================================================
# Phan tich ket qua
# ============================================================
echo ""
echo "------------------------------------------------------"

if command -v python3 &>/dev/null && [ -f "${REPORT_JSON}" ]; then
  python3 - <<PYEOF
import json, sys

try:
    with open('${REPORT_JSON}', 'r') as f:
        data = json.load(f)

    results = data.get('results', [])
    errors = [r for r in results if r.get('extra', {}).get('severity') == 'ERROR']
    warnings = [r for r in results if r.get('extra', {}).get('severity') == 'WARNING']
    infos = [r for r in results if r.get('extra', {}).get('severity') not in ('ERROR', 'WARNING')]

    print(f"  Findings:")
    print(f"    ERROR:   {len(errors)}")
    print(f"    WARNING: {len(warnings)}")
    print(f"    INFO:    {len(infos)}")
    print(f"    TOTAL:   {len(results)}")

    if errors:
        print(f"\n  ERROR findings (phai xu ly):")
        for e in errors[:5]:  # chi hien 5 dau
            path = e.get('path', 'unknown')
            line = e.get('start', {}).get('line', '?')
            msg = e.get('extra', {}).get('message', 'no message')[:80]
            rule = e.get('check_id', 'unknown')
            print(f"    [{rule}] {path}:{line}")
            print(f"      {msg}")

        if len(errors) > 5:
            print(f"    ... va {len(errors)-5} finding khac. Xem full report.")

    if errors:
        print(f"\n  [FAIL] Co {len(errors)} ERROR-level finding(s).")
        sys.exit(1)
    else:
        print(f"\n  [PASS] Khong co ERROR-level finding.")

except Exception as ex:
    print(f"  [WARN] Khong phan tich duoc report JSON: {ex}")
    print(f"  Exit code tu Semgrep: ${SEMGREP_EXIT}")
PYEOF
  ANALYSIS_EXIT=$?
else
  # Fallback: dung semgrep exit code
  ANALYSIS_EXIT=${SEMGREP_EXIT}
fi

# ============================================================
# Ket qua
# ============================================================
echo ""
echo "  Reports:"
echo "    SARIF: ${REPORT_SARIF}"
echo "    JSON:  ${REPORT_JSON}"
echo "======================================================"

if [ "${ANALYSIS_EXIT}" -eq 0 ]; then
  echo "  KET QUA: PASS"
  exit 0
else
  echo "  KET QUA: FAIL"
  echo ""
  echo "  HANH DONG:"
  echo "  1. Xem full report: ${REPORT_JSON}"
  echo "  2. Fix hoac document ly do false positive"
  echo "  3. De suppress false positive:"
  echo "     Them comment tren dong bi flag: # nosemgrep: <rule-id>"
  echo "     Ghi ro: # nosemgrep: rule-name -- reason: [ly do cu the]"
  echo "======================================================"
  exit 1
fi

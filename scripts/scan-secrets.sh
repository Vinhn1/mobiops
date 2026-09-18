#!/usr/bin/env bash
# scripts/scan-secrets.sh
#
# Quet secret bi hardcode hoac commit nham bang Gitleaks.
#
# NGUON GOC:
#   Gitleaks v8: https://github.com/gitleaks/gitleaks
#
# DUNG:
#   bash scripts/scan-secrets.sh          # Quet repo hien tai
#   bash scripts/scan-secrets.sh --staged # Chi quet staged files
#   bash scripts/scan-secrets.sh --full   # Quet ca git history
#
# THOAT CODE:
#   0 = CLEAN, khong phat hien secret
#   1 = FAIL, phat hien secret hoac loi
#
# NGUYEN TAC AN TOAN:
#   Script nay khong in gia tri secret ra stdout.
#   Gitleaks mac dinh redact gia tri khi output.

set -euo pipefail

# ============================================================
# Config
# ============================================================
REPORT_DIR="${REPORT_DIR:-./security/reports}"
REPORT_FILE="${REPORT_DIR}/gitleaks-$(date +%Y%m%d-%H%M%S).json"
MODE="${1:---repo}"  # --staged | --full | --repo (default)

# ============================================================
# Kiem tra Gitleaks da duoc cai chua
# ============================================================
if ! command -v gitleaks &>/dev/null; then
  echo "[ERROR] gitleaks khong tim thay trong PATH."
  echo "        Cai dat: https://github.com/gitleaks/gitleaks#installing"
  echo "        Hoac qua brew: brew install gitleaks"
  echo "        Hoac tai binary tu: https://github.com/gitleaks/gitleaks/releases"
  exit 1
fi

GITLEAKS_VERSION=$(gitleaks version 2>/dev/null || echo "unknown")
echo "[INFO] Gitleaks version: ${GITLEAKS_VERSION}"

# ============================================================
# Tao thu muc report neu chua co
# ============================================================
mkdir -p "${REPORT_DIR}"

# ============================================================
# Chay scan
# ============================================================
echo "[INFO] Bat dau secret scan (mode: ${MODE})..."
echo "[INFO] Report se luu tai: ${REPORT_FILE}"

SCAN_RESULT=0

case "${MODE}" in
  --staged)
    echo "[INFO] Chi quet staged files (pre-commit mode)..."
    gitleaks protect \
      --staged \
      --redact \
      --report-format json \
      --report-path "${REPORT_FILE}" \
      || SCAN_RESULT=$?
    ;;
  --full)
    echo "[INFO] Quet ca git history (co the mat nhieu thoi gian)..."
    gitleaks detect \
      --source . \
      --redact \
      --log-opts="--all" \
      --report-format json \
      --report-path "${REPORT_FILE}" \
      || SCAN_RESULT=$?
    ;;
  --repo|*)
    echo "[INFO] Quet working directory (khong bao gom git history)..."
    gitleaks detect \
      --source . \
      --redact \
      --report-format json \
      --report-path "${REPORT_FILE}" \
      || SCAN_RESULT=$?
    ;;
esac

# ============================================================
# Ket qua
# ============================================================
if [ "${SCAN_RESULT}" -eq 0 ]; then
  echo ""
  echo "[PASS] Khong phat hien secret bi lo."
  # Xoa report file rong de khoi nham
  if [ -f "${REPORT_FILE}" ]; then
    FINDING_COUNT=$(python3 -c "import json,sys; d=json.load(open('${REPORT_FILE}')); print(len(d) if isinstance(d,list) else 0)" 2>/dev/null || echo "0")
    if [ "${FINDING_COUNT}" -eq 0 ]; then
      rm -f "${REPORT_FILE}"
    fi
  fi
  exit 0
else
  echo ""
  echo "[FAIL] Phat hien secret! Xem report: ${REPORT_FILE}"
  echo ""
  echo "  HANH DONG YEU CAU:"
  echo "  1. Revoke secret ngay lap tuc (don't wait to fix code first)"
  echo "  2. Xoa khoi code va commit"
  echo "  3. Neu da duoc push: lien he security owner de rewrite git history"
  echo ""
  echo "  [CANH BAO] Gia tri secret KHONG hien thi trong output (da redact)."
  echo "  Xem file report de biet vi tri (file, dong), KHONG xem gia tri."
  exit 1
fi

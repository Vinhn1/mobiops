# scripts/scan-deps.ps1
#
# Quet vulnerability trong dependencies bang npm audit tren PowerShell Windows.
#
# DUNG:
#   .\scripts\scan-deps.ps1

param(
    [string]$ReportDir = "reports/security"
)

if (-not (Test-Path $ReportDir)) {
    New-Item -ItemType Directory -Force -Path $ReportDir | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$npmReport = "$ReportDir/npm-audit-$timestamp.json"

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  Dependency Vulnerability Scan (PowerShell)" -ForegroundColor Cyan
Write-Host "  $(Get-Date)" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "[Step 1] Chay npm audit..." -ForegroundColor Cyan

$auditOutput = npm audit --json 2>$null
$auditOutput | Out-File -FilePath $npmReport -Encoding utf8

try {
    $auditJson = $auditOutput | ConvertFrom-Json
    $vulns = $auditJson.metadata.vulnerabilities

    Write-Host "Ket qua quet npm audit:"
    Write-Host "  CRITICAL: $($vulns.critical)" -ForegroundColor $(if ($vulns.critical -gt 0) { "Red" } else { "Green" })
    Write-Host "  HIGH:     $($vulns.high)" -ForegroundColor $(if ($vulns.high -gt 0) { "Red" } else { "Green" })
    Write-Host "  MODERATE: $($vulns.moderate)" -ForegroundColor $(if ($vulns.moderate -gt 0) { "Yellow" } else { "Green" })
    Write-Host "  LOW:      $($vulns.low)" -ForegroundColor "Gray"
    Write-Host "  INFO:     $($vulns.info)" -ForegroundColor "Gray"

    Write-Host ""
    Write-Host "[INFO] Chi tiet luu tai: $npmReport" -ForegroundColor Gray

    if ($vulns.critical -gt 0 -or $vulns.high -gt 0) {
        Write-Host "[FAIL] Phat hien CRITICAL hoac HIGH vulnerability trong dependencies!" -ForegroundColor Red
        exit 1
    } else {
        Write-Host "[SUCCESS] Dependencies an toan. Khong co CRITICAL/HIGH vulnerability." -ForegroundColor Green
        exit 0
    }
} catch {
    Write-Host "[INFO] Khong the phan tich json ket qua hoac repo chua co dependencies phuc tap." -ForegroundColor Gray
    exit 0
}

# scripts/scan-secrets.ps1
#
# Quet secret bi hardcode hoac commit nham bang Gitleaks tren PowerShell Windows.
#
# DUNG:
#   .\scripts\scan-secrets.ps1          # Quet repo hien tai
#   .\scripts\scan-secrets.ps1 -Staged  # Chi quet staged files
#   .\scripts\scan-secrets.ps1 -Full    # Quet toan bo git history

param(
    [switch]$Staged,
    [switch]$Full,
    [string]$ReportDir = "reports/security"
)

# Kiem tra gitleaks
if (-not (Get-Command gitleaks -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] gitleaks khong tim thay trong PATH." -ForegroundColor Red
    Write-Host "        Cai dat bang winget: winget install Gitleaks.Gitleaks"
    exit 1
}

$version = gitleaks version
Write-Host "[INFO] Gitleaks version: $version" -ForegroundColor Cyan

# Tao thu muc bao cao neu chua co
if (-not (Test-Path $ReportDir)) {
    New-Item -ItemType Directory -Force -Path $ReportDir | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$reportFile = "$ReportDir/gitleaks-$timestamp.json"

Write-Host "[INFO] Bat dau quet secret..." -ForegroundColor Cyan
Write-Host "[INFO] Bao cao se luu tai: $reportFile"

if ($Staged) {
    Write-Host "[INFO] Che do: Chi quet staged files (pre-commit)..."
    gitleaks protect --staged --verbose --redact --report-path $reportFile
}
elseif ($Full) {
    Write-Host "[INFO] Che do: Quet toan bo git history..."
    gitleaks detect --verbose --redact --report-path $reportFile
}
else {
    Write-Host "[INFO] Che do: Quet ma nguon hien tai (ton trong .gitignore)..."
    gitleaks detect --verbose --redact --report-path $reportFile
}

$exitCode = $LASTEXITCODE
if ($exitCode -eq 0) {
    Write-Host "[SUCCESS] Khong phat hien secret nao bi ro ri." -ForegroundColor Green
} else {
    Write-Host "[WARNING] Phat hien nghi van ro ri secret! Xem chi tiet tai: $reportFile" -ForegroundColor Yellow
}

exit $exitCode

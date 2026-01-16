# Append a dated template to IMPLEMENTATION_LOG.md
$LogPath = "H:\ANTIGRAVITY\ABANG-COLEK\abang-colek-brand-os\IMPLEMENTATION_LOG.md"

if (!(Test-Path $LogPath)) {
  " # Implementation Log`n`n" | Set-Content -Encoding ascii -Path $LogPath
}

$date = Get-Date -Format "yyyy-MM-dd"
$template = @"
## $date
### Summary
- Short summary

### Details
- Change + reason

### Files Touched (High Level)
- path/file.ext

"@

$content = Get-Content -Path $LogPath -Raw
if ($content -match "## $date") {
  Write-Host "Entry for $date already exists."
  exit 0
}

$newContent = $template + $content
Set-Content -Encoding ascii -Path $LogPath -Value $newContent
Write-Host "Inserted log template for $date."

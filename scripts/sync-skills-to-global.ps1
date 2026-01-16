# Sync skills from repo to global Codex skills
$Source = "H:\ANTIGRAVITY\ABANG-COLEK\abang-colek-brand-os\skills"
$Dest = "C:\Users\megat\.codex\skills"

if (!(Test-Path $Source)) { throw "Source not found: $Source" }
if (!(Test-Path $Dest)) { New-Item -ItemType Directory -Path $Dest | Out-Null }

Get-ChildItem -Path $Source -Recurse -Filter "SKILL.md" | ForEach-Object {
  $content = Get-Content -Path $_.FullName -Raw
  if ($content -match '(?s)^---(.*?)---') {
    $fm = $Matches[1]
    $nameLine = ($fm -split "\r?\n" | Where-Object { $_ -match "^name:" })[0]
    if ($nameLine) {
      $slug = ($nameLine -replace "^name:\s*", "").Trim()
      if ($slug) {
        $destDir = Join-Path $Dest $slug
        if (!(Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }
        Copy-Item -Path $_.FullName -Destination (Join-Path $destDir "SKILL.md") -Force
      }
    }
  }
}

$profiles = Join-Path $Source "STACK_PROFILES.md"
if (Test-Path $profiles) {
  Copy-Item -Path $profiles -Destination (Join-Path $Dest "STACK_PROFILES.md") -Force
}

$agents = "H:\ANTIGRAVITY\ABANG-COLEK\abang-colek-brand-os\AGENTS.md"
if (Test-Path $agents) {
  Copy-Item -Path $agents -Destination "C:\Users\megat\.codex\AGENTS.md" -Force
}

# auto insert implementation log template for today
$logScript = "H:\ANTIGRAVITY\ABANG-COLEK\abang-colek-brand-os\scripts\append-implementation-log.ps1"
if (Test-Path $logScript) {
  & $logScript | Out-Null
}

Write-Host "Sync completed."

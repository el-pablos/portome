param(
  [string]$Owner = "el-pablos",
  [string]$Repo = "portome",
  [string]$Homepage = "https://porto.tams.codes"
)

$ErrorActionPreference = "Stop"

$token = $env:GITHUB_TOKEN
if (-not $token) {
  $token = $env:GH_TOKEN
}

if (-not $token) {
  throw "Set GITHUB_TOKEN or GH_TOKEN in the current shell before running this script."
}

$headers = @{
  Authorization = "Bearer $token"
  Accept = "application/vnd.github+json"
  "X-GitHub-Api-Version" = "2022-11-28"
}

$repoUrl = "https://api.github.com/repos/$Owner/$Repo"
$topicsUrl = "$repoUrl/topics"

$repoBody = @{
  name = $Repo
  description = "Cinematic React portfolio for Tama EL Pablo with premium motion, real assets, GitHub project showcase, CI, tests, and auto-release flow."
  homepage = $Homepage
  has_issues = $true
  has_projects = $true
  has_wiki = $false
} | ConvertTo-Json

$topicsBody = @{
  names = @(
    "portfolio",
    "react",
    "tailwindcss",
    "framer-motion",
    "developer-portfolio",
    "backend-developer",
    "laravel",
    "github-actions",
    "ci-cd",
    "mobile-first",
    "motion-design",
    "tama-el-pablo"
  )
} | ConvertTo-Json

Invoke-RestMethod -Method Patch -Uri $repoUrl -Headers $headers -Body $repoBody -ContentType "application/json" | Out-Null
Invoke-RestMethod -Method Put -Uri $topicsUrl -Headers $headers -Body $topicsBody -ContentType "application/json" | Out-Null

Write-Host "Updated GitHub metadata for $Owner/$Repo"

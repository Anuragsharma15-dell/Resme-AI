# Start frontend locally from the ai-career-canvas folder
Set-Location -Path "$(Join-Path $PSScriptRoot 'ai-career-canvas')"
if (Test-Path -Path .\package.json) {
  if (Get-Command pnpm -ErrorAction SilentlyContinue) { pnpm install; pnpm dev }
  elseif (Get-Command npm -ErrorAction SilentlyContinue) { npm install; npm run dev }
  else { Write-Host "Install Node package manager (pnpm or npm) and rerun." }
} else {
  Write-Host "ai-career-canvas package.json not found." }

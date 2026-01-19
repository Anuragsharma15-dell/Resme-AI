# Start backend locally from the nested folder
Set-Location -Path "$(Join-Path $PSScriptRoot 'backned\backend\backend')"
if (Test-Path -Path .\package.json) {
  if (Get-Command pnpm -ErrorAction SilentlyContinue) { pnpm install; pnpm start }
  elseif (Get-Command npm -ErrorAction SilentlyContinue) { npm install; npm start }
  else { Write-Host "Install Node package manager (pnpm or npm) and rerun." }
} else {
  node index.js
}

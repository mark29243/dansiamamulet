# ============================================================
# Dan Siam Amulets — Deploy Script (Windows PowerShell)
# รันใน PowerShell: .\deploy.ps1
# ============================================================

Write-Host ""
Write-Host "🙏 Dan Siam Amulets — Deploy" -ForegroundColor Yellow
Write-Host "==============================" -ForegroundColor Yellow
Write-Host ""

# ---- ตรวจ .env.local ----
if (-not (Test-Path ".env.local")) {
    Write-Host "✕ ไม่พบ .env.local" -ForegroundColor Red
    Write-Host "  รัน: copy .env.example .env.local"
    Write-Host "  แล้วแก้ค่าให้ครบก่อน"
    exit 1
}

$required = @(
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "STRIPE_SECRET_KEY"
)

$content = Get-Content ".env.local"
$missing = @()

foreach ($key in $required) {
    $found = $content | Where-Object { $_ -match "^${key}=.+" }
    if (-not $found) { $missing += $key }
}

if ($missing.Count -gt 0) {
    Write-Host "✕ ยังขาด env vars:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host "    - $_" }
    Write-Host ""
    Write-Host "  ดู QUICKSTART.md สำหรับวิธีหาค่าเหล่านี้"
    exit 1
}

Write-Host "✓ .env.local ครบ" -ForegroundColor Green

# ---- npm install ----
Write-Host ""
Write-Host "📦 Installing dependencies..."
npm install --silent
Write-Host "✓ Dependencies installed" -ForegroundColor Green

# ---- Vercel CLI ----
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host ""
    Write-Host "🔧 Installing Vercel CLI..."
    npm install -g vercel --silent
}

Write-Host "✓ Vercel CLI ready" -ForegroundColor Green

# ---- Deploy ----
Write-Host ""
Write-Host "🚀 Deploying to Vercel..."
Write-Host "   (ครั้งแรกจะถามให้ login และตั้งชื่อโปรเจค)"
Write-Host ""

vercel deploy --prod

Write-Host ""
Write-Host "🎉 Deploy เสร็จแล้ว!" -ForegroundColor Yellow
Write-Host ""
Write-Host "ขั้นตอนต่อไป:"
Write-Host "1. copy URL ที่ได้"
Write-Host "2. ใส่ใน .env.local: NEXT_PUBLIC_SITE_URL=https://your-url.vercel.app"
Write-Host "3. ตั้ง Stripe Webhook → ดู QUICKSTART.md"
Write-Host "4. npm run seed"
Write-Host "5. npm run make-admin -- your@email.com"

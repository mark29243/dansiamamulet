#!/bin/bash
# ============================================================
# Dan Siam Amulets — Deploy Script
# รันครั้งเดียว เว็บขึ้น Vercel เลย
#
# ต้องการ: Node.js 18+, npm
# ============================================================

set -e  # หยุดทันทีถ้าเกิด error

GREEN='\033[0;32m'
GOLD='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${GOLD}🙏 Dan Siam Amulets — Deploy${NC}"
echo "=============================="
echo ""

# ---- ตรวจ .env.local ----
if [ ! -f ".env.local" ]; then
  echo -e "${RED}✕ ไม่พบ .env.local${NC}"
  echo "  สร้างจาก template ก่อน:"
  echo "  cp .env.example .env.local"
  echo "  แล้วแก้ค่าใน .env.local ให้ครบ"
  exit 1
fi

# ตรวจว่า keys สำคัญมีหรือยัง
REQUIRED=(
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "SUPABASE_SERVICE_ROLE_KEY"
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  "STRIPE_SECRET_KEY"
)

MISSING=()
for key in "${REQUIRED[@]}"; do
  if ! grep -q "^${key}=.\+" .env.local 2>/dev/null; then
    MISSING+=("$key")
  fi
done

if [ ${#MISSING[@]} -gt 0 ]; then
  echo -e "${RED}✕ ยังไม่ได้ใส่ค่า env vars เหล่านี้ใน .env.local:${NC}"
  for key in "${MISSING[@]}"; do
    echo "    - $key"
  done
  echo ""
  echo "  ดูคำแนะนำใน QUICKSTART.md"
  exit 1
fi

echo -e "${GREEN}✓ .env.local ครบ${NC}"

# ---- npm install ----
echo ""
echo "📦 Installing dependencies..."
npm install --silent

echo -e "${GREEN}✓ Dependencies installed${NC}"

# ---- ตรวจ/ติดตั้ง Vercel CLI ----
if ! command -v vercel &> /dev/null; then
  echo ""
  echo "🔧 Installing Vercel CLI..."
  npm install -g vercel --silent
fi

echo -e "${GREEN}✓ Vercel CLI ready${NC}"

# ---- Deploy ----
echo ""
echo "🚀 Deploying to Vercel..."
echo "   (ครั้งแรกจะถามให้ login และตั้งชื่อโปรเจค)"
echo ""

# --prod = deploy ไป production URL ทันที (ไม่ใช่ preview)
# --yes  = ตอบ yes ทุกคำถามที่ถามได้อัตโนมัติ
vercel deploy --prod

echo ""
echo -e "${GOLD}=============================="
echo -e "🎉 Deploy เสร็จแล้ว!${NC}"
echo ""
echo "ขั้นตอนต่อไป:"
echo "1. copy URL ที่ได้ (เช่น https://dansiam-xxxx.vercel.app)"
echo "2. ใส่ใน .env.local:  NEXT_PUBLIC_SITE_URL=https://dansiam-xxxx.vercel.app"
echo "3. ตั้ง Stripe Webhook ที่ URL/api/webhooks/stripe"
echo "4. รัน:  vercel env pull && npm run seed"
echo "5. รัน:  npm run make-admin -- your@email.com"
echo ""
echo "ดูรายละเอียดใน QUICKSTART.md"

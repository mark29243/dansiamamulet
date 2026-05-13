# 🚀 Quick Start — ทำตามทีละข้อ

ตั้งแต่ unzip จนเว็บใช้งานจริง — ประมาณ 25 นาที

## ☐ 1. Setup โปรเจค

```bash
unzip dansiam-amulets.zip -d dansiam
cd dansiam
npm install
cp .env.example .env.local
```

## ☐ 2. Supabase Database

1. ไป Supabase Dashboard → เปิดโปรเจคของคุณ
2. คลิก **SQL Editor → New query**
3. เปิดไฟล์ `supabase/schema.sql` → copy ทั้งหมด → paste → กด **Run** (เห็น "Success")
4. คลิก **Settings → API** → copy:

ใส่ใน `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=        ← Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   ← anon public
SUPABASE_SERVICE_ROLE_KEY=       ← service_role (กด Reveal ก่อน)
```

5. **Authentication → URL Configuration** → ใน "Redirect URLs" เพิ่ม:
```
http://localhost:3000/auth/callback
```

## ☐ 3. Stripe API Keys

1. Stripe Dashboard → ดูว่าอยู่ใน **Test mode**
2. **Developers → API keys** copy ใส่ `.env.local`:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...   ← Reveal ก่อน
```
3. ตั้งใน `.env.local`:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## ☐ 4. Email (Resend) — Optional แต่แนะนำ

ส่ง email confirmation อัตโนมัติเมื่อลูกค้าจ่ายเงิน

1. สมัครฟรีที่ https://resend.com (3,000 emails/month ฟรี)
2. **API Keys → Create API Key** → copy
3. ใส่ใน `.env.local`:
```
RESEND_API_KEY=re_...
RESEND_FROM="Dan Siam Amulets <orders@yourdomain.com>"
```

ถ้าไม่มีโดเมนเอง ใช้ `onboarding@resend.dev` ก่อนได้ (จำกัด)
หรือข้ามขั้นนี้ — ระบบจะข้ามการส่งอีเมลแต่ orders ยังทำงานปกติ

## ☐ 5. Import สินค้า

```bash
npm run seed
```

ต้องเห็น `✓ Seeded 31 products`

## ☐ 6. ทดสอบในเครื่อง

```bash
npm run dev
```

เปิด http://localhost:3000 — ทดสอบ flow ซื้อขาย:

1. **Add to cart** → **Checkout** → กรอกฟอร์ม
2. **Pay** → Stripe Checkout เปิด
3. ใช้บัตรทดสอบ: `4242 4242 4242 4242` วันหมดอายุอนาคต CVC ใดก็ได้
4. กลับมาที่ Success page

### ☐ ทดสอบ webhook (ในเครื่อง)

Terminal ใหม่:
```bash
# ติดตั้ง Stripe CLI ครั้งแรก: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

จะได้ `whsec_...` → ใส่ใน `STRIPE_WEBHOOK_SECRET` → restart `npm run dev`

ทดสอบสั่งซื้ออีกครั้ง → เช็ค:
- Supabase → `orders` → status `paid`
- Supabase → `products` → stock ลด
- (ถ้าตั้ง Resend) → inbox อีเมลผู้ซื้อมี order confirmation

## ☐ 7. ตั้งตัวเองเป็น Admin

1. ที่หน้า http://localhost:3000/signin → ใส่อีเมล → ตรวจ inbox คลิก magic link
2. ใน terminal:
```bash
npm run make-admin -- your@email.com
```
3. เห็น `✓ your@email.com is now owner`
4. เปิด http://localhost:3000/admin — เห็น Admin Dashboard

ตอนนี้คุณจัดการ orders + products + stock ผ่าน UI ได้

## ☐ 8. Deploy ขึ้น Vercel

1. push code ขึ้น GitHub:
```bash
git init && git add . && git commit -m "initial" 
git remote add origin git@github.com:USERNAME/REPO.git
git push -u origin main
```

2. https://vercel.com/new → import repo
3. Configure → **Environment Variables** → ใส่ทุก env จาก `.env.local` (ยกเว้น `STRIPE_WEBHOOK_SECRET` กับ `NEXT_PUBLIC_SITE_URL` ใส่ทีหลัง)
4. **Deploy** → ได้ URL เช่น `https://dansiam-xxxx.vercel.app`
5. **Settings → Environment Variables** เพิ่ม:
```
NEXT_PUBLIC_SITE_URL=https://dansiam-xxxx.vercel.app
```
6. **Deployments → Redeploy**

## ☐ 9. Production Webhooks

1. Supabase → **Auth → URL Configuration** เพิ่ม:
```
https://dansiam-xxxx.vercel.app/auth/callback
```

2. Stripe → **Webhooks → Add endpoint**:
   - URL: `https://dansiam-xxxx.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `checkout.session.expired`, `checkout.session.async_payment_failed`, `charge.refunded`
3. คลิก endpoint → **Reveal Signing secret** → copy
4. Vercel env vars เพิ่ม `STRIPE_WEBHOOK_SECRET=whsec_...` → **Redeploy**

## ☐ 10. ทดสอบบนเว็บจริง

1. เปิด Vercel URL → ทำ flow ซื้อขาย
2. Stripe → Payments เห็นรายการ
3. Stripe → Webhooks → Recent deliveries เห็น `200 OK`
4. Supabase → orders มีข้อมูล + stock ตัด
5. (ถ้าตั้ง Resend) Email ส่งถึงผู้ซื้อ

## ☐ 11. Make-admin บน Production

ทำเหมือน Step 7 แต่บนเว็บจริง:

1. เข้าเว็บ production → /signin → คลิก magic link
2. รันบนเครื่อง (ใช้ env vars production):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=eyJ... \
npm run make-admin -- you@email.com
```
3. ไป `https://your-url.vercel.app/admin`

## ✅ พร้อมขายแล้ว!

### Going to Production (รับเงินจริง)

1. Stripe → toggle **Live mode**
2. Copy live keys → ใส่ Vercel แทน test keys
3. สร้าง webhook ใหม่ใน Live mode → copy signing secret อันใหม่
4. ทดสอบด้วยบัตรจริงเล็กๆ ก่อน
5. อย่าลืม:
   - Privacy policy + Terms of service (ทำหน้าใหม่)
   - Refund policy
   - ขอเปิด PromptPay ใน Stripe (สำหรับ THB)
   - ตั้งค่า shipping rates ใน `lib/utils.ts` ให้ตรงค่าจริง
   - Custom domain ใน Vercel → Domains
   - ตั้ง Resend verified domain (ไม่งั้น email อาจเข้า spam)

ขอให้ขายดีครับ 🙏

# Dan Siam Amulets 🙏

**Trilingual** (ไทย · English · 中文) e-commerce site for authentic Thai amulets.

**Stack:** Next.js 14 · Supabase · Stripe · Vercel

---

## 🚀 Quick Deploy Guide (ลำดับขั้นที่ทำต่อจากนี้)

คุณสมัคร Vercel + Supabase + Stripe และเชื่อมต่อแล้ว — เหลือแค่ทำตามลำดับนี้

### Step 1 · Setup Supabase Database (5 นาที)

1. ไปที่ Supabase Dashboard → SQL Editor → **New query**
2. เปิดไฟล์ `supabase/schema.sql` ในโปรเจค copy ทั้งหมด paste แล้วกด **Run**
3. ไปที่ Settings → API copy ค่า 3 ตัวนี้:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ (เก็บเป็นความลับ)
4. ไปที่ **Authentication → URL Configuration** เพิ่ม URLs:
   ```
   http://localhost:3000/auth/callback
   https://YOUR-VERCEL-URL.vercel.app/auth/callback
   ```

### Step 2 · Get Stripe Keys (3 นาที)

1. ไปที่ Stripe Dashboard → **Test mode** เปิดไว้
2. **Developers → API keys** copy:
   - Publishable key (`pk_test_...`) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key (`sk_test_...`) → `STRIPE_SECRET_KEY`
3. **Settings → Payment methods** เปิด:
   - Cards (Visa/Mastercard) ✓
   - PromptPay (สำหรับลูกค้าไทย) ✓
   - Alipay (สำหรับลูกค้าจีน) — optional

### Step 3 · Deploy to Vercel (5 นาที)

1. Push code ทั้งหมดขึ้น GitHub repo
2. Vercel Dashboard → **Add New Project** → import repo
3. ในหน้า Configure ก่อน deploy ใส่ Environment Variables ทั้งหมด:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   STRIPE_SECRET_KEY
   STRIPE_WEBHOOK_SECRET           ← ใส่ทีหลังใน Step 4
   NEXT_PUBLIC_SITE_URL            ← ใส่ทีหลังหลัง deploy เสร็จ
   ```
4. กด **Deploy** Vercel จะให้ URL กลับมา เช่น `https://dansiam.vercel.app`
5. กลับไปอัปเดต env vars: `NEXT_PUBLIC_SITE_URL=https://dansiam.vercel.app` → redeploy

### Step 4 · Setup Stripe Webhook (3 นาที)

1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**
2. URL: `https://YOUR-VERCEL-URL.vercel.app/api/webhooks/stripe`
3. เลือก events ที่ต้อง listen:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `checkout.session.async_payment_failed`
   - `charge.refunded`
4. กด **Add endpoint** → click ที่ endpoint ที่สร้าง → คลิก **Reveal** ใต้ Signing secret
5. Copy secret (`whsec_...`) → ใส่ใน Vercel env vars เป็น `STRIPE_WEBHOOK_SECRET`
6. ใน Vercel **Deployments** → กด redeploy ล่าสุด

### Step 5 · Seed Products (2 นาที)

ในเครื่องของคุณ:
```bash
git clone YOUR_REPO
cd dansiam
npm install
cp .env.example .env.local
# แก้ .env.local ใส่ค่า env จาก Step 1-2
npm run seed
```

จะเห็น `✓ Seeded 31 products`

### Step 6 · เปิดเว็บ ✓

ไปที่ Vercel URL — เว็บใช้งานได้แล้ว มีสินค้า 31 รายการ ลองทำ flow:
1. เลือกพระเครื่อง → Add to cart
2. ไป Checkout → กรอกฟอร์ม
3. กด Pay → Stripe checkout → ใช้บัตรทดสอบ: `4242 4242 4242 4242`
4. กลับมาที่หน้า Success → เช็คใน Supabase Dashboard → orders table จะเห็น order
5. เช็ค Stripe Dashboard → Payments จะเห็นการจ่ายเงิน
6. Stock ในตาราง products ลดลง

---

## 📁 Project Structure

```
app/
  layout.tsx              # Root layout — providers + header/footer
  page.tsx                # Home (Hero + Shop)
  HomeHero.tsx            # Hero section
  HomeShop.tsx            # Product grid with filters
  loading.tsx             # Skeleton loader
  not-found.tsx           # 404 page
  error.tsx               # Error boundary
  sitemap.ts              # Dynamic sitemap.xml
  robots.ts               # robots.txt
  manifest.ts             # PWA manifest
  icon.svg                # Site icon
  globals.css             # Design tokens + utilities
  shop/page.tsx           # /shop full catalog
  product/[slug]/         # /product/[slug] detail page
  cart/page.tsx           # Cart
  checkout/page.tsx       # Checkout form
  success/page.tsx        # Post-payment thank you
  orders/page.tsx         # User order history
  signin/page.tsx         # Magic-link login
  auth/callback/          # Supabase auth callback
  api/
    checkout/             # POST → creates Stripe session
    webhooks/stripe/      # POST ← Stripe events
    orders/by-session/    # Look up order by session

components/
  LangProvider            # i18n context (TH/EN/ZH)
  CartProvider            # localStorage cart
  ToastProvider           # In-app notifications
  Header                  # Sticky header + mobile drawer
  Footer                  # Footer + newsletter
  ProductCard             # Card with quick view
  QuickView               # Modal product preview

lib/
  supabase/server.ts      # SSR + admin clients
  supabase/client.ts      # Browser client
  stripe.ts               # Stripe SDK instance
  types.ts                # TypeScript types
  i18n.ts                 # 3-language dictionary
  utils.ts                # formatPrice, slugify, calcShipping

scripts/
  seed.ts                 # Import CSV → Supabase
  products.csv            # 31 products from WooCommerce

supabase/
  schema.sql              # DB schema + RLS policies

middleware.ts             # Refreshes Supabase session
vercel.json               # Security headers
```

---

## 🎨 User-Friendly Features Built In

### Navigation & Layout
- ✅ Sticky header that shrinks on scroll
- ✅ Mobile drawer with hamburger menu
- ✅ Language switcher (TH/EN/ZH) — auto-detects browser language
- ✅ Cart counter badge that animates on add
- ✅ Skip-to-content link for accessibility
- ✅ Breadcrumb navigation on all sub-pages

### Shop Experience
- ✅ Sidebar filter (desktop) — collapses to drawer on mobile
- ✅ Filter by category (with item counts)
- ✅ Price range filter (min/max)
- ✅ In-stock filter
- ✅ Sort by price (asc/desc) and name
- ✅ Active filter chips with one-click remove
- ✅ Search with clear button
- ✅ Quick view modal on hover
- ✅ Pagination with smart ellipsis (handles 10+ pages)
- ✅ Empty state with clear-filters CTA
- ✅ Loading skeleton

### Product Page
- ✅ Image gallery with thumbnails
- ✅ Click to zoom (full screen lightbox)
- ✅ Quantity stepper respecting stock
- ✅ Low stock badge (🔥 Only N left)
- ✅ Discount % shown on sale
- ✅ Buy Now (Add + redirect to checkout)
- ✅ Share button (native Web Share API + clipboard fallback)
- ✅ Related products
- ✅ Sticky CTA bar on mobile (fixed bottom)

### Cart
- ✅ Free shipping progress bar (โปรเกรสบาร์ — เพิ่มอีก ฿X รับส่งฟรี)
- ✅ Live qty stepper with subtotal recalc
- ✅ Remove with toast confirmation
- ✅ Clear cart option
- ✅ Trust pills (SSL, Stripe, worldwide shipping)
- ✅ Sticky summary on desktop

### Checkout
- ✅ Multi-step indicator (Contact → Shipping → Review)
- ✅ Inline form validation
- ✅ Auto-complete attributes for browser fill
- ✅ Country-based shipping calculation
- ✅ Free shipping when over threshold
- ✅ Stripe-hosted checkout — handles 3D Secure, PromptPay, etc.
- ✅ Trust badges and SSL notice

### Polish & UX
- ✅ Toast notifications (success/error/info)
- ✅ Loading states everywhere (spinners + skeleton)
- ✅ Hover effects with smooth transitions
- ✅ Image lazy loading
- ✅ Image fade-in on load
- ✅ Focus-visible outlines for keyboard nav
- ✅ Aria labels on all interactive elements
- ✅ Newsletter signup in footer
- ✅ 404 page in 3 languages
- ✅ Error boundary with retry

### SEO & Performance
- ✅ Dynamic sitemap.xml
- ✅ robots.txt
- ✅ Open Graph tags per product
- ✅ ISR (60s revalidate) on product pages
- ✅ Server Components for initial load
- ✅ Security headers (X-Frame-Options, CSP basics)

---

## 💰 Money Safety

- **Server-side price validation**: ราคาถูก re-check จาก DB ก่อนสร้าง Stripe session — ไม่เชื่อ client
- **Stock re-check at checkout**: ถ้า stock ไม่พอจะ error ก่อนถึง payment
- **Stock decrement in webhook**: ตัดสต็อกตอน Stripe ยืนยันจ่ายเงินสำเร็จ — cart ค้างไม่ล็อก inventory
- **Prices stored as satang** (THB × 100) — ตรงกับ Stripe `unit_amount` ไม่มี floating-point bugs
- **RLS policies**: users เห็นแค่ orders ของตัวเอง

---

## 🔧 Customization

| ต้องการแก้ | ไปที่ |
|---|---|
| สี/ฟอนต์ | `app/globals.css` — CSS variables |
| คำแปล 3 ภาษา | `lib/i18n.ts` |
| ค่าจัดส่ง | `lib/utils.ts` → `calcShipping` |
| Free shipping threshold | `app/cart/page.tsx`, `app/checkout/page.tsx` |
| Logo / brand name | `components/Header.tsx`, `components/Footer.tsx` |
| Stats numbers | `app/HomeHero.tsx` |

---

## 📦 Adding More Products

**Option A — Bulk via CSV:**
```bash
# Replace scripts/products.csv with new WooCommerce export
npm run seed   # upserts by legacy_id
```

**Option B — Manual in Supabase:**
Dashboard → Table Editor → products → Insert row
- Required: `slug` (unique URL slug), `name`, `category`, `price` (in satang!), `stock`, `images` (JSON array of URLs)

---

## 🐛 Troubleshooting

**"Order created but stock not deducted"**
→ Stripe webhook ไม่ทำงาน เช็ค Stripe Dashboard → Webhooks → คลิกที่ endpoint → ดู recent deliveries

**"Cannot read magic link / sign-in not working"**
→ ใน Supabase → Auth → URL Configuration ต้องมี Vercel URL อยู่ใน list

**"Images not loading"**
→ `next.config.js` มีโดเมน amulets-dansiam.com และ supabase.co แล้ว ถ้าใช้โดเมนอื่นต้องเพิ่ม

**"Build fails on Vercel"**
→ มักเป็นเพราะ env vars ขาด — เช็ค Vercel Settings → Environment Variables ครบ 7 ตัวมั้ย

---

## 🎯 Going to Production

ก่อนจะใช้รับเงินจริง:
1. ใน Stripe สลับจาก **Test mode** → **Live mode**
2. Copy live keys ใส่ Vercel env vars
3. สร้าง webhook ใหม่ใน Live mode → copy signing secret อันใหม่
4. ทดสอบทั้ง flow อีกรอบด้วยบัตรจริงเล็กๆ ก่อน
5. อย่าลืม:
   - Privacy policy + Terms of service
   - Refund policy เขียนไว้ในเว็บ
   - ติดต่อ Stripe ขอเปิด PromptPay (สำหรับ THB)
   - ตั้ง shipping rates ใน `lib/utils.ts` ให้ตรงค่าจริง

ขอให้ขายดีครับ 🙏

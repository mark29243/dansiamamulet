# ลงสินค้าใหม่ (Add Product)

เมื่อผู้ใช้สั่งลงสินค้า ให้ทำตามขั้นตอนนี้:

## ข้อมูลที่ต้องได้จากผู้ใช้

ถามผู้ใช้ให้ได้ข้อมูลครบดังนี้:
1. **ชื่อสินค้า (ภาษาไทย)** — เต็ม
2. **ราคา** — หน่วยบาท
3. **ราคาลด** — ถ้ามี (ถ้าไม่มีให้ใส่ NULL)
4. **สต็อก** — ใส่ 1 เสมอ ยกเว้นผู้ใช้บอกเองว่ามีมากกว่า 1
5. **หมวดหมู่** — เลือกจาก: เหรียญ, พระสมเด็จ, พระปิดตา, รูปหล่อ, พระกริ่ง, เครื่องราง, พระผง, พระนางพญา
6. **รูปภาพ** — URL รูปภาพทั้งหมด (ให้ผู้ใช้คลิกขวา → Copy image address จาก Shopee)
7. **รายละเอียด** — คำอธิบายสินค้า (ถ้ามี)

## วิธีสร้าง slug

- ใช้ชื่อภาษาอังกฤษ lowercase ขั้นด้วย `-`
- ตัวอย่าง: `coin-sema-luang-phu-tuad-ajarn-tim-2507`
- ห้ามซ้ำกับ slug ที่มีอยู่แล้วในฐานข้อมูล

## วิธีแปลงราคา

- ราคาในฐานข้อมูลเก็บเป็น **satang** (คูณ 100)
- ตัวอย่าง: 1590 บาท → 159000 satang

## SQL สำหรับลงสินค้า

ใช้ Supabase MCP (`execute_sql`) กับ project_id: `woieynotnkdgjsopknwz`

```sql
INSERT INTO products (name, name_th, slug, price, sale_price, stock, category, description, description_th, short, images, published)
VALUES (
  '[ชื่อ EN]',
  '[ชื่อ TH]',
  '[slug]',
  [ราคา satang],
  [sale_price หรือ NULL],
  [stock],
  '[หมวดหมู่]',
  '[description EN]',
  '[description TH]',
  '[short description]',
  '["url1","url2"]'::jsonb,
  true
)
RETURNING id, slug;
```

## หลังลงสินค้าแล้ว

- แจ้งผู้ใช้ว่า ID และ slug คืออะไร
- บอก URL สินค้า: `/product/[slug]`
- ถามว่ามีรูปเพิ่มเติมหรือต้องการแก้ไขอะไรอีกไหม

## วิธีเติม SEO ให้ draft ที่ผู้ใช้อัพโหลดจากโทรศัพท์

เมื่อผู้ใช้บอกว่า "เพิ่มสินค้าใหม่แล้ว" ให้ทำดังนี้:

1. ดึง draft ที่ยังไม่ publish จาก Supabase:
```sql
SELECT id, name_th, description_th, images, category
FROM products
WHERE published = false
ORDER BY id DESC
LIMIT 5;
```

2. สำหรับแต่ละ draft ให้สร้าง:
   - **name** (EN): แปลชื่อไทยเป็นอังกฤษ เหมาะกับ SEO
   - **slug**: lowercase, เชื่อมด้วย `-` ไม่ซ้ำกับที่มีอยู่
   - **short**: คำอธิบายสั้น 1 ประโยค (EN)
   - **description**: รายละเอียดเต็ม (EN) สำหรับ SEO
   - **description_th**: รายละเอียดเต็ม (TH)

3. UPDATE ข้อมูลและ publish:
```sql
UPDATE products SET
  name = '[EN name]',
  slug = '[slug]',
  short = '[short EN]',
  description = '[description EN]',
  description_th = '[description TH]',
  published = true
WHERE id = [id];
```

## หมายเหตุสำคัญ

- Shopee บล็อก automated fetch ทุกวิธี (API, WebFetch, Chrome MCP) — ต้องให้ผู้ใช้ copy ข้อมูลมาเองเสมอ
- รูปจาก Shopee CDN: `https://down-th.img.susercontent.com/file/[hash]`
- images column เป็น jsonb ต้องใส่ `'[...]'::jsonb` เสมอ
- Draft slug จะมีรูปแบบ `draft-[timestamp]` — ต้องเปลี่ยนเสมอก่อน publish

const { createClient } = require('@supabase/supabase-js');

const sb = createClient(
  'https://vipqvizivfzkjdqeuyhu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0'
);

async function checkDatabase() {
  const issues = [];
  
  // 1. Fetch all products
  const { data: prods, error: pErr } = await sb.from('products').select('*');
  if (pErr) { 
    console.error('DB Error fetching products:', pErr); 
    return; 
  }
  
  console.log('Total products in DB:', prods.length);
  const published = prods.filter(p => p.published);
  console.log('Published products:', published.length);
  const unpublished = prods.filter(p => !p.published);
  console.log('Unpublished products:', unpublished.length);
  
  // Check for broken slugs
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  published.forEach(p => {
    if (!p.slug) {
      issues.push(`[SLUG_MISSING] Product ID ${p.id} has NO SLUG!`);
    } else if (p.slug.startsWith('draft-')) {
      issues.push(`[SLUG_DRAFT] Product ID ${p.id} has DRAFT SLUG: ${p.slug}`);
    } else if (!slugRegex.test(p.slug)) {
      issues.push(`[SLUG_FORMAT] Product ID ${p.id} has non-standard slug: ${p.slug}`);
    }
  });

  // Check for duplicate slugs
  const slugCounts = {};
  prods.forEach(p => {
    if (p.slug) {
      slugCounts[p.slug] = (slugCounts[p.slug] || 0) + 1;
      if (slugCounts[p.slug] === 2) {
        issues.push(`[SLUG_DUPLICATE] Duplicate slug found: ${p.slug}`);
      }
    }
  });

  // Check for missing images
  published.forEach(p => {
    if (!p.images || !Array.isArray(p.images) || p.images.length === 0) {
      issues.push(`[IMAGE_EMPTY] Product ID ${p.id} (${p.name_th}) has NO IMAGES!`);
    } else {
      p.images.forEach((img, idx) => {
        if (!img || typeof img !== 'string' || (!img.startsWith('http') && !img.startsWith('/'))) {
          issues.push(`[IMAGE_INVALID] Product ID ${p.id} image[${idx}] is invalid: ${img}`);
        }
      });
    }
  });

  // Check price anomalies (e.g. price <= 0, sale_price >= price, price < 100 satang)
  published.forEach(p => {
    if (!p.price || p.price <= 0) {
      issues.push(`[PRICE_ZERO] Product ID ${p.id} has invalid price: ${p.price}`);
    } else if (p.price < 1000) { // less than 10 THB
      issues.push(`[PRICE_LOW] Product ID ${p.id} has suspiciously low price: ${p.price} satang (${p.price/100} THB)`);
    }
    if (p.sale_price !== null && p.sale_price !== undefined) {
      if (p.sale_price >= p.price) {
        issues.push(`[PRICE_SALE_HIGH] Product ID ${p.id} has sale_price (${p.sale_price}) >= regular price (${p.price})`);
      }
      if (p.sale_price <= 0) {
        issues.push(`[PRICE_SALE_ZERO] Product ID ${p.id} has sale_price <= 0: ${p.sale_price}`);
      }
    }
  });

  // Check missing titles
  published.forEach(p => {
    if (!p.name_th || p.name_th.trim() === '') issues.push(`[TITLE_TH_MISSING] Product ID ${p.id} missing name_th`);
    if (!p.name || p.name.trim() === '') issues.push(`[TITLE_EN_MISSING] Product ID ${p.id} missing English name`);
    if (!p.name_zh || p.name_zh.trim() === '') issues.push(`[TITLE_ZH_MISSING] Product ID ${p.id} missing name_zh`);
  });

  // Check stock anomalies
  published.forEach(p => {
    if (p.stock === null || p.stock === undefined || p.stock < 0) {
      issues.push(`[STOCK_INVALID] Product ID ${p.id} has invalid stock: ${p.stock}`);
    }
  });

  // 2. Orders table check
  const { data: orders, error: oErr } = await sb.from('orders').select('*').limit(20);
  if (oErr) {
    issues.push('[ORDERS_TABLE] Error querying orders table: ' + oErr.message);
  } else {
    console.log('Sample orders fetched successfully:', orders.length);
  }

  // 3. Discount codes check
  const { data: discounts, error: dErr } = await sb.from('discount_codes').select('*');
  if (dErr) {
    issues.push('[DISCOUNTS_TABLE] Error querying discount_codes table: ' + dErr.message);
  } else {
    console.log('Active discount codes:', discounts.length);
  }

  // 4. Blogs table check
  const { data: blogs, error: bErr } = await sb.from('blogs').select('id, slug, title, published').order('id', { ascending: false });
  if (bErr) {
    issues.push('[BLOGS_TABLE] Error querying blogs table: ' + bErr.message);
  } else {
    console.log('Total blogs:', blogs.length);
    const pubBlogs = blogs.filter(b => b.published);
    console.log('Published blogs:', pubBlogs.length);
    blogs.forEach(b => {
      if (!b.slug) issues.push(`[BLOG_NO_SLUG] Blog ID ${b.id} has NO slug!`);
    });
  }

  console.log('\n========================================');
  console.log(`TOTAL DATABASE DEFECTS/ISSUES FOUND: ${issues.length}`);
  console.log('========================================');
  issues.forEach(i => console.log(i));
}

checkDatabase();

import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { uploadToR2 } from '@/lib/r2';

export const runtime = 'nodejs';

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return null;
  return { user, admin };
}

async function downloadAndUploadImage(shopeeUrl: string): Promise<string | null> {
  try {
    // If it's already on our domain, just return it
    if (shopeeUrl.includes('dansiam') || shopeeUrl.includes('r2')) return shopeeUrl;

    const res = await fetch(shopeeUrl);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    
    // Generate a unique key
    const ext = shopeeUrl.split('.').pop()?.split('?')[0] || 'jpg';
    const finalExt = ['jpg', 'jpeg', 'png', 'webp'].includes(ext.toLowerCase()) ? ext.toLowerCase() : 'jpg';
    const key = `products/shopee-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${finalExt}`;
    
    const r2Url = await uploadToR2(key, buffer, res.headers.get('content-type') || 'image/jpeg');
    return r2Url;
  } catch (error) {
    console.error('Error migrating image:', shopeeUrl, error);
    return null;
  }
}

export async function POST(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { products } = await req.json();
    if (!Array.isArray(products)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    let success = 0;
    let errorCount = 0;

    for (const p of products) {
      try {
        const name = p.name?.trim();
        if (!name) {
          errorCount++;
          continue;
        }

        // Process images
        const r2Images: string[] = [];
        if (p.shopee_images && Array.isArray(p.shopee_images)) {
          for (const url of p.shopee_images) {
            if (url) {
              const uploadedUrl = await downloadAndUploadImage(url);
              if (uploadedUrl) r2Images.push(uploadedUrl);
            }
          }
        }

        // Find existing product by name
        const { data: existing } = await ctx.admin
          .from('products')
          .select('id, images')
          .eq('name', name)
          .single();

        const updateData: any = {};
        
        // If we got price or stock from Shopee, update them
        if (p.price !== undefined) updateData.price = parseFloat(p.price);
        if (p.stock !== undefined) updateData.stock = parseInt(p.stock, 10);
        if (p.shopee_id) updateData.name_shopee = p.shopee_id;

        // If we downloaded new images, we can either append or replace. 
        // Replacing is usually safer for Shopee imports if we want Shopee to be the master.
        if (r2Images.length > 0) {
          updateData.images = r2Images;
        }

        if (existing) {
          // Update
          if (Object.keys(updateData).length > 0) {
            await ctx.admin.from('products').update(updateData).eq('id', existing.id);
          }
        } else {
          // Insert new
          await ctx.admin.from('products').insert({
            name: name,
            name_th: name,
            ...updateData,
            images: r2Images.length > 0 ? r2Images : [],
          });
        }
        
        success++;
      } catch (err) {
        console.error('Error processing product:', p, err);
        errorCount++;
      }
    }

    return NextResponse.json({ ok: true, results: { success, error: errorCount } });

  } catch (error: any) {
    console.error('Error in shopee batch import:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}

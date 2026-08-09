import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { uploadToR2 } from '@/lib/r2';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
const MAX_WIDTH = 1600; // enough for the 2.5x zoom viewer

import { cookies } from 'next/headers';

async function requireAdminOrStaff() {
  const cookieStore = cookies();
  const isStaff = cookieStore.get('staff_auth')?.value === 'true';
  if (isStaff) return { isStaff: true };

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return null;
  return { user, admin };
}

export async function POST(req: Request) {
  const ctx = await requireAdminOrStaff();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const form = await req.formData();
  const file = form.get('file') as File;

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const mime = file.type || '';
  if (!ALLOWED_MIME.includes(mime)) {
    return NextResponse.json({ error: `File type not allowed. Allowed: ${ALLOWED_MIME.join(', ')}` }, { status: 400 });
  }
  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (max 20MB)' }, { status: 400 });
  }

  const input = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;

  try {
    // Resize to max 1600px wide and convert to WebP — typically 5MB → ~200KB
    const optimized = await sharp(input, { failOn: 'none' })
      .rotate() // respect EXIF orientation
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    const url = await uploadToR2(filename, optimized, 'image/webp');
    return NextResponse.json({ url, bytes: optimized.length, original_bytes: input.length });
  } catch (e: any) {
    // sharp cannot decode HEIC without libheif — fall back to storing original in R2
    if (mime === 'image/heic' || mime === 'image/heif') {
      try {
        const ext = mime.split('/')[1];
        const rawName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const url = await uploadToR2(rawName, input, mime);
        return NextResponse.json({ url, bytes: input.length, original_bytes: input.length, warning: 'HEIC stored without resize' });
      } catch (e2: any) {
        console.error('[upload-image] HEIC fallback failed:', e2?.message);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
      }
    }
    console.error('[upload-image]', e?.message);
    return NextResponse.json({ error: 'Image processing failed' }, { status: 500 });
  }
}

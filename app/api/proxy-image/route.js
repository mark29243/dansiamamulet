import { NextResponse } from 'next/server';

const ALLOWED_HOST_SUFFIXES = [
  '.r2.dev',
  '.supabase.co',
  '.susercontent.com',
  'dansiamamulets.com',
  '.dansiamamulets.com',
];

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB

function isSafeUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    if (parsed.protocol !== 'https:') return false;
    const hostname = parsed.hostname.toLowerCase();
    return ALLOWED_HOST_SUFFIXES.some(
      (suffix) => hostname === suffix || hostname.endsWith(suffix)
    );
  } catch {
    return false;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl || !isSafeUrl(imageUrl)) {
    return NextResponse.json({ error: 'Invalid or disallowed url parameter' }, { status: 400 });
  }

  try {
    const response = await fetch(imageUrl, { redirect: 'error' });
    if (!response.ok) {
      return NextResponse.json({ error: 'Upstream image fetch failed' }, { status: 502 });
    }

    const contentType = (response.headers.get('Content-Type') || '').toLowerCase();
    if (!contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'Upstream resource is not an image' }, { status: 400 });
    }

    const contentLength = Number(response.headers.get('Content-Length') || 0);
    if (contentLength > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: 'Image exceeds maximum size (10MB)' }, { status: 413 });
    }

    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: 'Image exceeds maximum size (10MB)' }, { status: 413 });
    }

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType || 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 });
  }
}

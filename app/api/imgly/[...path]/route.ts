import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const url = `https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.3/dist/${path}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return new NextResponse('Error fetching from CDN', { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

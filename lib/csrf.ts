const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL,
  'http://localhost:3000',
  'https://dansiamamulets.com',
  'https://www.dansiamamulets.com',
].filter(Boolean) as string[];

export function checkOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

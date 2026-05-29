async function getAccessToken(): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Token error: ${JSON.stringify(data)}`);
  return data.access_token;
}

export async function notifyGoogleIndex(url: string) {
  if (!process.env.GOOGLE_REFRESH_TOKEN || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) return;

  try {
    const token = await getAccessToken();
    const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    });
    const result = await res.json();
    console.log('[google-indexing] notified', url, res.status, result?.urlNotificationMetadata?.latestUpdate?.type ?? result?.error?.message ?? '');
  } catch (e) {
    console.error('[google-indexing] error', e);
  }
}

export interface ProductSoldData {
  id?: number | string;
  name?: string | null;
  name_th?: string | null;
  storage_location?: string | null;
  images?: string[] | null;
  name_lazada?: string | null;
  name_shopee?: string | null;
  name_shopee2?: string | null;
  name_facebook?: string | null;
  name_tiktok?: string | null;
  name_instagram?: string | null;
  mark_shopee2?: string | boolean | null;
  mark_fb?: string | boolean | null;
  mark_tt?: string | boolean | null;
  mark_ig?: string | boolean | null;
  metadata?: any;
}

export async function sendLineSoldNotification(product: ProductSoldData): Promise<{ success: boolean; error?: string }> {
  const token = process.env.LINE_MESSAGING_TOKEN || process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const targetId = process.env.LINE_USER_ID || process.env.LINE_GROUP_ID;

  if (!token || !targetId) {
    console.warn('[line] LINE token or target ID not configured');
    return { success: false, error: 'LINE token or target ID not configured' };
  }

  const productName = product.name_th || product.name || 'ไม่ระบุชื่อสินค้า';
  const metadata = product.metadata || {};
  const location = product.storage_location || metadata.storage_location || 'ไม่ระบุ';

  // Build platforms list
  const platforms: string[] = [];
  const lazada = product.name_lazada || metadata.lazada_title;
  const shopee = product.name_shopee || metadata.shopee_title;
  const shopee2 = product.name_shopee2 || metadata.shopee2_title;
  const facebook = product.name_facebook || metadata.facebook_title;
  const tiktok = product.name_tiktok || metadata.tiktok_title;
  const instagram = product.name_instagram || metadata.instagram_title;

  if (lazada) platforms.push(`📍 Lazada: ${lazada}`);
  if (shopee) platforms.push(`📍 Shopee: ${shopee}`);
  if (shopee2) platforms.push(`📍 Shopee 2: ${shopee2}`);
  if (facebook) platforms.push(`📍 Facebook: ${facebook}`);
  if (tiktok) platforms.push(`📍 TikTok: ${tiktok}`);
  if (instagram) platforms.push(`📍 Instagram: ${instagram}`);

  // Format message
  let messageText = `🔴 ขายแล้ว: ${productName}\n\n`;
  if (platforms.length > 0) {
    messageText += `⚠️ รีบลบ/ปิดการขายในช่องทางอื่นด่วน:\n${platforms.join('\n')}\n\n`;
  }
  messageText += `ที่เก็บ: ${location}`;

  // Build messages array
  const messages: any[] = [];
  const images = product.images || [];
  if (images.length > 0 && typeof images[0] === 'string' && images[0].startsWith('https://')) {
    messages.push({
      type: 'image',
      originalContentUrl: images[0],
      previewImageUrl: images[0]
    });
  }

  messages.push({
    type: 'text',
    text: messageText
  });

  try {
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        to: targetId,
        messages
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[line] LINE API Error: ${response.status} - ${errorText}`);
      return { success: false, error: errorText };
    }

    console.log('[line] Successfully sent LINE sold message for product:', product.id || productName);
    return { success: true };
  } catch (err: any) {
    console.error('[line] Error calling LINE API:', err);
    return { success: false, error: err.message };
  }
}

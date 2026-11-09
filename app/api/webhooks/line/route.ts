import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();

    // Verify LINE webhook signature when LINE_CHANNEL_SECRET is configured
    const channelSecret = process.env.LINE_CHANNEL_SECRET;
    if (channelSecret) {
      const signature = req.headers.get('x-line-signature') || '';
      const expectedSig = crypto
        .createHmac('SHA256', channelSecret)
        .update(rawBody)
        .digest('base64');
      if (!signature || signature !== expectedSig) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const body = JSON.parse(rawBody);
    const events = body.events;

    if (!events || events.length === 0) {
      return NextResponse.json({ ok: true });
    }

    const event = events[0];
    
    // Only reply with chat ID when explicitly requested via "!id" or "/id"
    if (event.type === 'message' && event.message.type === 'text') {
      const text = (event.message.text || '').trim().toLowerCase();
      if (text !== '!id' && text !== '/id') {
        return NextResponse.json({ ok: true });
      }

      const replyToken = event.replyToken;
      const source = event.source;
      
      let targetId = '';
      let targetType = '';

      if (source.type === 'group') {
        targetId = source.groupId;
        targetType = 'Group ID';
      } else if (source.type === 'room') {
        targetId = source.roomId;
        targetType = 'Room ID';
      } else {
        targetId = source.userId;
        targetType = 'User ID';
      }

      const replyText = `[บอทแจ้งเตือน] รหัส ${targetType} ของแชทนี้คือ:\n${targetId}`;

      const lineToken = process.env.LINE_MESSAGING_TOKEN;
      if (lineToken && replyToken) {
        await fetch('https://api.line.me/v2/bot/message/reply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${lineToken}`
          },
          body: JSON.stringify({
            replyToken: replyToken,
            messages: [
              {
                type: 'text',
                text: replyText
              }
            ]
          })
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('LINE Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}

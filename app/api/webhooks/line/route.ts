import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const events = body.events;

    if (!events || events.length === 0) {
      return NextResponse.json({ ok: true });
    }

    const event = events[0];
    
    // We only care about message events
    if (event.type === 'message' && event.message.type === 'text') {
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

      const replyText = `[บอทแจ้งเตือน] รหัส ${targetType} ของแชทนี้คือ:\n${targetId}\n\nคุณมาร์คก๊อปปี้รหัสนี้ไปใส่ใน Vercel (ช่อง LINE_USER_ID) ได้เลยครับ!`;

      // Reply to the chat
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

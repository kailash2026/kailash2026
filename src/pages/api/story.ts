import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, date, story } = data;

    if (!name || !email || !story) {
      return new Response(JSON.stringify({ error: '缺少必填字段' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send email notification via Resend
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Kailash 2026 <onboarding@resend.dev>',
          to: 'kailash2026Lucas@outlook.com',
          subject: `新转山故事投稿：${name}`,
          html: `
            <h2>新的转山故事投稿</h2>
            <p><strong>姓名：</strong>${name}</p>
            <p><strong>邮箱：</strong>${email}</p>
            <p><strong>转山时间：</strong>${date || '未填写'}</p>
            <hr />
            <p>${story.replace(/\n/g, '<br>')}</p>
          `,
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: '服务器错误' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

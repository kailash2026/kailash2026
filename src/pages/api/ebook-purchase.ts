import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email, method } = data;

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: '请提供有效邮箱' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    const PDF_URL = 'https://kailash2026.com/ebooks/kailash-guide-2026.pdf';

    if (RESEND_API_KEY) {
      // Send PDF to buyer
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Kailash 2026 <guide@kailash2026.com>',
          to: email,
          subject: '🙏 您的《冈仁波齐权威指南》',
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 0 auto; background: #f8f6f3; border-radius: 16px; overflow: hidden;">
              <div style="background: #0F0E0D; padding: 30px; text-align: center;">
                <h1 style="color: #B8956A; margin: 0 0 8px;">🏔️ 冈仁波齐权威指南</h1>
                <p style="color: rgba(255,255,255,0.6); margin: 0;">您的朝圣之旅从这里开始</p>
              </div>
              <div style="padding: 30px;">
                <p style="color: #333; font-size: 16px;">感谢您的购买！</p>
                <p style="color: #555;">点击下方按钮下载您的电子书（PDF格式，兼容手机/平板/电脑）：</p>
                <div style="text-align: center; margin: 24px 0;">
                  <a href="${PDF_URL}" style="background: #B8956A; color: #0F0E0D; padding: 14px 36px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">📥 下载电子书</a>
                </div>
                <p style="color: #888; font-size: 12px;">文件约 5MB · PDF格式 · 永久有效</p>
                <hr style="border-color: #e8e0d5; margin: 24px 0;" />
                <p style="color: #888; font-size: 12px;">
                  <strong>有问题？</strong>回复此邮件或联系 kailash2026Lucas@outlook.com<br/>
                  Kailash 2026 · https://kailash2026.com
                </p>
              </div>
            </div>
          `,
        }),
      });

      // Notify admin
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Kailash 2026 <notify@kailash2026.com>',
          to: 'kailash2026Lucas@outlook.com',
          subject: `💰 电子书新订单：${email}`,
          html: `<p><strong>${email}</strong> 购买了电子书（${method || '未指定支付方式'}）。</p>`,
        }),
      });
    }

    return new Response(JSON.stringify({ success: true, message: '电子书已发送到您的邮箱' }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: '发送失败，请直接联系 kailash2026Lucas@outlook.com' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};

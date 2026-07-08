import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const RESEND_FROM = import.meta.env.RESEND_FROM_EMAIL || 'noreply@kailash2026.com';
const ADMIN_EMAIL = 'kailash2026Lucas@outlook.com';
const DEEPSEEK_API_KEY = import.meta.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Read body as text - Vercel may pre-consume the stream
    let rawText;
    try {
      rawText = await request.text();
    } catch {
      // Body already consumed, create from request params
      rawText = '{}';
    }
    console.log('Raw body:', rawText.substring(0, 200));
    let body = JSON.parse(rawText);
    const { name, email, phone, people, month, message, package: pkg } = body;

    // Basic validation
    if (!name || !email || !pkg) {
      return new Response(JSON.stringify({ error: '请填写必填项' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Format booking details
    const details = [
      `📋 新预订信息`,
      `━━━━━━━━━━━━━`,
      `套餐: ${pkg}`,
      `姓名: ${name}`,
      `邮箱: ${email}`,
      `电话: ${phone || '未填写'}`,
      `人数: ${people || 1}`,
      `期望时间: ${month || '未指定'}`,
      `备注: ${message || '无'}`,
      `━━━━━━━━━━━━━`,
      `时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`,
    ].join('\n');

    // 1. Send notification to admin
    if (resend) {
      await resend.emails.send({
        from: `Kailash 2026 <${RESEND_FROM}>`,
        to: ADMIN_EMAIL,
        subject: `📩 新预订咨询 - ${pkg} - ${name}`,
        text: details,
      });
    }

    // 2. Generate AI auto-reply
    let autoReply = '';
    if (DEEPSEEK_API_KEY) {
      try {
        const langHint = /^[a-zA-Z]/.test(name) ? 'English' : '中文';
        const deepseekRes = await fetch(DEEPSEEK_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              {
                role: 'system',
                content: `你是 Kailash 2026 的预订客服助手。你的任务是：用${langHint}写一封温暖、专业的预订确认邮件回复给客户。

客户信息：
- 姓名：${name}
- 套餐：${pkg}
- 人数：${people || 1}
- 期望时间：${month || '未指定'}
- 备注：${message || '无'}

邮件风格：
- 开头感谢预订
- 确认已收到信息
- 提及他们选择的套餐和人数
- 告知 24 小时内会有专人联系
- 留下联系邮箱 kailash2026Lucas@outlook.com 和微信 Kailash2026
- 结尾祝福语
- 用${langHint === 'English' ? 'English' : '中文'}撰写
- 控制在 250 字以内
- 不要用 markdown 格式，纯文本即可`
              },
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        });

        if (deepseekRes.ok) {
          const data = await deepseekRes.json();
          autoReply = data.choices?.[0]?.message?.content || '';
        }
      } catch (err) {
        console.error('DeepSeek auto-reply error:', err);
      }
    }

    // Fallback auto-reply if AI failed or key not available
    if (!autoReply) {
      const isEnglish = /^[a-zA-Z]/.test(name);
      if (isEnglish) {
        autoReply = `Dear ${name},

Thank you for your interest in the ${pkg} pilgrimage to Mount Kailash!

We have received your booking inquiry for ${people || 1} person(s)${month ? ` in ${month}` : ''}. Our team will review your request and get back to you within 24 hours with detailed information.

If you have any urgent questions, please feel free to contact us:
📧 kailash2026Lucas@outlook.com
💬 WeChat: Kailash2026

With blessings from Kailash,
The Kailash 2026 Team`;
      } else {
        autoReply = `${name} 您好，

感谢您预订${pkg}的冈仁波齐朝圣之旅！

我们已收到您的预订信息（${people || 1}人${month ? `，期望${month}出发` : ''}），团队将在24小时内通过邮件或电话与您联系，确认具体行程细节。

如有任何紧急问题，欢迎随时联系：
📧 kailash2026Lucas@outlook.com
💬 微信：Kailash2026

冈仁波齐保佑，
Kailash 2026 团队`;
      }
    }

    // 3. Send auto-reply to customer
    let customerEmailSent = false;
    if (resend && email) {
      try {
        await resend.emails.send({
          from: `Kailash 2026 <${RESEND_FROM}>`,
          to: email,
          subject: `✅ 预订确认 - ${pkg} - Kailash 2026`,
          text: autoReply,
        });
        customerEmailSent = true;
      } catch (err) {
        console.error('Failed to send customer email:', err);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: '预订信息已提交',
      customerEmailSent,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Booking API error:', err);
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: '服务器错误，请稍后重试', detail: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

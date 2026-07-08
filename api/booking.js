// Vercel Serverless Function for Booking API
// This file is at /api/booking.js - automatically picked up by Vercel

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM_EMAIL || 'noreply@kailash2026.com';
const ADMIN_EMAIL = 'kailash2026Lucas@outlook.com';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, email, phone, people, month, message, package: pkg } = req.body;

    if (!name || !email || !pkg) {
      res.status(400).json({ error: '请填写必填项' });
      return;
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
    const resendUrl = 'https://api.resend.com/emails';
    const emailHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    };

    if (RESEND_API_KEY) {
      await fetch(resendUrl, {
        method: 'POST',
        headers: emailHeaders,
        body: JSON.stringify({
          from: `Kailash 2026 <${RESEND_FROM}>`,
          to: ADMIN_EMAIL,
          subject: `📩 新预订咨询 - ${pkg} - ${name}`,
          text: details,
        }),
      });
    }

    // 2. Generate AI auto-reply
    let autoReply = '';
    const isEnglish = /^[a-zA-Z]/.test(name) || (email && /^[a-zA-Z]/.test(email));

    if (DEEPSEEK_API_KEY) {
      try {
        const langHint = isEnglish ? 'English' : '中文';
        const deepseekRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
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
- 用 ${langHint === 'English' ? 'English' : '中文'} 撰写
- 控制在 250 字以内
- 纯文本，不要 markdown 格式`
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

    // Fallback auto-reply
    if (!autoReply) {
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
    if (RESEND_API_KEY && email) {
      try {
        await fetch(resendUrl, {
          method: 'POST',
          headers: emailHeaders,
          body: JSON.stringify({
            from: `Kailash 2026 <${RESEND_FROM}>`,
            to: email,
            subject: `✅ 预订确认 - ${pkg} - Kailash 2026`,
            text: autoReply,
          }),
        });
        customerEmailSent = true;
      } catch (err) {
        console.error('Failed to send customer email:', err);
      }
    }

    res.status(200).json({
      success: true,
      message: '预订信息已提交',
      customerEmailSent,
    });

  } catch (err) {
    console.error('Booking API error:', err);
    res.status(500).json({ error: '服务器错误，请稍后重试' });
  }
}

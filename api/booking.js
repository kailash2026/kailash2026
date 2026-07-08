// Vercel Serverless Function for Booking API (v2 - with debug logging)

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM_EMAIL || 'noreply@kailash2026.com';
const ADMIN_EMAIL = 'kailash2026Lucas@outlook.com';

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
      return res.status(400).json({ error: '请填写必填项' });
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
    if (RESEND_API_KEY) {
      console.log('Sending admin notification...');
      const adminRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: `Kailash 2026 <${RESEND_FROM}>`,
          to: ADMIN_EMAIL,
          subject: `📩 新预订咨询 - ${pkg} - ${name}`,
          text: details,
        }),
      });
      console.log('Admin email response:', adminRes.status);
      if (!adminRes.ok) {
        const errText = await adminRes.text();
        console.error('Admin email error:', errText);
      }
    } else {
      console.log('RESEND_API_KEY not set, skipping admin email');
    }

    // 2. Generate auto-reply (template only, no AI)
    const isEnglish = /^[a-zA-Z]/.test(name) || (email && /^[a-zA-Z]/.test(email));
    let autoReply = '';

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

    // 3. Send auto-reply to customer
    let customerEmailSent = false;
    if (RESEND_API_KEY && email) {
      console.log('Sending customer auto-reply...');
      const customerRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: `Kailash 2026 <${RESEND_FROM}>`,
          to: email,
          subject: `✅ 预订确认 - ${pkg} - Kailash 2026`,
          text: autoReply,
        }),
      });
      console.log('Customer email response:', customerRes.status);
      if (customerRes.ok) {
        customerEmailSent = true;
      } else {
        const errText = await customerRes.text();
        console.error('Customer email error:', errText);
      }
    }

    return res.status(200).json({
      success: true,
      message: '预订信息已提交',
      customerEmailSent,
    });

  } catch (err) {
    console.error('Booking API error:', err.message, err.stack);
    return res.status(500).json({ error: '服务器错误，请稍后重试', detail: err.message });
  }
}

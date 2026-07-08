// Vercel Serverless Function for Booking API (v3 - CJS renamed)

const { Resend } = require('resend');

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM_EMAIL || 'noreply@kailash2026.com';
const ADMIN_EMAIL = 'kailash2026Lucas@outlook.com';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const data = req.body;
    const { name, email, phone, people, month, message, package: pkg } = data;

    if (!name || !email || !pkg) {
      return res.status(400).json({ error: '请填写必填项' });
    }

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

    // Use Resend SDK instead of raw fetch
    const resend = new Resend(RESEND_API_KEY);

    // 1. Notify admin
    await resend.emails.send({
      from: `Kailash 2026 <${RESEND_FROM}>`,
      to: ADMIN_EMAIL,
      subject: `📩 新预订咨询 - ${pkg} - ${name}`,
      text: details,
    });

    // 2. Auto-reply to customer
    const isEnglish = /^[a-zA-Z]/.test(name);
    const autoReply = isEnglish
      ? `Dear ${name},\n\nThank you for your interest in the ${pkg} pilgrimage to Mount Kailash!\n\nWe have received your booking inquiry for ${people || 1} person(s)${month ? ` in ${month}` : ''}. Our team will review your request and get back to you within 24 hours with detailed information.\n\nIf you have any urgent questions, please feel free to contact us:\n📧 kailash2026Lucas@outlook.com\n💬 WeChat: Kailash2026\n\nWith blessings from Kailash,\nThe Kailash 2026 Team`
      : `${name} 您好，\n\n感谢您预订${pkg}的冈仁波齐朝圣之旅！\n\n我们已收到您的预订信息（${people || 1}人${month ? `，期望${month}出发` : ''}），团队将在24小时内通过邮件或电话与您联系，确认具体行程细节。\n\n如有任何紧急问题，欢迎随时联系：\n📧 kailash2026Lucas@outlook.com\n💬 微信：Kailash2026\n\n冈仁波齐保佑，\nKailash 2026 团队`;

    let customerEmailSent = false;
    if (email) {
      await resend.emails.send({
        from: `Kailash 2026 <${RESEND_FROM}>`,
        to: email,
        subject: `✅ 预订确认 - ${pkg} - Kailash 2026`,
        text: autoReply,
      });
      customerEmailSent = true;
    }

    return res.status(200).json({ success: true, message: '预订信息已提交', customerEmailSent });

  } catch (err) {
    console.error('Booking error:', err.message, err.stack);
    return res.status(500).json({ error: '服务器错误', detail: err.message });
  }
};

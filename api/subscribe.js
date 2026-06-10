// Vercel Serverless Function - /api/subscribe
// Handles newsletter subscription
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, lang, source } = req.body || {};

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@kailash2026.com';
  const OWNER_EMAIL = 'kailash2026Lucas@outlook.com';

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Server config error' });
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    // 1. Create/add contact to Resend Audience
    // First try to create an audience if it doesn't exist
    // Then add the contact
    const audienceResponse = await resend.audiences.create({
      name: 'Newsletter Subscribers',
    });

    await resend.contacts.create({
      email: email,
      audience_id: audienceResponse.data?.id || '',
      unsubscribed: false,
    });

    // 2. Send confirmation to subscriber
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: lang === 'zh' ? '感谢订阅冈仁波齐朝圣资讯' : 'Welcome to Kailash Pilgrimage Newsletter',
      html: lang === 'zh' ? `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#f8f5f0;">
          <h1 style="color:#1a1a2e;font-size:24px;">🙏 感谢你的订阅</h1>
          <p style="color:#4a4a4a;line-height:1.6;font-size:16px;">
            你已成功订阅冈仁波齐朝圣资讯。我们将定期为你推送：
          </p>
          <ul style="color:#4a4a4a;line-height:1.8;font-size:15px;">
            <li>🚩 马年转山最新动态与攻略</li>
            <li>📜 冈仁波齐文化与宗教深度解读</li>
            <li>🗺️ 朝圣路线与实用指南</li>
            <li>💬 朝圣者真实故事分享</li>
          </ul>
          <p style="color:#888;font-size:13px;margin-top:30px;">
            如果你未订阅此邮件，请忽略。
          </p>
        </div>
      ` : `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#f8f5f0;">
          <h1 style="color:#1a1a2e;font-size:24px;">🙏 Thank You for Subscribing</h1>
          <p style="color:#4a4a4a;line-height:1.6;font-size:16px;">
            You've successfully subscribed to the Kailash Pilgrimage Newsletter. We'll send you:
          </p>
          <ul style="color:#4a4a4a;line-height:1.8;font-size:15px;">
            <li>🚩 Latest Kailash Horse Year 2026 news & guides</li>
            <li>📜 In-depth cultural & religious content</li>
            <li>🗺️ Pilgrimage route & practical tips</li>
            <li>💬 Real pilgrim stories</li>
          </ul>
          <p style="color:#888;font-size:13px;margin-top:30px;">
            If you didn't subscribe, please ignore this email.
          </p>
        </div>
      `,
    });

    // 3. Notify owner
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `📧 新订阅者: ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2>新邮件订阅</h2>
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">邮箱</td><td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">语言</td><td style="padding:8px;border:1px solid #ddd;">${lang || 'zh'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">来源</td><td style="padding:8px;border:1px solid #ddd;">${source || 'direct'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">时间</td><td style="padding:8px;border:1px solid #ddd;">${new Date().toISOString()}</td></tr>
          </table>
          <p style="color:#888;font-size:12px;margin-top:20px;">当前订阅者已在 Resend Audience 中管理</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    // If audience already exists, try adding contact directly
    try {
      const audiences = await resend.audiences.list();
      const audience = audiences.data?.find(a => a.name === 'Newsletter Subscribers');

      if (audience) {
        await resend.contacts.create({
          email: email,
          audience_id: audience.id,
          unsubscribed: false,
        });
        
        // Still send confirmation
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: lang === 'zh' ? '感谢订阅冈仁波齐朝圣资讯' : 'Welcome to Kailash Pilgrimage Newsletter',
          html: `<p>Subscription confirmed. Thank you!</p>`,
        });

        return res.status(200).json({ success: true });
      }
    } catch (e2) {
      // Silent fail on duplicate, just return success
    }

    return res.status(200).json({ success: true, note: 'email received' });
  }
}

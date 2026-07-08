import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email, source, lang } = data;

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Kailash 2026 <updates@kailash2026.com>',
          to: email,
          subject: 'Welcome to Kailash 2026 🙏',
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 0 auto;">
              <h2 style="color: #B8956A;">Welcome to Kailash 2026</h2>
              <p>Thank you for subscribing. You'll receive:</p>
              <ul>
                <li>Pilgrimage guides & seasonal tips</li>
                <li>Sacred mountain culture stories</li>
                <li>2026 Fire Horse Year updates</li>
              </ul>
              <p style="color: #6b7280; font-size: 12px;">Unsubscribe anytime. No spam, ever.</p>
            </div>
          `,
        }),
      });

      // Also notify admin
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Kailash 2026 <notify@kailash2026.com>',
          to: 'kailash2026Lucas@outlook.com',
          subject: `📬 New subscriber: ${email}`,
          html: `<p><strong>${email}</strong> subscribed from <em>${source || 'unknown'}</em> (lang: ${lang || 'zh'})</p>`,
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 201, headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};

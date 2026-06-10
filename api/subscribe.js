// Vercel Serverless Function - /api/subscribe
// Adds subscribers to MailerLite group
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, lang, source } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const API_TOKEN = process.env.MAILERLITE_API_KEY;

  if (!API_TOKEN) {
    return res.status(500).json({ error: 'Server config error' });
  }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        groups: ['189914908936111642'],
        status: 'active',
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('MailerLite error:', errText);
      return res.status(200).json({ success: true, note: 'registered' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(200).json({ success: true, note: 'registered' });
  }
}

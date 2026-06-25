// Cloudflare Pages Function - /api/subscribe
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { email } = body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const API_TOKEN = env.MAILERLITE_API_KEY;

  if (!API_TOKEN) {
    return new Response(JSON.stringify({ error: 'Server config error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
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
      return new Response(JSON.stringify({ success: true, note: 'registered' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Subscribe error:', err);
    return new Response(JSON.stringify({ success: true, note: 'registered' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // 验证必填字段
    const required = ['name', 'phone', 'package', 'date'];
    for (const field of required) {
      if (!data[field]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // 这里可以接入邮件服务如 Resend
    // const { data: emailData, error } = await resend.emails.send({
    //   from: 'noreply@kailash2026.com',
    //   to: 'contact@kailash2026.com',
    //   subject: `新预订申请 - ${data.name}`,
    //   html: `...`
    // });

    // 暂时记录到控制台，后续可接入数据库
    console.log('New booking:', {
      ...data,
      submittedAt: new Date().toISOString()
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking submitted successfully' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
import type { APIRoute } from 'astro';

// Resend 邮件服务配置
// 1. 访问 https://resend.com 注册账号
// 2. 验证域名 kailash2026.com
// 3. 获取 API Key
// 4. 在 Vercel 环境变量中添加 RESEND_API_KEY

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = import.meta.env.RESEND_FROM_EMAIL || 'noreply@kailash2026.com';
const RESEND_TO_EMAIL = import.meta.env.RESEND_TO_EMAIL || 'contact@kailash2026.com';

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

    // 记录预订信息
    const bookingInfo = {
      ...data,
      submittedAt: new Date().toISOString(),
      id: `BK${Date.now()}`
    };
    console.log('New booking:', bookingInfo);

    // 如果有 Resend API Key，发送邮件通知
    if (RESEND_API_KEY) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: RESEND_FROM_EMAIL,
            to: RESEND_TO_EMAIL,
            subject: `【新预订】${data.name} - ${data.package}`,
            html: generateEmailHtml(data, bookingInfo.id)
          })
        });

        if (!response.ok) {
          console.error('Email send failed:', await response.text());
        } else {
          console.log('Email sent successfully');
        }
      } catch (emailError) {
        console.error('Email service error:', emailError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking submitted successfully',
        bookingId: bookingInfo.id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Booking error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// 生成邮件 HTML 模板
function generateEmailHtml(data: any, bookingId: string): string {
  const packageNames: Record<string, string> = {
    'basic': '基础朝圣套餐',
    'standard': '标准朝圣套餐',
    'premium': '尊贵朝圣套餐'
  };

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e3a8a;">🙏 新的朝圣预订申请</h2>
      <p><strong>预订编号：</strong>${bookingId}</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
      
      <h3 style="color: #374151;">客户信息</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;"><strong>姓名</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;"><strong>电话</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;"><strong>微信</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">${data.wechat || '未填写'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;"><strong>邮箱</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">${data.email || '未填写'}</td>
        </tr>
      </table>

      <h3 style="color: #374151; margin-top: 20px;">行程信息</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;"><strong>套餐</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">${packageNames[data.package] || data.package}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;"><strong>出发日期</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">${data.date}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;"><strong>人数</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">${data.groupSize || '未填写'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;"><strong>特殊需求</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #f3f4f6;">${data.specialRequests || '无'}</td>
        </tr>
      </table>

      <p style="margin-top: 30px; color: #6b7280; font-size: 12px;">
        此邮件由 kailash2026.com 网站自动发送<br>
        提交时间：${new Date().toLocaleString('zh-CN')}
      </p>
    </div>
  `;
}

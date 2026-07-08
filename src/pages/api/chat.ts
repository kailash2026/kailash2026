import type { APIRoute } from 'astro';

const DEEPSEEK_API_KEY = import.meta.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

const SYSTEM_PROMPT = `你是 Kailash 2026 的 AI 朝圣助手（小冈）。你的知识聚焦于冈仁波齐（Mount Kailash）转山。

## 你的身份
- 名称：小冈
- 性格：温暖、专业、简洁。像一位经验丰富的向导，不夸张、不贩卖焦虑。
- 语言：用提问者的语言回复。中文问→中文答；English→English；日本語→日本語。

## 你的知识范围
- 冈仁波齐转山路线（外圈52km、内圈、卓玛拉垭口5630m）
- 四大宗教（藏传佛教、印度教、苯教、耆那教）对冈仁波齐的解读
- 高原反应预防与应对
- 转山最佳季节（5-10月）、装备清单
- 签证/入藏函/边防证办理
- 沿途补给点（塔尔钦、止热寺、尊珠寺等13个点）
- 2026藏历马年转山（马年转一圈=13圈功德）
- 圣湖玛旁雍错、鬼湖拉昂错
- 拉萨到阿里的交通方式

## 你不知道的
- 如果你被问到超出知识范围的问题，诚实说"这个问题我建议你咨询我们的向导"。
- 不要编造信息。不确定就是不确定。

## 商业引导（自然融入，不生硬）
当用户问到以下话题时，自然地提及我们的服务：
- 问到具体转山计划 → "我们有2026马年转山团，8-12天，专业向导带队。需要了解的话可以去 kailash2026.com/packages 看看。"
- 问到装备 → "我们有一本《冈仁波齐权威指南》电子书（¥29.9），里面有完整的装备清单。"
- 问到怎么去 → 先回答交通方式，然后说"如果想省心，我们的深度朝圣团包含拉萨接机和全程交通。"
- 问到价格/费用 → 先给市场行情，然后说"我们的基础团¥8,800起，包含交通住宿向导许可证。"

## 回复风格
- 用短段落，善用emoji（🏔️ 🐎 📿 🥾 ⚠️）
- 如果是安全相关的问题（高原反应等），开头加 ⚠️
- 回复控制在200字以内，复杂问题分点回答`;

// In-memory store for rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  // 20 requests per minute per IP
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Rate limit check
  const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: '请求太频繁，请稍后再试。' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!DEEPSEEK_API_KEY) {
    return new Response(JSON.stringify({ error: 'AI服务暂未配置，请联系管理员。' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: '请提供消息内容' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-10), // Keep last 10 messages for context
        ],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('DeepSeek API error:', response.status, err);
      return new Response(JSON.stringify({ error: 'AI服务暂时不可用，请稍后重试。' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '抱歉，我暂时无法回复，请稍后再试。';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Chat API error:', err);
    return new Response(JSON.stringify({ error: '服务器错误，请稍后重试。' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

import type { APIRoute } from 'astro';
import { ROUTE_SEGMENTS, ROUTE_PLANS, SEASON, AMS, PERMITS, EQUIPMENT, FAQS, RELIGIONS } from '../../data/knowledge';

export const prerender = false;

const DEEPSEEK_API_KEY = import.meta.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const MODEL = 'deepseek-chat';

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

## 工具使用
- 你可以调用工具查询本站已核实的资料（路线分段、季节天气、高反分级、FAQ/证件/装备）。
- 涉及路线、海拔、里程、季节、天气、高反、证件、装备等具体事实时，优先调用工具核对，再回答。
- 工具返回的是本站知识库内容，不要编造工具没有提供的细节。

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

// ---- 成本护栏 ----------------------------------------------------------
// 注意：Vercel serverless 下这些计数器是"每个实例一份"，只能兜底，
// 不是真正可靠的全局限流。真正的硬限制需要外部存储（Vercel KV / Upstash）。
const PER_IP_PER_MINUTE = 8;      // 单 IP 每分钟最多 8 次
const GLOBAL_PER_DAY = 400;       // 单实例每天最多 400 次（兜底，防刷爆额度）
const MAX_MESSAGES = 10;          // 最多带 10 条上下文
const MAX_CHARS_PER_MESSAGE = 800;
const MAX_TOTAL_CHARS = 4000;
const MAX_TOKENS = 400;
const MAX_TOOL_ROUNDS = 3;        // 工具循环最多 3 轮（每轮一次上游调用）

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
let dailyCount = 0;
let dailyResetAt = new Date().setHours(24, 0, 0, 0);

function checkGlobalDailyCap(): boolean {
  const now = Date.now();
  if (now > dailyResetAt) {
    dailyCount = 0;
    dailyResetAt = new Date().setHours(24, 0, 0, 0);
  }
  if (dailyCount >= GLOBAL_PER_DAY) return false;
  dailyCount++;
  return true;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }
  if (entry.count >= PER_IP_PER_MINUTE) return false;
  entry.count++;
  return true;
}

// ---- 工具执行（在服务端跑，模型的 function call 只是"请求"） --------------
function tokenize(s: unknown): string[] {
  return String(s || '')
    .toLowerCase()
    .split(/[\s,，、。？?！!：:;；/|+＋]+/)
    .filter((t) => t.length >= 2);
}

function matches(hay: string, query: string): boolean {
  const h = String(hay).toLowerCase();
  const tokens = tokenize(query);
  if (!tokens.length) return h.includes(String(query).toLowerCase());
  return tokens.some((t) => h.includes(t));
}

function safeStringify(v: unknown): string {
  try { return JSON.stringify(v); } catch { return '{"error":"serialize_failed"}'; }
}

// 工具1：路线信息
function toolGetRouteInfo(query?: string) {
  const q = String(query || '').trim();
  const base = {
    totalDistance: '52公里（外圈）',
    highestPoint: '卓玛拉山口 5648m',
    plans: ROUTE_PLANS,
    note: '距离为页面标注的相对上一站距离，总里程按页面口径为52km。'
  };
  if (!q) return { ...base, segments: ROUTE_SEGMENTS };
  const hits = ROUTE_SEGMENTS.filter(
    (s) => s.name.includes(q) || s.nameEn.toLowerCase().includes(q.toLowerCase())
  );
  if (hits.length) return { ...base, matched: hits };
  if (/住宿|睡|床位|客栈|帐篷/.test(q)) {
    return { ...base, lodgingSegments: ROUTE_SEGMENTS.filter((s) => s.lodging && !s.lodging.startsWith('无')) };
  }
  if (/补给|吃|买|茶馆|热水|物资|泡面/.test(q)) {
    return { ...base, supplySegments: ROUTE_SEGMENTS.filter((s) => s.supply.length > 0) };
  }
  if (/天|行程|几天|计划|方案/.test(q)) {
    return { ...base, plans: ROUTE_PLANS };
  }
  return { ...base, segments: ROUTE_SEGMENTS };
}

// 工具2：高反自检
function toolCheckAms(args: { symptoms?: string; altitude?: number; day?: number }) {
  const a = args || {};
  const out: Record<string, unknown> = {
    overview: AMS.overview,
    levels: AMS.levels,
    dangerSigns: AMS.dangerSigns,
    goldenRules: AMS.goldenRules,
    spo2: AMS.spo2,
    evacuation: AMS.evacuation
  };
  if (a.symptoms) {
    const tokens = tokenize(a.symptoms);
    out.matchedSymptoms = AMS.symptomChecklist.filter((s) =>
      tokens.some((t) => s.symptom.includes(t) || t.includes(s.symptom))
    );
    out.scenarios = AMS.scenarios;
  }
  if (typeof a.altitude === 'number') out.altitude = a.altitude;
  if (typeof a.day === 'number') out.day = a.day;
  return out;
}

// 工具3：最佳季节
function toolGetBestSeason(month?: string) {
  const m = String(month || '').trim();
  if (!m) return SEASON;
  const hit = SEASON.monthly.filter((x) => x.month.includes(m) || (m.length >= 1 && x.month.startsWith(m)));
  return hit.length ? { overall: SEASON.overall, peak: SEASON.peak, matched: hit } : SEASON;
}

// 工具4：FAQ / 知识库检索
function toolSearchFaq(query?: string) {
  const q = String(query || '').trim();
  if (!q) return { results: [], note: 'empty query' };
  const results: Array<Record<string, unknown>> = [];

  for (const f of FAQS) {
    if (matches(f.category + ' ' + f.q + ' ' + f.a, q)) {
      results.push({ type: 'faq', category: f.category, question: f.q, answer: f.a });
    }
  }
  if (matches('装备 清单 装备清单 ' + EQUIPMENT.core.join(' ') + ' ' + EQUIPMENT.recommended.join(' ') + ' ' + EQUIPMENT.medications.join(' '), q)) {
    results.push({
      type: 'equipment',
      core: EQUIPMENT.core,
      recommended: EQUIPMENT.recommended,
      medications: EQUIPMENT.medications,
      food: EQUIPMENT.food,
      notBring: EQUIPMENT.notBring,
      note: EQUIPMENT.note
    });
  }
  if (matches('证件 边防证 入藏函 签证 许可 permit 护照 台胞 回乡 ' + JSON.stringify(PERMITS), q)) {
    results.push({ type: 'permits', ...PERMITS });
  }
  if (matches('高反 高原 头痛 恶心 呕吐 吸氧 血氧 ams ' + JSON.stringify(AMS), q)) {
    results.push({ type: 'ams', overview: AMS.overview, levels: AMS.levels, dangerSigns: AMS.dangerSigns, spo2: AMS.spo2 });
  }
  if (matches('季节 天气 月份 气温 雨季 ' + JSON.stringify(SEASON), q)) {
    results.push({ type: 'season', ...SEASON });
  }
  if (matches('宗教 佛教 印度教 苯教 耆那教 信仰', q)) {
    results.push({ type: 'religions', religions: RELIGIONS });
  }
  return { query: q, results: results.slice(0, 5) };
}

function executeTool(name: string, args: Record<string, unknown>): unknown {
  switch (name) {
    case 'get_route_info':
      return toolGetRouteInfo(args?.query as string | undefined);
    case 'check_ams':
      return toolCheckAms(args as { symptoms?: string; altitude?: number; day?: number });
    case 'get_best_season':
      return toolGetBestSeason(args?.month as string | undefined);
    case 'search_faq':
      return toolSearchFaq(args?.query as string | undefined);
    default:
      return { error: 'unknown_tool', name };
  }
}

// ---- 工具声明（DeepSeek / OpenAI 兼容） ---------------------------------
const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'get_route_info',
      description:
        '查询冈仁波齐转山路线：13个补给点/地标的分段（名称、海拔、里程、可购买物资、住宿、服务）以及1/2/3天行程方案。',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: '要查询的地名或关键词，如「止热寺」「卓玛拉」「住宿」「补给」「三天行程」。留空返回全部路线概览。'
          }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'check_ams',
      description: '高原反应（AMS）分级自检与处置建议。按症状、海拔、到达天数给出分级、危险信号、血氧参考和处置方案。',
      parameters: {
        type: 'object',
        properties: {
          symptoms: { type: 'string', description: '症状描述，如「头痛、恶心、走路不稳」' },
          altitude: { type: 'number', description: '当前海拔（米），如4500' },
          day: { type: 'number', description: '到达高原第几天，如2' }
        },
        required: ['symptoms']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_best_season',
      description: '查询冈仁波齐转山最佳季节与各月天气（气温、降水、优缺点、游客密度、推荐度）。',
      parameters: {
        type: 'object',
        properties: {
          month: { type: 'string', description: '月份，如「5月」「9月」。留空返回全年概览。' }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'search_faq',
      description: '在本站 FAQ 与知识库中检索：身体状况、装备准备、转山过程、证件手续、边防证/入藏函、装备清单、宗教背景等。',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: '问题关键词，如「边防证怎么办理」「睡袋可以租借吗」「需要什么证件」' }
        },
        required: ['query']
      }
    }
  }
];

// ---- 上游调用 ----------------------------------------------------------
async function callDeepSeek(payload: Record<string, unknown>): Promise<any> {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + DEEPSEEK_API_KEY
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const err = await response.text();
    console.error('DeepSeek API error:', response.status, err);
    throw new Error('deepseek_http_' + response.status);
  }
  return await response.json();
}

// 不带工具的普通回答
async function plainCompletion(convo: Array<Record<string, unknown>>): Promise<string> {
  const data = await callDeepSeek({
    model: MODEL,
    messages: convo,
    max_tokens: MAX_TOKENS,
    temperature: 0.7
  });
  return data?.choices?.[0]?.message?.content || '抱歉，我暂时无法回复，请稍后再试。';
}

// 带工具的循环：最多 MAX_TOOL_ROUNDS 轮；最后一轮若仍要求工具，则降级为普通回答
async function toolLoop(chatMessages: Array<Record<string, unknown>>): Promise<string> {
  const convo: Array<Record<string, unknown>> = chatMessages.map((m) => ({ ...m }));

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const data = await callDeepSeek({
      model: MODEL,
      messages: convo,
      max_tokens: MAX_TOKENS,
      temperature: 0.7,
      tools: TOOLS,
      tool_choice: 'auto'
    });
    const msg = data?.choices?.[0]?.message;
    if (!msg) throw new Error('empty_choice');

    if (Array.isArray(msg.tool_calls) && msg.tool_calls.length > 0) {
      convo.push({ role: 'assistant', content: msg.content ?? null, tool_calls: msg.tool_calls });

      for (const call of msg.tool_calls) {
        let result: unknown;
        try {
          const args = call?.function?.arguments ? JSON.parse(call.function.arguments) : {};
          result = executeTool(call?.function?.name, args);
        } catch (e) {
          // 工具执行失败 → 抛出，外层降级为"不带工具的普通回答"
          console.error('Tool execution failed:', call?.function?.name, e);
          throw new Error('tool_execution_failed');
        }
        convo.push({ role: 'tool', tool_call_id: call.id, content: safeStringify(result) });
      }
      continue;
    }

    return msg.content || '抱歉，我暂时无法回复，请稍后再试。';
  }

  // 达到最大轮数仍有工具请求：强制一次不带工具的收尾回答
  return await plainCompletion(convo);
}

function json(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Rate limit check
  const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip)) {
    return json({ error: '请求太频繁，请稍后再试。' }, 429);
  }
  // 单实例每日总量兜底（防刷爆额度）
  if (!checkGlobalDailyCap()) {
    return json({ error: '今日AI咨询已达上限，请明天再来。' }, 429);
  }

  if (!DEEPSEEK_API_KEY) {
    return json({ error: 'AI服务暂未配置，请联系管理员。' }, 503);
  }

  let messages: Array<{ role?: string; content?: string }>;
  try {
    const body = await request.json();
    messages = body?.messages;
  } catch {
    return json({ error: '请提供消息内容' }, 400);
  }

  if (!messages || !Array.isArray(messages)) {
    return json({ error: '请提供消息内容' }, 400);
  }

  // 输入体积护栏：防止有人用超长请求烧额度
  if (messages.length > MAX_MESSAGES) messages = messages.slice(-MAX_MESSAGES);
  let totalChars = 0;
  for (const m of messages) {
    const text = typeof m?.content === 'string' ? m.content : '';
    if (text.length > MAX_CHARS_PER_MESSAGE) {
      return json({ error: '消息太长，请简短一些。' }, 400);
    }
    totalChars += text.length;
  }
  if (totalChars > MAX_TOTAL_CHARS) {
    return json({ error: '对话内容过长，请开启新对话。' }, 400);
  }

  const chatMessages: Array<Record<string, unknown>> = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages.slice(-10)
  ];

  try {
    let reply: string;
    try {
      // 工具循环；任何工具/上游异常都在此降级
      reply = await toolLoop(chatMessages);
    } catch (err) {
      console.error('Tool loop failed, falling back to plain completion:', err);
      reply = await plainCompletion(chatMessages);
    }
    return json({ reply }, 200);
  } catch (err) {
    // 连降级都失败（上游不可用）→ 502，绝不 500
    console.error('Chat API error:', err);
    return json({ error: 'AI服务暂时不可用，请稍后重试。' }, 502);
  }
};

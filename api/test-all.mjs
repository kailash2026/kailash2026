// 全API测试脚本 - 用 node 发送避免 PowerShell 转义问题
const BASE = 'https://kailash2026.com';
const headers = { 'Content-Type': 'application/json' };

async function post(path, body) {
  try {
    const res = await fetch(BASE + path, { method: 'POST', headers, body: JSON.stringify(body) });
    const text = await res.text();
    return `[${res.status}] ${path} -> ${text.slice(0, 120)}`;
  } catch (e) {
    return `[ERR] ${path} -> ${e.message}`;
  }
}

// booking 完整字段
console.log(await post('/api/booking', {
  name: 'Lucas测试', email: 'kailash2026Lucas@outlook.com', phone: '13800000000',
  people: '2', month: '2026-08', package: 'standard', message: '测试提交'
}));

// booking 缺字段（应400）
console.log(await post('/api/booking', { name: 'x' }));

// subscribe 缺字段（应400，路由通）
console.log(await post('/api/subscribe', { email: 'bad-email' }));

// story 缺字段（应400，路由通）
console.log(await post('/api/story', { name: 'x' }));

// ebook-purchase 缺字段（应400，路由通）
console.log(await post('/api/ebook-purchase', { email: 'bad' }));

// chat（AI助手，可能较慢或需要API key）
console.log(await post('/api/chat', { messages: [{ role: 'user', content: '你好' }] }));

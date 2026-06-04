# Kailash 2026 — 行动计划

> 目标：在2026藏历马年朝圣季之前，建成全球最有影响力的冈仁波齐多语种信息平台。

---

## 📅 时间线总览

| 阶段 | 时间 | 主题 | 目标 |
|------|------|------|------|
| 🔴 **Phase 1** | 现在 — 2周内 | 基础补完 | 四语言页面完整 + SEO |
| 🟡 **Phase 2** | 2周 — 1个月 | 内容深化 | 博客系统 + 印地语 |
| 🟢 **Phase 3** | 1—3个月 | 流量获取 | SEO排名 + 社交媒体 |
| 🔵 **Phase 4** | 3—6个月 | 社区变现 | 论坛 + 行程预订佣金 |

---

## 🔴 Phase 1：基础补完（优先级最高，现在开始）

### 1.1 完成 routes.astro 日韩语 ✅→🏃
- [ ] 完成 routes.astro 中日语和韩语的模板显示逻辑
- [ ] 两条路线（threeDay, oneDay）的日韩数据
- [ ] 13个补给站的日韩数据
- [ ] 构建测试 + 部署

### 1.2 创建 ja/ 和 ko/ 语种子页面
当前只有 `ja/index.astro` 和 `ko/index.astro`，其他页面缺失：
- [ ] `ja/culture.astro`
- [ ] `ja/guide.astro`
- [ ] `ja/routes.astro`
- [ ] `ja/faq.astro`
- [ ] `ja/stories.astro`
- [ ] `ko/culture.astro`
- [ ] `ko/guide.astro`
- [ ] `ko/routes.astro`
- [ ] `ko/faq.astro`
- [ ] `ko/stories.astro`

### 1.3 SEO 基础优化
- [ ] 每个页面确认 `<title>` + `<meta description>` 完善
- [ ] 生成多语言 sitemap.xml（包含 ja/ko/en 子路径）
- [ ] 添加 hreflang 标签到 `<head>`（告诉 Google 多语言关系）
- [ ] Google Search Console 提交 sitemap
- [ ] robots.txt 确认无误

### 1.4 网站速度
- [ ] 图片压缩（用 image-optimizer skill）
- [ ] Lighthouse 性能检查，目标 90+

---

## 🟡 Phase 2：内容深化

### 2.1 博客系统
- [ ] 新增 `/blog/` 路由（Astro 内容集合）
- [ ] 首月发布 6-10 篇 SEO 文章：
  - "冈仁波齐转山完整指南 2026"
  - "Mount Kailash Kora: Complete Guide 2026"
  - "カイラス山巡礼2026完全ガイド"
  - "2026年马年转山：为什么今年特别重要"
  - "冈仁波齐海拔适应指南"
  - "Kailash Photography Guide"

### 2.2 印地语（Hindi）
印度教徒是冈仁波齐最大朝圣群体：
- [ ] `hi/index.astro` — 首页印地语版本
- [ ] `hi/routes.astro` — 转山路线

### 2.3 内容更新
- [ ] 2026年朝圣季具体日期（通常5-10月）
- [ ] 最新中国签证/入藏函政策
- [ ] 尼泊尔→西藏路线（印度朝圣者主要入口）

---

## 🟢 Phase 3：流量获取

### 3.1 SEO 执行
- [ ] 目标关键词研究：
  - 中文：冈仁波齐转山、冈仁波齐攻略、冈仁波齐2026、马年转山
  - 英文：Mount Kailash trek、Kailash Kora 2026、Kailash pilgrimage
  - 日语：カイラス山巡礼、カイラス登山2026
- [ ] 每周发布 1-2 篇博客文章
- [ ] 内链优化（相关内容互相链接）

### 3.2 社交媒体
- [ ] 创建小红书账号（中文朝圣/旅行类内容）
- [ ] 创建 Instagram 账号（精美图片 + 多语种标签）
- [ ] 创建 YouTube 频道（如果有视频素材）

### 3.3 外链建设
- [ ] 与旅行博客交换链接
- [ ] 在 Lonely Planet Thorn Tree / TripAdvisor 论坛提供有价值回答 + 签名链接
- [ ] 提交到旅行类网站目录

---

## 🔵 Phase 4：社区与变现

### 4.1 社区功能
- [ ] 朝圣故事投稿表单优化
- [ ] 评论区（可选：Disqus 或自建）
- [ ] 邮件订阅（Resend 已有）

### 4.2 变现路径
最自然的方式：**行程预订佣金**
- [ ] 与 2-3 家西藏当地旅行社合作
- [ ] 添加"推荐旅行社"页面（含 referral link）
- [ ] 不自己运营旅行团（零风险，纯佣金）

其他可选：
- [ ] Google AdSense（流量上来后被动收入）
- [ ] 付费内容（深度电子书/视频课程）

---

## 📊 关键指标

| 指标 | 现在 | 3个月目标 | 6个月目标 |
|------|------|-----------|-----------|
| 日访问量 | ~0 | 50-100 | 500+ |
| 语言支持 | 4 | 5 (+印地语) | 5 |
| 页面数 | ~20 | 40+ | 60+ |
| 邮件订阅 | 0 | 100 | 500 |
| 月收入 | ¥0 | ¥0 | ¥500-2000 |

---

## 🎯 本周立即行动（Top 3）

1. **完成 routes.astro 日韩语** — 这是你已经在做的，先收尾
2. **图片压缩** — 运行 image-optimizer，让网站加载更快
3. **Google Search Console** — 注册并提交 sitemap，让 Google 开始索引

---

*计划制定于 2026-06-05，每两周回顾更新。*

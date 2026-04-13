# Kailash 2026 - 冈仁波齐朝圣之旅网站

## 项目介绍

这是为 kailash2026.com 开发的官方网站，提供冈仁波齐神山文化介绍、朝圣攻略、转山路线和行程预订服务。

## 技术栈

- **框架**: [Astro](https://astro.build) - 静态站点生成器
- **样式**: [Tailwind CSS](https://tailwindcss.com)
- **交互**: [React](https://react.dev) - 用于动态组件（预订表单）
- **部署**: [Vercel](https://vercel.com)

## 项目结构

```
kailash2026/
├── .github/workflows/     # CI/CD配置
├── src/
│   ├── components/        # 可复用组件
│   │   ├── SEO.astro
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── RoutePreview.astro
│   │   ├── BookingCTA.astro
│   │   └── BookingForm.tsx
│   ├── layouts/           # 页面布局
│   │   └── Layout.astro
│   ├── pages/             # 页面路由
│   │   ├── index.astro         # 首页
│   │   ├── culture.astro       # 神山文化
│   │   ├── guide.astro         # 朝圣攻略
│   │   ├── routes.astro        # 转山路线
│   │   ├── booking.astro       # 预订行程
│   │   ├── about.astro         # 关于我们
│   │   ├── faq.astro           # 常见问题
│   │   ├── gallery.astro       # 图库
│   │   ├── stories.astro       # 朝圣故事
│   │   ├── contact.astro       # 联系我们
│   │   ├── 404.astro           # 404页面
│   │   ├── api/
│   │   │   └── booking.ts      # 表单API
│   │   └── sitemap.xml.ts      # 站点地图
│   └── styles/
│       └── global.css
├── public/                # 静态资源
│   ├── favicon.svg
│   ├── site.webmanifest
│   ├── robots.txt
│   └── images/
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── README.md
├── DEPLOY.md
├── DEPLOY-QUICK.md
├── PROJECT.md
├── CHANGELOG.md
└── deploy.bat
```

## 页面说明

| 页面 | 路径 | 功能 |
|------|------|------|
| 首页 | `/` | 品牌展示、快速入口 |
| 神山文化 | `/culture` | 四大宗教介绍、历史传说、地理奇观 |
| 朝圣攻略 | `/guide` | 最佳时间、装备清单、高反预防、证件办理 |
| 转山路线 | `/routes` | 52公里路线详解、海拔变化、每日行程 |
| 预订行程 | `/booking` | 套餐选择、在线表单、常见问题 |
| 关于我们 | `/about` | 团队介绍、服务理念、统计数据 |
| 常见问题 | `/faq` | 详细FAQ分类（5大类20+问题） |
| 图库 | `/gallery` | 图片展示、投稿入口 |
| 朝圣故事 | `/stories` | 用户故事分享、投稿入口 |
| 联系我们 | `/contact` | 联系方式、工作时间 |

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 部署

项目配置为自动部署到 Vercel。推送代码到 main 分支即可触发自动部署。

**详细部署步骤请看**: [DEPLOY-QUICK.md](./DEPLOY-QUICK.md)

**或者双击运行**: `deploy.bat`

## 域名配置

域名: kailash2026.com

在 Vercel 项目设置中添加自定义域名即可。

## 待办事项

- [ ] 添加真实图片资源
- [ ] 配置邮件通知API（Resend）
- [ ] 域名 DNS 配置
- [ ] 内容数据校对
- [ ] 添加博客/文章系统（可选）
- [ ] 多语言支持（可选）

## 联系方式

如有问题，请联系: contact@kailash2026.com

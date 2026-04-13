# 部署指南

## 方式一：Vercel（推荐）

### 1. 准备工作

```bash
# 确保代码在 Git 仓库
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Vercel 部署

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 登录
3. 导入项目
4. 框架预设选择 "Astro"
5. 点击 Deploy

### 3. 绑定域名

1. 在 Vercel Dashboard 选择项目
2. 进入 Settings → Domains
3. 添加域名：`kailash2026.com`
4. 按提示配置 DNS 记录

**DNS 配置示例：**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 4. 环境变量

在 Vercel Dashboard → Settings → Environment Variables 中添加：

```
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@kailash2026.com
```

---

## 方式二：本地构建后手动部署

```bash
# 构建
npm run build

# 生成的静态文件在 dist/ 目录
# 将 dist/ 内容上传到任意静态托管服务
```

---

## 方式三：Docker 部署

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

---

## 邮件服务配置

目前表单数据仅记录到控制台。要接收邮件通知：

### 使用 Resend（推荐，免费额度 100/天）

1. 注册 [resend.com](https://resend.com)
2. 验证域名
3. 获取 API Key
4. 取消注释 `src/pages/api/booking.ts` 中的邮件代码

---

## 部署检查清单

- [ ] 域名解析生效
- [ ] HTTPS 证书自动配置
- [ ] 表单 API 正常工作
- [ ] 所有页面可访问
- [ ] 图片加载正常
- [ ] SEO meta 标签正确
- [ ] 移动端适配正常
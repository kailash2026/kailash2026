# 阿里云 DNS 配置说明

## 前提条件
- 域名 kailash2026.com 已在阿里云注册
- Vercel 项目已部署

## 配置步骤

### 1. 在 Vercel 添加域名
1. 访问 https://vercel.com/dashboard
2. 选择 kailash2026 项目
3. 点击 Settings → Domains
4. 输入 kailash2026.com，点击 Add
5. 记录 Vercel 提供的 DNS 记录

### 2. 在阿里云配置 DNS
1. 登录阿里云控制台 → 域名服务 → 域名列表
2. 找到 kailash2026.com，点击「解析」
3. 添加以下记录：

#### 方式 A：使用 CNAME（推荐）
| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| CNAME | www | cname.vercel-dns.com | 600 |

#### 方式 B：使用 A 记录
| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| A | @ | 76.76.21.21 | 600 |
| A | www | 76.76.21.21 | 600 |

> 注：76.76.21.21 是 Vercel 的 IP，请确认最新值

### 3. 在 Resend 验证域名
1. 访问 https://resend.com/domains
2. 点击 Add Domain
3. 输入 kailash2026.com
4. 按照提示添加 DNS 验证记录
5. 等待验证（通常几分钟）

## 验证部署

1. 等待 DNS 生效（5-60 分钟）
2. 访问 https://kailash2026.com
3. 测试预订表单是否能收到邮件

## 常见问题

### 域名不生效
- 检查 DNS 记录是否正确
- 清除本地 DNS 缓存：`ipconfig /flushdns`
- 使用 https://dnschecker.org 验证

### 邮件不发送
- 确认 Resend 中域名已验证
- 检查 Vercel 环境变量是否设置
- 查看 Vercel Functions 日志

### HTTPS 证书
- Vercel 自动提供 HTTPS 证书
- 无需额外配置

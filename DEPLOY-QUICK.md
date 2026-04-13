# 快速部署指南

> 电脑拿回来后，按以下步骤操作，5分钟完成部署。

## 前置条件
- Node.js 20+ 已安装
- Git 已安装
- 有 GitHub 账号

## 步骤 1/4：本地Git提交（1分钟）

打开 PowerShell，执行：

```powershell
cd C:\Users\Administrator\.openclaw\workspace\kailash2026
git init
git config user.email "laba346@icloud.com"
git config user.name "Your Name"
git add .
git commit -m "Initial commit: Kailash 2026 website"
```

## 步骤 2/4：创建GitHub仓库（1分钟）

1. 访问 https://github.com/new
2. Repository name: `kailash2026`
3. 选择 **Public**
4. 点击 **Create repository**
5. 复制页面上的远程仓库地址（类似 `https://github.com/laba346/kailash2026.git`）

回到 PowerShell：

```powershell
git remote add origin https://github.com/laba346/kailash2026.git
git branch -M main
git push -u origin main
```

## 步骤 3/4：Vercel部署（2分钟）

### 方案A：GitHub集成（推荐）
1. 访问 https://vercel.com/new
2. 用 GitHub 登录
3. 选择 `kailash2026` 仓库
4. 点击 **Import**
5. 框架预设会自动识别为 Astro
6. 点击 **Deploy**

等待 1-2 分钟，部署完成后会显示访问链接。

### 方案B：手动部署
```powershell
# 全局安装 Vercel CLI
npm i -g vercel

# 在项目目录执行
vercel

# 按提示操作：
# ? Set up and deploy? [Y/n] → Y
# ? Which scope? → 选择你的账号
# ? Link to existing project? [y/N] → N
# ? What's your project name? → kailash2026
```

## 步骤 4/4：绑定域名（1分钟）

1. Vercel Dashboard → 选择 kailash2026 项目
2. Settings → Domains
3. 输入 `kailash2026.com`，点击 **Add**
4. 按提示配置 DNS（两种方法）：

**方法A：Nameservers（推荐，最简单）**
- 在域名注册商处，把 NS 记录改为：
  ```
  ns1.vercel-dns.com
  ns2.vercel-dns.com
  ```

**方法B：A记录 + CNAME**
- A记录：@ → 76.76.21.21
- CNAME：www → cname.vercel-dns.com

等待 DNS 生效（通常几分钟到几小时）。

## 完成！

访问 https://kailash2026.com 查看你的网站。

---

## 常见问题

### Q: 推送失败 "remote: Permission denied"
A: 需要在GitHub设置中添加SSH密钥，或使用HTTPS+个人访问Token

### Q: 部署失败
A: 检查 Vercel Dashboard 的 Build Logs，通常是依赖问题

### Q: 域名绑定失败
A: 确保 DNS 配置正确，等待生效时间

### Q: 如何更新网站？
A: 修改文件后执行：
```powershell
git add .
git commit -m "Update content"
git push
```
Vercel 会自动重新部署。
# 部署前检查清单

## ✅ 自动检查脚本

运行以下命令检查部署准备情况：

```bash
# 1. 检查构建
npm run build

# 2. 检查是否有错误
if [ $? -eq 0 ]; then
    echo "✅ 构建成功"
else
    echo "❌ 构建失败，请修复错误"
    exit 1
fi

# 3. 检查必要文件
files=("dist/index.html" "dist/404.html" "dist/sitemap.xml")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file 存在"
    else
        echo "❌ $file 缺失"
    fi
done
```

## 📋 手动检查清单

### 内容检查
- [ ] 所有页面文案已校对
- [ ] 价格信息准确
- [ ] 联系方式正确
- [ ] 图片已替换（非占位图）

### 功能检查
- [ ] 导航链接正常
- [ ] 移动端菜单可用
- [ ] 预订表单可提交
- [ ] 邮件服务已配置（可选）

### SEO检查
- [ ] 每个页面有独特的 title 和 description
- [ ] Open Graph 标签完整
- [ ] Sitemap.xml 已生成

### 性能检查
- [ ] 图片已压缩
- [ ] 无控制台错误
- [ ] 页面加载速度 < 3秒

## 🚀 部署步骤

1. **提交代码**
   ```bash
   git add .
   git commit -m "准备部署"
   git push origin main
   ```

2. **Vercel 部署**
   - 访问 https://vercel.com
   - 导入 GitHub 仓库
   - 选择 Astro 框架
   - 点击 Deploy

3. **绑定域名**
   - 在 Vercel Settings → Domains 添加 kailash2026.com
   - 在阿里云配置 DNS 解析

4. **配置环境变量**（如需邮件服务）
   - RESEND_API_KEY=你的API密钥
   - RESEND_FROM_EMAIL=noreply@kailash2026.com
   - RESEND_TO_EMAIL=contact@kailash2026.com

## 📞 部署后验证

- [ ] 网站可正常访问
- [ ] HTTPS 证书生效
- [ ] 所有页面正常显示
- [ ] 表单提交成功
- [ ] 移动端显示正常

## ⚠️ 常见问题

1. **构建失败** - 检查 node_modules 是否存在，运行 `npm install`
2. **图片不显示** - 确认图片在 public/images/ 目录
3. **邮件不发送** - 检查 Resend API Key 和环境变量配置

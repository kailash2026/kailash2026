cd "C:\Users\Administrator\.openclaw\workspace\kailash2026"

# 读取文件
$content = Get-Content src/pages/routes.astro -Raw

# 替换所有 data-lang-content="en" 后面添加 ja 和 ko
# 这是一个简化的方案，只替换关键部分

# 替换标题部分
$content = $content -replace '<span data-lang-content="zh">(.*?)</span>\s*<span data-lang-content="en" style="display: none;">(.*?)</span>', @"
<span data-lang-content="zh">`$1</span>
<span data-lang-content="en" style="display: none;">`$2</span>
<span data-lang-content="ja" style="display: none;">`$2</span>
<span data-lang-content="ko" style="display: none;">`$2</span>
"@

# 保存文件
$content | Set-Content src/pages/routes.astro -NoNewline
Write-Host "Done!"

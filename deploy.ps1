# 部署到 Vercel
# 1. 安装 Vercel CLI: npm i -g vercel
# 2. 登录: vercel login
# 3. 运行此脚本: .\deploy.ps1

# 设置变量
$ProjectDir = Get-Location
$GitMessage = "Update: add images, configure email API"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Kailash 2026 - Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 检查 Git
Write-Host "\n[1/5] Checking Git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "Found uncommitted changes, committing..." -ForegroundColor Green
    git add .
    git commit -m $GitMessage
    git push origin main
    Write-Host "✓ Code pushed to GitHub" -ForegroundColor Green
} else {
    Write-Host "✓ No changes to commit" -ForegroundColor Green
}

# 检查 Vercel CLI
Write-Host "\n[2/5] Checking Vercel CLI..." -ForegroundColor Yellow
$vercelExists = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelExists) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}
Write-Host "✓ Vercel CLI ready" -ForegroundColor Green

# 构建项目
Write-Host "\n[3/5] Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Build successful" -ForegroundColor Green

# 部署到 Vercel
Write-Host "\n[4/5] Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Deploy failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Deployed to Vercel" -ForegroundColor Green

# 显示完成信息
Write-Host "\n========================================" -ForegroundColor Cyan
Write-Host " Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "\nNext steps:" -ForegroundColor White
Write-Host "1. Add domain in Vercel Dashboard" -ForegroundColor Gray
Write-Host "2. Configure DNS in Alibaba Cloud" -ForegroundColor Gray
Write-Host "3. Verify domain in Resend" -ForegroundColor Gray

Read-Host "\nPress Enter to exit"

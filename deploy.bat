@echo off
chcp 65001
cls
echo ==========================================
echo   Kailash 2026 - 部署脚本
echo ==========================================
echo.

REM 检查Git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] Git 未安装，请先安装 Git
    pause
    exit /b 1
)

REM 检查Node
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] Node.js 未安装，请先安装 Node.js 20+
    pause
    exit /b 1
)

echo [1/5] 初始化 Git...
git init
git config user.email "laba346@icloud.com"
git config user.name "Kailash Admin"

echo.
echo [2/5] 提交代码...
git add .
git commit -m "Initial commit: Kailash 2026 website"

echo.
echo [3/5] 检查远程仓库...
git remote -v >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ==========================================
    echo   请先完成以下步骤：
    echo ==========================================
    echo.
    echo 1. 访问 https://github.com/new
    echo 2. 创建名为 kailash2026 的仓库（Public）
    echo 3. 复制仓库地址
    echo.
    set /p repo_url="粘贴仓库地址: "
    git remote add origin %repo_url%
)

echo.
echo [4/5] 推送到 GitHub...
git branch -M main
git push -u origin main

echo.
echo [5/5] 检查 Vercel CLI...
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo 安装 Vercel CLI...
    npm i -g vercel
)

echo.
echo ==========================================
echo   部署准备完成！
echo ==========================================
echo.
echo 接下来请执行：
echo.
echo 1. 访问 https://vercel.com/new 并导入 GitHub 仓库
echo    或执行: vercel
.
echo 2. 绑定域名 kailash2026.com
echo.
echo 详细步骤请看 DEPLOY-QUICK.md
echo.
pause
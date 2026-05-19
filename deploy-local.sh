#!/bin/bash
# 八字命理项目 - 一键推送部署脚本
# 用法：./deploy-local.sh "你的修改描述"

set -e

MESSAGE=${1:-"update: 代码更新"}

echo "🚀 开始部署八字命理项目..."

cd "$(dirname "$0")"

echo "📦 添加修改..."
git add .

echo "📝 提交: $MESSAGE"
git commit -m "$MESSAGE"

echo "⬆️ 推送到GitHub..."
git push origin main

echo ""
echo "✅ 推送成功！GitHub Actions正在自动部署..."
echo "🌐 约1分钟后访问: http://69.5.21.128"
echo ""
echo "查看部署进度: https://github.com/zpy016/bazi-learning-tool/actions"

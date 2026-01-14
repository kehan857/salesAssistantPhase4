#!/bin/bash

# GitHub部署检查脚本

echo "🔍 检查GitHub Actions部署状态..."
echo ""

# 仓库信息
REPO="kehan857/salesAssistantPhase4"
ACTIONS_URL="https://github.com/${REPO}/actions"
PAGES_URL="https://kehan857.github.io/salesAssistantPhase4/"

echo "📦 仓库: ${REPO}"
echo ""
echo "🔗 快速链接:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Actions页面: ${ACTIONS_URL}"
echo "🌐 GitHub Pages: ${PAGES_URL}"
echo "📁 仓库主页: https://github.com/${REPO}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 检查是否可以访问Pages
echo "🌐 检查GitHub Pages部署状态..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" ${PAGES_URL})

if [ $HTTP_CODE -eq 200 ]; then
    echo "✅ GitHub Pages部署成功！"
    echo "   可以访问: ${PAGES_URL}"
else
    echo "⏳ GitHub Pages正在部署中..."
    echo "   请访问Actions页面查看详细状态"
    echo "   ${ACTIONS_URL}"
fi

echo ""
echo "💡 提示："
echo "   - 首次部署需要3-5分钟"
echo "   - 后续每次推送都会自动触发部署"
echo "   - 可以在Actions页面查看部署进度"
echo ""

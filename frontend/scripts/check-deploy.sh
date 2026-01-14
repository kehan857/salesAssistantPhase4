#!/bin/bash

# GitHub Pages 部署前检查脚本
# 使用方法: ./scripts/check-deploy.sh

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🔍 GitHub Pages 部署前检查"
echo "================================"

# 检查1: vite.config.ts中的base配置
echo -n "检查 vite.config.ts base 配置... "
if grep -q "base: '/salesAssistantPhase4/'" vite.config.ts; then
    echo -e "${GREEN}✓ 通过${NC}"
else
    echo -e "${RED}✗ 失败${NC}"
    echo "  ❌ vite.config.ts 中缺少 base 路径配置"
    echo "  请添加: base: '/salesAssistantPhase4/'"
    exit 1
fi

# 检查2: main.tsx中的HashRouter配置
echo -n "检查 src/main.tsx HashRouter 配置... "
if grep -q "HashRouter" src/main.tsx; then
    echo -e "${GREEN}✓ 通过${NC}"
else
    echo -e "${RED}✗ 失败${NC}"
    echo "  ❌ src/main.tsx 中未使用 HashRouter"
    echo "  请将 BrowserRouter 改为 HashRouter"
    exit 1
fi

# 检查3: GitHub Actions工作流
echo -n "检查 GitHub Actions 工作流... "
if [ -f ".github/workflows/deploy.yml" ]; then
    echo -e "${GREEN}✓ 通过${NC}"
else
    echo -e "${YELLOW}⚠ 警告${NC}"
    echo "  ⚠️  未找到 .github/workflows/deploy.yml"
fi

# 检查4: env.d.ts类型定义
echo -n "检查 src/env.d.ts 类型定义... "
if [ -f "src/env.d.ts" ]; then
    echo -e "${GREEN}✓ 通过${NC}"
else
    echo -e "${YELLOW}⚠ 警告${NC}"
    echo "  ⚠️  未找到 src/env.d.ts"
    echo "  建议创建环境变量类型定义文件"
fi

# 检查5: TypeScript编译
echo -n "测试 TypeScript 编译... "
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓ 通过${NC}"
else
    echo -e "${RED}✗ 失败${NC}"
    echo "  ❌ TypeScript 编译失败"
    echo "  请运行 'npm run build' 查看详细错误"
    exit 1
fi

# 检查6: package.json scripts
echo -n "检查 package.json scripts... "
if grep -q '"build"' package.json && grep -q '"preview"' package.json; then
    echo -e "${GREEN}✓ 通过${NC}"
else
    echo -e "${YELLOW}⚠ 警告${NC}"
    echo "  ⚠️  package.json 中缺少 build 或 preview 脚本"
fi

echo ""
echo "================================"
echo -e "${GREEN}✅ 所有关键检查通过！${NC}"
echo ""
echo "下一步："
echo "  1. 运行 'npm run preview' 在本地预览"
echo "  2. 推送到GitHub: git push origin main"
echo "  3. 等待GitHub Actions完成部署"
echo "  4. 访问: https://kehan857.github.io/salesAssistantPhase4/"

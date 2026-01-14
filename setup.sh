#!/bin/bash

# 销售AI助手四期 - 快速启动脚本
# 使用方法: ./setup.sh

set -e  # 遇到错误立即退出

echo "🚀 销售AI助手四期 - 环境初始化"
echo "=================================="

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker未安装，请先安装Docker"
    echo "   访问: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

# 检查Node.js版本
if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js未安装，虽然Docker容器内会运行，但本地开发需要"
    echo "   访问: https://nodejs.org/"
fi

echo "✅ 环境检查通过"

# 创建环境变量文件
if [ ! -f .env ]; then
    echo "📝 创建环境变量文件..."
    cp .env.example .env
    echo "⚠️  请编辑 .env 文件，填入您的API密钥和配置"
    echo "   特别是以下必需配置："
    echo "   - OPENAI_API_KEY"
    echo "   - ANTHROPIC_API_KEY"
    echo "   - JWT_SECRET"
    echo ""
    read -p "是否现在编辑 .env 文件？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        ${EDITOR:-vi} .env
    fi
else
    echo "✅ 环境变量文件已存在"
fi

# 创建必要的目录
echo "📁 创建项目目录..."
mkdir -p backend/src/modules
mkdir -p backend/src/ai
mkdir -p backend/src/common
mkdir -p frontend/src
mkdir -p logs

# 拉取Docker镜像
echo "🐳 拉取Docker镜像..."
docker-compose pull

# 构建项目
echo "🔨 构建Docker镜像..."
docker-compose build

# 启动服务
echo "🚀 启动服务..."
docker-compose up -d postgres redis etcd minio milvus

echo "⏳ 等待数据库启动..."
sleep 10

# 检查服务健康状态
echo "🔍 检查服务状态..."
docker-compose ps

# 显示服务地址
echo ""
echo "✅ 环境初始化完成！"
echo ""
echo "📊 服务访问地址："
echo "   • 前端应用:     http://localhost:3000"
echo "   • 后端API:      http://localhost:8000"
echo "   • API文档:      http://localhost:8000/api/docs"
echo "   • 数据库管理:   http://localhost:5050 (admin@example.com / admin)"
echo "   • 队列监控:     http://localhost:3001"
echo "   • Milvus管理:   http://localhost:9000 (minioadmin / minioadmin)"
echo ""
echo "📝 下一步操作："
echo "   1. 确保 .env 文件中的API密钥已配置"
echo "   2. 运行 'docker-compose up -d backend frontend' 启动应用"
echo "   3. 运行 'docker-compose logs -f backend' 查看后端日志"
echo "   4. 运行 'docker-compose logs -f frontend' 查看前端日志"
echo ""
echo "📖 更多信息请参考: 01-整体设计方案.md"
echo ""

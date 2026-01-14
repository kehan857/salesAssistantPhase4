# 🚀 销售AI助手四期 - 快速启动指南

## ✅ 前置准备清单

在开始之前，请确保您已准备好以下事项：

### 1. 必需项（必须准备）

- [ ] **OpenAI API密钥**
  - 访问：https://platform.openai.com/api-keys
  - 创建API Key并保存

- [ ] **Anthropic API密钥** (可选，作为备用)
  - 访问：https://console.anthropic.com/
  - 创建API Key并保存

- [ ] **企业微信API权限** (如果需要集成)
  - 企业ID (CorpId)
  - 应用Secret (CorpSecret)

- [ ] **服务器资源**
  - CPU: 8核以上
  - 内存: 32GB以上
  - 硬盘: 100GB以上
  - 操作系统: Linux/macOS/Windows

### 2. 数据访问权限

- [ ] **CRM系统API访问**
  - Salesforce / 其他CRM的API密钥
  - 读取和写入权限

- [ ] **历史聊天记录**
  - 至少6个月的对话数据
  - 用于训练BANT提取模型

- [ ] **销冠名单标识**
  - 转化率前10%的销售人员ID
  - 用于构建销冠语料库

### 3. 业务文档

- [ ] **当前销售SOP文档**
- [ ] **常见异议处理话术库**
- [ ] **产品/服务核心卖点**
- [ ] **目标客户画像定义**

### 4. 开发工具

- [ ] Docker 20.10+
- [ ] Docker Compose 2.0+
- [ ] Git

---

## 📝 环境配置步骤

### Step 1: 克隆项目

```bash
git clone <repository-url>
cd 销售助手四期
```

### Step 2: 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑.env文件，填入以下必需配置：
```

**必须配置的环境变量：**

```bash
# 数据库密码（请修改）
POSTGRES_PASSWORD=your_secure_password_here

# AI API密钥
OPENAI_API_KEY=sk-your-openai-api-key-here
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here

# JWT密钥（请生成随机字符串）
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# 企业微信（可选）
WECHAT_CORP_ID=your_wechat_corp_id
WECHAT_CORP_SECRET=your_wechat_corp_secret
```

### Step 3: 生成JWT密钥

```bash
# 生成安全的JWT密钥
openssl rand -base64 32

# 将生成的密钥复制到 .env 文件的 JWT_SECRET
```

### Step 4: 运行安装脚本

```bash
# 给脚本添加执行权限
chmod +x setup.sh

# 运行安装脚本
./setup.sh
```

该脚本会自动完成：
- ✅ 检查Docker环境
- ✅ 创建项目目录
- ✅ 拉取Docker镜像
- ✅ 启动数据库服务
- ✅ 初始化数据库

---

## 🐳 启动服务

### 启动所有服务

```bash
# 启动后端和前端
docker-compose up -d backend frontend

# 查看启动日志
docker-compose logs -f
```

### 分步启动（推荐用于开发）

```bash
# 1. 先启动基础设施
docker-compose up -d postgres redis milvus etcd minio

# 2. 等待数据库就绪（约10秒）
sleep 10

# 3. 运行数据库迁移
docker-compose exec backend npm run prisma:migrate

# 4. 启动后端
docker-compose up -d backend

# 5. 启动前端
docker-compose up -d frontend

# 6. 查看所有服务状态
docker-compose ps
```

---

## 🌐 访问服务

服务启动成功后，访问以下地址：

| 服务 | 地址 | 账号密码 | 说明 |
|------|------|----------|------|
| **前端应用** | http://localhost:3000 | - | 主应用界面 |
| **后端API** | http://localhost:8000 | - | RESTful API |
| **API文档** | http://localhost:8000/api/docs | - | Swagger文档 |
| **数据库管理** | http://localhost:5050 | admin@example.com / admin | PgAdmin |
| **队列监控** | http://localhost:3001 | - | BullMQ Board |
| **Milvus管理** | http://localhost:9000 | minioadmin / minioadmin | 向量数据库 |

---

## 🧪 验证安装

### 1. 检查后端健康状态

```bash
curl http://localhost:8000/health
```

预期返回：
```json
{
  "status": "ok",
  "timestamp": "2026-01-12T10:00:00Z",
  "database": "connected",
  "redis": "connected"
}
```

### 2. 测试API连接

```bash
# 获取API文档
curl http://localhost:8000/api/docs

# 测试用户注册（可选）
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### 3. 检查前端页面

在浏览器访问 http://localhost:3000，应该能看到登录页面或主控台。

---

## 🔧 开发模式设置

### 前端开发（本地运行）

如果您想在前端本地开发而不是使用Docker：

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 后端开发（本地运行）

```bash
cd backend

# 安装依赖
npm install

# 配置环境变量（复制项目根目录的.env）
cp ../.env .env

# 生成Prisma客户端
npm run prisma:generate

# 运行数据库迁移
npm run prisma:migrate

# 启动开发服务器
npm run start:dev
```

---

## 📊 初始数据导入

### 1. 创建管理员用户

```bash
docker-compose exec backend npm run prisma:seed
```

或手动创建：

```bash
# 进入后端容器
docker-compose exec backend bash

# 运行Node脚本
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });
  console.log('Admin user created:', admin);
}

main();
"
```

### 2. 导入历史聊天记录

将历史聊天记录（CSV/JSON格式）放到 `backend/data/` 目录，然后：

```bash
docker-compose exec backend npm run import:conversations
```

### 3. 导入知识库

将知识库文档放到 `backend/data/knowledge/` 目录，然后：

```bash
docker-compose exec backend npm run import:knowledge
```

---

## 🐛 常见问题排查

### 问题1：Docker启动失败

**症状**：`docker-compose up` 失败

**解决方案**：
```bash
# 清理旧容器和镜像
docker-compose down -v
docker system prune -a

# 重新构建
docker-compose build --no-cache
docker-compose up -d
```

### 问题2：数据库连接失败

**症状**：后端日志显示 "Can't reach database"

**解决方案**：
```bash
# 检查数据库是否运行
docker-compose ps postgres

# 查看数据库日志
docker-compose logs postgres

# 确保DATABASE_URL正确
cat .env | grep DATABASE_URL
```

### 问题3：OpenAI API限流

**症状**：AI功能报错 "Rate limit exceeded"

**解决方案**：
1. 检查API配额：https://platform.openai.com/usage
2. 配置Anthropic作为备用：`.env` 中设置 `ANTHROPIC_API_KEY`
3. 或部署私有化模型（Llama 3.1）

### 问题4：端口被占用

**症状**：`Error: Port 3000 is already in use`

**解决方案**：
```bash
# 查找占用端口的进程
lsof -i :3000

# 杀死进程
kill -9 <PID>

# 或修改docker-compose.yml中的端口映射
```

---

## 📖 下一步

安装完成后，建议按以下顺序进行：

1. **阅读设计文档**
   - `01-整体设计方案.md` - 了解产品理念
   - `02-技术架构设计.md` - 理解技术实现

2. **熟悉代码结构**
   - 前端：`frontend/src/` 目录
   - 后端：`backend/src/` 目录

3. **运行测试**
   ```bash
   # 前端测试
   cd frontend && npm run test

   # 后端测试
   cd backend && npm run test
   ```

4. **开始开发**
   - 创建功能分支：`git checkout -b feature/your-feature`
   - 开始编码
   - 提交PR

---

## 💡 开发技巧

### 查看实时日志

```bash
# 所有服务
docker-compose logs -f

# 特定服务
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 进入容器调试

```bash
# 进入后端容器
docker-compose exec backend bash

# 进入数据库容器
docker-compose exec postgres psql -U admin -d sales_assistant
```

### 重启单个服务

```bash
docker-compose restart backend
docker-compose restart frontend
```

### 查看数据库

```bash
# 使用Prisma Studio（推荐）
cd backend
npm run prisma:studio

# 或使用PgAdmin
# 访问 http://localhost:5050
```

---

## 📞 获取帮助

遇到问题？这里有一些资源：

- **文档**：查看 `docs/` 目录
- **Issue**：在GitHub提交Issue
- **团队**：联系项目负责人

---

**🎉 恭喜！您已成功启动销售AI助手四期系统！**

现在开始探索智能销售的魅力吧！🚀
